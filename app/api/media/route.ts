import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getCurrentAdmin } from '@/lib/auth'
import fs from 'fs'
import path from 'path'

export const dynamic = 'force-dynamic'

const ALLOWED_MIME_TYPES = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
  'image/svg+xml',
])

const ALLOWED_EXTENSIONS = new Set([
  '.jpg',
  '.jpeg',
  '.png',
  '.webp',
  '.gif',
  '.svg',
])

const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024 // 10MB

export async function GET() {
  try {
    const assets = await prisma.mediaAsset.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(assets)
  } catch (error: any) {
    console.error('Error fetching media assets:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to fetch media assets' },
      { status: 500 }
    )
  }
}

export async function POST(req: Request) {
  const admin = await getCurrentAdmin()
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const contentType = req.headers.get('content-type') || ''

    // Handle Multipart form upload
    if (contentType.includes('multipart/form-data')) {
      const formData = await req.formData()
      const file = formData.get('file') as File | null
      const altText = (formData.get('altText') as string) || ''

      if (!file) {
        return NextResponse.json({ error: 'No file provided' }, { status: 400 })
      }

      if (file.size === 0) {
        return NextResponse.json({ error: 'File is empty' }, { status: 400 })
      }

      if (file.size > MAX_FILE_SIZE_BYTES) {
        return NextResponse.json(
          { error: `File size exceeds the 10MB limit (provided: ${(file.size / (1024 * 1024)).toFixed(1)}MB)` },
          { status: 400 }
        )
      }

      const originalName = file.name || 'upload.png'
      const ext = path.extname(originalName).toLowerCase()

      // Validate extension and MIME type
      if (!ALLOWED_EXTENSIONS.has(ext)) {
        return NextResponse.json(
          { error: `Unsupported file extension "${ext}". Allowed: ${Array.from(ALLOWED_EXTENSIONS).join(', ')}` },
          { status: 400 }
        )
      }

      const mimeType = file.type || 'image/png'
      if (!ALLOWED_MIME_TYPES.has(mimeType)) {
        return NextResponse.json(
          { error: `Unsupported MIME type "${mimeType}". Only safe image formats are permitted.` },
          { status: 400 }
        )
      }

      const bytes = await file.arrayBuffer()
      const buffer = Buffer.from(bytes)

      // Sanitize filename to avoid path traversal
      const baseName = path.basename(originalName, ext).replace(/[^a-zA-Z0-9_-]/g, '_')
      const fileName = `${Date.now()}_${baseName}${ext}`

      const uploadDir = path.join(process.cwd(), 'public', 'uploads')
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true })
      }

      const filePath = path.join(uploadDir, fileName)
      fs.writeFileSync(filePath, buffer)

      const fileUrl = `/uploads/${fileName}`

      const asset = await prisma.mediaAsset.create({
        data: {
          fileName,
          fileUrl,
          mimeType,
          sizeBytes: buffer.length,
          altText: altText || originalName,
        },
      })

      return NextResponse.json({ success: true, asset }, { status: 201 })
    }

    // JSON body fallback (for external or existing assets)
    const body = await req.json()
    const { fileName, fileUrl, mimeType, sizeBytes, altText } = body

    if (!fileName || !fileUrl) {
      return NextResponse.json(
        { error: 'fileName and fileUrl are required' },
        { status: 400 }
      )
    }

    const asset = await prisma.mediaAsset.create({
      data: {
        fileName: fileName.trim(),
        fileUrl: fileUrl.trim(),
        mimeType: mimeType || 'image/jpeg',
        sizeBytes: Number(sizeBytes) || 0,
        altText: altText || fileName,
      },
    })

    return NextResponse.json({ success: true, asset }, { status: 201 })
  } catch (error: any) {
    console.error('Error uploading media:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to upload media' },
      { status: 500 }
    )
  }
}

export async function DELETE(req: Request) {
  const admin = await getCurrentAdmin()
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'Media ID is required' }, { status: 400 })
    }

    const asset = await prisma.mediaAsset.findUnique({
      where: { id },
    })

    if (!asset) {
      return NextResponse.json({ error: 'Media asset not found' }, { status: 404 })
    }

    // If file is stored in /uploads/, remove it from disk
    if (asset.fileUrl.startsWith('/uploads/')) {
      const fileName = path.basename(asset.fileUrl)
      const diskPath = path.join(process.cwd(), 'public', 'uploads', fileName)
      if (fs.existsSync(diskPath)) {
        try {
          fs.unlinkSync(diskPath)
        } catch (unlinkErr) {
          console.warn('Could not remove file from disk:', unlinkErr)
        }
      }
    }

    await prisma.mediaAsset.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Error deleting media asset:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to delete media asset' },
      { status: 500 }
    )
  }
}
