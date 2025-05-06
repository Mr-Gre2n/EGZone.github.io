const FORM = document.getElementById("login-form");
const USERNAME = document.getElementById("userName");
const PASSWORD = document.getElementById("password");
const ERROR_MESSAGE = document.getElementById("error-messages");
const BTN_LOGIN = document.getElementById("login-btn");
const USERNAME_ERROR = document.getElementById("userNameError");
const PASSWORD_ERROR = document.getElementById("PasswordError");


BTN_LOGIN.addEventListener("click", function (e) {
    if (USERNAME.value == "" && PASSWORD.value == "") {
        USERNAME.classList.add("error");
        PASSWORD.classList.add("error");
        ERROR_MESSAGE.innerText = "Please enter username and password";
        return;
    }

    if(USERNAME.value == ""){
        e.preventDefault();
        USERNAME.classList.add("userName-error");
        // USERNAME_ERROR.style.display = "block";
        ERROR_MESSAGE.innerText = "Please enter your user name";
        return;
    }

    else if(PASSWORD.value == ""){
        e.preventDefault();
        PASSWORD.classList.add("error");
        // PASSWORD_ERROR.style.display = "block";
        ERROR_MESSAGE.innerText = "Please enter password";
        return;
    }

    

    const users = JSON.parse(localStorage.getItem('Users')) || [];
    let user ;
    let isFound = false;
    // Loop through users to find a match
    for (let i = 0; i < users.length; i++) {
        if (users[i].Username == USERNAME.value && users[i].Password == PASSWORD.value ) {
            user =  users[i]; // User found with matching credentials
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

// togglePassword.
// addEventListener('click', function (e) {

//     // Toggle the type attribute 
//     const type = password.getAttribute(
//         'type') === 'password' ? 'text' : 'password';
//     password.setAttribute('type', type);

//     // Toggle the eye slash icon 
//     if (togglePassword.src.match(
// "https://media.geeksforgeeks.org/wp-content/uploads/20210917150049/eyeslash.png")) {
//         togglePassword.src =
// "https://media.geeksforgeeks.org/wp-content/uploads/20210917145551/eye.png";
//     } else {
//         togglePassword.src =
// "https://media.geeksforgeeks.org/wp-content/uploads/20210917150049/eyeslash.png";
//     }
// });