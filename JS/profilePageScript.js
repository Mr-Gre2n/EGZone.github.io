/***********************
*      Elements        *
***********************/
const firstNameInput = document.getElementById('firstName');
const lastNameInput = document.getElementById('lastName');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phoneNum');
const sidebarName = document.getElementById('sidebar-name');
const sidebarEmail = document.getElementById('sidebar-email');
const edit = document.getElementById('edit');
const save = document.getElementById('save');
const cancel = document.getElementById('cancel');
const actionButtons = document.getElementById('actionButtons');

// to store original values for cancelling
let originalValues = {};

function dataFromStorage() {
    let loggedInUser = [
        {
            ID: 1,
            name: 'Admin',
            Username: 'admin',
            Password: '123',
            email: 'name@example.com',
            phone: '1234567890',
        },
    ];
    const firstName = localStorage.getItem('LoggedInUser') || "Mark" ; 
    
    // Fill the form with the data
    firstNameInput.value = firstName;
    lastNameInput.value = lastName;
    emailInput.value = email;
    phoneInput.value = phone;
    
    // Update sidebar info
    sidebarName.textContent = firstName + ' ' + lastName;
    sidebarEmail.textContent = email;
    
    //Store original values
    originalValues = {
        firstName,
        lastName,
        email,
        phone
    };
}

dataFromStorage();

edit.onclick = editInfo;

function editInfo(){
    originalValues = {
        firstName: firstNameInput.value,
        lastName: lastNameInput.value,
        email: emailInput.value,
        phone: phoneInput.value
    };
    
    // Make fields editable
    firstNameInput.removeAttribute('readonly');
    lastNameInput.removeAttribute('readonly');
    emailInput.removeAttribute('readonly');
    phoneInput.removeAttribute('readonly');
    
    // Show action buttons
    actionButtons.style.display = 'block';
    
    // Focus on first field
    firstNameInput.focus();
};

//Cancel editing
cancel.onclick = cancelling;

function cancelling() {
    // Restore original values
    firstNameInput.value = originalValues.firstName;
    lastNameInput.value = originalValues.lastName;
    emailInput.value = originalValues.email;
    phoneInput.value = originalValues.phone;

    // Make fields readonly again
    firstNameInput.setAttribute('readonly', true);
    lastNameInput.setAttribute('readonly', true);
    emailInput.setAttribute('readonly', true);
    phoneInput.setAttribute('readonly', true);
    
    // Hide action buttons
    actionButtons.style.display = 'none';
};

// Save changes
save.onclick = saveInfo;

function saveInfo() {
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
    
    // Make fields readonly again
    // firstNameInput.setAttribute('readonly', true);
    // lastNameInput.setAttribute('readonly', true);
    // emailInput.setAttribute('readonly', true);
    // phoneInput.setAttribute('readonly', true);
    
    // Hide action buttons
    // actionButtons.style.display = 'none';
    
    alert('Account information saved successfully!');
};