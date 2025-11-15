// ========================================
// Advanced Features JavaScript
// ========================================

// Initialize all features
document.addEventListener('DOMContentLoaded', () => {
    initShoppingCart();
    initSearch();
    initFavorites();
    initDarkMode();
    initChefsSpecial();
    initCompareDishes();
    initQRCode();
    initVoiceSearch();
});

// ========================================
// Shopping Cart System
// ========================================

let cart = JSON.parse(localStorage.getItem('cart')) || [];

function initShoppingCart() {
    // Create cart icon in navbar
    const orderBtn = document.querySelector('.btn-order');
    if (orderBtn) {
        const cartIcon = document.createElement('button');
        cartIcon.className = 'search-icon-btn cart-icon-wrapper ms-3';
        cartIcon.innerHTML = `
            <i class="fas fa-shopping-cart"></i>
            <span class="cart-badge">${cart.length}</span>
        `;
        cartIcon.addEventListener('click', toggleCart);
        orderBtn.parentNode.insertBefore(cartIcon, orderBtn.nextSibling);
    }
    
    // Create cart sidebar
    const cartSidebar = document.createElement('div');
    cartSidebar.className = 'cart-sidebar';
    cartSidebar.innerHTML = `
        <div class="cart-header">
            <h3><i class="fas fa-shopping-cart"></i> My Cart</h3>
            <i class="fas fa-times cart-close"></i>
        </div>
        <div class="cart-items" id="cartItems"></div>
        <div class="cart-footer">
            <div class="cart-total">
                <span>Total:</span>
                <span id="cartTotal">₹0</span>
            </div>
            <button class="btn btn-primary w-100 mb-2" onclick="checkout()">
                <i class="fas fa-credit-card"></i> Proceed to Checkout
            </button>
            <button class="btn btn-outline-primary w-100" onclick="clearCart()">
                <i class="fas fa-trash"></i> Clear Cart
            </button>
        </div>
    `;
    document.body.appendChild(cartSidebar);
    
    document.querySelector('.cart-close').addEventListener('click', toggleCart);
    
    // Add to cart buttons to menu items
    document.querySelectorAll('.menu-card').forEach(card => {
        const addBtn = document.createElement('button');
        addBtn.className = 'add-to-cart-btn';
        addBtn.innerHTML = '<i class="fas fa-cart-plus"></i> Add to Cart';
        
        const name = card.querySelector('h4')?.textContent;
        const priceText = card.querySelector('.price')?.textContent;
        const price = priceText ? parseInt(priceText.replace('₹', '')) : 0;
        const image = card.querySelector('img')?.src;
        
        addBtn.addEventListener('click', () => {
            addToCart({ name, price, image });
            addBtn.classList.add('added');
            addBtn.innerHTML = '<i class="fas fa-check"></i> Added to Cart';
            setTimeout(() => {
                addBtn.classList.remove('added');
                addBtn.innerHTML = '<i class="fas fa-cart-plus"></i> Add to Cart';
            }, 2000);
        });
        
        card.querySelector('.menu-content').appendChild(addBtn);
    });
    
    renderCart();
}

function toggleCart() {
    document.querySelector('.cart-sidebar').classList.toggle('active');
}

function addToCart(item) {
    const existingItem = cart.find(i => i.name === item.name);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...item, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartBadge();
    renderCart();
    showToast(`${item.name} added to cart!`, 'success');
}

function removeFromCart(name) {
    cart = cart.filter(item => item.name !== name);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartBadge();
    renderCart();
    showToast('Item removed from cart', 'info');
}

function updateQuantity(name, change) {
    const item = cart.find(i => i.name === name);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(name);
        } else {
            localStorage.setItem('cart', JSON.stringify(cart));
            renderCart();
        }
    }
}

function renderCart() {
    const cartItems = document.getElementById('cartItems');
    if (!cartItems) return;
    
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="cart-empty">
                <i class="fas fa-shopping-cart"></i>
                <p>Your cart is empty</p>
            </div>
        `;
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-details">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">₹${item.price}</div>
                    <div class="cart-item-quantity">
                        <button class="qty-btn" onclick="updateQuantity('${item.name}', -1)">
                            <i class="fas fa-minus"></i>
                        </button>
                        <span class="qty-value">${item.quantity}</span>
                        <button class="qty-btn" onclick="updateQuantity('${item.name}', 1)">
                            <i class="fas fa-plus"></i>
                        </button>
                    </div>
                </div>
                <i class="fas fa-trash cart-item-remove" onclick="removeFromCart('${item.name}')"></i>
            </div>
        `).join('');
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    document.getElementById('cartTotal').textContent = `₹${total}`;
}

function updateCartBadge() {
    const badge = document.querySelector('.cart-badge');
    if (badge) {
        badge.textContent = cart.length;
    }
}

function clearCart() {
    if (confirm('Are you sure you want to clear your cart?')) {
        cart = [];
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartBadge();
        renderCart();
        showToast('Cart cleared', 'info');
    }
}

function checkout() {
    if (cart.length === 0) {
        showToast('Your cart is empty!', 'error');
        return;
    }
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const message = `Hi! I want to order:\n${cart.map(item => `${item.name} x${item.quantity}`).join('\n')}\nTotal: ₹${total}`;
    window.open(`https://wa.me/919876543210?text=${encodeURIComponent(message)}`, '_blank');
    showToast('Redirecting to WhatsApp...', 'success');
}

// ========================================
// Search Functionality with Voice
// ========================================

let searchData = [];

function initSearch() {
    // Create search button in navbar
    const navbarNav = document.querySelector('.navbar-nav');
    if (navbarNav) {
        const searchBtn = document.createElement('button');
        searchBtn.className = 'search-icon-btn ms-3';
        searchBtn.innerHTML = '<i class="fas fa-search"></i>';
        searchBtn.addEventListener('click', toggleSearch);
        navbarNav.parentNode.appendChild(searchBtn);
    }
    
    // Create search overlay
    const searchOverlay = document.createElement('div');
    searchOverlay.className = 'search-overlay';
    searchOverlay.innerHTML = `
        <div class="search-container">
            <button class="voice-search-btn" onclick="startVoiceSearch()">
                <i class="fas fa-microphone"></i>
            </button>
            <input type="text" class="search-box" placeholder="Search for dishes..." id="searchInput">
            <i class="fas fa-times search-close"></i>
            <div class="search-results" id="searchResults"></div>
        </div>
    `;
    document.body.appendChild(searchOverlay);
    
    document.querySelector('.search-close').addEventListener('click', toggleSearch);
    document.getElementById('searchInput').addEventListener('input', handleSearch);
    
    // Collect searchable items
    document.querySelectorAll('.menu-card').forEach(card => {
        const name = card.querySelector('h4')?.textContent;
        const description = card.querySelector('.menu-description')?.textContent || '';
        const price = card.querySelector('.price')?.textContent;
        const image = card.querySelector('img')?.src;
        if (name) {
            searchData.push({ name, description, price, image });
        }
    });
}

function toggleSearch() {
    document.querySelector('.search-overlay').classList.toggle('active');
    if (document.querySelector('.search-overlay').classList.contains('active')) {
        document.getElementById('searchInput').focus();
    }
}

function handleSearch(e) {
    const query = e.target.value.toLowerCase();
    const results = searchData.filter(item => 
        item.name.toLowerCase().includes(query) || 
        item.description.toLowerCase().includes(query)
    );
    
    const resultsContainer = document.getElementById('searchResults');
    if (query.length > 0 && results.length > 0) {
        resultsContainer.innerHTML = results.map(item => `
            <div class="search-result-item">
                <img src="${item.image}" alt="${item.name}" class="search-result-image">
                <div class="search-result-details">
                    <h5>${item.name}</h5>
                    <p>${item.description}</p>
                    <strong>${item.price}</strong>
                </div>
            </div>
        `).join('');
    } else if (query.length > 0) {
        resultsContainer.innerHTML = '<p style="color: white; text-align: center; padding: 20px;">No results found</p>';
    } else {
        resultsContainer.innerHTML = '';
    }
}

// ========================================
// Voice Search
// ========================================

function initVoiceSearch() {
    if (!('webkitSpeechRecognition' in window)) {
        console.log('Voice search not supported');
        return;
    }
}

function startVoiceSearch() {
    if (!('webkitSpeechRecognition' in window)) {
        showToast('Voice search not supported in your browser', 'error');
        return;
    }
    
    const recognition = new webkitSpeechRecognition();
    recognition.lang = 'en-IN';
    recognition.continuous = false;
    
    const voiceBtn = document.querySelector('.voice-search-btn');
    voiceBtn.classList.add('listening');
    
    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        document.getElementById('searchInput').value = transcript;
        handleSearch({ target: { value: transcript } });
        voiceBtn.classList.remove('listening');
        showToast(`Searching for "${transcript}"`, 'info');
    };
    
    recognition.onerror = () => {
        voiceBtn.classList.remove('listening');
        showToast('Voice search failed. Please try again.', 'error');
    };
    
    recognition.start();
    showToast('Listening... Speak now!', 'info');
}

// ========================================
// Favorites/Wishlist
// ========================================

let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

function initFavorites() {
    // Create favorites button in navbar
    const cartIcon = document.querySelector('.cart-icon-wrapper');
    if (cartIcon) {
        const favBtn = document.createElement('button');
        favBtn.className = 'search-icon-btn ms-3';
        favBtn.innerHTML = `<i class="fas fa-heart"></i>`;
        favBtn.addEventListener('click', toggleFavorites);
        cartIcon.parentNode.insertBefore(favBtn, cartIcon.nextSibling);
    }
    
    // Create favorites sidebar
    const favSidebar = document.createElement('div');
    favSidebar.className = 'favorites-sidebar';
    favSidebar.innerHTML = `
        <div class="cart-header">
            <h3><i class="fas fa-heart"></i> Favorites</h3>
            <i class="fas fa-times cart-close"></i>
        </div>
        <div class="cart-items" id="favoritesItems"></div>
    `;
    document.body.appendChild(favSidebar);
    
    favSidebar.querySelector('.cart-close').addEventListener('click', toggleFavorites);
    
    // Add favorite buttons to menu items
    document.querySelectorAll('.menu-card').forEach(card => {
        const favBtn = document.createElement('div');
        favBtn.className = 'favorite-btn';
        favBtn.innerHTML = '<i class="far fa-heart"></i>';
        
        const name = card.querySelector('h4')?.textContent;
        const price = card.querySelector('.price')?.textContent;
        const image = card.querySelector('img')?.src;
        
        if (favorites.some(f => f.name === name)) {
            favBtn.classList.add('active');
            favBtn.innerHTML = '<i class="fas fa-heart"></i>';
        }
        
        favBtn.addEventListener('click', () => {
            toggleFavorite({ name, price, image }, favBtn);
        });
        
        card.querySelector('.menu-image').appendChild(favBtn);
    });
    
    renderFavorites();
}

function toggleFavorites() {
    document.querySelector('.favorites-sidebar').classList.toggle('active');
}

function toggleFavorite(item, btn) {
    const index = favorites.findIndex(f => f.name === item.name);
    if (index > -1) {
        favorites.splice(index, 1);
        btn.classList.remove('active');
        btn.innerHTML = '<i class="far fa-heart"></i>';
        showToast('Removed from favorites', 'info');
    } else {
        favorites.push(item);
        btn.classList.add('active');
        btn.innerHTML = '<i class="fas fa-heart"></i>';
        showToast('Added to favorites!', 'success');
    }
    localStorage.setItem('favorites', JSON.stringify(favorites));
    renderFavorites();
}

function renderFavorites() {
    const favItems = document.getElementById('favoritesItems');
    if (!favItems) return;
    
    if (favorites.length === 0) {
        favItems.innerHTML = `
            <div class="cart-empty">
                <i class="fas fa-heart"></i>
                <p>No favorites yet</p>
            </div>
        `;
    } else {
        favItems.innerHTML = favorites.map(item => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-details">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">${item.price}</div>
                </div>
            </div>
        `).join('');
    }
}

// ========================================
// Dark Mode - Toggle Switch in Navbar
// ========================================

function initDarkMode() {
    // Create toggle switch in navbar
    const navbar = document.querySelector('.navbar-nav');
    if (!navbar) return;
    
    const toggleWrapper = document.createElement('li');
    toggleWrapper.className = 'nav-item d-flex align-items-center ms-3';
    toggleWrapper.innerHTML = `
        <div class="theme-toggle">
            <input type="checkbox" id="themeSwitch" class="theme-checkbox">
            <label for="themeSwitch" class="theme-label">
                <i class="fas fa-sun sun-icon"></i>
                <i class="fas fa-moon moon-icon"></i>
                <span class="theme-slider"></span>
            </label>
        </div>
    `;
    navbar.appendChild(toggleWrapper);
    
    const checkbox = document.getElementById('themeSwitch');
    const isDark = localStorage.getItem('darkMode') === 'true';
    
    if (isDark) {
        document.body.classList.add('dark-mode');
        checkbox.checked = true;
    }
    
    checkbox.addEventListener('change', () => {
        document.body.classList.toggle('dark-mode');
        const isDarkNow = document.body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', isDarkNow);
        showToast(isDarkNow ? 'Dark mode enabled' : 'Light mode enabled', 'info');
    });
}

// Language Switcher - REMOVED

// ========================================
// Chef's Special Daily
// ========================================

function initChefsSpecial() {
    const specials = [
        {
            name: 'Butter Chicken Special',
            description: 'Creamy and rich butter chicken with our secret recipe',
            price: '₹349',
            image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400'
        },
        {
            name: 'Paneer Tikka Masala',
            description: 'Grilled paneer in spicy masala gravy',
            price: '₹299',
            image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400'
        }
    ];
    
    const today = new Date().getDay();
    const special = specials[today % specials.length];
    
    const banner = document.createElement('div');
    banner.className = 'chefs-special-banner';
    banner.setAttribute('data-aos', 'fade-up');
    banner.innerHTML = `
        <img src="${special.image}" alt="${special.name}" class="special-image">
        <div class="special-content">
            <span class="special-badge">🔥 Chef's Special Today</span>
            <h2>${special.name}</h2>
            <p>${special.description}</p>
            <h3 style="margin: 10px 0;">${special.price}</h3>
            <div class="special-timer">
                <div class="timer-box">
                    <span class="time" id="hours">00</span>
                    <span class="label">Hours</span>
                </div>
                <div class="timer-box">
                    <span class="time" id="minutes">00</span>
                    <span class="label">Minutes</span>
                </div>
                <div class="timer-box">
                    <span class="time" id="seconds">00</span>
                    <span class="label">Seconds</span>
                </div>
            </div>
            <button class="btn btn-primary mt-3" onclick="window.location.href='menu.html'">
                Order Now <i class="fas fa-arrow-right"></i>
            </button>
        </div>
    `;
    
    const menuSection = document.querySelector('.menu-section, .featured-dishes');
    if (menuSection) {
        menuSection.insertBefore(banner, menuSection.firstChild);
        startTimer();
    }
}

function startTimer() {
    setInterval(() => {
        const now = new Date();
        const midnight = new Date();
        midnight.setHours(24, 0, 0, 0);
        
        const diff = midnight - now;
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        const hoursEl = document.getElementById('hours');
        const minutesEl = document.getElementById('minutes');
        const secondsEl = document.getElementById('seconds');
        
        if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
        if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
        if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
    }, 1000);
}

// ========================================
// Compare Dishes
// ========================================

let compareItems = [];

function initCompareDishes() {
    document.querySelectorAll('.menu-card').forEach(card => {
        const checkbox = document.createElement('div');
        checkbox.className = 'compare-checkbox';
        checkbox.innerHTML = '<input type="checkbox" class="compare-check">';
        card.querySelector('.menu-image').appendChild(checkbox);
        
        checkbox.querySelector('input').addEventListener('change', (e) => {
            const name = card.querySelector('h4')?.textContent;
            const price = card.querySelector('.price')?.textContent;
            const image = card.querySelector('img')?.src;
            
            if (e.target.checked) {
                if (compareItems.length < 3) {
                    compareItems.push({ name, price, image });
                } else {
                    e.target.checked = false;
                    showToast('You can only compare 3 items', 'error');
                }
            } else {
                compareItems = compareItems.filter(item => item.name !== name);
            }
            updateComparePanel();
        });
    });
    
    const comparePanel = document.createElement('div');
    comparePanel.className = 'compare-panel';
    comparePanel.innerHTML = `
        <h3 style="text-align: center; margin-bottom: 20px;">Compare Dishes</h3>
        <div class="compare-items" id="compareItems"></div>
        <button class="btn btn-primary mt-3" onclick="closeCompare()">Close</button>
    `;
    document.body.appendChild(comparePanel);
}

function updateComparePanel() {
    const panel = document.querySelector('.compare-panel');
    const items = document.getElementById('compareItems');
    
    if (compareItems.length > 0) {
        panel.classList.add('active');
        items.innerHTML = compareItems.map(item => `
            <div class="compare-item">
                <img src="${item.image}" alt="${item.name}">
                <h5>${item.name}</h5>
                <p>${item.price}</p>
            </div>
        `).join('');
    } else {
        panel.classList.remove('active');
    }
}

function closeCompare() {
    document.querySelector('.compare-panel').classList.remove('active');
    document.querySelectorAll('.compare-check').forEach(check => check.checked = false);
    compareItems = [];
}

// ========================================
// QR Code Menu
// ========================================

function initQRCode() {
    const qrBtn = document.createElement('button');
    qrBtn.className = 'btn btn-secondary';
    qrBtn.innerHTML = '<i class="fas fa-qrcode"></i> View Menu QR';
    qrBtn.style.cssText = 'position: fixed; bottom: 250px; left: 20px; z-index: 999;';
    qrBtn.addEventListener('click', showQRCode);
    document.body.appendChild(qrBtn);
}

function showQRCode() {
    const modal = document.createElement('div');
    modal.className = 'qr-modal active';
    modal.innerHTML = `
        <div class="qr-content">
            <i class="fas fa-times qr-close"></i>
            <h2>Scan to View Menu</h2>
            <div id="qrcode"></div>
            <p>Scan this QR code with your phone to view our menu</p>
            <button class="btn btn-primary mt-3" onclick="downloadQR()">Download QR</button>
        </div>
    `;
    document.body.appendChild(modal);
    
    modal.querySelector('.qr-close').addEventListener('click', () => modal.remove());
    
    // Generate QR Code using QRCode.js library
    const menuURL = window.location.origin + '/menu.html';
    new QRCode(document.getElementById("qrcode"), {
        text: menuURL,
        width: 256,
        height: 256
    });
}

function downloadQR() {
    const canvas = document.querySelector('#qrcode canvas');
    const link = document.createElement('a');
    link.download = 'menu-qr-code.png';
    link.href = canvas.toDataURL();
    link.click();
    showToast('QR Code downloaded!', 'success');
}

// Make functions globally available
window.updateQuantity = updateQuantity;
window.removeFromCart = removeFromCart;
window.clearCart = clearCart;
window.checkout = checkout;
window.startVoiceSearch = startVoiceSearch;
window.closeCompare = closeCompare;
window.downloadQR = downloadQR;
