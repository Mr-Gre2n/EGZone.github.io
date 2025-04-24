/***********************
*      Elements
***********************/
const CART_COUNT = document.getElementById("cartCount");
const BTN_ACCOUNT = document.getElementById("btnAccount");

/***********************
*      Variables
***********************/
let cartItems = [
    { id: 1, name: "Item 1", quantity: 2 },
    { id: 2, name: "Item 2", quantity: 3 },
    { id: 3, name: "Item 3", quantity: 4 }
];

/***********************
* Check logged in user
************************/

function checkUser() {
    let LoggedInUser = JSON.parse(localStorage.getItem("LoggedInUser")) || [];
    console.log(LoggedInUser)
    if (LoggedInUser) {
        BTN_ACCOUNT.innerText = LoggedInUser[0].name;
    }
    else{
        BTN_ACCOUNT.innerText = "Login";
    }
}
checkUser();

/*********************** 
*    cart counter
***********************/
localStorage.setItem('cartItems', JSON.stringify(cartItems));

function updateCartCountDisplay(cart) {

    cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    function calculateTotalItems(cartItems) {
        let totalItems = 0;
    
        for (let i = 0; i < cart.length; i++) {
            totalItems += cart[i].quantity;
        }
    
        return totalItems;
    }

    const totalItems = calculateTotalItems(cart)
    
        CART_COUNT.innerText = totalItems;
    
        if (totalItems > 0) {
            CART_COUNT.style.display = 'flex';
        } else {
            CART_COUNT.style.display = 'none';
        }

        console.log(totalItems)
}
updateCartCountDisplay(cartItems);
