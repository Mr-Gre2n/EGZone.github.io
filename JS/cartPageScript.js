// Cart Page Script

// elements
let subTotal =0;
let discountValue = 0; 
let orderTotal =0;
let productID =0;
let productDiscount = 0;
let productQuantity = 0;
const cartItemsContainer = document.getElementById("cartList");
const cart = JSON.parse(localStorage.getItem("Cart"));
const products = JSON.parse(localStorage.getItem("Products"))
const cartSubTotalPrice = document.getElementById("subTotal");
const discount = document.getElementById("discount");
const cartTotalPrice = document.getElementById("total");
const checkoutButton = document.getElementById("checkout");

// functions

function cartItemsLocalStorage(){
    if(cart){
        for(let i=0; i<cart.length;i++){ //cart.forEach(Products => 
            let product  = document.createElement("div");
            product.classList.add("cart-item");
            product.setAttribute("data-product-id", cart[i].ID);
            // Create the HTML structure for the cart item
            product.innerHTML = ` 
                <div class="productDetails">
                    <img src="${cart[i].Image}" alt="Product Image" class="productImage">
                    <div>
                        <!-- product Name -->
                        <h3 class="product-title">${cart[i].Title}</h3>
                        
                        <!-- Price -->
                        <div class="price-container">
                            <p class="product-price">$${cart[i].Price - cart[i].Discount}</p>
                            <p class="product-discount">$${cart[i].Price}</p>
                        </div>

                        <!-- changing quantity the user need of this product -->
                        <div class="quantity">
                            <button class="decrement" data-product-id="${cart[i].ID}"><em>-</em></button>
                            <p class="product-quantity" id="product-quantity" data-product-id="${cart[i].ID}">${cart[i].Quantity}</p>
                            <button class="increment" data-product-id="${cart[i].ID}"><em>+</em></button>
                        </div>

                        <!-- says that if it in stock or not -->
                        <p class="status-option"  data-product-id="${cart[i].ID}">${cart[i].Status}</p>
                    </div>
                </div>

                <button class="button removeButton" data-product-id="${cart[i].ID}">X</button>
            `;

            // Append the cart item to the container
            cartItemsContainer.appendChild(product);

            if(cart[i].Discount == "" || cart[i].Discount == 0){
                product.querySelector(".product-discount").style.display = "none";
                product.querySelector(".product-price").classList.add("only");
            }
        };
    }
    
    document.querySelectorAll(".increment").forEach(btn => {
        btn.addEventListener("click", () => {
            const productID = btn.getAttribute("data-product-id");
            const productQuantity = parseInt(document.querySelector(`.product-quantity[data-product-id="${productID}"]`).innerHTML);
            increment(productID,productQuantity);
        });
    });

    document.querySelectorAll(".decrement").forEach(btn => {
        btn.addEventListener("click", () => {
            const productID = btn.getAttribute("data-product-id");
            const productQuantity = parseInt(document.querySelector(`.product-quantity[data-product-id="${productID}"]`).innerHTML);
            decrement(productID,productQuantity);
        });
    });
}
cartItemsLocalStorage();

cartItemsContainer.addEventListener("click", (e) =>{
    //Remove Item from cart
    if(e.target.classList.contains("removeButton")){
        //remove the item from page
        e.target.parentElement.remove();
        // remove the item from local storage
        const productID = document.querySelector(".removeButton[data-product-id='${productID}']");
        // console.log(productID);
        removeItem(productID);
    }
    // check if the user click on the increment or decrement button  
    // increment and decrement the quantity of the product
    // if(e.target.classList.contains("increment")){
    //     // increment the quantity of the product
    //     const productID = e.target.getAttribute("data-product-id");
    //     const productQuantity = parseInt(document.querySelector(`.product-quantity[data-product-id="${productID}"]`).innerHTML);
    //     increment(productID,productQuantity);
    // }
    // if(e.target.classList.contains("decrement")){
    //     // decrement the quantity of the product
    //     const productID = e.target.getAttribute("data-product-id");
    //     const productQuantity = parseInt(document.querySelector(`.product-quantity[data-product-id="${productID}"]`).innerHTML);
    //     decrement(productID,productQuantity);
    // }
});

// increment and decrement the quantity of the product

function increment(productID,productQuantity){
let productIndex;
    for(let i=0; i<products.length;i++){
        if(products[i].ID == productID){
            productIndex = i;
            break;
        }
    }
    
// check if the product quantity is less than the available quantity
if(productQuantity < products[productIndex].Quantity){
    productQuantity++;
// update the quantity in local storage

    for(let i=0; i<cart.length;i++){
        if(cart[i].ID == productID){
            productIndex = i;
            break;
        }
    }
    cart[productIndex].Quantity = productQuantity;
    window.localStorage.setItem("Cart", JSON.stringify(cart));

    // update the quantity in the page
    const productQuantityText = document.querySelector(`.product-quantity[data-product-id="${productID}"]`);
    productQuantityText.innerText = productQuantity;
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
        console.log(productQuantity);
        cart[productIndex].Quantity = productQuantity;
        window.localStorage.setItem("Cart", JSON.stringify(cart));
    }
    // update the quantity in the page
    const productQuantityText = document.querySelector(`.product-quantity[data-product-id="${productID}"]`);
    productQuantityText.innerText = productQuantity;
    // update the subtotal, discount and total price
    totalPrice();
}

function removeItem(productID){
    // remove the item from local storage
    const productIndex = cart.findIndex(product => product.ID == productID);
    cart.splice(productIndex, 1);
    window.localStorage.setItem("Cart", JSON.stringify(cart));

    // update the subtotal, discount and total price
    totalPrice();
}

// calculat subtotal, discount and total price and go to checkout page

function subTotalPrice(){
    // reset subtotal value
    subTotal = 0;
    // calculate the subtotal value
    if(cart){
        for(let i=0; i<cart.length ; i++){
            subTotal += cart[i].Price * cart[i].Quantity;
        }
        // update the subtotal value in the page
        cartSubTotalPrice.innerText = subTotal.toFixed(2);
        // console.log("subtotal: ",subTotal);
        return subTotal;
    } else{
        cartSubTotalPrice.innerText = `0.00`;
        return 0;
    }
}

function discountCalc(){
    // reset discount value
    discountValue = 0;
    // calculate the discount value
    if(cart){
        for(let i=0; i<cart.length ; i++){
            if(cart[i].Discount > 0){
                // check if the product has discount
                discountValue += cart[i].Discount * cart[i].Quantity;
            }   
        }
    }
    // console.log("Discount:",discountValue);
    if(discountValue>0){
        discount.innerText = discountValue.toFixed(2);
        return discountValue;
    } else{
        discount.innerText = `0.00`;
        return 0;
    }
}

function totalPrice(){
    // Calculate total price
    orderTotal = subTotalPrice() - discountCalc();
    // console.log("Total: ",orderTotal);
    cartTotalPrice.innerText = orderTotal.toFixed(2);
}
totalPrice();

// go to checkout page

checkoutButton.addEventListener("click", () => { 
    window.location.href = "checkoutPage.html";
});