/***********************
*      Elements
***********************/
//Navbar placeholder (frist elemant)
const NAVBAR_PLACEHOLDER = document.createElement('div');
document.body.insertBefore(NAVBAR_PLACEHOLDER, document.body.firstChild);

//Footer placeholder (last elemant)
const FOOTER_PLACEHOLDER = document.createElement('div'); 
document.body.appendChild(FOOTER_PLACEHOLDER);
/***********************
*      Variables
***********************/


/***********************
*      Methods
***********************/
//Load CSS Files
function loadCSS(href) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    document.head.appendChild(link);
}


function createProductsInLocalStorage() {
    // Sample data for 5 products
    const products = [
        {
            ID: 1,
            Image: '../Materials/Images/macbook.jpg',
            Title: 'MacBook Air M2',
            Category: 'computer',
            Brand: 'Apple',
            Price: 1199,
            Discount: 100,
            Quantity: 25,
            isNew: true,
            Status: 'in stock',
            Description: '13-inch MacBook Air with M2 chip, 8GB RAM, 256GB SSD.'
        },
        {
            ID: 2,
            Image: '../Materials/Images/dellxps.jpg',
            Title: 'Dell XPS 13',
            Category: 'computer',
            Brand: 'Dell',
            Price: 999,
            Discount: 50,
            Quantity: 15,
            isNew: true,
            Status: 'in stock',
            Description: 'Dell XPS 13 with Intel Core i7, 16GB RAM, 512GB SSD.'
        },
        {
            ID: 3,
            Image: '../Materials/Images/hpomen.png',
            Title: 'HP Omen 16',
            Category: 'computer',
            Brand: 'HP',
            Price: 1399,
            Discount: 150,
            Quantity: 8,
            isNew: false,
            Status: 'in stock',
            Description: 'Gaming laptop with RTX 4060, 16GB RAM, 1TB SSD.'
        },
        {
            ID: 4,
            Image: '../Materials/Images/iphone15.jpg',
            Title: 'iPhone 15 Pro',
            Category: 'smartphone',
            Brand: 'Apple',
            Price: 999,
            Discount: 0,
            Quantity: 30,
            isNew: true,
            Status: 'in stock',
            Description: 'Latest iPhone 15 Pro with A17 Pro chip and 128GB storage.'
        },
        {
            ID: 5,
            Image: '../Materials/Images/s23ultra.jpg',
            Title: 'Samsung Galaxy S23 Ultra',
            Category: 'smartphone',
            Brand: 'Samsung',
            Price: 1199,
            Discount: 100,
            Quantity: 12,
            isNew: true,
            Status: 'in stock',
            Description: 'Galaxy S23 Ultra with 200MP camera and 12GB RAM.'
        },
        {
            ID: 6,
            Image: '../Materials/Images/pixel8.jpg',
            Title: 'Google Pixel 8',
            Category: 'smartphone',
            Brand: 'Google',
            Price: 699,
            Discount: 50,
            Quantity: 0,
            isNew: false,
            Status: 'out of stock',
            Description: 'Google Pixel 8 with Tensor G3 chip and 128GB storage.'
        },
        {
            ID: 7,
            Image: '../Materials/Images/asusvivobook.png',
            Title: 'ASUS VivoBook 15',
            Category: 'computer',
            Brand: 'ASUS',
            Price: 549,
            Discount: 30,
            Quantity: 20,
            isNew: false,
            Status: 'in stock',
            Description: 'Budget-friendly laptop with Intel i5, 8GB RAM, 256GB SSD.'
        },
        {
            ID: 8,
            Image: '../Materials/Images/redminote13.jpg',
            Title: 'Redmi Note 13 Pro',
            Category: 'smartphone',
            Brand: 'Xiaomi',
            Price: 299,
            Discount: 20,
            Quantity: 40,
            isNew: true,
            Status: 'in stock',
            Description: 'Affordable phone with AMOLED display and 108MP camera.'
        },
        {
            ID: 9,
            Image: '../Materials/Images/airpodspro.jpg',
            Title: 'AirPods Pro (2nd Gen)',
            Category: 'accessories',
            Brand: 'Apple',
            Price: 249,
            Discount: 10,
            Quantity: 50,
            isNew: false,
            Status: 'in stock',
            Description: 'Wireless earbuds with active noise cancellation.'
        },
        {
            ID: 10,
            Image: '../Materials/Images/logitechmx.jpg',
            Title: 'Logitech MX Master 3S',
            Category: 'accessories',
            Brand: 'Logitech',
            Price: 99,
            Discount: 15,
            Quantity: 60,
            isNew: false,
            Status: 'in stock',
            Description: 'Ergonomic wireless mouse with advanced scrolling.'
        },
        {
            ID: 11,
            Image: '../Materials/Images/ankerhub.jpg',
            Title: 'Anker USB-C Hub',
            Category: 'accessories',
            Brand: 'Anker',
            Price: 59,
            Discount: 0,
            Quantity: 100,
            isNew: true,
            Status: 'in stock',
            Description: '7-in-1 USB-C hub with HDMI, SD card, and USB 3.0.'
        },
        {
            ID: 12,
            Image: '../Materials/Images/samsungbuds.jpg',
            Title: 'Samsung Galaxy Buds2 Pro',
            Category: 'accessories',
            Brand: 'Samsung',
            Price: 229,
            Discount: 30,
            Quantity: 22,
            isNew: true,
            Status: 'in stock',
            Description: 'Wireless earbuds with 360 audio and ANC.'
        },
        {
            ID: 13,
            Image: '../Materials/Images/magicmouse.jpg',
            Title: 'Magic Mouse 2',
            Category: 'accessories',
            Brand: 'Apple',
            Price: 79,
            Discount: 5,
            Quantity: 0,
            isNew: false,
            Status: 'out of stock',
            Description: 'Rechargeable multi-touch Apple mouse.'
        },
        {
            ID: 14,
            Image: '../Materials/Images/lenovolegnion.jpg',
            Title: 'Lenovo Legion 5',
            Category: 'computer',
            Brand: 'Lenovo',
            Price: 1099,
            Discount: 80,
            Quantity: 10,
            isNew: false,
            Status: 'in stock',
            Description: 'Gaming laptop with Ryzen 7, RTX 3050, and 16GB RAM.'
        },
        {
            ID: 15,
            Image: '../Materials/Images/oppo.png',
            Title: 'Oppo Reno10',
            Category: 'smartphone',
            Brand: 'Oppo',
            Price: 499,
            Discount: 25,
            Quantity: 18,
            isNew: true,
            Status: 'in stock',
            Description: 'Mid-range phone with sleek design and fast charging.'
        }
    ];

    // Sample data for 5 products
    const cart = [
        {
            ID: 5,
            Image: '../Materials/Images/s23ultra.jpg',
            Title: 'Samsung Galaxy S23 Ultra',
            Category: 'smartphone',
            Brand: 'Samsung',
            Price: 1199,
            Discount: 100,
            Quantity: 2,
            isNew: true,
            Status: 'in stock',
            Description: 'Galaxy S23 Ultra with 200MP camera and 12GB RAM.'
        },
        {
            ID: 14,
            Image: '../Materials/Images/lenovolegnion.jpg',
            Title: 'Lenovo Legion 5',
            Category: 'computer',
            Brand: 'Lenovo',
            Price: 1099,
            Discount: 80,
            Quantity: 1,
            isNew: false,
            Status: 'in stock',
            Description: 'Gaming laptop with Ryzen 7, RTX 3050, and 16GB RAM.'
        },
        {
            ID: 11,
            Image: '../Materials/Images/ankerhub.jpg',
            Title: 'Anker USB-C Hub',
            Category: 'accessories',
            Brand: 'Anker',
            Price: 59,
            Discount: 0,
            Quantity: 10,
            isNew: true,
            Status: 'in stock',
            Description: '7-in-1 USB-C hub with HDMI, SD card, and USB 3.0.'
        }, 
    ];

    // Save to localStorage under the name 'Products'
    localStorage.setItem('Products', JSON.stringify(products));
    localStorage.setItem('Cart', JSON.stringify(cart));

    console.log('5 product entries have been added to localStorage.');
}

function createUsersInLocalStorage() {
    // Sample data for 2 users
    const users = [
        {
            ID: 1,
            firstName: 'Admin',
            LastName: 'Admin',
            Username: 'admin',
            Phone: '011',
            Email: 'admin@gmail',
            Password: '123',
        },
    ];

    // Save to localStorage under the name 'Users'
    localStorage.setItem('Users', JSON.stringify(users));

    console.log('2 Users entries have been added to localStorage.');


    /*  logged In User
    That we will use in home page*/
    const loggedInUser = 
        {
            ID: 1,
            firstName: 'Admin',
            LastName: 'Admin',
            Username: 'admin',
            Phone: '011',
            Email: 'admin@gmail',
            Password: '123',
        }
    ;

    // Save to localStorage under the name 'LoggedInUser'
    localStorage.setItem('LoggedInUser', JSON.stringify(loggedInUser));

    console.log('loggedInUser entrie have been added to localStorage.');
}

/***********************
*        Events
***********************/
//CSS Files
loadCSS('../CSS/navbarStyle.css');
loadCSS('../CSS/footerStyle.css');
loadCSS('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&icon_names=account_circle');

//Navbar
fetch('../HTML/navbar.html')
.then(res => res.text())
.then(data => {
    NAVBAR_PLACEHOLDER.innerHTML = data;
    const script = document.createElement('script');
    script.src = '../JS/navbarScript.js';
    document.body.appendChild(script);
});

//Footer
fetch('../HTML/footer.html')
.then(res => res.text())
.then(data => {
    FOOTER_PLACEHOLDER.innerHTML = data;
    const script = document.createElement('script');
    script.src = '../JS/footerScript.js';
    document.body.appendChild(script);
});

if (!localStorage.getItem('Products')) {
    createProductsInLocalStorage();
}

if (!localStorage.getItem('Users')) {
    createUsersInLocalStorage();
}