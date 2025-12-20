// Update di main.js
document.addEventListener('DOMContentLoaded', function() {
    // Initialize existing functionality
    updateDateTime();
    setInterval(updateDateTime, 1000);
    
    initMobileMenu();
    initFormValidation();
    
    // Initialize enhanced cart
    window.enhancedCart = new EnhancedCart();
    
    // Initialize product search system
    window.productSearch = new ProductSearch(window.enhancedCart);
    
    // Add keyboard shortcut for search (Ctrl/Cmd + F)
    document.addEventListener('keydown', function(e) {
        if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
            e.preventDefault();
            const searchInput = document.getElementById('productSearch');
            if (searchInput) {
                searchInput.focus();
            }
        }
    });
});