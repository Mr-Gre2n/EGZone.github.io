// Cart Page Script

// elements
let subTotal =0;
let discuontValue = 0; 
let orderTotal =0;
let productID =0;
let productDiscount = 0;
let productQuantity = 0;
const cartItemsContainer = document.getElementById("cartList");
const cart = window.localStorage.getItem("Cart");
cart = JSON.parse(cart);
const cartSubTotalPrice = document.getElementById("subTotal");
const discuont = document.getElementById("discuont");
const cartTotalPrice = document.getElementById("total");
const checkoutButton = document.getElementByIdr("checkout");

// functions

function cartItemsLocalStorage(){
    if(cart){
        for(let i=0; i<cart.length;i++){ //cart.forEach(Products => 
            cart[i] = document.createElement("div");
            cart[i].classList.add("cart-item");
            cart[i].setAttribute("data-product-id", Products.ID);

            // Create the HTML structure for the cart item
            cart[i].innerHTML = ` 
                <div class="productDetails">
                    <img src="${cart[i].Image}" alt="Product Image" class="productImage">
                    <div>
                        <!-- product Name -->
                        <h3 class="product-title">${cart[i].Title}</h3>
                        
                        <!-- Price -->
                        <p class="product-price">$${cart[i].Price}</p>
                        
                        <!-- changing quantity the user need of this product -->
                        <div class="quantity">
                            <button class="decrement" data-product-id="${cart[i].ID}"><em>-</em></button>
                            <p class="product-quantity" id="product-quantity" data-product-id="${cart[i].ID}">${cart[i].quantity}</p>
                            <button class="increment" data-product-id="${cart[i].ID}"><em>+</em></button>
                        </div>

                        <!-- says that if it in stock or not -->
                        <p class="status-option"  data-product-id="${cart[i].ID}">${cart[i].Status}</p>
                    </div>
                </div>

                <button class="button removeButton" data-product-id="${cart[i].ID}">X</button> //id="remove-item-button"
            `;
            if(cart[i].Quantity >= 1){
                let inStockText = document.querySelector(`.status-option[data-product-id="${cart[i].ID}"]`);
                inStockText.classList.add("In-Stock");
            } else{
                let inStockText = document.querySelector(`.status-option[data-product-id="${cart[i].ID}"]`);
                inStockText.classList.add("Out-of-Stock");
            }

            // Append the cart item to the container
            cartItemsContainer.appendChild(cartItem);
        };
        totalPrice();
    }
}
cartItemsLocalStorage();

cartItemsContainer.addEventListener("click", (e) =>{
    //Remove Item from cart
    if(e.target.classList.contains("removeButton")){
        //remove the item from page
        e.target.parentElement.remove();
        // remove the item from local storage
        const productID = e.target.parentElement.getAttribute("data-product-id");
        removeItem(productID);
    }
    // check if the user click on the increment or decrement button  
    // increment and decrement the quantity of the product
    if(e.target.classList.contains("increment")){
        // increment the quantity of the product
        const productID = e.target.getAttribute("data-product-id");
        const productQuantity = parseInt(document.querySelector(`.product-quantity[data-product-id="${productID}"]`).innerHTML);
        increment(productID,productQuantity);
    }
    if(e.target.classList.contains("decrement")){
        // decrement the quantity of the product
        const productID = e.target.getAttribute("data-product-id");
        const productQuantity = parseInt(document.querySelector(`.product-quantity[data-product-id="${productID}"]`).innerHTML);
        decrement(productID,productQuantity);
    }
});

// increment and decrement the quantity of the product

function increment(productID,productQuantity){
let productIndex;
    for(let i=0; i<cart.length;i++){
        if(cart[i].ID == productID){
            productIndex = i;
            break;
        }
    }
    
// check if the product quantity is less than the available quantity
if(productQuantity< cart[productIndex].Quantity){
    productQuantity++;
// update the quantity in local storage

    cart[productIndex].quantity = productQuantity;
    window.localStorage.setItem("cart", JSON.stringify(cart));

    // update the quantity in the page
    const productQuantityText = document.querySelector(`.product-quantity[data-product-id="${productID}"]`);
    productQuantityText.innerHTML = productQuantity;
    // update the subtotal, discount and total price
    totalPrice();
}
}

function decrement(productID,productQuantity){
    let productIndex;
    for(let i=0; i<cart.length;i++){
        if(cart[i].ID == productID){
            productIndex = i;
            break;
        }
    }
    if(productQuantity > 1){
        productQuantity--;
        // update the quantity in local storage

        cart[productIndex].quantity = productQuantity;
        window.localStorage.setItem("cart", JSON.stringify(cart));
    }
    // update the quantity in the page
    const productQuantityText = document.querySelector(`.product-quantity[data-product-id="${productID}"]`);
    productQuantityText.innerHTML = productQuantity;
    // update the subtotal, discount and total price
    totalPrice();
}

function removeItem(productID){
    // remove the item from local storage
    let cart = window.localStorage.getItem("cart");
    if(cart){
        cart = JSON.parse(cart);
        const productIndex = cart.findIndex(Products => Products.ID == productID);
        if(productIndex !== -1){
            cart.splice(productIndex, 1);
            window.localStorage.setItem("cart", JSON.stringify(cart));
        }
    }
    // update the subtotal, discount and total price
    totalPrice();
}

// calculat subtotal, discount and total price and go to checkout page

function subTotalPrice(){
    // reset subtotal value
    subTotal = 0;
    // calculate the subtotal value
    let cart = window.localStorage.getItem("cart");
    if(cart){
        cart = JSON.parse(cart);
        for(let i=0; i<cart.length ; i++){
            subTotal += cart[i].Price * cart[i].quantity;
        }
        // update the subtotal value in the page
        cartSubTotalPrice.innerHTML = `${subTotal.toFixed(2)}`;
        return subTotal;
    } else{
        cartSubTotalPrice.innerHTML = `0.00`;
        return 0;
    }
}

function discuontCalc(){
    // reset discuont value
    discuontValue = 0;
    // calculate the discount value
    let cart = window.localStorage.getItem("cart");
    if(cart){
        cart = JSON.parse(cart);
        for(let i=0; i<cart.length ; i++){
            discuontValue += cart[i].Discuont * cart[i].quantity;
        }
        discuont.innerHTML = `${discuontValue.toFixed(2)}`;
        return discuontValue;
    } else{
        discuont.innerHTML = `0.00`;
        return 0;
    }
    
}

function totalPrice(){
    // Calculate total price
    orderTotal = subTotalPrice() - discuontCalc();
    cartTotalPrice.innerHTML = `${orderTotal.toFixed(2)}`;
}

checkoutButton.addEventListener("click", () => { 
    window.location.href = "checkoutPage.html";
});