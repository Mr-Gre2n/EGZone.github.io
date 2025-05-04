document.addEventListener("DOMContentLoaded", function () {

    if (!localStorage.getItem("Cart")) {
      localStorage.setItem("Cart", JSON.stringify([]));
    }
  
    let products = JSON.parse(localStorage.getItem("Products"));
  
    if (!products || products.length === 0) {
      createProductsInLocalStorage();
      products = JSON.parse(localStorage.getItem("Products"));
    }
  
    // DOM Elements
    const productsGrid = document.querySelector(".products-grid");
    const searchInput = document.getElementById("search-input");
    const searchButton = document.querySelector(".search-button");
    const categoryCheckboxes = document.querySelectorAll(
      'input[name="category"]'
    );
    const brandCheckboxes = document.querySelectorAll('input[name="brand"]');
    const sortSelect = document.getElementById("sort");
    const productsCount = document.querySelector(".products-count h2");
    const filterGoButton = document.getElementById("filter-go-button");
    const filterResetButton = document.getElementById("filter-reset-button");
  
    // price slider doms
    const minPriceInput = document.querySelector(".min-price");
    const maxPriceInput = document.querySelector(".max-price");
    const minValue = document.getElementById("min-value");
    const maxValue = document.getElementById("max-value");
    const rangeFill = document.getElementById("range-fill");
  
    displayProducts(products);
    initRangeSlider();
  
    searchButton.addEventListener("click", applyFilters);
    searchInput.addEventListener("keyup", function (e) {
      if (e.key === "Enter") applyFilters();
    });
    filterGoButton.addEventListener("click", applyFilters);
    filterResetButton.addEventListener("click", resetFilters);
    sortSelect.addEventListener("change", applyFilters);
  
    // price slider
    function initRangeSlider() {
      minValue.textContent = "$" + minPriceInput.value;
      maxValue.textContent = "$" + maxPriceInput.value;
      updateRangeFill();
  
      minPriceInput.addEventListener("input", function () {
        if (parseInt(minPriceInput.value) > parseInt(maxPriceInput.value)) {
          minPriceInput.value = maxPriceInput.value;
        }
        minValue.textContent = "$" + minPriceInput.value;
        updateRangeFill();
      });
  
      maxPriceInput.addEventListener("input", function () {
       
        if (parseInt(maxPriceInput.value) < parseInt(minPriceInput.value)) {
          maxPriceInput.value = minPriceInput.value;
        }
        maxValue.textContent = "$" + maxPriceInput.value;
        updateRangeFill();
      });
    }
  
    function updateRangeFill() {
      const minVal = parseInt(minPriceInput.value);
      const maxVal = parseInt(maxPriceInput.value);
      const minPercent = ((minVal) / (10000)) * 100;
      const maxPercent = ((maxVal) / (10000)) * 100;
  
      rangeFill.style.left = minPercent + "%";
      rangeFill.style.width = maxPercent - minPercent + "%";
    }
  
    function displayProducts(productsToDisplay) {
      productsGrid.innerHTML = "";
  
      if (productsToDisplay.length === 0) {
        productsCount.textContent = "0 products found";
        return;
      }
  
      productsToDisplay.forEach((product) => {
        const productElement = createProductElement(product);
        productsGrid.appendChild(productElement);
      });
  
      productsCount.textContent = `${productsToDisplay.length} ${
        productsToDisplay.length === 1 ? "product" : "products"
      } found`;
    }
  
    function createProductElement(product) {
      const productElement = document.createElement("div");
      productElement.className = "product";
      productElement.dataset.productId = product.ID;
  
      const discountPrice = product.Price - product.Price * (product.Discount / 100);
      const inStock = product.Status === "in stock";
      const cart = JSON.parse(localStorage.getItem("Cart")) || [];
      const cartItem = cart.find(item => item.id === product.ID);
      const availableQuantity = product.Quantity;
  
      productElement.innerHTML = `
          <a href="ProductPage.html?id=${product.ID}" class="product-link">
              <div class="product-image-container">
                  <img src="${product.Image}" alt="${product.Title}" class="product-image">
                  ${product.isNew ? '<span class="new-badge">NEW</span>' : 
                    product.Discount > 0 && inStock ? 
                    `<span class="discount-badge">SAVE $${product.Discount }</span>` : ''}
              </div>
              <div class="product-info">
                  <h3 class="product-title">${product.Title}</h3>
                  <div class="product-price">
                      ${product.Discount > 0 ? `
                          <span class="current-price" data-discounted="true">${product.Price-product.Discount}</span>
                          <span class="original-price">$${product.Price}</span>
                      ` : `
                          <span class="current-price">$${product.Price-product.Discount}</span>
                      `}
                  </div>
              </div>
          </a>
          <div class="quantity-controls ${!inStock || !cartItem ? 'hidden' : ''}" data-product-id="${product.ID}">
              <button class="quantity-btn minus-btn">-</button>
              <span class="quantity-display">${cartItem ? cartItem.quantity : 1}</span>
             
              <button class="quantity-btn plus-btn" ${cartItem && cartItem.quantity >= availableQuantity ? 'disabled' : ''}>+</button>
          </div>
          <button class="addbutton ${!inStock ? 'out-of-stock-btn' : cartItem ? 'hidden' : 'add-to-cart-btn'}" 
                  ${!inStock || availableQuantity <= 0 ? 'disabled' : ''} 
                  data-product-id="${product.ID}">
              ${inStock ? (availableQuantity > 0 ? 'Add to Cart' : 'Out of Stock') : 'Out of Stock'}
          </button>
      `;
      if (inStock && availableQuantity > 0) {
          const addToCartBtn = productElement.querySelector(".add-to-cart-btn");
          if (addToCartBtn) {
              addToCartBtn.addEventListener("click", function(e) {
                  e.preventDefault();
                  addToCart(product);
                  toggleQuantityControls(product.ID, true);
              });
          }
  
          const plusBtn = productElement.querySelector(".plus-btn");
          const minusBtn = productElement.querySelector(".minus-btn");
          const quantityDisplay = productElement.querySelector(".quantity-display");
          
          if (plusBtn && minusBtn) {
              plusBtn.addEventListener("click", function() {
                  updateQuantity(product.ID, 1, product.Quantity);
              });
              
              minusBtn.addEventListener("click", function() {
                  updateQuantity(product.ID, -1, product.Quantity);
              });
          }
      }
  
      return productElement;
  }
  function addToCart(product) {
    const cart = JSON.parse(localStorage.getItem("Cart")) || [];
    const existingItem = cart.find(item => item.id === product.ID);
  
    if (existingItem) {
        if (existingItem.quantity < product.Quantity) {
            existingItem.quantity += 1;
        } else {
            showCartNotification(product.Title, existingItem.quantity, product.Quantity, true);
            return;
        }
    } else {
        if (product.Quantity > 0) {
            cart.push({
                id: product.ID,
                title: product.Title,
                price: product.Price,
                discount: product.Discount,
                discountedPrice: product.Price - product.Price * (product.Discount / 100),
                image: product.Image,
                quantity: 1,
                maxQuantity: product.Quantity
            });
        } else {
            showCartNotification(product.Title, 0, product.Quantity, true);
            return;
        }
    }
  
    localStorage.setItem("Cart", JSON.stringify(cart));
    showCartNotification(product.Title, existingItem?.quantity || 1, product.Quantity);
    toggleQuantityControls(product.ID, true);
  }
  function toggleQuantityControls(productId, show) {
    const productElement = document.querySelector(`.product[data-product-id="${productId}"]`);
    if (!productElement) return;
    
    const addButton = productElement.querySelector('.add-to-cart-btn');
    const quantityControls = productElement.querySelector('.quantity-controls');
    
    if (addButton && quantityControls) {
        if (show) {
            addButton.classList.add('hidden');
            quantityControls.classList.remove('hidden');
        } else {
            addButton.classList.remove('hidden');
            quantityControls.classList.add('hidden');
        }
    }
  }
  
  function updateQuantity(productId, change, maxQuantity) {
    const cart = JSON.parse(localStorage.getItem("Cart")) || [];
    const productIndex = cart.findIndex(item => item.id === productId);
    
    if (productIndex !== -1) {
        const newQuantity = cart[productIndex].quantity + change;
        
        if (newQuantity < 1) {
            cart.splice(productIndex, 1);
            toggleQuantityControls(productId, false);
        } else if (newQuantity > maxQuantity) {
            showCartNotification(cart[productIndex].title, newQuantity - 1, maxQuantity, true);
            return;
        } else {
            cart[productIndex].quantity = newQuantity;
        }
        
        localStorage.setItem("Cart", JSON.stringify(cart));
        
        const productElement = document.querySelector(`.product[data-product-id="${productId}"]`);
        if (productElement) {
            const quantityDisplay = productElement.querySelector('.quantity-display');
            const plusBtn = productElement.querySelector('.plus-btn');
            
            if (quantityDisplay) {
                quantityDisplay.textContent = cart[productIndex]?.quantity || '1';
            }
            
            if (plusBtn) {
                plusBtn.disabled = cart[productIndex]?.quantity >= maxQuantity;
            }
        }
        
        showCartNotification(cart[productIndex]?.title || '', cart[productIndex]?.quantity || 0, maxQuantity);
    }
  }
  function showCartNotification(productName, quantity = 1, maxQuantity = 1) {
    const notification = document.createElement("div");
    notification.className = `cart-notification ${''}`;
    
   
        notification.textContent = ` ${quantity} of ${productName} added to cart`;
    
  
    document.body.appendChild(notification);
  
    setTimeout(() => {
        notification.classList.add("fade-out");
        setTimeout(() => notification.remove(), 300);
    }, 3000);
  }
  
    function applyFilters() {
      let filteredProducts = [...products];
  
      // Search filter
      const searchTerm = searchInput.value.toLowerCase();
      if (searchTerm) {
        filteredProducts = filteredProducts.filter(
          (product) =>
            product.Title.toLowerCase().includes(searchTerm) ||
            product.Category.toLowerCase().includes(searchTerm) ||
            product.Description.toLowerCase().includes(searchTerm)
        );
      }
  
      // Category filter
      const selectedCategories = Array.from(categoryCheckboxes)
        .filter((checkbox) => checkbox.checked)
        .map((checkbox) => checkbox.value);
  
      if (selectedCategories.length > 0) {
        filteredProducts = filteredProducts.filter((product) =>
          selectedCategories.includes(product.Category.toLowerCase())
        );
      }
  
      // Brand filter
      const selectedBrands = Array.from(brandCheckboxes)
        .filter((checkbox) => checkbox.checked)
        .map((checkbox) => checkbox.value);
  
      if (selectedBrands.length > 0) {
        filteredProducts = filteredProducts.filter((product) =>
          selectedBrands.includes(product.Brand)
        );
      }
  
      // Price filter
      const minPrice = parseInt(minPriceInput.value) || 0;
      const maxPrice = parseInt(maxPriceInput.value) || 500;
  
      filteredProducts = filteredProducts.filter((product) => {
        const price = product.Price - product.Price * (product.Discount / 100);
        return price >= minPrice && price <= maxPrice;
      });
  
      // Sort products
      const sortOption = sortSelect.value;
      switch (sortOption) {
        case "price-lowToHigh":
          filteredProducts.sort((a, b) => {
            const priceA = a.Price - a.Price * (a.Discount / 100);
            const priceB = b.Price - b.Price * (b.Discount / 100);
            return priceA - priceB;
          });
          break;
        case "price-highToLow":
          filteredProducts.sort((a, b) => {
            const priceA = a.Price - a.Price * (a.Discount / 100);
            const priceB = b.Price - b.Price * (b.Discount / 100);
            return priceB - priceA;
          });
          break;
        case "newest":
          filteredProducts.sort((a, b) => b.ID - a.ID);
          break;
        default:
          break;
      }
  
      displayProducts(filteredProducts);
    }
  
    function resetFilters() {
      searchInput.value = "";
      categoryCheckboxes.forEach((checkbox) => (checkbox.checked = false));
      brandCheckboxes.forEach((checkbox) => (checkbox.checked = false));
      minPriceInput.value = "0";
      maxPriceInput.value = "10000";
      minValue.textContent = "$0";
      maxValue.textContent = "$10000";
      sortSelect.value = "relevance";
      updateRangeFill();
  
      displayProducts(products);
    }
  
    function createProductsInLocalStorage() {
      // Sample data for 5 products
      const products = [
          {
              ID: 1,
              Image: '/Materials/Images/watch.jpg',
              Title: 'Product 1',
              Category: 'Category A',
              Brand: 'Brand A',
              Price: 100,
              Discount: 10,
              Quantity: 5,
              Status: 'in stock',
              Description: 'Description of Product 1',
              isNew:'True',
          },
          {
              ID: 2,
              Image: '/Materials/Images/watch.jpg',
              Title: 'Product 2',
              Category: 'Category B',
              Brand: 'Brand B',
              Price: 200,
              Discount: 20,
              Quantity: 0,
              Status: 'out of stock',
              Description: 'Description of Product 2'
          },
          {
              ID: 3,
              Image: '/Materials/Images/watch.jpg',
              Title: 'Product 3',
              Category: 'Category C',
              Brand: 'Brand C',
              Price: 150,
              Discount: 15,
              Quantity: 70,
              Status: 'in stock',
              Description: 'Description of Product 3'
          },
          {
              ID: 4,
              Image: '/Materials/Images/watch.jpg',
              Title: 'Product 4',
              Category: 'Category D',
              Brand: 'Brand D',
              Price: 250,
              Discount: 25,
              Quantity: 0,
              Status: 'out of stock',
              Description: 'Description of Product 4'
          },
          {
              ID: 5,
              Image: '/Materials/Images/watch.jpg',
              Title: 'Product 5',
              Category: 'Category E',
              Brand: 'Brand E',
              Price: 300,
              Discount: 30,
              Quantity: 0,
              Status: 'out of stock',
              Description: 'Description of Product 5',
  
          }
      ];
  
      // Save to localStorage under the name 'Products'
      localStorage.setItem('Products', JSON.stringify(products));
  
      console.log('5 product entries have been added to localStorage.');
  }
  });
  