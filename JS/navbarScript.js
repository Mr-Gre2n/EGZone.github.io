/***********************
*      Elements
***********************/
const CART_COUNT = document.getElementById("cartCount");
const BTN_ACCOUNT = document.getElementById("btnAccount");


/***********************
*      Variables
***********************/

/***********************
*      Methods
***********************/

/***********************
*     Data Events
***********************/
function checkUser() {
    let LoggedInUser = JSON.parse(localStorage.getItem("LoggedInUser")) || [];
    console.log(LoggedInUser)
    if (LoggedInUser) {
        BTN_ACCOUNT.innerText = LoggedInUser[0].name;
    }else{
        BTN_ACCOUNT.innerText = "Login";
    }
}
checkUser();
/***********************
*     UI Events
***********************/
