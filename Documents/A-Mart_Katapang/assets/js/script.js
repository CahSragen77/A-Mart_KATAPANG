// script.js - Untuk Toko Sembako

// Update Waktu
function updateDateTime() {
    const now = new Date();
    
    // Format tanggal Indonesia
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    const dateString = now.toLocaleDateString('id-ID', options);
    
    // Format waktu
    const timeString = now.toLocaleTimeString('id-ID', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
    
    // Update di halaman
    document.getElementById('current-date').textContent = dateString;
    document.getElementById('current-time').textContent = timeString;
}

// Form Buku Tamu
document.addEventListener('DOMContentLoaded', function() {
    // Update waktu setiap detik
    updateDateTime();
    setInterval(updateDateTime, 1000);
    
    // Form submission
    const guestbookForm = document.querySelector('.guestbook-form');
    if (guestbookForm) {
        guestbookForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Ambil nilai form
            const nama = document.getElementById('nama').value;
            const telepon = document.getElementById('telepon').value;
            const alamat = document.getElementById('alamat').value;
            
            // Validasi sederhana
            if (!nama || !telepon || !alamat) {
                alert('Harap isi semua field!');
                return;
            }
            
            // Tampilkan pesan sukses
            alert(`Terima kasih ${nama}! Data Anda telah berhasil disimpan.`);
            
            // Reset form
            guestbookForm.reset();
            
            // Simulasi pengiriman data ke server
            console.log('Data buku tamu:', { nama, telepon, alamat });
        });
    }
    
    // Tombol Beli di produk
    const buyButtons = document.querySelectorAll('.btn-buy');
    buyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productName = this.parentElement.querySelector('h3').textContent;
            const productPrice = this.parentElement.querySelector('.price').textContent;
            
            alert(`Produk "${productName}" telah ditambahkan ke keranjang!\nHarga: ${productPrice}`);
            
            // Simpan di localStorage (keranjang belanja sederhana)
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            cart.push({
                name: productName,
                price: productPrice,
                time: new Date().toLocaleString()
            });
            localStorage.setItem('cart', JSON.stringify(cart));
        });
    });
    
    // Tombol Pesan Sekarang
    const orderButton = document.querySelector('.btn-order');
    if (orderButton) {
        orderButton.addEventListener('click', function() {
            // Buat pesan WhatsApp
            const phone = '6281234567890'; // Ganti dengan nomor Anda
            const message = `Halo, saya ingin memesan Telur Ayam Kampung Super.`;
            const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
            
            // Buka WhatsApp
            window.open(url, '_blank');
        });
    }
});

// Simple cart counter
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = document.getElementById('cart-count');
    
    if (cartCount) {
        cartCount.textContent = cart.length;
    }
}

// Panggil saat halaman dimuat
window.onload = updateCartCount;