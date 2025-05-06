/***********************
*      Elements
***********************/
const CART_COUNT = document.getElementById("cartCount");
const LOGIN_BTN = document.getElementById("login-btn");
const USERNAME = document.getElementById("txt-uername");
const DROPDOWN_MENU = document.getElementById("dropdown-menu");
const SIGN_OUT_BTN = document.getElementById("sign-out-btn");
const PROFILE_BTN = document.getElementById("profile-btn");
const USER_DROPDOWN = document.getElementById("user-btn");
const SEARCH_INPUT = document.getElementById("search-bar-input");

/***********************
*      Variables
***********************/

/*************************/
/*        Methods        */
/*************************/

// function to check if the user is logged in and display the username
function checkUser() {
    const LoggedInUser = JSON.parse(localStorage.getItem("LoggedInUser"));
    
    if (LoggedInUser) {
        USERNAME.innerText = LoggedInUser.firstName;
        return true;
    }else{ 
        USERNAME.innerText = "Login";
        return false;
    }
}

// function to update the cart count display
function updateCartCountDisplay() {
    const CART = JSON.parse(localStorage.getItem("Cart"))|| [];
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


// function to sign out the user and remove their data from local storage
function signOutUser() {
    localStorage.removeItem("LoggedInUser");
    location.reload();
}

// function to handle the search input
function handleSearch(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        const searchTerm = SEARCH_INPUT.value.trim();
        if (searchTerm) {
            window.location.href = `../HTML/searchPage.html?title=${encodeURIComponent(searchTerm)}`;
        }
    }
}

/************************/
/*         Events       */
/************************/
checkUser();
updateCartCountDisplay();


LOGIN_BTN.addEventListener("click", function (e) {
    e.preventDefault();
    if (checkUser() == true) {
        DROPDOWN_MENU.classList.toggle("open-menu");
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

SIGN_OUT_BTN.addEventListener("click", signOutUser);


PROFILE_BTN.addEventListener("click", function () {
    window.location.href = "../HTML/profilePage.html";
});


SEARCH_INPUT.addEventListener("keydown", handleSearch);
