const FORM = document.getElementById("login-form");
const NAME_INPUT = document.getElementById("name-input");
const PASSWORD_INPUT = document.getElementById("password-input");
const ERROR_MESSAGE = document.getElementById("error-message");


let users = [
    { id: 1, username: "John Doe", password: "password123" },
];

localStorage.setItem("users", JSON.stringify(users));

FORM.addEventListener("submit", function (e) {
    let errors = [];
    
    errors = getLoginFormErrors(NAME_INPUT.value, PASSWORD_INPUT.value)
    
    if (errors.length > 0) {
        e.preventDefault(); // Prevent form submission
        ERROR_MESSAGE.innerHTML = errors.join(", ");
    }
})

function getLoginFormErrors(NAME_INPUT, PASSWORD_INPUT) {
    let errors = [];

    if (NAME_INPUT === "" || NAME_INPUT === null) {
    errors.push("Name cannot be empty.");
    NAME_INPUT.parentElement.classList.add("incorrect"); 
    }

    if (PASSWORD_INPUT === "" || PASSWORD_INPUT === null) {
    errors.push("Password cannot be empty.");
    PASSWORD_INPUT.parentElement.classList.add("incorrect"); 
    }

    return errors;
}


function checkUserInLocalStorage(NAME_INPUT, PASSWORD_INPUT) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    // Loop through users to find a match
    for (let i = 0; i < users.length; i++) {
        if (users[i].username === NAME_INPUT && users[i].password === PASSWORD_INPUT) {
            return id; // User found with matching credentials
        }
    }
    
    return false; // No matching user found
}

checkUserInLocalStorage(NAME_INPUT.value, PASSWORD_INPUT.value)