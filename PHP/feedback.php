<?php
// feedback.php - Proses form saran/kritik dari halaman feedback.html

// Konfigurasi dasar
date_default_timezone_set('Asia/Jakarta');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // 1. Ambil data dari form
    $display_option = isset($_POST['display_name']) ? $_POST['display_name'] : 'hide';
    $nama = isset($_POST['nama']) ? htmlspecialchars(trim($_POST['nama'])) : 'Anonim';
    $saran = isset($_POST['saran']) ? htmlspecialchars(trim($_POST['saran'])) : '';
    
    // Jika pilihan "hide" atau nama kosong, tampilkan sebagai Anonim
    if ($display_option == 'hide' || empty($nama)) {
        $nama = 'Anonim';
    }
    
    // Validasi: saran tidak boleh kosong
    if (empty($saran)) {
        echo "<script>
                alert('Saran/kritik tidak boleh kosong!');
                window.history.back();
              </script>";
        exit();
    }
    
    // 2. Siapkan data untuk disimpan
    $timestamp = date('Y-m-d H:i:s');
    $ip_address = $_SERVER['REMOTE_ADDR'];
    
    $data = "Waktu: $timestamp\n";
    $data .= "IP: $ip_address\n";
    $data .= "Nama: $nama\n";
    $data .= "Saran/Kritik:\n$saran\n";
    $data .= "----------------------------\n\n";
    
    // 3. Simpan ke file (bisa diganti dengan database nanti)
    $filename = 'feedback_data.txt';
    $filepath = dirname(__FILE__) . '/' . $filename;
    
    // Coba simpan ke file
    if (file_put_contents($filepath, $data, FILE_APPEND | LOCK_EX) !== false) {
        // 4. Tampilkan konfirmasi sukses
        echo "<!DOCTYPE html>
        <html lang='id'>
        <head>
            <meta charset='UTF-8'>
            <meta name='viewport' content='width=device-width, initial-scale=1.0'>
            <title>Terima Kasih - A-Mart Katapang</title>
            <link rel='stylesheet' href='../css/style.css'>
            <style>
                .success-container {
                    max-width: 600px;
                    margin: 50px auto;
                    padding: 2rem;
                    background: white;
                    border-radius: 10px;
                    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
                    text-align: center;
                }
                .success-icon {
                    font-size: 4rem;
                    color: #2a9d8f;
                    margin-bottom: 1rem;
                }
                .btn {
                    display: inline-block;
                    margin-top: 1.5rem;
                    padding: 0.8rem 2rem;
                    background: #2a9d8f;
                    color: white;
                    text-decoration: none;
                    border-radius: 5px;
                    font-weight: bold;
                }
            </style>
        </head>
        <body>
            <div class='success-container'>
                <div class='success-icon'>✓</div>
                <h2>Terima Kasih Atas Saran Anda!</h2>
                <p>Saran/kritik Anda telah berhasil dikirim dan akan menjadi bahan evaluasi kami untuk meningkatkan pelayanan.</p>
                <p><strong>Status:</strong> " . ($nama == 'Anonim' ? 'Dikirim secara anonim' : "Atas nama: $nama") . "</p>
                <a href='../feedback.html' class='btn'>Kembali ke Form Saran</a>
                <a href='../index.html' class='btn' style='background: #e76f51;'>Kembali ke Beranda</a>
            </div>
        </body>
        </html>";
    } else {
        // Jika gagal menyimpan
        echo "<script>
                alert('Maaf, terjadi kesalahan saat mengirim saran. Silakan coba lagi.');
                window.history.back();
              </script>";
    }
} else {
    // Jika akses langsung ke file PHP tanpa form submission
    header('Location: ../feedback.html');
    exit();
}
?>
