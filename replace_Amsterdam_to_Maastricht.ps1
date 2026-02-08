# replace_Amsterdam_to_Maastricht.ps1
# Replaces:
#   Amsterdam -> Maastricht
#   amsterdam -> maastricht
# In:
#   1) file contents (text files only)
#   2) file names
#   3) folder names
# Skips only: this script file itself
# Processes everything under Root (default: current folder)

param(
    [string]$Root = (Get-Location).Path
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

$thisScriptPath = $PSCommandPath

function Apply-Replacements([string]$s) {
    if ($null -eq $s) { return $s }
    $s = $s.Replace("Amsterdam", "Maastricht")
    $s = $s.Replace("amsterdam", "maastricht")
    return $s
}

function Get-TextWithEncoding([byte[]]$bytes) {
    if ($bytes.Length -eq 0) {
        return @{ Text = ""; Encoding = New-Object System.Text.UTF8Encoding($false) }
    }

    # Detect BOM
    if ($bytes.Length -ge 3 -and $bytes[0] -eq 0xEF -and $bytes[1] -eq 0xBB -and $bytes[2] -eq 0xBF) {
        $enc = New-Object System.Text.UTF8Encoding($true)
        return @{ Text = $enc.GetString($bytes); Encoding = $enc }
    }
    if ($bytes.Length -ge 2 -and $bytes[0] -eq 0xFF -and $bytes[1] -eq 0xFE) {
        $enc = New-Object System.Text.UnicodeEncoding($false, $true)  # UTF-16 LE with BOM
        return @{ Text = $enc.GetString($bytes); Encoding = $enc }
    }
    if ($bytes.Length -ge 2 -and $bytes[0] -eq 0xFE -and $bytes[1] -eq 0xFF) {
        $enc = New-Object System.Text.UnicodeEncoding($true, $true)   # UTF-16 BE with BOM
        return @{ Text = $enc.GetString($bytes); Encoding = $enc }
    }
    if ($bytes.Length -ge 4 -and $bytes[0] -eq 0xFF -and $bytes[1] -eq 0xFE -and $bytes[2] -eq 0x00 -and $bytes[3] -eq 0x00) {
        $enc = New-Object System.Text.UTF32Encoding($false, $true)     # UTF-32 LE with BOM
        return @{ Text = $enc.GetString($bytes); Encoding = $enc }
    }
    if ($bytes.Length -ge 4 -and $bytes[0] -eq 0x00 -and $bytes[1] -eq 0x00 -and $bytes[2] -eq 0xFE -and $bytes[3] -eq 0xFF) {
        $enc = New-Object System.Text.UTF32Encoding($true, $true)      # UTF-32 BE with BOM
        return @{ Text = $enc.GetString($bytes); Encoding = $enc }
    }

    # No BOM, assume UTF-8 without BOM
    $encNoBom = New-Object System.Text.UTF8Encoding($false)
    return @{ Text = $encNoBom.GetString($bytes); Encoding = $encNoBom }
}

function Test-IsLikelyTextBytes([byte[]]$bytes) {
    if ($bytes.Length -eq 0) { return $true }

    # If a BOM exists, treat as text (even if it contains 0 bytes)
    $hasBom =
        ($bytes.Length -ge 3 -and $bytes[0] -eq 0xEF -and $bytes[1] -eq 0xBB -and $bytes[2] -eq 0xBF) -or
        ($bytes.Length -ge 2 -and (($bytes[0] -eq 0xFF -and $bytes[1] -eq 0xFE) -or ($bytes[0] -eq 0xFE -and $bytes[1] -eq 0xFF))) -or
        ($bytes.Length -ge 4 -and (($bytes[0] -eq 0xFF -and $bytes[1] -eq 0xFE -and $bytes[2] -eq 0x00 -and $bytes[3] -eq 0x00) -or
                                   ($bytes[0] -eq 0x00 -and $bytes[1] -eq 0x00 -and $bytes[2] -eq 0xFE -and $bytes[3] -eq 0xFF)))
    if ($hasBom) { return $true }

    # Null byte usually means binary for no-BOM files
    if ($bytes -contains 0) { return $false }

    $nonPrintable = 0
    foreach ($b in $bytes) {
        if (($b -lt 9) -or (($b -gt 13) -and ($b -lt 32))) { $nonPrintable++ }
    }
    return (($nonPrintable / [double]$bytes.Length) -lt 0.02)
}

Write-Host "Root: $Root"
Write-Host "Skipping script file: $([System.IO.Path]::GetFileName($thisScriptPath))"

$scannedFiles = 0
$changedFiles = 0
$renamedFiles = 0
$renamedDirs  = 0
$skippedRenamesBecauseTargetExists = 0
$errors = 0

# 1) Replace inside file contents (text files only)
$files = Get-ChildItem -LiteralPath $Root -Recurse -File -Force
foreach ($f in $files) {
    if ($f.FullName -ieq $thisScriptPath) { continue }

    $scannedFiles++

    try {
        $bytes = [System.IO.File]::ReadAllBytes($f.FullName)
    } catch {
        $errors++
        Write-Warning "Read failed: $($f.FullName)  $($_.Exception.Message)"
        continue
    }

    if (-not (Test-IsLikelyTextBytes $bytes)) { continue }

    $te = Get-TextWithEncoding $bytes
    $text = $te.Text
    $newText = Apply-Replacements $text

    if ($newText -ne $text) {
        try {
            [System.IO.File]::WriteAllText($f.FullName, $newText, $te.Encoding)
            $changedFiles++
            Write-Host "Content updated: $($f.FullName)"
        } catch {
            $errors++
            Write-Warning "Write failed: $($f.FullName)  $($_.Exception.Message)"
        }
    }
}

# 2) Rename files (deepest first)
$filesToRename = Get-ChildItem -LiteralPath $Root -Recurse -File -Force |
    Where-Object {
        $_.FullName -ine $thisScriptPath -and
        (Apply-Replacements $_.Name) -ne $_.Name
    } |
    Sort-Object FullName -Descending

foreach ($item in $filesToRename) {
    $newName = Apply-Replacements $item.Name
    $parent  = $item.DirectoryName
    $target  = Join-Path -Path $parent -ChildPath $newName

    if (Test-Path -LiteralPath $target) {
        $skippedRenamesBecauseTargetExists++
        Write-Warning "Skip file rename, target exists: $($item.FullName) -> $target"
        continue
    }

    try {
        Rename-Item -LiteralPath $item.FullName -NewName $newName
        $renamedFiles++
        Write-Host "File renamed: $($item.FullName) -> $target"
    } catch {
        $errors++
        Write-Warning "File rename failed: $($item.FullName)  $($_.Exception.Message)"
    }
}

# 3) Rename folders (deepest first)
$dirsToRename = Get-ChildItem -LiteralPath $Root -Recurse -Directory -Force |
    Where-Object {
        (Apply-Replacements $_.Name) -ne $_.Name
    } |
    Sort-Object FullName -Descending

foreach ($dir in $dirsToRename) {
    $newName = Apply-Replacements $dir.Name
    $parent  = $dir.Parent.FullName
    $target  = Join-Path -Path $parent -ChildPath $newName

    if (Test-Path -LiteralPath $target) {
        $skippedRenamesBecauseTargetExists++
        Write-Warning "Skip dir rename, target exists: $($dir.FullName) -> $target"
        continue
    }

    try {
        Rename-Item -LiteralPath $dir.FullName -NewName $newName
        $renamedDirs++
        Write-Host "Dir renamed: $($dir.FullName) -> $target"
    } catch {
        $errors++
        Write-Warning "Dir rename failed: $($dir.FullName)  $($_.Exception.Message)"
    }
}

Write-Host ""
Write-Host "Done."
Write-Host "Files scanned: $scannedFiles"
Write-Host "Files with content changed: $changedFiles"
Write-Host "Files renamed: $renamedFiles"
Write-Host "Folders renamed: $renamedDirs"
Write-Host "Renames skipped (target exists): $skippedRenamesBecauseTargetExists"
Write-Host "Errors: $errors"
