Add-Type -AssemblyName System.Drawing
$srcPath = "\\?\C:\Users\46106\AppData\Local\Temp\bazi_icon.png"
$dstPath = "\\?\C:\Users\46106\AppData\Local\Temp\bazi-disabled.png"
$origPath = "C:\Users\46106\AppData\Local\Temp\bazi_icon.png"
Copy-Item "d:\小程序库\ceshengchenmingli\__APP__\static\images\tabbar\bazi.png" $origPath -Force
$src = [System.Drawing.Image]::FromFile($origPath)
$bmp = New-Object System.Drawing.Bitmap($src.Width, $src.Height)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.DrawImage($src, 0, 0)
$g.Dispose()
$gray = New-Object System.Drawing.Bitmap($src.Width, $src.Height)
for ($x = 0; $x -lt $src.Width; $x++) {
    for ($y = 0; $y -lt $src.Height; $y++) {
        $c = $bmp.GetPixel($x, $y)
        $grayVal = [int](0.299 * $c.R + 0.587 * $c.G + 0.114 * $c.B)
        $gray.SetPixel($x, $y, [System.Drawing.Color]::FromArgb($grayVal, $grayVal, $grayVal))
    }
}
$gray.Save($dstPath)
Copy-Item $dstPath "d:\小程序库\ceshengchenmingli\__APP__\static\images\tabbar\bazi-disabled.png" -Force
$src.Dispose()
$bmp.Dispose()
$gray.Dispose()
Remove-Item $origPath -Force
Remove-Item $dstPath -Force
Write-Host "Done"
