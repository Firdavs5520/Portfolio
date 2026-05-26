Add-Type -AssemblyName System.Drawing

$root = Split-Path -Parent $PSScriptRoot
$assets = Join-Path $root "assets"
$out = Join-Path $assets "portfolio-hero.png"

if (-not (Test-Path $assets)) {
  New-Item -ItemType Directory -Force -Path $assets | Out-Null
}

$width = 1800
$height = 1100
$bitmap = New-Object System.Drawing.Bitmap $width, $height
$graphics = [System.Drawing.Graphics]::FromImage($bitmap)
$graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$graphics.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit

function Brush($hex) {
  return New-Object System.Drawing.SolidBrush ([System.Drawing.ColorTranslator]::FromHtml($hex))
}

function Pen($hex, $size = 1) {
  return New-Object System.Drawing.Pen ([System.Drawing.ColorTranslator]::FromHtml($hex)), $size
}

function Fill-RoundedRectangle($g, $brush, $x, $y, $w, $h, $r) {
  $path = New-Object System.Drawing.Drawing2D.GraphicsPath
  $d = $r * 2
  $path.AddArc($x, $y, $d, $d, 180, 90)
  $path.AddArc($x + $w - $d, $y, $d, $d, 270, 90)
  $path.AddArc($x + $w - $d, $y + $h - $d, $d, $d, 0, 90)
  $path.AddArc($x, $y + $h - $d, $d, $d, 90, 90)
  $path.CloseFigure()
  $g.FillPath($brush, $path)
  $path.Dispose()
}

$bgRect = New-Object System.Drawing.Rectangle 0, 0, $width, $height
$bg = New-Object System.Drawing.Drawing2D.LinearGradientBrush $bgRect, ([System.Drawing.Color]::FromArgb(23,32,28)), ([System.Drawing.Color]::FromArgb(49,95,194)), 35
$graphics.FillRectangle($bg, $bgRect)

$meshPen = New-Object System.Drawing.Pen ([System.Drawing.Color]::FromArgb(34, 255, 255, 255)), 1
for ($x = -200; $x -lt $width + 220; $x += 86) {
  $graphics.DrawLine($meshPen, $x, 0, $x + 360, $height)
}
for ($y = 70; $y -lt $height; $y += 92) {
  $graphics.DrawLine($meshPen, 0, $y, $width, $y - 180)
}

$teal = Brush "#0f766e"
$coral = Brush "#d85a4a"
$gold = Brush "#c89a28"
$paper = Brush "#f6f7f2"
$ink = Brush "#17201c"
$soft = Brush "#dfe9e2"
$blue = Brush "#315fc2"
$white70 = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(178, 255, 255, 255))
$white25 = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(64, 255, 255, 255))
$shadow = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(70, 0, 0, 0))

Fill-RoundedRectangle $graphics $shadow 1090 214 430 520 24
Fill-RoundedRectangle $graphics $paper 1060 180 430 520 24
Fill-RoundedRectangle $graphics $teal 1104 226 118 118 16
Fill-RoundedRectangle $graphics $coral 1250 226 194 38 12
Fill-RoundedRectangle $graphics $soft 1250 286 164 20 8
Fill-RoundedRectangle $graphics $soft 1104 384 340 18 8
Fill-RoundedRectangle $graphics $soft 1104 426 270 18 8
Fill-RoundedRectangle $graphics $gold 1104 498 86 86 14
Fill-RoundedRectangle $graphics $blue 1218 498 226 86 14
Fill-RoundedRectangle $graphics $soft 1104 622 340 18 8

$fontBig = New-Object System.Drawing.Font "Arial", 58, ([System.Drawing.FontStyle]::Bold)
$fontMedium = New-Object System.Drawing.Font "Arial", 28, ([System.Drawing.FontStyle]::Bold)
$fontSmall = New-Object System.Drawing.Font "Arial", 18, ([System.Drawing.FontStyle]::Regular)
$graphics.DrawString("F", $fontBig, $paper, 1138, 244)
$graphics.DrawString("Portfolio", $fontMedium, $ink, 1250, 326)
$graphics.DrawString("UI / Frontend", $fontSmall, $ink, 1252, 618)

Fill-RoundedRectangle $graphics $shadow 720 502 530 300 22
Fill-RoundedRectangle $graphics (Brush "#101512") 690 468 530 300 22
Fill-RoundedRectangle $graphics (Brush "#24342d") 730 510 450 190 14
Fill-RoundedRectangle $graphics $teal 768 548 130 18 7
Fill-RoundedRectangle $graphics $coral 768 592 230 18 7
Fill-RoundedRectangle $graphics $gold 768 636 170 18 7
Fill-RoundedRectangle $graphics $white25 1030 548 104 104 16
Fill-RoundedRectangle $graphics $white25 1030 668 104 32 10

$desk = New-Object System.Drawing.Drawing2D.LinearGradientBrush (New-Object System.Drawing.Rectangle 620, 768, 680, 100), ([System.Drawing.ColorTranslator]::FromHtml("#d85a4a")), ([System.Drawing.ColorTranslator]::FromHtml("#c89a28")), 0
Fill-RoundedRectangle $graphics $desk 620 768 680 100 18

Fill-RoundedRectangle $graphics $white70 1340 760 180 72 16
Fill-RoundedRectangle $graphics $teal 1366 784 50 24 8
Fill-RoundedRectangle $graphics $coral 1432 784 50 24 8

$graphics.DrawString("</>", $fontMedium, $paper, 878, 714)
$graphics.DrawString("Clean code", $fontSmall, $paper, 746, 714)

$bg.Dispose()
$meshPen.Dispose()
$fontBig.Dispose()
$fontMedium.Dispose()
$fontSmall.Dispose()
$graphics.Dispose()
$bitmap.Save($out, [System.Drawing.Imaging.ImageFormat]::Png)
$bitmap.Dispose()

Write-Output $out
