document.addEventListener("DOMContentLoaded", () => {
  const requiredInputs = document.querySelectorAll("[required]");
  const placeOrderBtn = document.querySelector(".place-order-btn");
  const paymentOptions = document.querySelectorAll(
    'input[name="payment-method"]'
  );
  const orderNotesTextarea = document.getElementById("order-notes");
  const paymentMethodsContainer = document.querySelector(".payment-methods");

  checkProductsInLocalStorage();
  setupPaymentMethods();
  setupPaymentMethodSelection();
  setupOrderNotesCounter();
  initializePaymentMethod();
  setupFormSubmission();

  function checkProductsInLocalStorage() {
    const products = localStorage.getItem("products");
    if (products) {
      console.log("Products found in localStorage:", JSON.parse(products));
      return JSON.parse(products);
    } else {
      console.log("No products found in localStorage (null or empty).");
      return null;
    }
  }

  function setupPaymentMethods() {
    document.querySelectorAll(".payment-details").forEach((detail) => {
      if (!detail.classList.contains("direct-bank-transfer")) {
        detail.remove();
      }
    });

    if (!document.querySelector(".cash-on-delivery-details")) {
      const cashDetails = createPaymentDetails(
        "cash-on-delivery-details",
        "Pay with cash upon delivery. Please have the exact amount ready."
      );
      insertAfterPaymentOption(cashDetails, "cash-on-delivery");
    }

    if (!document.querySelector(".paypal-details")) {
      const paypalDetails = createPaymentDetails(
        "paypal-details",
        "You will be redirected to PayPal to complete your payment securely."
      );
      insertAfterPaymentOption(paypalDetails, "paypal");
    }

    const bankTransferDetails = document.querySelector(".direct-bank-transfer");
    if (bankTransferDetails) {
      bankTransferDetails.classList.add("payment-details");
    }
  }

  function createPaymentDetails(className, text) {
    const details = document.createElement("div");
    details.className = `${className} payment-details`;
    details.style.display = "none";

    const textElement = document.createElement("p");
    textElement.textContent = text;
    details.appendChild(textElement);

    return details;
  }

  function insertAfterPaymentOption(details, value) {
    const option = Array.from(paymentOptions).find(
      (opt) => opt.value === value
    );
    if (option) {
      const label = option.closest(".payment-option");
      paymentMethodsContainer.insertBefore(details, label.nextSibling);
    }
  }

  function setupPaymentMethodSelection() {
    paymentOptions.forEach((option) => {
      option.addEventListener("change", () => {
        document.querySelectorAll(".payment-details").forEach((detail) => {
          detail.style.display = "none";
        });

        const detailsElement = getPaymentDetails(option.value);
        if (detailsElement) {
          detailsElement.style.display = "block";
        }
      });
    });
  }

  function getPaymentDetails(value) {
    switch (value) {
      case "direct-bank-transfer":
        return document.querySelector(".direct-bank-transfer");
      case "cash-on-delivery":
        return document.querySelector(".cash-on-delivery-details");
      case "paypal":
        return document.querySelector(".paypal-details");
      default:
        return null;
    }
  }

  function validateForm() {
    let isValid = true;

    requiredInputs.forEach((input) => {
      input.classList.remove("error");
      const errorMessage = input.parentElement.querySelector(".error-message");
      if (errorMessage) errorMessage.remove();

      if (!input.value.trim()) {
        isValid = false;
        markAsError(input, "This field is required");
      } else {
        if (input.id === "email" && !validateEmail(input.value)) {
          isValid = false;
          markAsError(input, "Please enter a valid email address");
        } else if (input.id === "phone" && !validatePhone(input.value)) {
          isValid = false;
          markAsError(input, "Please enter a valid phone number");
        }
      }
    });

    return isValid;
  }

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  function validatePhone(phone) {
    const re = /^\+?[0-9\s\-()]{8,20}$/;
    return re.test(phone);
  }

  function markAsError(input, message) {
    input.classList.add("error");
    const errorElement = document.createElement("div");
    errorElement.className = "error-message";
    errorElement.textContent = message;
    input.parentElement.appendChild(errorElement);
  }

  function setupOrderNotesCounter() {
    if (!orderNotesTextarea) return;

    const maxLength = 500;
    const counterContainer = document.createElement("div");
    counterContainer.className = "character-counter";
    orderNotesTextarea.parentElement.appendChild(counterContainer);

    function updateCounter() {
      const remaining = maxLength - orderNotesTextarea.value.length;
      counterContainer.textContent = `${remaining} characters remaining`;

      counterContainer.style.color =
        remaining < 10 ? "red" : remaining < 50 ? "orange" : "#666";
    }

    orderNotesTextarea.addEventListener("input", updateCounter);
    updateCounter();
  }

  function initializePaymentMethod() {
    const selectedPayment = document.querySelector(
      'input[name="payment-method"]:checked'
    );
    if (selectedPayment) {
      selectedPayment.dispatchEvent(new Event("change"));
    }
  }

  function setupFormSubmission() {
    if (!placeOrderBtn) return;

    placeOrderBtn.addEventListener("click", (e) => {
      e.preventDefault();

      const products = checkProductsInLocalStorage();
      if (!products) {
        alert("No products in cart. Please add items before placing an order.");
        return;
      }

      if (validateForm()) {
        const formData = {
          firstName: document.getElementById("first-name").value,
          lastName: document.getElementById("last-name").value,
          companyName: document.getElementById("company-name").value,
          country: document.getElementById("country").value,
          streetAddress: document.getElementById("street-address").value,
          apartment: document.getElementById("apartment").value,
          townCity: document.getElementById("town-city").value,
          state: document.getElementById("state").value,
          phone: document.getElementById("phone").value,
          email: document.getElementById("email").value,
          orderNotes: orderNotesTextarea ? orderNotesTextarea.value : "",
          paymentMethod: document.querySelector(
            'input[name="payment-method"]:checked'
          ).value,
          products: products,
        };

        console.log("Order submitted!", formData);
        showOrderConfirmation(formData);
      } else {
        const firstError = document.querySelector(".error");
        if (firstError) {
          firstError.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }
    });
  }

  function showOrderConfirmation(formData) {
    const overlay = document.createElement("div");
    overlay.className = "confirmation-overlay";

    const confirmationBox = document.createElement("div");
    confirmationBox.className = "confirmation-box";

    const title = document.createElement("h2");
    title.textContent = "Order Confirmation";

    const message = document.createElement("p");
    message.textContent = `Thank you for your order, ${formData.firstName} ${formData.lastName}!`;

    const details = document.createElement("div");
    details.innerHTML = `
      <p><strong>Order Details:</strong></p>
      <p>Product: Sample Product x 1</p>
      <p>Total: $50.00</p>
      <p>Payment Method: ${formatPaymentMethod(formData.paymentMethod)}</p>
      <p>Shipping Address: ${formData.streetAddress}, ${formData.townCity}, ${
      formData.state
    }, ${formData.country}</p>
    `;

    const okButton = document.createElement("button");
    okButton.textContent = "OK";
    okButton.addEventListener("click", () =>
      document.body.removeChild(overlay)
    );

    confirmationBox.append(title, message, details, okButton);
    overlay.appendChild(confirmationBox);
    document.body.appendChild(overlay);
  }

  function formatPaymentMethod(method) {
    const methods = {
      "direct-bank-transfer": "Direct Bank Transfer",
      "cash-on-delivery": "Cash on Delivery",
      paypal: "PayPal",
    };
    return methods[method] || method;
  }
});
