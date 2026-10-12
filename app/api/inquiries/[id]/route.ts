import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getCurrentAdmin } from '@/lib/auth'

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const admin = await getCurrentAdmin()
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { id } = params
    const body = await req.json()
    const { status, notes, priority } = body

    const updateData: any = {}
    if (status !== undefined) updateData.status = status
    if (notes !== undefined) updateData.notes = notes
    if (priority !== undefined) updateData.priority = priority

    const updated = await prisma.inquiry.update({
      where: { id },
      data: updateData,
    })

    return NextResponse.json({ success: true, inquiry: updated })
  } catch (error: any) {
    console.error('Error updating inquiry:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to update inquiry' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const admin = await getCurrentAdmin()
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { id } = params
    await prisma.inquiry.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Error deleting inquiry:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to delete inquiry' },
      { status: 500 }
    )
  }
}
