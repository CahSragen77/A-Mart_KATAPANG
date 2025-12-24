// main.js - JavaScript umum untuk A-Mart Katapang
// File ini berisi fungsi yang digunakan di berbagai halaman

// ============================
// 1. INISIALISASI UMUM
// ============================
document.addEventListener('DOMContentLoaded', function() {
    console.log('A-Mart Katapang Website Loaded');
    
    // Panggil fungsi yang diperlukan
    initMobileMenu();
    initFormValidation();
    initImageLazyLoad();
    initScrollToTop();
    initSmoothScroll();
    initAdvertisementSlots();
    
    // Cek jika ada pesan sukses dari URL
    checkUrlForMessages();
});

// ============================
// 2. MOBILE MENU TOGGLE
// ============================
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav ul');
    
    // Jika belum ada toggle button, buat otomatis untuk mobile
    if (window.innerWidth <= 768 && !menuToggle) {
        const nav = document.querySelector('.main-nav');
        const toggleBtn = document.createElement('button');
        toggleBtn.className = 'menu-toggle';
        toggleBtn.innerHTML = '☰ Menu';
        toggleBtn.setAttribute('aria-label', 'Toggle navigation menu');
        
        nav.insertBefore(toggleBtn, nav.firstChild);
        
        // Sembunyikan menu awal di mobile
        if (mainNav) {
            mainNav.style.display = 'none';
            mainNav.classList.add('mobile-menu');
        }
        
        // Event listener untuk toggle
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
        
        // Auto-close menu saat klik link
        const navLinks = document.querySelectorAll('.main-nav a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    mainNav.style.display = 'none';
                    toggleBtn.innerHTML = '☰ Menu';
                    toggleBtn.classList.remove('active');
                }
            });
        });
        
        // Reset pada resize window
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                mainNav.style.display = '';
                toggleBtn.style.display = 'none';
            } else {
                mainNav.style.display = 'none';
                toggleBtn.style.display = 'block';
                toggleBtn.innerHTML = '☰ Menu';
                toggleBtn.classList.remove('active');
            }
        });
    }
}

// ============================
// 3. VALIDASI FORM UMUM
// ============================
function initFormValidation() {
    const forms = document.querySelectorAll('form:not([novalidate])');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            let isValid = true;
            const requiredFields = form.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    highlightError(field);
                } else {
                    removeError(field);
                }
                
                // Validasi khusus untuk email
                if (field.type === 'email') {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(field.value)) {
                        isValid = false;
                        highlightError(field, 'Format email tidak valid');
                    }
                }
                
                // Validasi khusus untuk telepon
                if (field.type === 'tel' || field.name.includes('phone')) {
                    const phoneRegex = /^[0-9+\-\s()]{10,15}$/;
                    if (!phoneRegex.test(field.value)) {
                        isValid = false;
                        highlightError(field, 'Nomor telepon tidak valid (10-15 digit)');
                    }
                }
            });
            
            if (!isValid) {
                e.preventDefault();
                showNotification('Harap isi semua bidang yang wajib diisi dengan format yang benar', 'error');
            }
        });
    });
}

function highlightError(field, message = 'Bidang ini wajib diisi') {
    field.style.borderColor = '#e74c3c';
    field.style.backgroundColor = '#fdf2f2';
    
    // Hapus pesan error sebelumnya
    removeError(field);
    
    // Tambah pesan error baru
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    errorDiv.style.color = '#e74c3c';
    errorDiv.style.fontSize = '0.8rem';
    errorDiv.style.marginTop = '5px';
    
    field.parentNode.appendChild(errorDiv);
}

function removeError(field) {
    const existingError = field.parentNode.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    field.style.borderColor = '';
    field.style.backgroundColor = '';
}

// ============================
// 4. LAZY LOAD IMAGES
// ============================
function initImageLazyLoad() {
    const images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback untuk browser lama
        images.forEach(img => {
            img.src = img.dataset.src;
        });
    }
}

// ============================
// 5. SCROLL TO TOP BUTTON
// ============================
function initScrollToTop() {
    // Buat tombol
    const scrollBtn = document.createElement('button');
    scrollBtn.id = 'scrollToTop';
    scrollBtn.innerHTML = '↑';
    scrollBtn.setAttribute('aria-label', 'Kembali ke atas');
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: #2a9d8f;
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 1.5rem;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.3s, visibility 0.3s;
        z-index: 999;
        box-shadow: 0 4px 12px rgba(42, 157, 143, 0.3);
    `;
    
    document.body.appendChild(scrollBtn);
    
    // Tampilkan/sembunyikan tombol
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollBtn.style.opacity = '1';
            scrollBtn.style.visibility = 'visible';
        } else {
            scrollBtn.style.opacity = '0';
            scrollBtn.style.visibility = 'hidden';
        }
    });
    
    // Fungsi scroll ke atas
    scrollBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ============================
// 6. SMOOTH SCROLL UNTUK LINK
// ============================
function initSmoothScroll() {
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
                
                // Update URL tanpa reload
                history.pushState(null, null, targetId);
            }
        });
    });
}

// ============================
// 7. IKLAN DAN PROMO SLOT
// ============================
function initAdvertisementSlots() {
    // Update tanggal promosi otomatis
    const promoElements = document.querySelectorAll('.promo-date, .ad-placeholder');
    const today = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = today.toLocaleDateString('id-ID', options);
    
    promoElements.forEach(el => {
        if (el.textContent.includes('Minggu Ini') || el.textContent.includes('Promo')) {
            el.innerHTML = el.innerHTML.replace('Minggu Ini', formattedDate);
        }
    });
    
    // Rotasi banner iklan (jika ada multiple banners)
    const adBanners = document.querySelectorAll('.ad-banner');
    if (adBanners.length > 1) {
        let currentAd = 0;
        
        setInterval(() => {
            adBanners.forEach((banner, index) => {
                banner.style.display = index === currentAd ? 'block' : 'none';
            });
            
            currentAd = (currentAd + 1) % adBanners.length;
        }, 5000); // Ganti iklan setiap 5 detik
    }
}

// ============================
// 8. NOTIFICATION SYSTEM
// ============================
function showNotification(message, type = 'info') {
    // Hapus notifikasi sebelumnya
    const oldNotification = document.querySelector('.site-notification');
    if (oldNotification) oldNotification.remove();
    
    // Buat notifikasi baru
    const notification = document.createElement('div');
    notification.className = `site-notification ${type}`;
    notification.textContent = message;
    
    // Styling notifikasi
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
    
    // Animasi
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
    `;
    document.head.appendChild(styleSheet);
    
    document.body.appendChild(notification);
    
    // Auto-hide setelah 5 detik
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease forwards';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// ============================
// 9. URL MESSAGE CHECKER
// ============================
function checkUrlForMessages() {
    const urlParams = new URLSearchParams(window.location.search);
    const message = urlParams.get('message');
    const type = urlParams.get('type');
    
    if (message) {
        showNotification(decodeURIComponent(message), type || 'info');
        
        // Hapus parameter dari URL tanpa reload
        const newUrl = window.location.pathname;
        window.history.replaceState({}, document.title, newUrl);
    }
}

// ============================
// 10. UTILITY FUNCTIONS
// ============================
// Format angka ke Rupiah
function formatRupiah(angka) {
    return 'Rp ' + angka.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

// Format tanggal Indonesia
function formatTanggal(date) {
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    return new Date(date).toLocaleDateString('id-ID', options);
}

// Debounce function untuk optimize event listeners
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

// ============================
// 11. EVENT LISTENERS GLOBAL
// ============================
// Optimize resize dengan debounce
window.addEventListener('resize', debounce(function() {
    // Re-initialize mobile menu jika diperlukan
    if (window.innerWidth <= 768) {
        initMobileMenu();
    }
}, 250));

// Klik di luar untuk close mobile menu
document.addEventListener('click', function(e) {
    const mobileMenu = document.querySelector('.mobile-menu');
    const menuToggle = document.querySelector('.menu-toggle');
    
    if (mobileMenu && menuToggle && 
        window.innerWidth <= 768 &&
        !mobileMenu.contains(e.target) && 
        !menuToggle.contains(e.target) &&
        mobileMenu.style.display === 'block') {
        
        mobileMenu.style.display = 'none';
        menuToggle.innerHTML = '☰ Menu';
        menuToggle.classList.remove('active');
    }
});

// ============================
// 12. EKSPOR FUNGSI (jika diperlukan)
// ============================
// Agar bisa diakses dari file JS lain atau console
window.AMartUtils = {
    formatRupiah,
    formatTanggal,
    showNotification,
    debounce
};

console.log('main.js loaded successfully');
