<?php
// Konfigurasi database
$servername = "localhost";
$username = "username";
$password = "password";
$dbname = "toko_sembako";

// Buat koneksi
$conn = new mysqli($servername, $username, $password, $dbname);

// Cek koneksi
if ($conn->connect_error) {
    die("Koneksi gagal: " . $conn->connect_error);
}

// Set header untuk JSON
header('Content-Type: application/json');

// Tangani request
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Sanitasi input
    $nama = mysqli_real_escape_string($conn, $_POST['nama']);
    $telepon = mysqli_real_escape_string($conn, $_POST['telepon']);
    $alamat = mysqli_real_escape_string($conn, $_POST['alamat']);
    $produk_favorit = isset($_POST['produk_favorit']) ? mysqli_real_escape_string($conn, $_POST['produk_favorit']) : '';
    $saran = isset($_POST['saran']) ? mysqli_real_escape_string($conn, $_POST['saran']) : '';
    $promo = isset($_POST['promo']) ? 1 : 0;
    $ip_address = $_SERVER['REMOTE_ADDR'];
    $created_at = date('Y-m-d H:i:s');
    
    // Validasi
    if (empty($nama) || empty($telepon) || empty($alamat)) {
        echo json_encode([
            'success' => false,
            'message' => 'Semua field wajib diisi!'
        ]);
        exit;
    }
    
    // Simpan ke database
    $sql = "INSERT INTO guestbook (nama, telepon, alamat, produk_favorit, saran, promo, ip_address, created_at) 
            VALUES ('$nama', '$telepon', '$alamat', '$produk_favorit', '$saran', '$promo', '$ip_address', '$created_at')";
    
    if ($conn->query($sql) === TRUE) {
        // Kirim notifikasi email (opsional)
        $to = "admin@tokoberkahabadi.com";
        $subject = "Data Buku Tamu Baru";
        $message = "Nama: $nama\n";
        $message .= "Telepon: $telepon\n";
        $message .= "Alamat: $alamat\n";
        $message .= "Produk Favorit: $produk_favorit\n";
        $message .= "Saran: $saran\n";
        $message .= "Ingin Promo: " . ($promo ? 'Ya' : 'Tidak') . "\n";
        $headers = "From: noreply@tokoberkahabadi.com";
        
        // mail($to, $subject, $message, $headers);
        
        echo json_encode([
            'success' => true,
            'message' => 'Terima kasih! Data Anda telah berhasil disimpan.'
        ]);
    } else {
        echo json_encode([
            'success' => false,
            'message' => 'Terjadi kesalahan: ' . $conn->error
        ]);
    }
    
    $conn->close();
} else {
    echo json_encode([
        'success' => false,
        'message' => 'Method tidak diizinkan'
    ]);
}
?>