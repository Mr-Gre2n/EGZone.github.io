/***********************
*      Elements
***********************/
const CART_COUNT = document.getElementById("cartCount");
// const BTN_ACCOUNT = document.getElementById("account-btn");
const LOGIN_BTN = document.getElementById("login-btn");
const USERNAME = document.getElementById("txt-uername");
const DROPDOWN_MENU = document.getElementById("dropdown-menu");
const SIGN_OUT_BTN = document.getElementById("sign-out-btn");
const PROFILE_BTN = document.getElementById("profile-btn");
const USER_DROPDOWN = document.getElementById("user-btn");
 
/***********************
*      Variables
***********************/
const CART = JSON.parse(localStorage.getItem("Cart"));

/************************/
/* Check logged in user */
/************************/
function checkUser() {
    LoggedInUser = JSON.parse(localStorage.getItem("LoggedInUser"));

    if (LoggedInUser) {
        USERNAME.innerText = LoggedInUser.firstName;
        return true;
    }else{ 
        USERNAME.innerText = "Login";
        return false;
    }
}

function handleDropDownMenu() {
    DROPDOWN_MENU.classList.toggle("open-menu");
}

/*********************** 
*    cart counter
***********************/

function updateCartCountDisplay() {
    function calculateTotalItems(cart) {
        let totalItems = 0;

        for (let i = 0; i < cart.length; i++) {
            totalItems += cart[i].Quantity;
        }

        return totalItems;
    }

    const totalItems = calculateTotalItems(CART);

    CART_COUNT.innerText = totalItems;

    if (totalItems > 0) {
        CART_COUNT.style.display = 'flex';
    } else {
        CART_COUNT.style.display = 'none';
    }
}

updateCartCountDisplay();

/************************/
/*    Drop down menu    */
/************************/



function signOutUser() {
    localStorage.removeItem("LoggedInUser");
    location.reload();
}


/************************/
/*         Events       */
/************************/
checkUser();

LOGIN_BTN.addEventListener("click", function (e) {
    e.preventDefault();
    if (checkUser() == true) {
        handleDropDownMenu();
        return;
    }else{
        window.location.href = "../HTML/loginPage.html";
    }
});

document.addEventListener("click", function (e) {    
    if (LOGIN_BTN != e.target ){
        DROPDOWN_MENU.classList.remove("open-menu");
    }
});