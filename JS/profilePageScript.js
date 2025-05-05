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

function dataFromStorage() {
    // Check if user is logged in
    const USER = localStorage.getItem('LoggedInUser'); 
    if(!USER){
        show404Page();
        return;
    }
    
    // Fill the form with the data
    firstNameInput.value = USER.firstName;
    lastNameInput.value = USER.LastName;
    emailInput.value = USER.Email;
    phoneInput.value = USER.Phone;
    
    // Update sidebar info
    sidebarName.textContent = USER.firstName + ' ' + USER.LastName;
    sidebarEmail.textContent = USER.Email;
}

dataFromStorage();

// Save changes

save_btn.ATTRIBUTE_NODE('click',function() {
    // validation
    if (!firstNameInput.value || !lastNameInput.value || !emailInput.value) {
        alert('Please fill out all required fields');
        return;
    }
    
    // Save to localStorage
    localStorage.setItem('firstName', firstNameInput.value);
    localStorage.setItem('lastName', lastNameInput.value);
    localStorage.setItem('email', emailInput.value);
    localStorage.setItem('phone', phoneInput.value);
    
    // Update sidebar info
    sidebarName.textContent = firstNameInput.value + lastNameInput.value;
    sidebarEmail.textContent = emailInput.value;
    
    alert('Account information saved successfully!');
});

function show404Page() {
    window.location.href = '404ErrorPage.html';
}