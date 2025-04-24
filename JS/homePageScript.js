let currentSlide = 0;
 const slides = document.querySelectorAll('.slide'); 
 const dots = document.querySelectorAll('.dot'); 
 let slideInterval = setInterval(nextSlide, 7000);

function showSlide(index)
 { slides.forEach((slide, i) => 
    { slide.classList.remove('active'); dots[i].classList.remove('active'); });
     slides[index].classList.add('active'); dots[index].classList.add('active');
      currentSlide = index; }

function nextSlide()
 { let nextIndex = (currentSlide + 1) % slides.length; 
    showSlide(nextIndex); }

function goToSlide(index) { clearInterval(slideInterval);
     showSlide(index); slideInterval = setInterval(nextSlide, 7000); }
     
slides.forEach(slide => { slide.addEventListener('click', nextSlide); });
// section 4 
const categories = [
    {
      title: "LAPTOPS",
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
  
  // 2. الكود اللي بيولّد العناصر
  const section = document.querySelector(".categories-section");
  
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
          <div class="item">
            <img src="${item.image}" alt="${item.name}">
            <p>${item.name}</p>
          </div>
        `).join("")}
      </div>
    `;
  
    section.appendChild(card);
  });

// hot sales
function createProductsInLocalStorage() {
    const products = [
        {
            ID: 1,
            Image: '../Materials/Images/product8.jpg',
            Title: 'Product 1',
            Category: 'Category A',
            Brand: 'Brand A',
            Price: 100,
            Discount: 10,
            Quantity: 50,
            Status: 'in stock',
            Description: 'Description of Product 1'
        },
        {
            ID: 2,
            Image: '../Materials/Images/product6.jpg',
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
            Description: 'Description of Product 5'
        }
    ];

    localStorage.setItem('Products', JSON.stringify(products));
    console.log('Products saved to localStorage.');
}

// تنفيذ الدالة فقط لو مفيش منتجات محفوظة
if (!localStorage.getItem('Products')) {
    createProductsInLocalStorage();
}

// التحقق من تسجيل دخول المستخدم
function isUserLoggedIn() {
    const loggedInUser = JSON.parse(localStorage.getItem('LoggedInUser'));
    return loggedInUser && loggedInUser.length > 0;
}

// جلب المنتجات من localStorage
function getProductsFromLocalStorage() {
    const products = JSON.parse(localStorage.getItem('Products'));
    return products || [];
}

// حساب السعر بعد الخصم
function calculateDiscountedPrice(price, discount) {
    return price - (price * (discount / 100));
}

// إنشاء بطاقة المنتج
function createProductCard(product) {
    const productCard = document.createElement('div');
    productCard.className = 'product-card';
    productCard.dataset.productId = product.ID;

    let badgeHtml = '';
    if (product.Discount > 0) {
        badgeHtml = `<div class="product-badge badge-sale">SAVE ${product.Discount}%</div>`;
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

// عرض المنتجات
function displayProducts() {
    const productsContainer = document.getElementById('productsContainer');
    const products = getProductsFromLocalStorage();

    products.forEach(product => {
        const productCard = createProductCard(product);
        productsContainer.appendChild(productCard);
    });
}

// عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    displayProducts();
});