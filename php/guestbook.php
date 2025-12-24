<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nama = htmlspecialchars($_POST['nama']);
    $phone = htmlspecialchars($_POST['phone']);
    $email = htmlspecialchars($_POST['email']);
    $alamat = htmlspecialchars($_POST['alamat']);
    $info = htmlspecialchars($_POST['info_tambahan']);
    
    $data = "Nama: $nama\nTelepon: $phone\nEmail: $email\nAlamat: $alamat\nInfo: $info\n\n";
    
    // Simpan ke file (bisa diganti dengan database)
    file_put_contents('guestbook_data.txt', $data, FILE_APPEND);
    
    echo "<script>alert('Terima kasih! Data Anda telah direkam.'); window.location.href='../index.html';</script>";
}
?>
