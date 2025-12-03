# Script untuk upgrade PHP di XAMPP
# Pastikan Anda menjalankan PowerShell sebagai Administrator

Write-Host "=== PHP Upgrade Helper untuk XAMPP ===" -ForegroundColor Green
Write-Host ""

# Cek versi PHP saat ini
Write-Host "Versi PHP saat ini:" -ForegroundColor Yellow
php -v
Write-Host ""

# URL untuk download PHP 8.3 (Thread Safe x64)
$phpVersion = "8.3.28"
$downloadUrl = "https://windows.php.net/downloads/releases/php-$phpVersion-Win32-vs16-x64.zip"
$downloadPath = "$env:TEMP\php-$phpVersion.zip"
$extractPath = "$env:TEMP\php-$phpVersion"

Write-Host "Langkah-langkah yang akan dilakukan:" -ForegroundColor Cyan
Write-Host "1. Download PHP $phpVersion"
Write-Host "2. Backup PHP lama ke C:\xampp\php_8.2_backup"
Write-Host "3. Extract PHP baru ke C:\xampp\php"
Write-Host "4. Copy konfigurasi php.ini"
Write-Host ""

$confirm = Read-Host "Lanjutkan? (y/n)"
if ($confirm -ne "y") {
    Write-Host "Dibatalkan" -ForegroundColor Red
    exit
}

# Step 1: Download PHP 8.3
Write-Host "`nMengunduh PHP $phpVersion..." -ForegroundColor Yellow
try {
    # Cek apakah sudah ada di temp
    if (Test-Path $downloadPath) {
        Write-Host "File sudah ada di $downloadPath" -ForegroundColor Green
    } else {
        $ProgressPreference = 'SilentlyContinue'
        Invoke-WebRequest -Uri $downloadUrl -OutFile $downloadPath -UseBasicParsing
        Write-Host "Download selesai!" -ForegroundColor Green
    }
} catch {
    Write-Host "Error saat download: $_" -ForegroundColor Red
    Write-Host "`nSilakan download manual dari:" -ForegroundColor Yellow
    Write-Host $downloadUrl
    Write-Host "`nDan simpan sebagai: $downloadPath"
    $manual = Read-Host "`nApakah sudah download manual? (y/n)"
    if ($manual -ne "y") {
        exit
    }
}

# Step 2: Backup PHP lama
Write-Host "`nMembackup PHP lama..." -ForegroundColor Yellow
$xamppPhpPath = "C:\xampp\php"
$backupPath = "C:\xampp\php_8.2_backup"

if (Test-Path $xamppPhpPath) {
    if (Test-Path $backupPath) {
        Write-Host "Backup sudah ada di $backupPath" -ForegroundColor Yellow
        $overwrite = Read-Host "Hapus backup lama dan buat baru? (y/n)"
        if ($overwrite -eq "y") {
            Remove-Item -Path $backupPath -Recurse -Force
            Move-Item -Path $xamppPhpPath -Destination $backupPath
            Write-Host "Backup baru dibuat!" -ForegroundColor Green
        }
    } else {
        Move-Item -Path $xamppPhpPath -Destination $backupPath
        Write-Host "Backup dibuat di $backupPath" -ForegroundColor Green
    }
} else {
    Write-Host "Folder C:\xampp\php tidak ditemukan!" -ForegroundColor Red
    exit
}

# Step 3: Extract PHP baru
Write-Host "`nMengekstrak PHP $phpVersion..." -ForegroundColor Yellow
try {
    if (Test-Path $extractPath) {
        Remove-Item -Path $extractPath -Recurse -Force
    }
    Expand-Archive -Path $downloadPath -DestinationPath $extractPath -Force
    
    # Move ke C:\xampp\php
    New-Item -ItemType Directory -Path $xamppPhpPath -Force | Out-Null
    Get-ChildItem -Path $extractPath | Move-Item -Destination $xamppPhpPath -Force
    
    Write-Host "PHP $phpVersion berhasil diinstall!" -ForegroundColor Green
} catch {
    Write-Host "Error saat ekstrak: $_" -ForegroundColor Red
    exit
}

# Step 4: Copy php.ini
Write-Host "`nMengatur konfigurasi php.ini..." -ForegroundColor Yellow
if (Test-Path "$backupPath\php.ini") {
    Copy-Item -Path "$backupPath\php.ini" -Destination "$xamppPhpPath\php.ini" -Force
    Write-Host "php.ini lama berhasil dicopy" -ForegroundColor Green
} else {
    # Gunakan php.ini-development sebagai template
    if (Test-Path "$xamppPhpPath\php.ini-development") {
        Copy-Item -Path "$xamppPhpPath\php.ini-development" -Destination "$xamppPhpPath\php.ini" -Force
        Write-Host "Menggunakan php.ini-development sebagai template" -ForegroundColor Yellow
        Write-Host "Silakan sesuaikan konfigurasi di $xamppPhpPath\php.ini" -ForegroundColor Yellow
    }
}

# Cleanup
Write-Host "`nMembersihkan file temporary..." -ForegroundColor Yellow
if (Test-Path $extractPath) {
    Remove-Item -Path $extractPath -Recurse -Force
}

# Verifikasi
Write-Host "`n=== Verifikasi ===" -ForegroundColor Green
Write-Host "Versi PHP baru:"
php -v
Write-Host ""

Write-Host "Upgrade selesai!" -ForegroundColor Green
Write-Host "`nCatatan penting:" -ForegroundColor Yellow
Write-Host "- Restart Apache jika sedang berjalan (melalui XAMPP Control Panel)"
Write-Host "- Cek konfigurasi php.ini di: $xamppPhpPath\php.ini"
Write-Host "- Backup PHP lama ada di: $backupPath"
Write-Host "- Setelah yakin berfungsi, bisa hapus backup dengan:"
Write-Host "  Remove-Item -Path '$backupPath' -Recurse -Force" -ForegroundColor Cyan
Write-Host ""
Write-Host "Sekarang jalankan: composer update" -ForegroundColor Green
