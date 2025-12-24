let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(name, price, type) {
    let item = cart.find(i => i.name === name && i.type === type);
    if (item) {
        item.quantity++;
    } else {
        cart.push({ name, price, type, quantity: 1 });
    }
    updateCartDisplay();
    saveCart();
}

function updateCartDisplay() {
    let count = cart.reduce((sum, item) => sum + item.quantity, 0);
    let total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    document.getElementById('cartCount').textContent = count;
    document.getElementById('cartTotal').textContent = total.toLocaleString();
    
    let cartItemsHTML = '';
    cart.forEach((item, index) => {
        cartItemsHTML += `
            <div class="cart-item">
                <span>${item.name} (${item.type})</span>
                <span>${item.quantity} x Rp ${item.price.toLocaleString()}</span>
                <button onclick="removeFromCart(${index})">❌</button>
            </div>
        `;
    });
    document.getElementById('cartItems').innerHTML = cartItemsHTML;
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartDisplay();
    saveCart();
}

function clearCart() {
    cart = [];
    updateCartDisplay();
    saveCart();
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function checkout() {
    let message = "Halo A-Mart, saya ingin order:\n";
    cart.forEach(item => {
        message += `- ${item.name} (${item.type}) x${item.quantity} = Rp ${(item.price * item.quantity).toLocaleString()}\n`;
    });
    message += `Total: Rp ${cart.reduce((sum, item) => sum + (item.price * item.quantity), 0).toLocaleString()}`;
    window.open(`https://wa.me/6281234567890?text=${encodeURIComponent(message)}`);
}

// Inisialisasi
updateCartDisplay();
