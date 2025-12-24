/**
 * A-MART KATAPANG - MAIN JAVASCRIPT (GABUNGAN)
 * Version: 2.0.0
 * Menggabungkan fitur dari kedua versi
 */

// ============================================
// 1. INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    console.log('A-Mart Katapang Website Loaded Successfully');
    
    // Fungsi dari JS Anda (ditambah)
    initMobileMenu();
    initFormValidation();
    initImageLazyLoad();
    initScrollToTop();
    initSmoothScroll();
    initAdvertisementSlots();
    checkUrlForMessages();
    
    // Fungsi dari JS saya (dipertahankan)
    updateLiveTime();
    setInterval(updateLiveTime, 1000);
    loadProducts();
    
    // Inisialisasi guestbook form
    initGuestbookForm();
});

// ============================================
// 2. LIVE TIME UPDATER (Dari versi saya)
// ============================================
function updateLiveTime() {
    const now = new Date();
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
        timeZone: 'Asia/Jakarta'
    };
    
    const formatter = new Intl.DateTimeFormat('id-ID', options);
    const formattedTime = formatter.format(now);
    
    const liveTimeElement = document.getElementById('liveTime');
    if (liveTimeElement) {
        liveTimeElement.textContent = formattedTime;
    }
}

// ============================================
// 3. PRODUCT LOADING (Dari versi saya)
// ============================================
const products = [
    {
        id: 1,
        name: "Beras Premium",
        price: "Rp 12.500 / kg",
        image: "assets/images/beras.jpg",
        alt: "Beras Premium"
    },
    // ... tambahkan produk lainnya
];

function loadProducts() {
    const productGrid = document.getElementById('productGrid');
    if (!productGrid) return;
    
    productGrid.innerHTML = '';
    
    products.forEach(product => {
        const productItem = document.createElement('div');
        productItem.className = 'product-item';
        productItem.innerHTML = `
            <img src="${product.image}" alt="${product.alt}" 
                 onerror="this.src='https://via.placeholder.com/300x200?text=${encodeURIComponent(product.name)}'">
            <h4>${product.name}</h4>
            <p>${product.price}</p>
            <button class="btn-buy" onclick="buyProduct(${product.id})">BELI</button>
        `;
        productGrid.appendChild(productItem);
    });
}

function buyProduct(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        const message = `Halo A-Mart! Saya ingin membeli:\n\n${product.name}\n${product.price}\n\nMohon info stok dan cara pemesanan. Terima kasih!`;
        const whatsappUrl = `https://wa.me/6281234567890?text=${encodeURIComponent(message)}`;
        
        window.open(whatsappUrl, '_blank');
    }
}

// ============================================
// 4. GUESTBOOK FORM HANDLING (Dari versi saya)
// ============================================
function initGuestbookForm() {
    const form = document.getElementById('guestbookForm');
    if (!form) return;
    
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        if (!validateGuestbookForm()) {
            return;
        }
        
        const formData = {
            nama: this.querySelector('#nama').value,
            whatsapp: this.querySelector('#whatsapp').value,
            email: this.querySelector('#email').value,
            alamat: this.querySelector('#alamat').value,
            info_tambahan: this.querySelector('#info').value
        };
        
        // Show loading
        const submitBtn = this.querySelector('.btn-submit');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mengirim...';
        submitBtn.disabled = true;
        
        try {
            // Coba kirim ke Google Sheets
            if (typeof submitToGoogleSheets === 'function') {
                const result = await submitToGoogleSheets(formData);
                
                if (result.success) {
                    showNotification(`✅ ${result.message} Kupon: ${result.couponCode}`, 'success');
                    this.reset();
                } else {
                    showNotification(`⚠️ ${result.message} Data disimpan lokal.`, 'warning');
                    saveToLocalStorage(formData);
                }
            } else {
                // Fallback ke localStorage
                saveToLocalStorage(formData);
                showNotification('🎉 Terima kasih! Data Anda telah direkam.', 'success');
                this.reset();
            }
            
        } catch (error) {
            console.error('Form submission error:', error);
            showNotification('⚠️ Terjadi kesalahan. Data disimpan lokal.', 'error');
            saveToLocalStorage(formData);
        } finally {
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    });
}

function validateGuestbookForm() {
    const form = document.getElementById('guestbookForm');
    if (!form) return false;
    
    const nama = form.querySelector('#nama');
    const whatsapp = form.querySelector('#whatsapp');
    
    // Validasi sederhana
    if (!nama.value.trim()) {
        showNotification('Harap isi nama lengkap', 'error');
        nama.focus();
        return false;
    }
    
    if (!whatsapp.value.trim()) {
        showNotification('Harap isi nomor WhatsApp', 'error');
        whatsapp.focus();
        return false;
    }
    
    // Validasi nomor WhatsApp
    const phoneRegex = /^[0-9]{10,13}$/;
    const cleanPhone = whatsapp.value.replace(/[^0-9]/g, '');
    
    if (!phoneRegex.test(cleanPhone)) {
        showNotification('Format nomor WhatsApp tidak valid (10-13 digit)', 'error');
        whatsapp.focus();
        return false;
    }
    
    return true;
}

function saveToLocalStorage(formData) {
    try {
        const existingData = JSON.parse(localStorage.getItem('amart_guestbook') || '[]');
        const newEntry = {
            ...formData,
            id: Date.now(),
            timestamp: new Date().toISOString()
        };
        
        existingData.push(newEntry);
        localStorage.setItem('amart_guestbook', JSON.stringify(existingData));
        
        // Kirim notifikasi WhatsApp
        sendWhatsAppNotification(formData);
        
        return true;
    } catch (error) {
        console.error('Error saving to localStorage:', error);
        return false;
    }
}

function sendWhatsAppNotification(formData) {
    const couponCode = generateCouponCode(formData.nama);
    const message = `Halo ${formData.nama}! Terima kasih telah mengisi buku tamu A-Mart Katapang.\n\nKupon diskon Anda: ${couponCode}\nDapatkan diskon Promonya untuk pembelian pertama!\n\nSalam,\nA-Mart Katapang`;
    
    const whatsappUrl = `https://wa.me/${formData.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
    return couponCode;
}

function generateCouponCode(name) {
    const prefix = 'AMART';
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const initials = name.split(' ').map(n => n[0]).join('').toUpperCase();
    return `${prefix}${randomNum}${initials}`;
}

// ============================================
// 5. FUNGSI DARI JS ANDA (Dimodifikasi agar compatible)
// ============================================
function initMobileMenu() {
    // Modifikasi: Hanya aktifkan jika benar-benar diperlukan
    if (window.innerWidth <= 768) {
        const mainNav = document.querySelector('.main-nav ul');
        if (mainNav && !document.querySelector('.menu-toggle')) {
            // Kode mobile menu dari JS Anda
            const nav = document.querySelector('.main-nav');
            const toggleBtn = document.createElement('button');
            toggleBtn.className = 'menu-toggle';
            toggleBtn.innerHTML = '☰ Menu';
            toggleBtn.setAttribute('aria-label', 'Toggle navigation menu');
            
            nav.insertBefore(toggleBtn, nav.firstChild);
            
            mainNav.style.display = 'none';
            mainNav.classList.add('mobile-menu');
            
            toggleBtn.addEventListener('click', function() {
                if (mainNav.style.display === 'block') {
                    mainNav.style.display = 'none';
                    toggleBtn.innerHTML = '☰ Menu';
                    toggleBtn.classList.remove('active');
                } else {
                    mainNav.style.display = 'block';
                    toggleBtn.innerHTML = '✕ Tutup';
                    toggleBtn.classList.add('active');
                }
            });
        }
    }
}

function initFormValidation() {
    // Gunakan validasi khusus untuk guestbook
    // Validasi umum lainnya bisa tetap ada
    const forms = document.querySelectorAll('form:not([novalidate]):not(#guestbookForm)');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            // Validasi form umum
            // (Kode dari JS Anda)
        });
    });
}

function initImageLazyLoad() {
    // Tetap gunakan, baik untuk performance
    const images = document.querySelectorAll('img[data-src]');
    // (Kode dari JS Anda)
}

function initScrollToTop() {
    // Tetap gunakan, UX yang bagus
    // (Kode dari JS Anda)
}

function initSmoothScroll() {
    // Tetap gunakan
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

function initAdvertisementSlots() {
    // Tetap gunakan untuk update promo
    const promoElements = document.querySelectorAll('.promo-date, .ad-placeholder');
    const today = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = today.toLocaleDateString('id-ID', options);
    
    promoElements.forEach(el => {
        if (el.textContent.includes('Minggu Ini') || el.textContent.includes('Promo')) {
            el.innerHTML = el.innerHTML.replace('Minggu Ini', formattedDate);
        }
    });
}

// ============================================
// 6. NOTIFICATION SYSTEM (Gabungan)
// ============================================
function showNotification(message, type = 'info') {
    // Gunakan versi yang lebih sederhana
    const notification = document.createElement('div');
    notification.className = `site-notification ${type}`;
    notification.textContent = message;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        background: ${type === 'error' ? '#e74c3c' : type === 'success' ? '#2a9d8f' : '#3498db'};
        color: white;
        border-radius: 5px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        animation: slideIn 0.3s ease;
        max-width: 300px;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// ============================================
// 7. UTILITY FUNCTIONS (Gabungan)
// ============================================
function formatRupiah(angka) {
    return 'Rp ' + angka.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

function formatTanggal(date) {
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    return new Date(date).toLocaleDateString('id-ID', options);
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ============================================
// 8. GLOBAL OBJECT
// ============================================
window.AMartUtils = {
    formatRupiah,
    formatTanggal,
    showNotification,
    debounce,
    buyProduct,
    generateCouponCode
};
