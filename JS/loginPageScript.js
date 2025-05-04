const FORM = document.getElementById("login-form");
const USERNAME = document.getElementById("userName");
const PASSWORD = document.getElementById("password");
const ERROR_MESSAGE = document.getElementById("error-message");
const BTN_LOGIN = document.getElementById("login-btn");


// let users = [
//     { id: 1, username: "John Doe", password: "password123" },
// ];

// localStorage.setItem("users", JSON.stringify(users));

BTN_LOGIN.addEventListener("click", function () {
    if (USERNAME.value == "") {
        alert('Please enter username');
        return;
    }
    if (PASSWORD.value == "") {
        alert('Please enter password');
        return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    let user = ""
    // Loop through users to find a match
    for (let i = 0; i < users.length; i++) {
        if (users[i].username == USERNAME.value && users[i].password == PASSWORD.value ) {
            user =  users[i]; // User found with matching credentials
        }
    }

    // if (user) {
        // localStorage.setItem("LoggedInUser", JSON.stringify(user));   
        window.location.href = "../HTML/homePage.html" 
    // }else{
    //     alert('incorrcet information');
    // }
})
