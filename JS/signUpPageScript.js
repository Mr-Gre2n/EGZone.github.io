document.addEventListener("DOMContentLoaded", () => {
  /***********************
   *      Elements
   ***********************/
  // هنا بنجيب عناصر الفورم اللي هنشتغل عليها من الصفحة
  const FORM = document.querySelector(".form-container");
  const FIRST_NAME_INPUT = FORM.querySelector(
    '.name-row input[placeholder="First Name"]'
  );
  const LAST_NAME_INPUT = FORM.querySelector(
    '.name-row input[placeholder="Last Name"]'
  );
  const USER_NAME_INPUT = FORM.querySelector('input[placeholder="User Name"]');
  const PASSWORD_INPUT = FORM.querySelector('input[placeholder="Password"]');
  const CONFIRM_PASSWORD_INPUT = FORM.querySelector(
    'input[placeholder="Confirm Password"]'
  );
  const REGISTER_BUTTON = FORM.querySelector("button");
  const PASSWORD_TOGGLES = document.querySelectorAll(".password-toggle");
  const imgsingup = document.getElementById('iconic');
  const theme = document.documentElement.getAttribute('data-theme');

  /***********************
   *      Variables
   ***********************/
  // هنا بنخزن كل عناصر الإدخال في مصفوفة علشان نقدر نتعامل معاهم بسهولة
  const FORM_INPUTS = [
    FIRST_NAME_INPUT,
    LAST_NAME_INPUT,
    USER_NAME_INPUT,
    PASSWORD_INPUT,
    CONFIRM_PASSWORD_INPUT,
  ];

  // تحميل قائمة المستخدمين من localStorage
  let savedUsers = JSON.parse(localStorage.getItem("usersList")) || [];

  /***********************
   *      Methods
   ***********************/
  /**
   * هنا بنعرض رسالة خطأ تحت الخانة اللي فيها مشكلة
   */
  function showError(input, message) {
    removeError(input); // بنشيل أي رسالة خطأ قديمة
    const ERROR_ELEMENT = document.createElement("span");
    ERROR_ELEMENT.classList.add("error");
    ERROR_ELEMENT.textContent = message;

    // بنحدد المكان اللي هنحط فيه الرسالة حسب نوع الخانة
    const TARGET = input.parentElement.classList.contains("name-row")
      ? input.parentElement
      : input.parentElement.classList.contains("password-field")
      ? input.parentElement
      : input;

    TARGET.insertAdjacentElement("afterend", ERROR_ELEMENT);
    input.classList.add("invalid"); // بنلون الخانة بالأحمر
  }

  /**
   * هنا بنشيل رسالة الخطأ من الخانة لما المستخدم يصلحها
   */
  function removeError(input) {
    const TARGET = input.parentElement.classList.contains("name-row")
      ? input.parentElement
      : input.parentElement.classList.contains("password-field")
      ? input.parentElement
      : input;
    const ERROR = TARGET.nextElementSibling;

    if (ERROR?.classList.contains("error")) ERROR.remove();
    input.classList.remove("invalid");
  }

  /**
   * هنا بنشيل كل رسائل الخطأ مرة واحدة لما نبدأ نتحقق من النموذج
   */
  function clearAllErrors() {
    FORM.querySelectorAll(".error").forEach((error) => error.remove());
    FORM_INPUTS.forEach((input) => input.classList.remove("invalid"));
  }

  /**
   * هنا بنشوف هل اسم المستخدم موجود قبل كده ولا لأ (علشان ميكونش مكرر)
   */
  async function checkUsernameUniqueness(username) {
    await new Promise((resolve) => setTimeout(resolve, 500)); // بنأخر النتيجة شوية ويكأن في ضغط على السيرفر وكده (يحسبها حركة)

    // بنشوف هل الاسم موجود في اللي اتسجلوا قبل كده
    const USER_EXISTS = savedUsers.some(
      (user) => user.username.toLowerCase() === username.toLowerCase()
    );

    if (USER_EXISTS) {
      showError(USER_NAME_INPUT, "Username is already taken.");
      return false;
    }

    return true;
  }

  /**
   هنا بنتأكد إن الباسورد قوي ومطابق للشروط(فيه حرف كابيتال وكده يعني)
   */
  function validatePasswordComplexity(password) {
    const MIN_LENGTH = 8;
    const HAS_UPPER_CASE = /[A-Z]/.test(password);
    const HAS_SPECIAL_CHAR = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length < MIN_LENGTH) {
      showError(
        PASSWORD_INPUT,
        `Password must be at least ${MIN_LENGTH} characters long.`
      );
      return false;
    }

    if (!HAS_UPPER_CASE) {
      showError(
        PASSWORD_INPUT,
        "Password must contain at least one uppercase letter."
      );
      return false;
    }

    if (!HAS_SPECIAL_CHAR) {
      showError(
        PASSWORD_INPUT,
        "Password must contain at least one special character (e.g., !@#$%^&*)."
      );
      return false;
    }

    removeError(PASSWORD_INPUT);
    return true;
  }

  /**
   * هنا بنضيف المستخدم الجديد لقائمة المستخدمين وبنخزنه
   */
  function createUser(userData) {
    savedUsers.push(userData);

    // بنحفظ قائمة المستخدمين في localStorage
    localStorage.setItem("Users", JSON.stringify(savedUsers));

    // بنحدد أن المستخدم مسجل دخول
    localStorage.setItem("currentUser", JSON.stringify(userData));
    localStorage.setItem("isLoggedIn", "true");

    console.log("New user created:", userData);
    console.log("Current user list:", savedUsers);

    // بنوديه على الصفحة الرئيسية
    redirectToHomePage();
  }

  /**
   * هنا بننقله مباشرة على الصفحة الرئيسية بعد ما يسجل
   */
  function redirectToHomePage() {
    window.location.href = "homePage.html";
  }

  /**
   * دالة تبديل عرض وإخفاء كلمة السر
   */
  function togglePasswordVisibility(passwordInput, iconElement) {
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
      iconElement.classList.remove("fa-eye-slash");
      iconElement.classList.add("fa-eye");
    } else {
      passwordInput.type = "password";
      iconElement.classList.remove("fa-eye");
      iconElement.classList.add("fa-eye-slash");
    }
  }

  /***********************
   *     Data Events
   ***********************/
  /**
   * هنا بنظبط الدنيا لما المستخدم يضغط على زرار التسجيل
   */
  REGISTER_BUTTON.addEventListener("click", async (event) => {
    event.preventDefault(); 
    clearAllErrors(); 

    // بنجيب القيم اللي المستخدم كتبها
    const FIRST_NAME = FIRST_NAME_INPUT.value.trim();
    const LAST_NAME = LAST_NAME_INPUT.value.trim();
    const USERNAME = USER_NAME_INPUT.value.trim();
    const PASSWORD = PASSWORD_INPUT.value;
    const CONFIRM_PASSWORD = CONFIRM_PASSWORD_INPUT.value;

    let isValid = true; // متغير علشان نعرف إذا البيانات كلها سليمة

    // بنتأكد إن الاسم الأول والأخير مكتوبين
    if (!FIRST_NAME || !LAST_NAME) {
      showError(FIRST_NAME_INPUT, "First and Last Name are required.");
      if (!FIRST_NAME) FIRST_NAME_INPUT.classList.add("invalid");
      if (!LAST_NAME) LAST_NAME_INPUT.classList.add("invalid");
      isValid = false;
    } else {
      removeError(FIRST_NAME_INPUT);
    }

    // بنتأكد من اسم المستخدم
    if (!USERNAME) {
      showError(USER_NAME_INPUT, "User Name is required.");
      isValid = false;
    } else if (!(await checkUsernameUniqueness(USERNAME))) {
      isValid = false;
    } else {
      removeError(USER_NAME_INPUT);
    }

    // بنفحص الباسورد
    if (!PASSWORD) {
      showError(PASSWORD_INPUT, "Password is required.");
      isValid = false;
    } else if (!validatePasswordComplexity(PASSWORD)) {
      isValid = false;
    }

    // بنتأكد إن تأكيد الباسورد مطابق للباسورد
    if (!CONFIRM_PASSWORD) {
      showError(CONFIRM_PASSWORD_INPUT, "Confirm Password is required.");
      isValid = false;
    } else if (PASSWORD && CONFIRM_PASSWORD !== PASSWORD) {
      showError(CONFIRM_PASSWORD_INPUT, "Passwords do not match.");
      isValid = false;
    } else if (PASSWORD && CONFIRM_PASSWORD === PASSWORD) {
      removeError(CONFIRM_PASSWORD_INPUT);
    }

    // لو كل حاجة تمام بنسجل المستخدم
    if (isValid) {
      const NEW_USER = {
        username: USERNAME,
        password: PASSWORD, 
        firstName: FIRST_NAME,
        lastName: LAST_NAME,
        registrationDate: new Date().toISOString(),
      };

      createUser(NEW_USER);
    } else {
      console.log("Form validation failed.");
    }
  });

  /***********************
   *     UI Events
   ***********************/
  /**
   * هنا أول ما المستخدم يبدأ يكتب في أي خانة بنشيل رسالة الخطأ اللي كانت بتظهرله
   */
  FORM_INPUTS.forEach((input) => {
    input.addEventListener("input", () => {
      if (input === FIRST_NAME_INPUT || input === LAST_NAME_INPUT) {
        removeError(FIRST_NAME_INPUT);
      } else {
        removeError(input);
      }
    });
  });

  /**
   * العين السحرية
   */
  PASSWORD_TOGGLES.forEach((toggle) => {
    toggle.addEventListener("click", function () {
      const passwordField = this.parentElement;
      const passwordInput = passwordField.querySelector("input");
      const eyeIcon = this.querySelector("i");

      togglePasswordVisibility(passwordInput, eyeIcon);
    });
  });
  function changePhotoTheme(theme){
    if (theme === 'dark-blue'){
      iconic.src='../Materials/Banner/signUp2.jpg';
    }else {
      iconic.src='../Materials/Images/sidePhoto.jpg'
    }
  }
  changePhotoTheme(theme);
});
