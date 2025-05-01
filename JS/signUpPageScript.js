document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".form-container");
  const firstNameInput = form.querySelector(
    '.name-row input[placeholder="First Name"]'
  );
  const lastNameInput = form.querySelector(
    '.name-row input[placeholder="Last Name"]'
  );
  const userNameInput = form.querySelector('input[placeholder="User Name"]');
  const passwordInput = form.querySelector('input[placeholder="Password"]');
  const confirmPasswordInput = form.querySelector(
    'input[placeholder="Confirm Password"]'
  );
  const registerButton = form.querySelector("button");

  const showError = (input, message) => {
    removeError(input);
    const errorElement = document.createElement("span");
    errorElement.classList.add("error");
    errorElement.textContent = message;
    const target = input.parentElement.classList.contains("name-row")
      ? input.parentElement
      : input;
    target.insertAdjacentElement("afterend", errorElement);
    input.classList.add("invalid");
  };

  const removeError = (input) => {
    const target = input.parentElement.classList.contains("name-row")
      ? input.parentElement
      : input;
    const error = target.nextElementSibling;
    if (error?.classList.contains("error")) error.remove();
    input.classList.remove("invalid");
  };

  const clearAllErrors = () => {
    form.querySelectorAll(".error").forEach((error) => error.remove());
    [
      firstNameInput,
      lastNameInput,
      userNameInput,
      passwordInput,
      confirmPasswordInput,
    ].forEach((input) => input.classList.remove("invalid"));
  };

  const checkUsernameUniqueness = async (username) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const takenUsernames = ["testuser", "admin"];
    const isUnique = !takenUsernames.includes(username.toLowerCase());
    if (!isUnique) showError(userNameInput, "Username is already taken.");
    return isUnique;
  };

  const validatePasswordComplexity = (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length < minLength) {
      showError(
        passwordInput,
        `Password must be at least ${minLength} characters long.`
      );
      return false;
    }
    if (!hasUpperCase) {
      showError(
        passwordInput,
        "Password must contain at least one uppercase letter."
      );
      return false;
    }
    if (!hasSpecialChar) {
      showError(
        passwordInput,
        "Password must contain at least one special character (e.g., !@#$%^&*)."
      );
      return false;
    }
    removeError(passwordInput);
    return true;
  };

  registerButton.addEventListener("click", async (event) => {
    event.preventDefault();
    clearAllErrors();

    let isValid = true;
    const username = userNameInput.value.trim();
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    if (!firstNameInput.value.trim() || !lastNameInput.value.trim()) {
      showError(firstNameInput, "First and Last Name are required.");
      if (!firstNameInput.value.trim()) firstNameInput.classList.add("invalid");
      if (!lastNameInput.value.trim()) lastNameInput.classList.add("invalid");
      isValid = false;
    } else {
      removeError(firstNameInput);
    }

    if (!username) {
      showError(userNameInput, "User Name is required.");
      isValid = false;
    } else if (!(await checkUsernameUniqueness(username))) {
      isValid = false;
    } else {
      removeError(userNameInput);
    }

    if (!password) {
      showError(passwordInput, "Password is required.");
      isValid = false;
    } else if (!validatePasswordComplexity(password)) {
      isValid = false;
    }

    if (!confirmPassword) {
      showError(confirmPasswordInput, "Confirm Password is required.");
      isValid = false;
    } else if (password && confirmPassword !== password) {
      showError(confirmPasswordInput, "Passwords do not match.");
      isValid = false;
    } else if (password && confirmPassword === password) {
      removeError(confirmPasswordInput);
    }

    if (isValid) {
      console.log(
        "Client-side validation passed. Submitting form (simulation)..."
      );
      alert("Registration successful! (Client-side simulation)");
    } else {
      console.log("Client-side validation failed.");
    }
  });

  [
    firstNameInput,
    lastNameInput,
    userNameInput,
    passwordInput,
    confirmPasswordInput,
  ].forEach((input) => {
    input.addEventListener("input", () => {
      if (input === firstNameInput || input === lastNameInput) {
        removeError(firstNameInput);
      } else {
        removeError(input);
      }
    });
  });
});
