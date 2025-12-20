// Di dalam class EnhancedCart, tambahkan method:
refreshProducts() {
    this.loadProducts();
}

// Dan update method filterProducts() untuk mengintegrasikan dengan search:
filterProducts() {
    const category = document.getElementById('category').value;
    const sort = document.getElementById('sort').value;
    const maxPrice = parseInt(document.getElementById('price-range').value);
    const searchQuery = document.getElementById('productSearch')?.value.trim();
    
    let filtered = [...products];
    
    // Apply search if exists
    if (searchQuery && searchQuery.length > 0) {
        filtered = filtered.filter(product => {
            return product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                   product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                   product.category.toLowerCase().includes(searchQuery.toLowerCase());
        });
    }
    
    // Filter by category
    if (category !== 'all') {
        filtered = filtered.filter(product => product.category === category);
    }
    
    // Filter by price
    filtered = filtered.filter(product => {
        const price = this.priceType === 'pcs' ? product.pricePcs : product.priceKilo;
        return price && price <= maxPrice;
    });
    
    // Sort products
    filtered.sort((a, b) => {
        const priceA = this.priceType === 'pcs' ? a.pricePcs : a.priceKilo;
        const priceB = this.priceType === 'pcs' ? b.pricePcs : b.priceKilo;
        
        switch (sort) {
            case 'newest':
                return b.id - a.id;
            case 'price-low':
                return (priceA || 0) - (priceB || 0);
            case 'price-high':
                return (priceB || 0) - (priceA || 0);
            case 'popular':
            default:
                return (b.popular ? 1 : 0) - (a.popular ? 1 : 0);
        }
    });
    
    // Update display
    this.displayFilteredProducts(filtered);
}

displayFilteredProducts(filteredProducts) {
    const catalogGrid = document.getElementById('productsCatalog');
    if (!catalogGrid) return;
    
    catalogGrid.innerHTML = filteredProducts.map(product => this.createProductCard(product)).join('');
    
    // Re-add click events
    document.querySelectorAll('.product-card-catalog').forEach(card => {
        card.addEventListener('click', (e) => {
            if (!e.target.closest('.price-toggle-btn') && !e.target.closest('.btn-add-cart')) {
                const productId = parseInt(card.dataset.id);
                this.addToCart(productId);
            }
        });
    });
}
