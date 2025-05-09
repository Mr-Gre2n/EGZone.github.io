const FORM = document.getElementById("login-form");
const USERNAME = document.getElementById("userName");
const PASSWORD = document.getElementById("password");
const ERROR_MESSAGE = document.getElementById("error-messages");
const BTN_LOGIN = document.getElementById("login-btn");
const USERNAME_ERROR = document.getElementById("userNameError");
const PASSWORD_ERROR = document.getElementById("PasswordError");
const TOGGLE_PASSWORD = document.getElementById("togglePassword");

// check if the user is already logged in
document.addEventListener("DOMContentLoaded", function () {
    const loggedInUser = JSON.parse(localStorage.getItem('LoggedInUser'));
    if (loggedInUser) {
        window.location.href = "../HTML/homePage.html";
    }
    const currentTheme = localStorage.getItem("Theme") || "light";
    document.documentElement.setAttribute("data-theme", currentTheme);
});

BTN_LOGIN.addEventListener("click", function (e) {
    
    // checks the fields if they are empty or not 
    if (USERNAME.value == "" && PASSWORD.value == "") {
        USERNAME.classList.add("error");
        PASSWORD.classList.add("error");
        ERROR_MESSAGE.innerText = "Please enter username and password";
        return;
    }

    if(USERNAME.value == ""){
        e.preventDefault();
        USERNAME.classList.add("userName-error");
        ERROR_MESSAGE.innerText = "Please enter your user name";
        return;
    }

    else if(PASSWORD.value == ""){
        e.preventDefault();
        PASSWORD.classList.add("error");
        ERROR_MESSAGE.innerText = "Please enter password";
        return;
    }

    // check if the user exists

    const users = JSON.parse(localStorage.getItem('Users')) || [] ; 
    let user ;
    let isFound = false;

    for (let i = 0; i < users.length; i++) {
        if (users[i].username== USERNAME.value && users[i].password == PASSWORD.value ) {
            user =  users[i]; 
            isFound = true;
            break;
        }
    }
    if (!isFound) {
        ERROR_MESSAGE.innerText = "Incorrect username or password";
        return;
    }
    else{
        localStorage.setItem('LoggedInUser', JSON.stringify(user));
        window.location.href = "../HTML/homePage.html" 
    }

})

// removes the error message when the user starts typing
USERNAME.addEventListener("input", function() {
    USERNAME.classList.remove("error");
});

PASSWORD.addEventListener("input", function() {
    PASSWORD.classList.remove("error");
});

document.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        BTN_LOGIN.click();
    }
});

// shows the password when clicked on the eye icon
TOGGLE_PASSWORD.addEventListener("click", function () {
    const passwordInput = document.getElementById("password");
    const eyeIcon = TOGGLE_PASSWORD.querySelector("i");

    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        eyeIcon.classList.remove("fa-eye-slash");
        eyeIcon.classList.add("fa-eye");
    } else {
        passwordInput.type = "password";
        eyeIcon.classList.remove("fa-eye")
        eyeIcon.classList.add("fa-eye-slash");
    }
});
