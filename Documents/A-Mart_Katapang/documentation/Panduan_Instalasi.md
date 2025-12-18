# Panduan Instalasi Lengkap

## Persyaratan Sistem
- PHP 7.4 atau lebih tinggi
- MySQL 5.7 atau lebih tinggi
- Web server (Apache/Nginx)
- 100MB ruang disk
- RAM minimum 512MB

## Langkah 1: Setup Environment
1. Install XAMPP/WAMP/MAMP
2. Start Apache dan MySQL
3. Buka http://localhost/phpmyadmin

## Langkah 2: Import Database
1. Buat database baru: `toko_sembako`
2. Import file `database/toko_sembako.sql`
3. Verifikasi tabel sudah dibuat

## Langkah 3: Konfigurasi Website
1. Edit `assets/php/config.php`
2. Sesuaikan database credentials
3. Update informasi toko di settings

## Langkah 4: Upload File
1. Copy semua file ke `htdocs/toko-sembako/`
2. Pastikan folder `uploads/` writable
3. Test akses: http://localhost/toko-sembako/

## Troubleshooting

### Database Connection Error
- Cek username/password di config.php
- Pastikan MySQL service running
- Cek port MySQL (default: 3306)

### File Upload Error
- Berikan permission 755 ke folder uploads
- Cek php.ini: upload_max_filesize
- Cek memory_limit di php.ini

### CSS/JS Not Loading
- Cek path di file HTML
- Clear browser cache
- Check console untuk error