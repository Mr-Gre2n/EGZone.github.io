/***********************
 *      Elements
 ***********************/
document.addEventListener("DOMContentLoaded", () => {
  const requiredInputs = document.querySelectorAll("[required]"); // جاب الحقول اللي لازمة علشان لازم يتم ملئها
  const placeOrderBtn = document.querySelector(".place-order-btn"); // جاب زرار "اكمال الطلب"
  const paymentOptions = document.querySelectorAll(
    'input[name="payment-method"]'
  ); // جاب خيارات الدفع المتاحة
  const orderNotesTextarea = document.getElementById("order-notes"); // جاب حقل الملاحظات الخاص بالطلب
  const paymentMethodsContainer = document.querySelector(".payment-methods"); // جاب الحاوية اللي فيها خيارات الدفع

  /***********************
   *      Methods
   ***********************/
  // التحقق إذا كان في منتجات في ال localStorage
  function checkProductsInLocalStorage() {
    const products = localStorage.getItem("Products"); // حاول يجيب المنتجات من ال localStorage
    if (products) {
      console.log("Products found in localStorage:", JSON.parse(products)); // لو لقى منتجات، بيطبعهم
      return JSON.parse(products); // بيرجع المنتجات اللي في ال localStorage
    } else {
      console.log("No products found in localStorage (null or empty)."); // لو مفيش منتجات
      return null; // بيرجع null لو مفيش منتجات
    }
  }

  // إعداد واجهة الدفع
  function setupPaymentMethods() {
    document.querySelectorAll(".payment-details").forEach((detail) => {
      // بيشوف كل تفاصيل الدفع
      if (!detail.classList.contains("direct-bank-transfer")) {
        // لو مش بيزبط التفاصيل بتاعت "التحويل البنكي المباشر"
        detail.remove(); // بيشيلها
      }
    });

    if (!document.querySelector(".cash-on-delivery-details")) {
      // لو مفيش تفاصيل الدفع عند الاستلام
      const cashDetails = createPaymentDetails(
        // بيعمل تفاصيل الدفع عند الاستلام
        "cash-on-delivery-details",
        "Pay with cash upon delivery. Please have the exact amount ready." // النص الخاص بالتفاصيل
      );
      insertAfterPaymentOption(cashDetails, "cash-on-delivery"); // بيضيف التفاصيل بعد خيار الدفع ده
    }

    if (!document.querySelector(".paypal-details")) {
      // لو مفيش تفاصيل ال PayPal
      const paypalDetails = createPaymentDetails(
        // بيعمل تفاصيل ال PayPal
        "paypal-details",
        "You will be redirected to PayPal to complete your payment securely." // النص الخاص بالتفاصيل
      );
      insertAfterPaymentOption(paypalDetails, "paypal"); // بيضيف التفاصيل بعد خيار الدفع ده
    }

    const bankTransferDetails = document.querySelector(".direct-bank-transfer"); // لو فيه تفاصيل الدفع بالتحويل البنكي
    if (bankTransferDetails) {
      bankTransferDetails.classList.add("payment-details"); // بيضيف الكلاس الخاص بالتفاصيل
    }
  }

  // إنشاء تفاصيل الدفع
  function createPaymentDetails(className, text) {
    const details = document.createElement("div"); // بيعمل div جديد
    details.className = `${className} payment-details`; // بيديه كلاس باسم معين
    details.style.display = "none"; // بيخفيه في البداية

    const textElement = document.createElement("p"); // بيعمل p جديد للنص
    textElement.textContent = text; // بيحط النص اللي جاي مع الدالة
    details.appendChild(textElement); // بيضيف النص داخل ال div

    return details; // بيرجع التفاصيل دي
  }

  // إضافة تفاصيل الدفع بعد اختيار طريقة الدفع
  function insertAfterPaymentOption(details, value) {
    const option = Array.from(paymentOptions).find(
      // بيبحث عن خيار الدفع
      (opt) => opt.value === value
    );
    if (option) {
      const label = option.closest(".payment-option"); // بيجيب ال label اللي خاص بالخيار ده
      paymentMethodsContainer.insertBefore(details, label.nextSibling); // بيضيف التفاصيل بعد الخيار
    }
  }

  // إعداد سلوك اختيار طريقة الدفع
  function setupPaymentMethodSelection() {
    paymentOptions.forEach((option) => {
      // بيضيف حدث لكل خيار دفع
      option.addEventListener("change", () => {
        // لو اتغير الاختيار
        document.querySelectorAll(".payment-details").forEach((detail) => {
          // بيخفي كل تفاصيل الدفع
          detail.style.display = "none";
        });

        const detailsElement = getPaymentDetails(option.value); // بيجيب تفاصيل الدفع حسب الاختيار
        if (detailsElement) {
          detailsElement.style.display = "block"; // بيعرض التفاصيل اللي تخص الدفع ده
        }
      });
    });
  }

  // جاب تفاصيل الدفع بناءً على الطريقة المختارة
  function getPaymentDetails(value) {
    switch (value) {
      case "direct-bank-transfer":
        return document.querySelector(".direct-bank-transfer"); // لو اختار التحويل البنكي بيرجع تفاصيله
      case "cash-on-delivery":
        return document.querySelector(".cash-on-delivery-details"); // لو اختار الدفع عند الاستلام بيرجع تفاصيله
      case "paypal":
        return document.querySelector(".paypal-details"); // لو اختار باي بال بيرجع تفاصيله
      default:
        return null; // لو مش فيه خيار معروف بيرجع null
    }
  }

  // التحقق من صحة البيانات المدخلة في النموذج
  function validateForm() {
    let isValid = true; // مبدئيًا الشكل صحيح

    requiredInputs.forEach((input) => {
      // بيمشي على كل الحقول اللي لازمة
      input.classList.remove("error"); // بيشيل أي علامة خطأ
      const errorMessage = input.parentElement.querySelector(".error-message"); // بيشيل أي رسالة خطأ لو موجودة
      if (errorMessage) errorMessage.remove();

      if (!input.value.trim()) {
        // لو الحقل فاضي
        isValid = false; // النموذج غير صالح
        markAsError(input, "This field is required"); // بيعلم الحقل ده كخطأ
      } else {
        if (input.id === "email" && !validateEmail(input.value)) {
          // لو الحقل بريد إلكتروني مش صحيح
          isValid = false; // النموذج غير صالح
          markAsError(input, "Please enter a valid email address"); // بيعلم الحقل ده كخطأ
        } else if (input.id === "phone" && !validatePhone(input.value)) {
          // لو الحقل رقم تليفون مش صحيح
          isValid = false; // النموذج غير صالح
          markAsError(input, "Please enter a valid phone number"); // بيعلم الحقل ده كخطأ
        }
      }
    });

    return isValid; // بيرجع النتيجة إذا كان النموذج صحيح أو لأ
  }

  // التحقق من صحة البريد الإلكتروني
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // تعبير عادي للتحقق من صيغة الإيميل
    return re.test(email); // بيشوف إذا كان الإيميل صحيح ولا لأ
  }

  // التحقق من صحة رقم التليفون
  function validatePhone(phone) {
    const re = /^\+?[0-9\s\-()]{8,20}$/; // تعبير عادي للتحقق من صيغة رقم التليفون
    return re.test(phone); // بيشوف إذا كان الرقم صحيح ولا لأ
  }

  // تعليم الحقل كخطأ وعرض الرسالة
  function markAsError(input, message) {
    input.classList.add("error"); // بيضيف كلاس الخطأ
    const errorElement = document.createElement("div"); // بيعمل عنصر div جديد
    errorElement.className = "error-message"; // بيديه كلاس رسالة الخطأ
    errorElement.textContent = message; // بيحط الرسالة
    input.parentElement.appendChild(errorElement); // بيضيف الرسالة تحت الحقل
  }

  // إعداد عداد الحروف في الملاحظات
  function setupOrderNotesCounter() {
    if (!orderNotesTextarea) return; // لو مفيش حقل ملاحظات مفيش حاجة تعملها

    const maxLength = 500; // الحد الأقصى لعدد الحروف
    const counterContainer = document.createElement("div"); // بيعمل div لعداد الحروف
    counterContainer.className = "character-counter"; // بيديه كلاس لعداد الحروف
    orderNotesTextarea.parentElement.appendChild(counterContainer); // بيضيفه جنب حقل الملاحظات

    function updateCounter() {
      const remaining = maxLength - orderNotesTextarea.value.length; // بيحسب الحروف المتبقية
      counterContainer.textContent = `${remaining} characters remaining`; // بيعرض عدد الحروف المتبقية

      counterContainer.style.color =
        remaining < 10 ? "red" : remaining < 50 ? "orange" : "#666"; // بيغير اللون حسب عدد الحروف المتبقية
    }

    orderNotesTextarea.addEventListener("input", updateCounter); // كل ما يكتب في الحقل يعيد حساب العداد
    updateCounter(); // بيحدث العداد عند تحميل الصفحة
  }

  // تفعيل طريقة الدفع الافتراضية
  function initializePaymentMethod() {
    const selectedPayment = document.querySelector(
      'input[name="payment-method"]:checked'
    );
    if (selectedPayment) {
      selectedPayment.dispatchEvent(new Event("change")); // لو تم اختيار طريقة الدفع يفعّلها
    }
  }

  // إعداد سلوك تقديم الطلب
  function setupFormSubmission() {
    if (!placeOrderBtn) return; // لو مفيش زرار تقديم طلب

    placeOrderBtn.addEventListener("click", (e) => {
      // لما يتم الضغط على زرار تقديم الطلب
      e.preventDefault(); // منع الإجراء الافتراضي

      const products = checkProductsInLocalStorage(); // بيشيك إذا كان في منتجات في ال localStorage
      if (!products) {
        alert("No products in cart. Please add items before placing an order."); // لو مفيش منتجات في السلة
        return;
      }

      if (validateForm()) {
        // لو البيانات المدخلة صحيحة
        const formData = {
          // بيجمع البيانات في شكل كائن
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

        console.log("Order submitted!", formData); // بيطبع البيانات بعد تقديم الطلب
        showOrderConfirmation(formData); // بيعرض رسالة تأكيد الطلب
      } else {
        const firstError = document.querySelector(".error"); // لو في خطأ في البيانات المدخلة
        if (firstError) {
          firstError.scrollIntoView({ behavior: "smooth", block: "center" }); // بيطلع المكان اللي فيه الخطأ
        }
      }
    });
  }

  // عرض رسالة تأكيد الطلب
  function showOrderConfirmation(formData) {
    const overlay = document.createElement("div"); // بيعمل overlay لتغطية الصفحة
    overlay.className = "confirmation-overlay"; // بيديه كلاس overlay

    const confirmationBox = document.createElement("div"); // بيعمل نافذة تأكيد
    confirmationBox.className = "confirmation-box"; // بيديه كلاس تأكيد

    const title = document.createElement("h2"); // بيعمل عنوان
    title.textContent = "Order Confirmation"; // النص الخاص بالعنوان

    const message = document.createElement("p"); // بيعمل رسالة
    message.textContent = `Thank you for your order, ${formData.firstName} ${formData.lastName}!`; // النص الخاص بالرسالة

    const details = document.createElement("div"); // بيعمل تفاصيل الطلب
    details.innerHTML = `
      <p><strong>Order Details:</strong></p>
      <p>Product: Sample Product x 1</p>
      <p>Total: $50.00</p>
      <p>Payment Method: ${formatPaymentMethod(formData.paymentMethod)}</p>
      <p>Shipping Address: ${formData.streetAddress}, ${formData.townCity}, ${
      formData.state
    }, ${formData.country}</p>
    `;

    const okButton = document.createElement("button"); // بيعمل زرار موافق
    okButton.textContent = "OK"; // بيحط النص على الزرار
    okButton.addEventListener("click", () => {
      document.body.removeChild(overlay); // بيشيل ال overlay بعد الضغط على الزرار
      // إعادة توجيه المستخدم إلى الصفحة الرئيسية بعد التأكيد
      window.location.href = "homePage.html"; // بيحول الصفحة للصفحة الرئيسية
    });

    confirmationBox.append(title, message, details, okButton); // بيجمع المحتوى في النافذة
    overlay.appendChild(confirmationBox); // بيضيف النافذة فوق ال overlay
    document.body.appendChild(overlay); // بيضيفها للجسم الرئيسي للصفحة
  }

  // تنسيق اسم طريقة الدفع لعرضها بشكل صحيح
  function formatPaymentMethod(method) {
    const methods = {
      "direct-bank-transfer": "Direct Bank Transfer", // التحويل البنكي المباشر
      "cash-on-delivery": "Cash on Delivery", // الدفع عند الاستلام
      paypal: "PayPal", // باي بال
    };
    return methods[method] || method; // بيرجع الاسم المناسب
  }

  /***********************
   *     Initialization
   ***********************/
  checkProductsInLocalStorage(); // التحقق من وجود المنتجات في السلة
  setupPaymentMethods(); // إعداد طرق الدفع
  setupPaymentMethodSelection(); // إعداد سلوك اختيار طريقة الدفع
  setupOrderNotesCounter(); // إعداد عداد الملاحظات
  initializePaymentMethod(); // تفعيل طريقة الدفع الافتراضية
  setupFormSubmission(); // إعداد سلوك تقديم الطلب
});
