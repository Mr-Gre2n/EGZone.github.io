// Cart Page Script

// elements
let subTotal =0;
let discuontValue = 0;
let orderTotal =0;
let productID =0;
let productDiscount = 0;
let productQuantity = 0;
const cartItemsContainer = document.getElementById("cartList");
const cartItemsContainerArray = [];
// const cartCount = document.querySelector(".cart-count");
const productImage = document.getElementById("product-image");
const productTitleText = document.getElementById("product-title");
const productPriceText = document.getElementById("product-price");
const decrementButton = document.getElementById("decrement");
const productQuantityText = document.getElementById("product-quantity");
const incrementButton = document.getElementById("increment");
const inStockText = document.getElementById("in-stock");
const removeItemButton= document.getElementById("remove-item-button");
const cartSubTotalPrice = document.getElementById("subTotal");
const discuont = document.getElementById("discuont");
const cartTotalPrice = document.getElementById("total");
const checkoutButton = document.getElementByIdr("checkout");

// buttons and elements refering to fn

decrementButton.onclick = decrement(productID,productQuantity);
productQuantityText.innerHTML = productQuantity;
incrementButton.onclick = increment(productID,productQuantity);
productQuantityText.innerHTML = productQuantity;
removeItemButton.onclick = removeItem(productID);
cartSubTotalPrice.innerHTML = subTotal;
discuont.innerHTML = discuontValue;
cartTotalPrice.innerHTML = orderTotal;
checkoutButton.onclick = checkout;

// functions of the cart page
function getItem_localStorage(product){
    // product name
    const productName = product.getAttribute("data-product-name");
    // product price
    const productPrice = product.getAttribute("data-product-price");
    // product image 
    const productImage = product.getAttribute("data-product-image");
    // product quantity
    const productQuantity = product.getAttribute("data-product-quantity");

    // Create a new cart item object
    const cartItem = {
        id: productID++,
        name: productName,
        price: parseFloat(productPrice),
        discuont: parseFloat(productDiscount),
        image: productImage,
        quantity: parseInt(productQuantity)
    };

    // Update the cart count in the header
    updateCartCount();
}

function cartItemsLocalStorage(){
    let cart = window.localStorage.getItem("cart");
    if(cart){
        cart = JSON.parse(cart);
        cart.forEach(product => {
            const cartItem = document.createElement("div");
            cartItem.classList.add("cart-item");

            // Create the HTML structure for the cart item
            cartItem.innerHTML = `
                <img src="${product.image}" alt="Product Image">
                <div class="product-details">
                    <h3 class="product-title" >${product.name}</h3>
                    <p class="product-price">Price: $${product.price}</p>
                    <div class="quantity">
                        <button class="decrement" id="decrement" data-product-id="${product.id}">-</button>
                        <p class="product-quantity" data-product-id="${product.id}">${product.quantity}</p>
                        <button class="increment" id="increment" data-product-id="${product.id}">+</button>
                    </div>
                    <p class="in-stock" id="in-stock">${product.stock}</p>
                </div>
                <div class="removeButton">
                    <button class="remove-item-button" data-product-id="${product.id}">Remove</button>
                </div>
            `;

            // Append the cart item to the container
            cartItemsContainer.appendChild(cartItem);
        });
    }
}

function checkout(){ 
    window.location.href = "checkout.html";
}

function increment(productID,productQuantity){
    productQuantity++;
}

function decrement(productID,productQuantity){
    productQuantity--;
}

function removeItem(product){

}

function updateCartCount(){
    // Get the cart from local storage
    let cart = window.localStorage.getItem("cart");
    if(cart){
        cart = JSON.parse(cart);
        // Update the cart count in the header
        const cartCount = document.querySelector(".cart-count");
        cartCount.innerHTML = cart.length;
    }
}
function cartItemsContainerArray(){

}

function discountCalc(){
    cart.forEach(product => {
        discuontValue += product.discuont;
    });
    discuont.innerHTML = `$${discuontValue.toFixed(2)}`;
    return discuontValue;
}

function totalPrice(){
    // Calculate the subtotal, discount, and total price
    subTotal = cartItemsContainerArray.reduce((total, item) => total + item.price * item.quantity, 0);
    discuontValue = subTotal * 0.1; // Assuming a 10% discount for demonstration
    orderTotal = subTotal - discuontValue;
    
    // Update the displayed prices
    cartSubTotalPrice.innerHTML = `$${subTotal.toFixed(2)}`;
    discuont.innerHTML = `$${discuontValue.toFixed(2)}`;
    cartTotalPrice.innerHTML = `$${orderTotal.toFixed(2)}`;
}