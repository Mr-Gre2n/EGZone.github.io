/***********************
*      Elements
***********************/
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const cartItemsContainer = document.getElementById('cartItems');
const cartTotalElement = document.getElementById('cartTotal');
const cartSidebar = document.getElementById('cartSidebar');
const productsContainer = document.getElementById('productsContainer');

/***********************
*      Variables
***********************/
let currentSlide = 0;
let slideInterval = setInterval(nextSlide, 7000);

// Categories data
const categories = [
    {
        title: "Computer",
        image: "../Materials/laptop.jpg",
        items: [
            { name: "Gaming Laptop", image:"../Materials/Images/product1.jpg"},
            { name: "Personal Laptop", image: "../Materials/Images/product2.jpg" },
            { name: "Student Laptop ", image: "../Materials/Images/product3.jpg" },
            { name: "Business Laptop", image: "../Materials/Images/product4.jpg" }
        ]
    },
    {
        title: "SMARTPHONES",
        image: "../Materials/smartphones.jpg",
        items: [
            { name: "Android", image: "../Materials/Images/product5.jpg" },
            { name: "iPhone", image: "../Materials/Images/product6.jpg" },
            { name: "Foldable", image: "../Materials/Images/product7.jpg" },
            { name: "Budget", image: "../Materials/Images/product8.jpg" }
        ]
    },
    {
        title: "ACCESSORIES",
        image: "../Materials/access.jpg",
        items: [
            { name: "Mouse", image: "../Materials/Images/product9.jpg" },
            { name: "Smart Watch", image: "../Materials/Images/product10.jpg" },
            { name: "Cable", image: "../Materials/Images/product11.jpg" },
            { name: "Head Phone", image: "../Materials/Images/product12.jpg" }
        ]
    }
];

/***********************
*      Methods
***********************/
// === Slider Methods ===
function showSlide(index) {
    // Get current theme
    const isDarkBlueTheme = document.documentElement.getAttribute('data-theme') === 'dark-blue';
    
    slides.forEach((slide, i) => {
        slide.classList.remove('active');
        dots[i].classList.remove('active');
    });
    
    slides[index].classList.add('active');
    dots[index].classList.add('active');
    currentSlide = index;
    
    // If it's dark-blue theme, update the images
    if (isDarkBlueTheme) {
        updateSlideImagesForDarkTheme();
    }
}

function updateSlideImagesForDarkTheme() {
    // Apply dark theme images 
    slides.forEach((slide, index) => {
        if (index === 0) {
            slide.src = "../Materials/Banner/ad11.png";
        } else if (index === 1) {
            slide.src = "../Materials/Banner/ad22.png";
        } else if (index === 2) {
            slide.src = "../Materials/Banner/ad33.png";
        }
    });
}

function nextSlide() {
    let nextIndex = (currentSlide + 1) % slides.length;
    showSlide(nextIndex);
}

function goToSlide(index) {
    clearInterval(slideInterval);
    showSlide(index);
    slideInterval = setInterval(nextSlide, 7000);
}

// === Categories Methods ===
function setupCategories() {
    const section = document.querySelector(".categories-section");
    if (!section) return;
    
    categories.forEach(category => {
        const card = document.createElement("div");
        card.className = "category-card";

        card.innerHTML = `
            <h3>${category.title}</h3>
            <div class="category-header">
                <img src="${category.image}" alt="${category.title}" />
            </div>
            <div class="category-items">
                ${category.items.map(item => `
                    <div class="item" onclick="navigateToProductPage('${item.name.toLowerCase().replace(/\s+/g, '')}')">
                        <img src="${item.image}" alt="${item.name}">
                        <p>${item.name}</p>
                    </div>
                `).join("")}
            </div>
        `;

        section.appendChild(card);
    });
}

function setupCategoryNavigation() {
    const categoryItems = document.querySelectorAll('.categories-grid .category-item');
    categoryItems.forEach(item => {
        item.addEventListener('click', function() {
            const categoryText = this.textContent.trim().toLowerCase().replace(/\s+/g, '');
            navigateToSearchPage(categoryText);
        });
    });
}

function navigateToSearchPage(category) {
    const cleanCategory = category.trim().replace(/\s+/g, '');
    window.location.href = `searchPage.html?category=${encodeURIComponent(cleanCategory)}`;
}

// === Products Methods ===

function isUserLoggedIn() {
    const loggedInUser = JSON.parse(localStorage.getItem('LoggedInUser'));
    return loggedInUser && loggedInUser.length > 0;
}

function getProductsFromLocalStorage() {
    return JSON.parse(localStorage.getItem('Products')) || [];
}

function calculateDiscountedPrice(price, discount) {
    return price - discount;
}

function navigateToProductPage(productId) {
    
    const cleanProductId = productId.replace(/\s+/g, '');
    window.location.href = `productPage.html?id=${cleanProductId}`;
}

function navigateToAddProductPage(productId = null) {
    const url = productId ?
        `addNewProductPage.html?id=${productId}` :
        'addNewProductPage.html';
    window.location.href = url;
}

function createProductCard(product) {
    const productCard = document.createElement('div');
    productCard.className = 'product-card';
    productCard.dataset.productId = product.ID;
    productCard.style.cursor = 'pointer';

    let badgeHtml = '';
    if (product.Discount > 0) {
        badgeHtml = `<div class="product-badge badge-sale">SAVE $${product.Discount}</div>`;
    }
    if (product.Status === 'out of stock') {
        badgeHtml = `<div class="product-badge badge-out">OUT OF STOCK</div>`;
    }

    let editIconHtml = '';
    if (isUserLoggedIn()) {
        editIconHtml = `
            <div class="edit-icon">
                <i class="fas fa-pen"></i>
            </div>`;
    }

    const discountedPrice = calculateDiscountedPrice(product.Price, product.Discount);
    const statusClass = product.Status === 'in stock' ? 'status-in-stock' : 'status-out-of-stock';
    const statusText = product.Status === 'in stock' ? 'In Stock' : 'Out of Stock';

    productCard.innerHTML = `
        ${badgeHtml}
        <div class="product-image">
            <img src="${product.Image}" alt="${product.Title}">
            ${editIconHtml}
        </div>
        <div class="product-info">
            <span class="product-category">${product.Category}</span>
            <h3 class="product-title">${product.Title}</h3>
            <div class="product-price">
                <span class="current-price">$${discountedPrice.toFixed(2)}</span>
                ${product.Discount > 0 ? `<span class="original-price">$${product.Price.toFixed(2)}</span>` : ''}
            </div>
            <span class="product-status ${statusClass}">${statusText}</span>
        </div>
        <button class="add-to-cart" ${product.Status === 'out of stock' ? 'disabled' : ''}>
            Add to Cart
        </button>
    `;

    return productCard;
}

function displayProducts() {
    if (!productsContainer) return;
    
    const products = getProductsFromLocalStorage();

    productsContainer.innerHTML = ''; // Clear container first

    products.forEach(product => {
        const productCard = createProductCard(product);

        const addToCartBtn = productCard.querySelector('.add-to-cart');
        if (addToCartBtn) {
            addToCartBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                addToCart(product.ID);
            });
        }

        productCard.addEventListener('click', function(e) {
            if (!e.target.closest('.edit-icon') &&
                !e.target.closest('.add-to-cart')) {
                navigateToProductPage(product.ID);
            }
        });

        const editIcon = productCard.querySelector('.edit-icon');
        if (editIcon) {
            editIcon.addEventListener('click', function(e) {
                e.stopPropagation();
                navigateToAddProductPage(product.ID);
            });
        }

        productsContainer.appendChild(productCard);
    });
    
    setupHotSalesNavigation();
}

// === Cart Methods ===
function getCartFromLocalStorage() {
    return JSON.parse(localStorage.getItem('Cart')) || [];
}

function saveCartToLocalStorage(cart) {
    localStorage.setItem('Cart', JSON.stringify(cart));
}

function addToCart(productId) {
    const products = getProductsFromLocalStorage();
    const product = products.find(p => p.ID === productId);
    
    if (!product || product.Status !== 'in stock') return;
    
    let cart = getCartFromLocalStorage();
    const existingItem = cart.find(item => item.ID === productId);
    
    const currentQuantity = existingItem ? existingItem.Quantity : 0;
    if (currentQuantity >= product.Quantity) {
        alert(`Sorry, only ${product.Quantity} items available in stock.`);
        return;
    }
    
    if (existingItem) {
        existingItem.Quantity += 1;
    } else {
        product.Quantity = 1;
        // Create a copy of the product and add quantity property
        const cartItem = {
            ...product,
        };
        cart.push(cartItem);
    }
    
    saveCartToLocalStorage(cart);
    displayCart();
    openCart(); // Open the cart when adding items
    updateCartCount(); // Update the cart count badge
}

function removeFromCart(productId) {
    let cart = getCartFromLocalStorage().filter(p => p.ID !== productId);
    saveCartToLocalStorage(cart);
    displayCart();
    updateCartCount();
}

function updateCartItemQuantity(productId, change) {
    let cart = getCartFromLocalStorage();
    const item = cart.find(p => p.ID === productId);
    if (!item) return;
    
    // Get the current product information to check available quantity
    const products = getProductsFromLocalStorage();
    const product = products.find(p => p.ID === productId);
    
    // Check if increasing would exceed available quantity
    if (change > 0 && item.Quantity + change > product.Quantity) {
        alert(`Sorry, only ${product.Quantity} items available in stock.`);
        return;
    }
    
    item.Quantity += change;
    if (item.Quantity <= 0) {
        cart = cart.filter(p => p.ID !== productId);
    }
    
    saveCartToLocalStorage(cart);
    displayCart();
    updateCartCount();
}

function displayCart() {
    if (!cartItemsContainer) return;
    
    const cart = getCartFromLocalStorage();
    
    cartItemsContainer.innerHTML = '';
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<div class="empty-cart"><p> Empty cart  </p><i class="fas fa-shopping-cart"></i></div>';
        cartTotalElement.textContent = '$0.00';
        return;
    }
    
    let total = 0;
    
    cart.forEach(item => {
        const discountedPrice = calculateDiscountedPrice(item.Price, item.Discount);
        const itemTotal = discountedPrice * item.Quantity;
        total += itemTotal;
        
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        
        cartItem.innerHTML = `
            <img src="${item.Image}" alt="${item.Title}" class="cart-item-img">
            <div class="cart-item-details">
                <h4>${item.Title}</h4>
                <div class="cart-item-price">
                    <span>$${discountedPrice.toFixed(2)}</span>
                    ${item.Discount > 0 ? `<span class="cart-item-discount">$${item.Price.toFixed(2)}</span>` : ''}
                </div>
                <div class="cart-item-actions">
                    <div class="quantity-control">
                        <button class="quantity-btn minus" onclick="updateCartItemQuantity(${item.ID}, -1)">-</button>
                        <span class="quantity">${item.Quantity}</span>
                        <button class="quantity-btn plus" onclick="updateCartItemQuantity(${item.ID}, 1)">+</button>
                    </div>
                    <button class="remove-btn" onclick="removeFromCart(${item.ID})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
        
        cartItemsContainer.appendChild(cartItem);
    });
    
    cartTotalElement.textContent = `$${total.toFixed(2)}`;
}

function openCart() {
    if (cartSidebar) {
        cartSidebar.classList.add('open');
        document.body.classList.add('cart-open');
    }
}

function closeCart() {
    if (cartSidebar) {
        cartSidebar.classList.remove('open');
        document.body.classList.remove('cart-open');
    }
}

function updateCartCount() {
    const cartBadge = document.querySelector('.cart-badge');
    if (!cartBadge) return;
    
    const cart = getCartFromLocalStorage();
    const itemCount = cart.reduce((total, item) => total + item.Quantity, 0);
    
    cartBadge.textContent = itemCount;
    cartBadge.style.display = itemCount > 0 ? 'flex' : 'none';
}

// === Theme Methods ===
function checkAndApplyTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    if (currentTheme === 'dark-blue') {
        updateSlideImagesForDarkTheme();
    }
}

function setupHotSalesNavigation() {
    const hotSalesProducts = document.querySelectorAll('.hot-sales-section .product-card');
    if (!hotSalesProducts.length) return;
    
    hotSalesProducts.forEach(product => {
        product.style.cursor = 'pointer';
        const productId = product.dataset.productId;
        
    
        product.addEventListener('click', function(e) {
        
            if (!e.target.closest('.add-to-cart') && !e.target.closest('.edit-icon')) {
                navigateToProductPage(productId);
            }
        });
        
        // const addToCartBtn = product.querySelector('.add-to-cart');
        // if (addToCartBtn) {
        //     addToCartBtn.addEventListener('click', function(e) {
        //         e.stopPropagation(); 
        //         addToCart(parseInt(productId));
        //     });
        // }
    });
}

/***********************
*     Data Events
***********************/
// Check if products exist in localStorage, if not create them
if (!localStorage.getItem('Products')) {
    createProductsInLocalStorage();
}

/***********************
*     UI Events
***********************/
document.addEventListener('DOMContentLoaded', function() {
    // Setup categories if the relevant section exists
    setupCategories();
    
    // Display products if the container exists
    displayProducts();
    
    // Setup category navigation if relevant elements exist
    setupCategoryNavigation();
    
    // Setup Hot Sales products navigation
    setupHotSalesNavigation();
    
    // Initialize cart
    displayCart();
    updateCartCount();
    
    // Add escape key handler to close cart
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeCart();
        }
    });
    
    // Fix the banner slider navigation
    slides.forEach((slide, index) => {
        slide.addEventListener('click', function() {
            // Go to next slide when clicked
            let nextIndex = (index + 1) % slides.length;
            goToSlide(nextIndex);
        });
    });
    
    // Check and apply current theme
    checkAndApplyTheme();
    
    // Add mutation observer to detect theme changes
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.attributeName === 'data-theme') {
                checkAndApplyTheme();
            }
        });
    });
    
    observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['data-theme']
    });
    

    showSlide(currentSlide);
});
