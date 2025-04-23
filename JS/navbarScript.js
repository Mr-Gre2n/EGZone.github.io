/***********************
*      Elements
***********************/
const CART_COUNT = document.getElementById("cartCount");
const BTN_ACCOUNT = document.getElementById("btnAccount");

const Search = document.getElementById("searchBar")
const Results = document.getElementById("results")
var data = localStorage.getItem("title")
/***********************
*      Variables
***********************/
/*********************** 
*    cart counter
***********************/

/***********************
*     Data Events
***********************/
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
*  Update cart count
***********************/

localStorage.setItem('cartItems', JSON.stringify(cartItems));

function updateCartCountDisplay(cartItems) {
    
    function calculateTotalItems(cartItems) {
        let totalItems = 0;
    
        for (let i = 0; i < cartItems.length; i++) {
            totalItems += cartItems[i].quantity;
        }
    
        return totalItems;
    }

    
    const totalItems = calculateTotalItems(cartItems)
    
        cartCountElement.textContent = totalItems;
    
        if (totalItems > 0) {
            cartCountElement.style.display = 'flex';
        } else {
            cartCountElement.style.display = 'none';
        }
} 
updateCartCountDisplay(cartItems);
