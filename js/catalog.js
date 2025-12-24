// Di file JS utama atau catalog.js
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mainNav = document.getElementById('mainNav');
    const navOverlay = document.getElementById('navOverlay');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            navOverlay.classList.toggle('active');
            this.classList.toggle('active');
            document.body.style.overflow = mainNav.classList.contains('active') ? 'hidden' : '';
        });
    }
    
    if (navOverlay) {
        navOverlay.addEventListener('click', function() {
            mainNav.classList.remove('active');
            this.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
    
    // Close menu on link click
    document.querySelectorAll('.main-nav a').forEach(link => {
        link.addEventListener('click', function() {
            mainNav.classList.remove('active');
            navOverlay.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
});
