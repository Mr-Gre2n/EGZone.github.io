/*********************
*      Elements      *
**********************/
const firstNameInput = document.getElementById('firstName');
const lastNameInput = document.getElementById('LastName');
const emailInput = document.getElementById('Email');
const phoneInput = document.getElementById('Phone');
const sidebarName = document.getElementById('sidebar-name');
const sidebarEmail = document.getElementById('sidebar-email');
const save_btn = document.getElementById('save');

// Check if user is logged in
let loggedInUser = JSON.parse(localStorage.getItem('LoggedInUser')); 

function dataFromStorage() {
    if(!loggedInUser){
        show404Page();
        return;
    }
    // Fill the form with the data
    firstNameInput.value = loggedInUser.firstName;
    lastNameInput.value = loggedInUser.LastName;
    emailInput.value = loggedInUser.Email;
    phoneInput.value = loggedInUser.Phone;
    
    // Update sidebar info
    sidebarName.textContent = loggedInUser.firstName + ' ' + loggedInUser.LastName;
    sidebarEmail.textContent = loggedInUser.Email;
}

dataFromStorage();

// Save changes

save_btn.addEventListener('click',function() {
    // validation
    if (!firstNameInput.value || !lastNameInput.value || !emailInput.value) {
        alert('Please fill out all required fields');
        return;
    }
    loggedInUser.firstName = firstNameInput.value;    
    loggedInUser.LastName = lastNameInput.value;    
    loggedInUser.Email = emailInput.value;    
    loggedInUser.Phone = phoneInput.value;    
    // Update sidebar info
    sidebarName.textContent = firstNameInput.value + lastNameInput.value;
    sidebarEmail.textContent = emailInput.value;

    // Save to localStorage    
    let users = JSON.parse(localStorage.getItem('Users')); 
    const user = users.find(user => user.ID == loggedInUser.ID);
    users.splice(users.indexOf(user), 1, loggedInUser);

    localStorage.setItem('LoggedInUser', JSON.stringify(loggedInUser));   
    localStorage.setItem('Users', JSON.stringify(users));    

    alert('Account information saved successfully!');
});

function show404Page() {
    window.location.href = '../HTML/404ErrorPage.html';
}