document.addEventListener('DOMContentLoaded', function() {
    // Form elements
    const form = document.getElementById('ContactForm');
    const firstName = document.getElementById('firstName');
    const lastName = document.getElementById('lastName');
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');
    const country = document.getElementById('country');
    const subject = document.getElementById('subject');
    const message = document.getElementById('message');
    const submitBtn = document.getElementById('submitBtn');
    const genderRadios = document.getElementsByName('gender');
    const checkBox = document.getElementById('checkBox');
    
    // Error message elements
    const firstNameError = document.getElementById('firstNameError');
    const lastNameError = document.getElementById('lastNameError');
    const emailError = document.getElementById('emailError');
    const phoneError = document.getElementById('phoneError');
    const countryError = document.getElementById('countryError');
    const massageError= document.getElementById('massageError')
    const checkBoxError= document.getElementById('checkBoxError')
    
    // ID Card elements
    const idCard = document.getElementById('idCard');
    const cardName = document.getElementById('card-name');
    const cardEmail = document.getElementById('card-email');
    const cardPhone = document.getElementById('card-phone');
    const cardSubject = document.getElementById('card-subject');
    const cardMessage = document.getElementById('card-message');
    const cardPhoto = document.getElementById('card-photo');
    const cardCountryName = document.getElementById('card-country-name');
    const cardCountryFlag = document.getElementById('card-country-flag');
    
    // Rating elements
    const stars = document.querySelectorAll('.star');
    let currentRating = 0;
    
    // Terms modal elements
    const termsLink = document.getElementById('termsLink');
    const termsModal = document.getElementById('termsModal');
    const closeModal = document.getElementById('closeModal');

    // Set default gender image
    updateGenderImage('male');
    
    // Event Listeners
    form.addEventListener('submit', validateForm);
    firstName.addEventListener('input', () => updateCard());
    lastName.addEventListener('input', () => updateCard());
    email.addEventListener('input', () => updateCard());
    phone.addEventListener('input', () => updateCard());
    subject.addEventListener('input', () => updateCard());
    message.addEventListener('input', () => updateCard());
    country.addEventListener('change', () => {
    updateCard();
    });
    
    // Gender change event
    document.querySelectorAll('input[name="gender"]').forEach(radio => {
      radio.addEventListener('change', function() {
        updateGenderImage(this.value);
        updateCard();
      });
    });
    
    // Card flip event
    idCard.addEventListener('click', function() {
      this.classList.toggle('flipped');
    });
    
    // Star rating event
    stars.forEach(star => {
      star.addEventListener('click', function() {
        const value = parseInt(this.getAttribute('data-value'));
        setRating(value);
        currentRating = value;
      });
      
      star.addEventListener('mouseover', function() {
        const value = parseInt(this.getAttribute('data-value'));
        highlightStars(value);
      });
      
      star.addEventListener('mouseout', function() {
        highlightStars(currentRating);
      });
    });
    
    // Terms modal events
    termsLink.addEventListener('click', function() {
      termsModal.style.display = 'flex';
    });
    
    closeModal.addEventListener('click', function() {
      termsModal.style.display = 'none';
    });
    
    window.addEventListener('click', function(event) {
      if (event.target === termsModal) {
        termsModal.style.display = 'none';
      }
    });
    
    // Functions
    function validateForm(e) {
      e.preventDefault();
      let isValid = true;
      
      // Reset errors
      resetErrors();
      
      // Validate First Name
      if (firstName.value.trim() === '') {
        showError(firstName, firstNameError);
        isValid = false;
      }
      
      // Validate Last Name
      if (lastName.value.trim() === '') {
        showError(lastName, lastNameError);
        isValid = false;
      }
      
      // Validate Email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.value.trim())) {
        showError(email, emailError);
        isValid = false;
      }
      
      // Validate Phone (if provided)
      if (phone.value.trim() !== '') {
        const phoneRegex = /^\+?[0-9\s\-()]{8,20}$/;
        if (!phoneRegex.test(phone.value.trim())) {
          showError(phone, phoneError);
          isValid = false;
        }
      }else{
        let isValid = false;
        showError(phone, phoneError);
      }
      
      // Validate Country
      if (country.value === '') {
        showError(country, countryError);
        isValid = false;
      }
      if (message.value.trim() === '') {
        showError(message, massageError);
        isValid = false;
      }
      if (!checkBox.checked){
        showError(checkBox,checkBoxError);
        isValid = false;
      }
      
      if (isValid) {
        // Form is valid, you can submit or process data here
        alert('Form submitted successfully!');
        form.reset();
        resetCard();
        setRating(0);
        currentRating = 0;
      }
    }
    
    function showError(inputElement, errorElement) {
      inputElement.classList.add('input-error');
      errorElement.style.display = 'block';
    }
    
    function resetErrors() {
      const inputs = form.querySelectorAll('input, select, textarea');
      const errors = form.querySelectorAll('.error-message');
      
      inputs.forEach(input => {
        input.classList.remove('input-error');
      });
      
      errors.forEach(error => {
        error.style.display = 'none';
      });
    }
    
    function updateCard() {
      // Update card information based on form inputs
      const fullName = `${firstName.value || 'Your'} ${lastName.value || 'Name'}`;
      cardName.textContent = fullName;
      cardEmail.textContent = email.value || 'your.email@example.com';
      cardPhone.textContent = phone.value || '+1 234 567 890';
      cardSubject.textContent = subject.value || 'Not specified';
      cardMessage.textContent = message.value || 'Your message will appear here...';
    }
    
    function resetCard() {
      cardName.textContent = 'Your Name';
      cardEmail.textContent = 'your.email@example.com';
      cardPhone.textContent = '+1 234 567 890';
      cardSubject.textContent = 'Not specified';
      cardMessage.textContent = 'Your message will appear here...';
      cardCountryName.textContent = '';
      updateGenderImage('male');
    }
    
    function updateGenderImage(gender) {
      // Update card photo based on gender selection
      const maleImage = '../Materials/images/man.png';
      const femaleImage = '../Materials/images/woman.png';
      
      cardPhoto.innerHTML = `<img src="${gender === 'male' ? maleImage : femaleImage}" alt="${gender} icon">`;
    }
    
    function setRating(rating) {
      stars.forEach(star => {
        const value = parseInt(star.getAttribute('data-value'));
        star.classList.toggle('active', value <= rating);
      });
    }
    
    function highlightStars(rating) {
      stars.forEach(star => {
        const value = parseInt(star.getAttribute('data-value'));
        if (value <= rating) {
          star.classList.add('active');
        } else {
          star.classList.remove('active');
        }
      });
    }
    function check (checkBox){
      if(checkBox === false){

      }
    }
  });