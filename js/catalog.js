/* catalog.css - CSS khusus untuk halaman katalog */

/* ==================== */
/* CATALOG CONTAINER */
/* ==================== */
.catalog-container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 1rem;
    position: relative;
}

.page-title {
    color: var(--color-primary);
    text-align: center;
    margin-bottom: 0.5rem;
    font-size: 2.2rem;
}

.page-subtitle {
    text-align: center;
    color: var(--color-neutral);
    margin-bottom: 2rem;
    font-size: 1.1rem;
}

/* ==================== */
/* FILTER SECTION */
/* ==================== */
.filter-section {
    display: flex;
    justify-content: center;
    gap: 12px;
    margin: 2rem 0;
    flex-wrap: wrap;
    padding: 0 10px;
}

.filter-btn {
    padding: 10px 24px;
    border: 2px solid var(--color-primary);
    background: white;
    color: var(--color-primary);
    border-radius: 25px;
    cursor: pointer;
    transition: all 0.3s;
    font-size: 0.95rem;
    white-space: nowrap;
    font-weight: 600;
}

.filter-btn.active,
.filter-btn:hover {
    background: var(--color-primary);
    color: white;
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
}

/* ==================== */
/* MOBILE CART TOGGLE */
/* ==================== */
.mobile-cart-toggle {
    display: none;
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: var(--color-primary);
    color: white;
    border: none;
    padding: 12px 24px;
    border-radius: 50px;
    box-shadow: var(--shadow-lg);
    z-index: 999;
    cursor: pointer;
    font-weight: bold;
    transition: all 0.3s;
}

.mobile-cart-toggle:hover {
    transform: translateY(-3px);
    box-shadow: var(--shadow-xl);
}

.cart-badge {
    background: var(--color-accent);
    color: white;
    border-radius: 50%;
    padding: 2px 8px;
    font-size: 0.85rem;
    margin-left: 8px;
    animation: pulse 2s infinite;
}

@keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.1); }
    100% { transform: scale(1); }
}

/* ==================== */
/* CATALOG GRID */
/* ==================== */
.catalog-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1.8rem;
    margin-top: 2rem;
    padding: 0 10px;
}

.product-card {
    background: var(--color-white);
    border-radius: 15px;
    padding: 1.3rem;
    box-shadow: var(--shadow-md);
    transition: all 0.3s var(--transition-normal);
    text-align: center;
    display: flex;
    flex-direction: column;
    border: 1px solid rgba(42, 157, 143, 0.1);
    position: relative;
    overflow: hidden;
}

.product-card:hover {
    transform: translateY(-8px);
    box-shadow: var(--shadow-lg);
    border-color: var(--color-primary-light);
}

.product-image {
    position: relative;
    margin-bottom: 1.2rem;
    overflow: hidden;
    border-radius: 12px;
    height: 220px;
    background: linear-gradient(135deg, var(--color-primary-soft), var(--color-secondary-soft));
}

.product-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.6s var(--transition-slow);
}

.product-card:hover .product-image img {
    transform: scale(1.08);
}

.product-badge {
    position: absolute;
    top: 12px;
    right: 12px;
    background: var(--color-accent);
    color: white;
    padding: 5px 12px;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: bold;
    z-index: 2;
}

.product-badge.promo {
    background: var(--color-primary);
}

.product-badge.new {
    background: var(--color-secondary);
}

.product-card h3 {
    margin: 0.8rem 0 0.5rem;
    color: var(--color-secondary);
    font-size: 1.2rem;
    flex-grow: 1;
    line-height: 1.4;
}

.product-card .price {
    color: var(--color-accent);
    font-weight: 800;
    font-size: 1.4rem;
    margin: 0.5rem 0;
}

.price-old {
    color: var(--color-neutral-light);
    text-decoration: line-through;
    font-size: 0.95rem;
    margin-right: 10px;
}

.product-card .unit {
    color: var(--color-neutral);
    font-size: 0.95rem;
    margin: 8px 0;
    font-style: italic;
}

.add-to-cart {
    background: var(--color-primary);
    color: white;
    border: none;
    padding: 14px;
    border-radius: 10px;
    cursor: pointer;
    width: 100%;
    margin-top: auto;
    font-weight: bold;
    transition: all 0.3s;
    font-size: 1rem;
    position: relative;
    overflow: hidden;
}

.add-to-cart:hover {
    background: var(--color-primary-dark);
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(42, 157, 143, 0.3);
}

.add-to-cart.added {
    background: var(--color-success);
    animation: bounce 0.5s;
}

@keyframes bounce {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(0.95); }
}

/* ==================== */
/* CART SIDEBAR */
/* ==================== */
.cart-sidebar {
    position: fixed;
    top: 0;
    right: -400px;
    width: 380px;
    height: 100vh;
    background: var(--color-white);
    padding: 1.8rem;
    box-shadow: -5px 0 30px rgba(0,0,0,0.15);
    z-index: 1100;
    transition: right 0.4s var(--transition-slow);
    overflow-y: auto;
    display: flex;
    flex-direction: column;
}

.cart-sidebar.active {
    right: 0;
}

.cart-overlay {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.5);
    z-index: 1099;
}

.cart-overlay.active {
    display: block;
}

.cart-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.8rem;
    padding-bottom: 1.2rem;
    border-bottom: 3px solid var(--color-primary);
}

.cart-header h3 {
    color: var(--color-secondary);
    margin: 0;
    font-size: 1.5rem;
}

.close-cart {
    background: none;
    border: none;
    font-size: 2.2rem;
    color: var(--color-neutral-light);
    cursor: pointer;
    line-height: 1;
    padding: 0;
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: color 0.3s;
}

.close-cart:hover {
    color: var(--color-accent);
}

#cart-items {
    flex-grow: 1;
    overflow-y: auto;
    margin-bottom: 1.5rem;
    max-height: 50vh;
}

.cart-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 14px 0;
    border-bottom: 1px solid rgba(0,0,0,0.08);
    animation: slideInRight 0.3s var(--transition-normal);
}

@keyframes slideInRight {
    from { 
        opacity: 0; 
        transform: translateX(-20px); 
    }
    to { 
        opacity: 1; 
        transform: translateX(0); 
    }
}

.cart-item-info {
    flex-grow: 1;
}

.cart-item-name {
    font-weight: 600;
    color: var(--color-secondary);
}

.cart-item-details {
    font-size: 0.9rem;
    color: var(--color-neutral);
    margin-top: 4px;
}

.cart-item-actions {
    display: flex;
    align-items: center;
    gap: 10px;
}

.quantity-btn {
    background: var(--color-primary-soft);
    border: none;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    cursor: pointer;
    font-size: 1.2rem;
    color: var(--color-primary);
    display: flex;
    align-items: center;
    justify-content: center;
}

.remove-item {
    background: var(--color-error);
    color: white;
    border: none;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    cursor: pointer;
    font-size: 1.2rem;
    display: flex;
    align-items: center;
    justify-content: center;
}

.cart-total {
    background: var(--color-primary-soft);
    padding: 18px;
    border-radius: 12px;
    margin: 1.5rem 0;
    text-align: center;
    border: 2px solid var(--color-primary);
}

.cart-total p {
    font-size: 1.3rem;
    font-weight: bold;
    color: var(--color-secondary);
    margin: 0;
}

.checkout-btn, .clear-btn {
    padding: 16px;
    width: 100%;
    border: none;
    border-radius: 12px;
    font-weight: bold;
    font-size: 1.1rem;
    cursor: pointer;
    transition: all 0.3s;
    margin-top: 12px;
}

.checkout-btn {
    background: var(--gradient-primary);
    color: white;
    position: relative;
    overflow: hidden;
}

.checkout-btn:hover:not(:disabled) {
    transform: translateY(-3px);
    box-shadow: var(--shadow-lg);
}

.checkout-btn:disabled {
    background: #ccc;
    cursor: not-allowed;
    transform: none !important;
    box-shadow: none !important;
}

.clear-btn {
    background: var(--color-accent);
    color: white;
}

.clear-btn:hover {
    background: var(--color-accent-dark);
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(231, 111, 81, 0.3);
}

/* ==================== */
/* LOAD MORE SECTION */
/* ==================== */
.load-more-section {
    text-align: center;
    margin: 4rem 0 2rem;
}

.load-more-btn {
    background: var(--gradient-primary);
    color: white;
    border: none;
    padding: 16px 36px;
    border-radius: 50px;
    font-size: 1.1rem;
    cursor: pointer;
    transition: all 0.3s;
    box-shadow: var(--shadow-md);
    font-weight: 600;
}

.load-more-btn:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-lg);
    background: var(--gradient-primary);
}

/* ==================== */
/* EMPTY STATE */
/* ==================== */
.empty-state {
    text-align: center;
    padding: 3rem 1rem;
    color: var(--color-neutral);
}

.empty-state-icon {
    font-size: 4rem;
    margin-bottom: 1rem;
    color: var(--color-primary-light);
}

/* ==================== */
/* RESPONSIVE STYLES */
/* ==================== */

/* TABLET (1024px ke bawah) */
@media (max-width: 1024px) {
    .catalog-grid {
        grid-template-columns: repeat(3, 1fr);
        gap: 1.5rem;
    }
    
    .cart-sidebar {
        width: 350px;
    }
    
    .page-title {
        font-size: 2rem;
    }
}

/* TABLET KECIL (768px ke bawah) */
@media (max-width: 768px) {
    .catalog-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 1.2rem;
    }
    
    .cart-sidebar {
        width: 100%;
        right: -100%;
        padding: 1.5rem;
    }
    
    .filter-section {
        justify-content: flex-start;
        overflow-x: auto;
        padding-bottom: 12px;
        margin: 1.5rem -10px;
        padding: 0 10px;
        -webkit-overflow-scrolling: touch;
    }
    
    .filter-btn {
        flex-shrink: 0;
        padding: 9px 20px;
    }
    
    .mobile-cart-toggle {
        display: block;
    }
    
    .page-title {
        font-size: 1.8rem;
    }
    
    .page-subtitle {
        font-size: 1rem;
    }
}

/* MOBILE (480px ke bawah) */
@media (max-width: 480px) {
    .catalog-grid {
        grid-template-columns: 1fr;
        gap: 1rem;
        padding: 0 5px;
    }
    
    .catalog-container {
        padding: 0.8rem;
    }
    
    .page-title {
        font-size: 1.6rem;
    }
    
    .product-card {
        padding: 1.2rem;
    }
    
    .product-image {
        height: 200px;
    }
    
    .mobile-cart-toggle {
        bottom: 15px;
        right: 15px;
        padding: 10px 20px;
        font-size: 0.95rem;
    }
    
    .cart-sidebar {
        padding: 1.2rem;
    }
}

/* MOBILE SANGAT KECIL (360px ke bawah) */
@media (max-width: 360px) {
    .catalog-grid {
        grid-template-columns: 1fr;
    }
    
    .filter-section {
        gap: 8px;
    }
    
    .filter-btn {
        padding: 8px 16px;
        font-size: 0.9rem;
    }
    
    .product-card h3 {
        font-size: 1.1rem;
    }
    
    .product-card .price {
        font-size: 1.2rem;
    }
}

/* LANDSCAPE MODE */
@media (max-height: 600px) and (orientation: landscape) {
    .cart-sidebar {
        height: 90vh;
        top: 10vh;
    }
    
    #cart-items {
        max-height: 40vh;
    }
}

/* DARK MODE SUPPORT */
@media (prefers-color-scheme: dark) {
    .product-card {
        background: var(--color-secondary-dark);
        border-color: #444;
    }
    
    .product-card h3 {
        color: #f0f0f0;
    }
    
    .filter-btn {
        background: #333;
        color: #f0f0f0;
        border-color: var(--color-primary);
    }
    
    .filter-btn.active {
        background: var(--color-primary);
    }
    
    .cart-sidebar {
        background: #2d2d2d;
        color: #f0f0f0;
    }
    
    .cart-total {
        background: #3d3d3d;
        color: #f0f0f0;
    }
}
