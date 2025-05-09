/***********************
 *      Elements
***********************/
const requiredInputs = document.querySelectorAll("[required]"); 
const placeOrderBtn = document.querySelector(".place-order-btn"); 
const paymentOptions = document.querySelectorAll(
  'input[name="payment-method"]'
); 
const products = JSON.parse(localStorage.getItem("Cart")) || [];
const items_container= document.getElementById("items-container");
const order_total= document.getElementById("order-total");
/***********************
 *      Methods
 ***********************/
function setUpProducts() {
  if (!products || products.length <=0) {
    alert("No products in cart. Please add items before placing an order."); 
    return;
  }else{
    let total = 0;
    products.forEach(product => {
      items_container.insertAdjacentHTML("beforeend", `
        <div class="order-item">
            <p>${product.Title} | x ${product.Quantity}</p>
            <p class="price">$${(product.Price - product.Discount) * product.Quantity}</p>
        </div>
      `);
      total += (product.Price - product.Discount) * product.Quantity;
    });
    order_total.innerText = "$" + total;
  }
}

function setupPaymentMethodSelection() {
  paymentOptions.forEach((option) => {
    option.addEventListener("change", () => {
      document.querySelectorAll(".payment-details").forEach((detail) => {
        detail.style.display = "none";
      });

      const detailsElement =document.querySelector(`.${option.value}-details`); 
      if (detailsElement) {
        detailsElement.style.display = "block";
      }
    });
  });
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
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // تعبير عادي للتحقق من صيغة الإيميل
  return re.test(email); // بيشوف إذا كان الإيميل صحيح ولا لأ
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

function setupFormSubmission() {
  placeOrderBtn.addEventListener("click", (e) => {
    if (!products || products.length <=0) {
      alert("No products in cart. Please add items before placing an order."); 
      return;
    }

    if (validateForm()) {
      localStorage.removeItem("Cart");
      window.location.href = "../HTML/orderConfirmationPage.html";
    } else {
      const firstError = document.querySelector(".error"); 
      if (firstError) {
        firstError.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  });
}

/***********************
 *     Initialization
 ***********************/
setUpProducts(); 
setupPaymentMethodSelection();
setupFormSubmission();