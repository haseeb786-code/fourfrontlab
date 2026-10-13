Add-Type -AssemblyName System.Drawing

$width = 1200
$height = 630
$bmp = New-Object System.Drawing.Bitmap($width, $height)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
$g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit

# 1. Fill background #080810
$bgBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 8, 8, 16))
$g.FillRectangle($bgBrush, 0, 0, $width, $height)

# 2. Draw subtle mesh gradient glows in deep purple #1a0533 and dark blue #0a1628
$glow1 = New-Object System.Drawing.Drawing2D.GraphicsPath
$glow1.AddEllipse(250, 60, 700, 500)
$pbg1 = New-Object System.Drawing.Drawing2D.PathGradientBrush($glow1)
$pbg1.CenterColor = [System.Drawing.Color]::FromArgb(120, 139, 92, 246)
$pbg1.SurroundColors = @([System.Drawing.Color]::FromArgb(0, 8, 8, 16))
$g.FillPath($pbg1, $glow1)

$glow2 = New-Object System.Drawing.Drawing2D.GraphicsPath
$glow2.AddEllipse(50, 400, 400, 300)
$pbg2 = New-Object System.Drawing.Drawing2D.PathGradientBrush($glow2)
$pbg2.CenterColor = [System.Drawing.Color]::FromArgb(60, 56, 189, 248)
$pbg2.SurroundColors = @([System.Drawing.Color]::FromArgb(0, 8, 8, 16))
$g.FillPath($pbg2, $glow2)

# 3. Center Glassmorphic Card (width: 860, height: 420)
$cardX = 170
$cardY = 105
$cardW = 860
$cardH = 420

$cardBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(200, 15, 15, 26))
$cardPen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(100, 139, 92, 246), 2)

# Helper function for rounded rectangle
function DrawRoundedCard($graphics, $brush, $pen, $x, $y, $w, $h, $r) {
    $path = New-Object System.Drawing.Drawing2D.GraphicsPath
    $d = $r * 2
    $path.AddArc($x, $y, $d, $d, 180, 90)
    $path.AddArc($x + $w - $d, $y, $d, $d, 270, 90)
    $path.AddArc($x + $w - $d, $y + $h - $d, $d, $d, 0, 90)
    $path.AddArc($x, $y + $h - $d, $d, $d, 90, 90)
    $path.CloseFigure()
    $graphics.FillPath($brush, $path)
    $graphics.DrawPath($pen, $path)
}

DrawRoundedCard $g $cardBrush $cardPen $cardX $cardY $cardW $cardH 36

# 4. Top Tag inside card
$fontFam = New-Object System.Drawing.FontFamily('Arial')
$sf = New-Object System.Drawing.StringFormat
$sf.Alignment = [System.Drawing.StringAlignment]::Center

$tagFont = New-Object System.Drawing.Font($fontFam, 12, [System.Drawing.FontStyle]::Bold)
$tagBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 56, 189, 248))
$g.DrawString('FOUR FRONT LAB  |  DIGITAL ENGINEERING & AI AGENCY', $tagFont, $tagBrush, 600, 155, $sf)

# 5. Big Brand Title
$titleFont = New-Object System.Drawing.Font($fontFam, 48, [System.Drawing.FontStyle]::Bold)
$titleBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 248, 250, 252))
$g.DrawString('FOUR FRONT LAB', $titleFont, $titleBrush, 600, 205, $sf)

# 6. Gradient Line Divider under Title
$linePen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(255, 139, 92, 246), 3)
$g.DrawLine($linePen, 440, 290, 760, 290)

# 7. Core Value Proposition Text
$subFont = New-Object System.Drawing.Font($fontFam, 20, [System.Drawing.FontStyle]::Bold)
$subBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 226, 232, 240))
$g.DrawString('Kinetic Next.js Platforms & Autonomous AI Workflows', $subFont, $subBrush, 600, 320, $sf)

# 8. Location & Specialization Footer inside card
$locFont = New-Object System.Drawing.Font($fontFam, 14, [System.Drawing.FontStyle]::Regular)
$locBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 148, 163, 184))
$g.DrawString('Islamabad, Pakistan   *   fourfrontlab.tech   *   Global Production', $locFont, $locBrush, 600, 420, $sf)

$g.Dispose()
$bmp.Save('public\og-image.png', [System.Drawing.Imaging.ImageFormat]::Png)
$bmp.Dispose()
Write-Output "Successfully updated public\og-image.png with dark theme aesthetic"
