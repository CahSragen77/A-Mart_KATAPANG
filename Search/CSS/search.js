// Search System Class
class ProductSearch {
    constructor(cartInstance) {
        this.cart = cartInstance;
        this.searchInput = document.getElementById('productSearch');
        this.clearSearchBtn = document.getElementById('clearSearch');
        this.searchSuggestions = document.getElementById('searchSuggestions');
        this.recentSearches = JSON.parse(localStorage.getItem('recentSearches')) || [];
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.displayRecentSearches();
        this.setupAdvancedSearch();
    }

    setupEventListeners() {
        // Search input events
        if (this.searchInput) {
            this.searchInput.addEventListener('input', (e) => {
                this.handleSearchInput(e.target.value);
            });

            this.searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.performSearch(this.searchInput.value);
                }
            });

            this.searchInput.addEventListener('focus', () => {
                if (this.searchInput.value) {
                    this.showSuggestions(this.searchInput.value);
                }
            });
        }

        // Clear search button
        if (this.clearSearchBtn) {
            this.clearSearchBtn.addEventListener('click', () => {
                this.clearSearch();
            });
        }

        // Close suggestions when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.search-wrapper') && !e.target.closest('.search-suggestions')) {
                this.hideSuggestions();
            }
        });
    }

    handleSearchInput(query) {
        const trimmedQuery = query.trim();
        
        // Show/hide clear button
        if (this.clearSearchBtn) {
            this.clearSearchBtn.style.display = trimmedQuery ? 'block' : 'none';
        }

        // Show suggestions
        if (trimmedQuery.length > 0) {
            this.showSuggestions(trimmedQuery);
        } else {
            this.hideSuggestions();
        }
    }

    showSuggestions(query) {
        if (!this.searchSuggestions) return;

        const suggestions = this.getSuggestions(query);
        
        if (suggestions.length > 0) {
            this.searchSuggestions.innerHTML = suggestions.map(product => `
                <div class="search-suggestion-item" data-id="${product.id}">
                    <img src="${product.image}" alt="${product.name}">
                    <div class="suggestion-info">
                        <div class="suggestion-name">${this.highlightMatch(product.name, query)}</div>
                        <div class="suggestion-category">${product.category.toUpperCase()}</div>
                    </div>
                    <div class="suggestion-price">
                        Rp ${product.pricePcs ? product.pricePcs.toLocaleString('id-ID') : '-'}
                    </div>
                </div>
            `).join('');

            // Add click events to suggestions
            this.searchSuggestions.querySelectorAll('.search-suggestion-item').forEach(item => {
                item.addEventListener('click', () => {
                    const productId = parseInt(item.dataset.id);
                    this.selectProductFromSuggestion(productId);
                });
            });

            this.searchSuggestions.style.display = 'block';
        } else {
            this.searchSuggestions.innerHTML = `
                <div class="search-suggestion-item">
                    <i class="fas fa-search"></i>
                    <div class="suggestion-info">
                        <div class="suggestion-name">Tidak ditemukan produk "${query}"</div>
                        <div class="suggestion-category">Coba kata kunci lain</div>
                    </div>
                </div>
            `;
            this.searchSuggestions.style.display = 'block';
        }
    }

    hideSuggestions() {
        if (this.searchSuggestions) {
            this.searchSuggestions.style.display = 'none';
        }
    }

    getSuggestions(query) {
        const searchInName = document.getElementById('searchInName')?.checked ?? true;
        const searchInDesc = document.getElementById('searchInDesc')?.checked ?? false;
        const searchInCategory = document.getElementById('searchInCategory')?.checked ?? false;

        return products.filter(product => {
            let matches = false;
            
            if (searchInName) {
                matches = matches || product.name.toLowerCase().includes(query.toLowerCase());
            }
            
            if (searchInDesc && !matches) {
                matches = product.description.toLowerCase().includes(query.toLowerCase());
            }
            
            if (searchInCategory && !matches) {
                matches = product.category.toLowerCase().includes(query.toLowerCase());
            }
            
            return matches;
        }).slice(0, 5); // Limit to 5 suggestions
    }

    highlightMatch(text, query) {
        if (!query) return text;
        
        const regex = new RegExp(`(${query})`, 'gi');
        return text.replace(regex, '<span class="search-highlight">$1</span>');
    }

    selectProductFromSuggestion(productId) {
        const product = products.find(p => p.id === productId);
        if (product) {
            this.searchInput.value = product.name;
            this.performSearch(product.name);
            this.hideSuggestions();
        }
    }

    performSearch(query) {
        const trimmedQuery = query.trim();
        
        if (!trimmedQuery) {
            this.clearSearch();
            return;
        }

        // Save to recent searches
        this.saveToRecentSearches(trimmedQuery);

        // Get search filters
        const searchInName = document.getElementById('searchInName')?.checked ?? true;
        const searchInDesc = document.getElementById('searchInDesc')?.checked ?? false;
        const searchInCategory = document.getElementById('searchInCategory')?.checked ?? false;
        
        // Get price filters
        const minPrice = document.getElementById('minPrice')?.value || 0;
        const maxPrice = document.getElementById('maxPrice')?.value || Infinity;

        // Perform search
        const results = this.searchProducts(trimmedQuery, {
            searchInName,
            searchInDesc,
            searchInCategory,
            minPrice: parseInt(minPrice),
            maxPrice: parseInt(maxPrice) || Infinity
        });

        // Display results
        this.displaySearchResults(results, trimmedQuery);

        // Hide suggestions
        this.hideSuggestions();
    }

    searchProducts(query, options = {}) {
        const {
            searchInName = true,
            searchInDesc = false,
            searchInCategory = false,
            minPrice = 0,
            maxPrice = Infinity
        } = options;

        const lowerQuery = query.toLowerCase();

        return products.filter(product => {
            // Check if matches search criteria
            let matches = false;
            
            if (searchInName) {
                matches = matches || product.name.toLowerCase().includes(lowerQuery);
            }
            
            if (searchInDesc && !matches) {
                matches = product.description.toLowerCase().includes(lowerQuery);
            }
            
            if (searchInCategory && !matches) {
                matches = product.category.toLowerCase().includes(lowerQuery);
            }

            // Check price range
            if (matches) {
                const price = this.cart.priceType === 'pcs' ? product.pricePcs : product.priceKilo;
                if (price) {
                    matches = price >= minPrice && price <= maxPrice;
                } else {
                    matches = false;
                }
            }

            return matches;
        });
    }

    displaySearchResults(results, query) {
        const catalogGrid = document.getElementById('productsCatalog');
        const catalogSection = document.querySelector('.catalog-section');
        
        if (!catalogGrid || !catalogSection) return;

        // Create results header
        const resultsHeader = `
            <div class="search-results-header">
                <h3>Hasil Pencarian: "${query}"</h3>
                <div class="search-results-count">
                    Ditemukan <strong>${results.length}</strong> produk
                </div>
            </div>
        `;

        if (results.length > 0) {
            // Display results
            catalogGrid.innerHTML = results.map(product => this.cart.createProductCard(product)).join('');
            
            // Add results header
            catalogGrid.insertAdjacentHTML('beforebegin', resultsHeader);
            
            // Re-add click events
            document.querySelectorAll('.product-card-catalog').forEach(card => {
                card.addEventListener('click', (e) => {
                    if (!e.target.closest('.price-toggle-btn') && !e.target.closest('.btn-add-cart')) {
                        const productId = parseInt(card.dataset.id);
                        this.cart.addToCart(productId);
                    }
                });
            });
        } else {
            // Display no results message
            catalogGrid.innerHTML = `
                <div class="no-results">
                    <i class="fas fa-search fa-3x"></i>
                    <h3>Tidak ditemukan produk "${query}"</h3>
                    <p>Coba gunakan kata kunci lain atau periksa ejaan</p>
                    <button class="btn-clear-search" id="clearSearchResults">
                        <i class="fas fa-times"></i> Hapus Pencarian
                    </button>
                </div>
            `;

            // Add clear search button event
            document.getElementById('clearSearchResults')?.addEventListener('click', () => {
                this.clearSearch();
            });
        }
    }

    clearSearch() {
        if (this.searchInput) {
            this.searchInput.value = '';
            this.searchInput.focus();
        }
        
        if (this.clearSearchBtn) {
            this.clearSearchBtn.style.display = 'none';
        }
        
        this.hideSuggestions();
        this.cart.loadProducts();
        
        // Remove search results header
        const resultsHeader = document.querySelector('.search-results-header');
        if (resultsHeader) {
            resultsHeader.remove();
        }
    }

    saveToRecentSearches(query) {
        // Remove if already exists
        this.recentSearches = this.recentSearches.filter(q => q.toLowerCase() !== query.toLowerCase());
        
        // Add to beginning
        this.recentSearches.unshift(query);
        
        // Keep only last 10 searches
        this.recentSearches = this.recentSearches.slice(0, 10);
        
        // Save to localStorage
        localStorage.setItem('recentSearches', JSON.stringify(this.recentSearches));
        
        // Update display
        this.displayRecentSearches();
    }

    displayRecentSearches() {
        const recentContainer = document.querySelector('.recent-searches');
        if (!recentContainer) return;

        if (this.recentSearches.length > 0) {
            recentContainer.innerHTML = `
                <h4><i class="fas fa-history"></i> Pencarian Terakhir</h4>
                <div class="recent-tags">
                    ${this.recentSearches.map(query => `
                        <div class="recent-tag">
                            <span onclick="productSearch.selectRecentSearch('${query}')">${query}</span>
                            <button class="remove-tag" onclick="productSearch.removeRecentSearch('${query}')">
                                <i class="fas fa-times"></i>
                            </button>
                        </div>
                    `).join('')}
                </div>
            `;
        } else {
            recentContainer.innerHTML = `
                <h4><i class="fas fa-history"></i> Pencarian Terakhir</h4>
                <p style="color: #7f8c8d; font-size: 0.9rem;">Belum ada pencarian terakhir</p>
            `;
        }
    }

    selectRecentSearch(query) {
        if (this.searchInput) {
            this.searchInput.value = query;
            this.performSearch(query);
        }
    }

    removeRecentSearch(query) {
        this.recentSearches = this.recentSearches.filter(q => q !== query);
        localStorage.setItem('recentSearches', JSON.stringify(this.recentSearches));
        this.displayRecentSearches();
    }

    setupAdvancedSearch() {
        const advancedSearchHeader = document.querySelector('.advanced-search-header');
        const advancedSearch = document.querySelector('.advanced-search');
        
        if (advancedSearchHeader && advancedSearch) {
            advancedSearchHeader.addEventListener('click', () => {
                advancedSearch.classList.toggle('open');
                
                const icon = advancedSearchHeader.querySelector('i');
                if (icon) {
                    icon.className = advancedSearch.classList.contains('open') 
                        ? 'fas fa-chevron-up' 
                        : 'fas fa-chevron-down';
                }
            });
        }

        // Price filter validation
        const minPriceInput = document.getElementById('minPrice');
        const maxPriceInput = document.getElementById('maxPrice');
        
        if (minPriceInput && maxPriceInput) {
            minPriceInput.addEventListener('change', () => {
                if (parseInt(minPriceInput.value) > parseInt(maxPriceInput.value)) {
                    maxPriceInput.value = minPriceInput.value;
                }
            });
            
            maxPriceInput.addEventListener('change', () => {
                if (parseInt(maxPriceInput.value) < parseInt(minPriceInput.value)) {
                    minPriceInput.value = maxPriceInput.value;
                }
            });
        }
    }

    // Method to search with complex criteria
    advancedSearchProducts(criteria) {
        return products.filter(product => {
            // Name search
            if (criteria.name && !product.name.toLowerCase().includes(criteria.name.toLowerCase())) {
                return false;
            }
            
            // Category filter
            if (criteria.category && criteria.category !== 'all' && product.category !== criteria.category) {
                return false;
            }
            
            // Price range
            const price = this.cart.priceType === 'pcs' ? product.pricePcs : product.priceKilo;
            if (price) {
                if (criteria.minPrice && price < criteria.minPrice) return false;
                if (criteria.maxPrice && price > criteria.maxPrice) return false;
            } else {
                return false;
            }
            
            // Popular filter
            if (criteria.onlyPopular && !product.popular) return false;
            
            return true;
        });
    }
}

// Export for global access
window.ProductSearch = ProductSearch;