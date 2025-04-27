    /***********************
    *      Elements
    ***********************/
    const CART_COUNT = document.getElementById("cartCount");
    // const BTN_ACCOUNT = document.getElementById("account-btn");
    const LOGIN_BTN = document.getElementById("login-btn");
    const DROPDOWN_MENU = document.getElementById("dropdown-menu");
    const SIGN_OUT_BTN = document.getElementById("sign-out-btn");
    const PROFILE_BTN = document.getElementById("profile-btn");
    const USER_DROPDOWN = document.getElementById("user-btn");

    /***********************
    *      Variables
    ***********************/
    let cartItems = [
        { id: 1, name: "Item 1", quantity: 2 },
        { id: 2, name: "Item 2", quantity: 2 },
        { id: 3, name: "Item 3", quantity: 4 }
    ];
    
    let LoggedInUser =[
        { id: 1, name: "John Doe", email:""}
    ]
    localStorage.setItem("LoggedInUser", JSON.stringify(LoggedInUser));
    /************************/
    /* Check logged in user */
    /************************/
    function checkUser() {
        LoggedInUser = JSON.parse(localStorage.getItem("LoggedInUser")) || [];

        if (LoggedInUser) {
            LOGIN_BTN.innerText = LoggedInUser[0].name;
            return true;
        } else {
            
            LOGIN_BTN.innerText = "Login";
            LOGIN_BTN.addEventListener("click", function (e) {
                e.preventDefault();
                window.location.href = "../HTML/login.html" 
                ;})
            return false;
        }
    }


    /*********************** 
    *    cart counter
    ***********************/
    localStorage.setItem('cartItems', JSON.stringify(cartItems));

    function updateCartCountDisplay(cart) {
        function calculateTotalItems(cart) {
            let totalItems = 0;

            for (let i = 0; i < cart.length; i++) {
                totalItems += cart[i].quantity;
            }

            return totalItems;
        }

        const totalItems = calculateTotalItems(cart);

        CART_COUNT.innerText = totalItems;

        if (totalItems > 0) {
            CART_COUNT.style.display = 'flex';
        } else {
            CART_COUNT.style.display = 'none';
        }

        console.log(totalItems);
    }

    updateCartCountDisplay(cartItems);

    /************************/
    /*    Drop down menu    */
    /************************/
    USER_DROPDOWN.addEventListener("click", accountCheck);

    function accountCheck(e) {
        e.preventDefault();
        LoggedInUser = checkUser(); // Update loggedUser dynamically
        if (LoggedInUser) {
            DROPDOWN_MENU.classList.toggle("open-menu");
                    SIGN_OUT_BTN.addEventListener("click", signOutUser);
                    PROFILE_BTN.addEventListener("click", function () {
                        window.location.href = "/HTML/profilePage.html";
                    });
                }
        else {
            // DROPDOWN_MENU.style.display = "none";
        }
    }

    function signOutUser() {
        localStorage.removeItem("LoggedInUser");
        location.reload();
    }
