// Cart functionality for the Audiophile e-commerce site
class Cart {
    constructor() {
        this.items = this.loadFromStorage();
        this.shippingCost = 50;
        this.vatRate = 0.20;
        this.init();
    }

    init() {
        this.updateCartUI();
        this.bindEvents();
    }

    bindEvents() {
        // Cart button click
        const cartBtn = document.getElementById('cartBtn');
        if (cartBtn) {
            cartBtn.addEventListener('click', () => this.toggleCart());
        }

        // Cart modal overlay click
        const cartModalOverlay = document.getElementById('cartModalOverlay');
        if (cartModalOverlay) {
            cartModalOverlay.addEventListener('click', (e) => {
                if (e.target === cartModalOverlay) {
                    this.closeCart();
                }
            });
        }

        // Remove all button
        const removeAllBtn = document.getElementById('removeAllBtn');
        if (removeAllBtn) {
            removeAllBtn.addEventListener('click', () => this.removeAllItems());
        }

        // Checkout button
        const checkoutBtn = document.getElementById('checkoutBtn');
        if (checkoutBtn) {
            checkoutBtn.addEventListener('click', () => this.checkout());
        }
    }

    addItem(productId, quantity = 1) {
        const product = products.find(p => p.id === productId);
        if (!product) return;

        const existingItem = this.items.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.items.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: quantity
            });
        }

        this.saveToStorage();
        this.updateCartUI();
        this.showCartAddedFeedback();
    }

    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.saveToStorage();
        this.updateCartUI();
    }

    updateQuantity(productId, quantity) {
        const item = this.items.find(item => item.id === productId);
        if (item) {
            if (quantity <= 0) {
                this.removeItem(productId);
            } else {
                item.quantity = quantity;
                this.saveToStorage();
                this.updateCartUI();
            }
        }
    }

    removeAllItems() {
        this.items = [];
        this.saveToStorage();
        this.updateCartUI();
    }

    getTotal() {
        return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    getVAT() {
        return this.getTotal() * this.vatRate;
    }

    getGrandTotal() {
        return this.getTotal() + this.shippingCost + this.getVAT();
    }

    getItemCount() {
        return this.items.reduce((count, item) => count + item.quantity, 0);
    }

    updateCartUI() {
        this.updateCartCount();
        this.updateCartModal();
    }

    updateCartCount() {
        const cartCount = document.getElementById('cartCount');
        const cartItemCount = document.getElementById('cartItemCount');
        const count = this.getItemCount();

        if (cartCount) {
            cartCount.textContent = count;
            cartCount.classList.toggle('hidden', count === 0);
        }

        if (cartItemCount) {
            cartItemCount.textContent = count;
        }
    }

    updateCartModal() {
        const cartItems = document.getElementById('cartItems');
        const cartTotal = document.getElementById('cartTotal');
        const checkoutBtn = document.getElementById('checkoutBtn');
        const removeAllBtn = document.getElementById('removeAllBtn');

        if (!cartItems) return;

        // Clear existing items
        cartItems.innerHTML = '';

        if (this.items.length === 0) {
            cartItems.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
            if (checkoutBtn) checkoutBtn.disabled = true;
            if (removeAllBtn) removeAllBtn.style.display = 'none';
        } else {
            if (checkoutBtn) checkoutBtn.disabled = false;
            if (removeAllBtn) removeAllBtn.style.display = 'block';

            this.items.forEach(item => {
                const cartItem = this.createCartItemElement(item);
                cartItems.appendChild(cartItem);
            });
        }

        // Update total
        if (cartTotal) {
            cartTotal.textContent = formatPrice(this.getTotal());
        }
    }

    createCartItemElement(item) {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item-image">
                <img src="${item.image.mobile}" alt="${item.name}">
            </div>
            <div class="cart-item-details">
                <div class="cart-item-name">${item.name.replace(/ (Headphones|Speaker|Earphones)$/, '')}</div>
                <div class="cart-item-price">${formatPrice(item.price)}</div>
            </div>
            <div class="quantity-controls">
                <button class="quantity-btn" data-action="decrease" data-id="${item.id}">-</button>
                <span class="quantity-display">${item.quantity}</span>
                <button class="quantity-btn" data-action="increase" data-id="${item.id}">+</button>
            </div>
        `;

        // Add event listeners for quantity controls
        const decreaseBtn = cartItem.querySelector('[data-action="decrease"]');
        const increaseBtn = cartItem.querySelector('[data-action="increase"]');

        decreaseBtn.addEventListener('click', () => {
            this.updateQuantity(item.id, item.quantity - 1);
        });

        increaseBtn.addEventListener('click', () => {
            this.updateQuantity(item.id, item.quantity + 1);
        });

        return cartItem;
    }

    toggleCart() {
        const cartModalOverlay = document.getElementById('cartModalOverlay');
        if (cartModalOverlay) {
            cartModalOverlay.classList.toggle('active');
        }
    }

    openCart() {
        const cartModalOverlay = document.getElementById('cartModalOverlay');
        if (cartModalOverlay) {
            cartModalOverlay.classList.add('active');
        }
    }

    closeCart() {
        const cartModalOverlay = document.getElementById('cartModalOverlay');
        if (cartModalOverlay) {
            cartModalOverlay.classList.remove('active');
        }
    }

    showCartAddedFeedback() {
        // Show a brief feedback when item is added
        this.openCart();
        setTimeout(() => {
            // Could add a toast notification here
        }, 100);
    }

    checkout() {
        if (this.items.length === 0) return;
        
        // Redirect to checkout page
        window.location.href = 'checkout.html';
    }

    saveToStorage() {
        localStorage.setItem('audiophile-cart', JSON.stringify(this.items));
    }

    loadFromStorage() {
        const stored = localStorage.getItem('audiophile-cart');
        return stored ? JSON.parse(stored) : [];
    }

    // Get order summary for checkout
    getOrderSummary() {
        return {
            items: this.items,
            subtotal: this.getTotal(),
            shipping: this.shippingCost,
            vat: this.getVAT(),
            total: this.getGrandTotal()
        };
    }

    // Clear cart after successful order
    clearCart() {
        this.items = [];
        this.saveToStorage();
        this.updateCartUI();
    }
}

// Initialize cart when DOM is loaded
let cart;
document.addEventListener('DOMContentLoaded', () => {
    cart = new Cart();
}); 