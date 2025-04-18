/***********************
*      Elements
***********************/
const PRO_TITLE = document.getElementById("productTitle");
const PRO_CATEGORY = document.getElementById("productCategory");
const PRO_BRAND = document.getElementById("productBrand");
const PRO_PRICE = document.getElementById("productPrice");
const PRO_DISCOUNT = document.getElementById("productDiscount");
const PRO_QUANTITY = document.getElementById("productQuantity");
const PRO_DESCRIPTION = document.getElementById("productDescription");
const IN_STOCK = document.getElementById("inStock");
const OUT_OF_STOCK = document.getElementById("outOfStock");
const BTN_CLEAR_FORM = document.getElementById("btn-clearForm");
const BTN_ADD_PRODUCT = document.getElementById("btn-addProduct");
const IMAGE_PREVIEW = document.getElementById("imagePreview");
const IMAGE_INPUT = document.getElementById("imageInput");
const IMAGE_UPLOAD_BOX = document.getElementById("imageUploadBox");
const UPLOAD_TEXT = IMAGE_UPLOAD_BOX.querySelector("p");
const DEFAULT_IMAGE_SRC = "placeholder.png"; 

/***********************
*      Variables
***********************/
const REQUIRE_ELEMENTS = [PRO_TITLE,PRO_CATEGORY,PRO_BRAND,PRO_PRICE,PRO_QUANTITY]

/***********************
*      Methods
***********************/
// check all data are provided
function checkIsAllDataValid() {
  let is_valid = true; // use to check all data are valid
  let first_invalid_element = null;

  for (const ELEMENT of REQUIRE_ELEMENTS) {
    const VALUE = ELEMENT.value?.trim();
    // if The value are empty -->  show error-tip
    if (VALUE === "" || VALUE == null) {
      if (!first_invalid_element) {
        first_invalid_element = ELEMENT;
      }
      toggleErrorTipVisibility(true, ELEMENT);
      ELEMENT.classList.add("missing");
      is_valid = false;
    }
  }

  // check image are provided
  if (IMAGE_PREVIEW.src.endsWith(DEFAULT_IMAGE_SRC)) {
    if (!first_invalid_element) {
      first_invalid_element = IMAGE_UPLOAD_BOX;
    }
    is_valid = false;
    toggleErrorTipVisibility(true, IMAGE_PREVIEW);
  }

  // scroll to the first empty ELEMENT to fill
  if (!is_valid && first_invalid_element) {
    first_invalid_element.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  return is_valid;
}

// toggle Error Tip Visibility based on @isVisible parameter and @element
function toggleErrorTipVisibility(isVisible, element) {
  const FORM_GROUP = element.closest(".form-group");
  const ERROR_TIP = FORM_GROUP?.querySelector(".error-tip");

  if (!ERROR_TIP) return;

  ERROR_TIP.classList.toggle("show", isVisible);
}

// if the input field are filled with data then remove any error-tip if found 
// and (change the background to --> white) by adding class "filled" to input field
function checkFilled(element) {
  const isFilled = element.value.trim() !== '';
  element.classList.toggle('filled', isFilled);
  if (isFilled) {
    element.classList.remove("missing");
    toggleErrorTipVisibility(false,element)
  }
}

function createNewProduct() {
  // Read products from localStorage
  let products = JSON.parse(localStorage.getItem("Products")) || [];

  // Find the maximum ID
  let maxID = 1; // Default value if no products exist
  if (products.length > 0) {
    for (let i = 0; i < products.length; i++) {
      if (products[i].ID > maxID) {
        maxID = products[i].ID;
      }
    }
  }

  // Create new PRODUCT
  const PRODUCT ={
    ID: maxID + 1,
    Title: PRO_TITLE.value,
    Category: PRO_CATEGORY.value,
    Brand:  PRO_BRAND.value,
    Image:  IMAGE_PREVIEW.src,
    Price:  PRO_PRICE.value,
    Discount:  PRO_DISCOUNT.value,
    Quantity:  PRO_QUANTITY.value,
    Status:  PRO_QUANTITY.value > 0 ? "In Stock" : "Out of Stock",
    Description:  PRO_DESCRIPTION.value,
  }

  // Add new PRODUCT to the products list
  products.push(PRODUCT);

  // put back the Products list in localStorage
  localStorage.setItem("Products", JSON.stringify(products));
}

function clearForm() {
  // Clear all data
  for (const ELEMENT of REQUIRE_ELEMENTS) {
    ELEMENT.value = "";
  }
  PRO_DISCOUNT.value = "";
  PRO_DESCRIPTION.value = "";
  IMAGE_PREVIEW.src = "";
  UPLOAD_TEXT.style.display = "block"; 

  // show outOfStock box
  IN_STOCK.classList.toggle("active",PRO_QUANTITY.value > 0);
  OUT_OF_STOCK.classList.toggle("active",PRO_QUANTITY.value <= 0);

  // hide all errors
  document.querySelectorAll(".missing").forEach(element =>{
    element.classList.remove("missing");
    toggleErrorTipVisibility(false,element)
  });
  toggleErrorTipVisibility(false,IMAGE_UPLOAD_BOX);
}

/***********************
*     Data Events
***********************/
BTN_ADD_PRODUCT.addEventListener("click", function () {
  if (checkIsAllDataValid() == true) {
    createNewProduct();
  }
});

BTN_CLEAR_FORM.addEventListener("click", clearForm);

/***********************
*     UI Events
***********************/
// Select all inputs, selects, and textareas
document.querySelectorAll('input, select, textarea').forEach(el => {
    el.addEventListener('input', () => checkFilled(el));
    el.addEventListener('change', () => checkFilled(el)); // for select
    checkFilled(el); // check initial state (in case of pre-filled values)
});

// change Status based on PRO_QUANTITY.value
PRO_QUANTITY.addEventListener("change",function(){
    IN_STOCK.classList.toggle("active",PRO_QUANTITY.value > 0);
    OUT_OF_STOCK.classList.toggle("active",PRO_QUANTITY.value <= 0);
});

/********** Handle image **********/
IMAGE_UPLOAD_BOX.addEventListener("click", () => {
  IMAGE_INPUT.click();
});

IMAGE_INPUT.addEventListener("change", () => {
  const FILE = IMAGE_INPUT.files[0];
  if (FILE) {
    const READER = new FileReader();
    READER.onload = function (e) {
      IMAGE_PREVIEW.src = e.target.result;
      UPLOAD_TEXT.style.display = "none"; 
    };
    READER.readAsDataURL(FILE);
  }
});