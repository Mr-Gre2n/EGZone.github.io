/***********************
*      Elements
***********************/
const PRO_ID = document.getElementById("productId");
const PRO_TIP_ID = document.getElementById("productTipId");
const PRO_TITLE = document.getElementById("productTitle");
const PRO_CATEGORY = document.getElementById("productCategory");
const PRO_BRAND = document.getElementById("productBrand");
const PRO_PRICE = document.getElementById("productPrice");
const PRO_DISCOUNT = document.getElementById("productDiscount");
const PRO_QUANTITY = document.getElementById("productQuantity");
const PRO_ISNEW = document.getElementById("chk-Isnew");
const PRO_DESCRIPTION = document.getElementById("productDescription");
const IN_STOCK = document.getElementById("inStock");
const OUT_OF_STOCK = document.getElementById("outOfStock");
const BTN_CLEAR_FORM = document.getElementById("btn-clearForm");
const BTN_DELETE_PRODUCT = document.getElementById("btn-deleteProduct");
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

let operationType = "Adding";

// that will be used for updating product
let proIndex = null;
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

// show and hide "IN_STOCK" "OUT_OF_STOCK" based on PRO_QUANTITY.value 
function updateStatus() {
  IN_STOCK.classList.toggle("active",PRO_QUANTITY.value > 0);
  OUT_OF_STOCK.classList.toggle("active",PRO_QUANTITY.value <= 0);
}

// Create and update products
// if index == null add new product
// else update current product
function saveProduct(index = null) {
  let id = 1;

  // Read products from localStorage
  let products = JSON.parse(localStorage.getItem("Products")) || [];
  
  if (index == null) {
    // Find the maximum ID
    let maxID = 1; // Default value if no products exist
    if (products.length > 0) {
      for (let i = 0; i < products.length; i++) {
        if (products[i].ID > maxID) {
          maxID = products[i].ID;
        }
      }
    }
    id = maxID + 1;
  }else{
    id = products[index].ID;
  }

  // Create new PRODUCT
  const PRODUCT ={
    ID: id,
    Title: PRO_TITLE.value,
    Category: PRO_CATEGORY.value,
    Brand:  PRO_BRAND.value,
    Image:  IMAGE_PREVIEW.src,
    Price:  PRO_PRICE.value,
    Discount:  PRO_DISCOUNT.value,
    Quantity:  PRO_QUANTITY.value,
    Status:  PRO_QUANTITY.value > 0 ? "In Stock" : "Out of Stock",
    Description:  PRO_DESCRIPTION.value,
    isNew:  PRO_ISNEW.checked,
  }

  if (index == null) {
    // Add new PRODUCT to the products list
    products.push(PRODUCT);
  }else{
    products[index] = PRODUCT;
  }

  // put back the Products list in localStorage
  localStorage.setItem("Products", JSON.stringify(products));

  PRO_TITLE.focus({ preventScroll: true ,focusVisible: true});

  // show alert
  if (index == null) {
    alert("Product added successfully!");
  }else{
    alert("Product updated successfully!");
  }
}

function deleteProduct() {
  // Read products from localStorage
  let products = JSON.parse(localStorage.getItem("Products"));
  
  console.log(products,proIndex,operationType)
  if (!products || proIndex == null || operationType != "Updating"  || proIndex > products.length) {
    // show alert
    alert("Sorry, we encountered a problem when trying to delete the product. Please refresh the page and try again.");
    return;
  }
  const confirmed = confirm(`Are you sure you want to delete the product ${products[proIndex].Title}?`);
  
  if (confirmed) {
    products.splice(proIndex, 1);

    // put back the Products list in localStorage
    localStorage.setItem("Products", JSON.stringify(products));
  
    PRO_TITLE.focus({ preventScroll: true ,focusVisible: true});
    
    alert("Product deleted successfully!");

    clearForm();
  }
}

function clearForm() {
  // set operationType to Adding
  operationType = "Adding";

  // Clear all data
  for (const ELEMENT of REQUIRE_ELEMENTS) {
    ELEMENT.value = "";
  }
  PRO_ID.value = "";
  PRO_DISCOUNT.value = "";
  PRO_DESCRIPTION.value = "";
  PRO_ISNEW.checked = false;
  IMAGE_PREVIEW.src = DEFAULT_IMAGE_SRC;
  UPLOAD_TEXT.style.display = "block"; 
  proIndex = null

  // update the header 
  document.querySelector(".header").innerHTML = 
  `
  <h1>Add New Product</h1>
  <p>Fill in the details to add a product to your inventory</p>
  `;
  
  // show PRO_TIP_ID and UPLOAD_TEXT
  PRO_TIP_ID.style.display = "block";
  UPLOAD_TEXT.style.display = "block"; 
  // change btns textContent
  BTN_ADD_PRODUCT.textContent = "Add Product";
  BTN_CLEAR_FORM.textContent = "Clear Form";
  // hide delete btn
  BTN_DELETE_PRODUCT.style.display = "none"; 

  // show outOfStock box
  updateStatus();

  // hide all errors
  document.querySelectorAll(".missing").forEach(element =>{
    element.classList.remove("missing");
    toggleErrorTipVisibility(false,element)
  });
  toggleErrorTipVisibility(false,IMAGE_UPLOAD_BOX);

  // apply Default colors
  document.querySelectorAll('input, select, textarea').forEach(el => {
    checkFilled(el); 
  });

  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

function layout(){
  // Get ID parameter
  const ID = new URLSearchParams(window.location.search).get("id");
  // Read products from localStorage
  let products = JSON.parse(localStorage.getItem("Products"));

  // check ID is available
  if (!ID) {
    return;
  }

  // check products are available
  if (!products) {
    show404Page();
    return;
  }

  // search for the specific PRODUCT
  proIndex = products.findIndex(product => product.ID == ID);
  const PRODUCT = products[proIndex];

  // check PRODUCT are available
  if (!PRODUCT){
    show404Page();
    return;
  }

  // set operationType to Updating
  operationType = "Updating";

  // update the header 
  document.querySelector(".header").innerHTML = 
  `
    <h1>Update Product</h1>
    <p>Modify the details of the product in your inventory</p>
  `;

  // show all product data
  PRO_ID.value = ID;
  PRO_TITLE.value = PRODUCT.Title;
  PRO_CATEGORY.value = PRODUCT.Category;
  PRO_BRAND.value = PRODUCT.Brand;
  IMAGE_PREVIEW.src = PRODUCT.Image;
  PRO_PRICE.value = PRODUCT.Price;
  PRO_DISCOUNT.value = PRODUCT.Discount;
  PRO_QUANTITY.value = PRODUCT.Quantity;
  PRO_DESCRIPTION.value = PRODUCT.Description;
  PRO_ISNEW.checked = PRODUCT.isNew;
  updateStatus();

  // hide PRO_TIP_ID and UPLOAD_TEXT
  PRO_TIP_ID.style.display = "none";
  UPLOAD_TEXT.style.display = "none"; 
  // change btns textContent
  BTN_ADD_PRODUCT.textContent = "Update";
  BTN_CLEAR_FORM.textContent = "Cancel";
  // show delete btn
  BTN_DELETE_PRODUCT.style.display = "block"; 
}

function show404Page(){
    window.location.href = '404ErrorPage.html';
}

/***********************
*     Data Events
***********************/
BTN_ADD_PRODUCT.addEventListener("click", function () {
  if (checkIsAllDataValid() == true) {
    if (operationType == "Adding") {
      saveProduct();
    }else if (operationType == "Updating") {
      saveProduct(proIndex);
    }
    clearForm();
  }
});

BTN_DELETE_PRODUCT.addEventListener("click",deleteProduct)

BTN_CLEAR_FORM.addEventListener("click", function () {
  if (operationType == "Adding") {
    clearForm();
  }else if (operationType == "Updating") {
    // open home page
    window.location.href = 'homePage.html';
  }
});

/***********************
*     UI Events
***********************/
layout();

// Select all inputs, selects, and textareas
document.querySelectorAll('input, select, textarea').forEach(el => {
    el.addEventListener('input', () => checkFilled(el));
    el.addEventListener('change', () => checkFilled(el)); // for select
    checkFilled(el); // check initial state (in case of pre-filled values)
});

// change Status based on PRO_QUANTITY.value
PRO_QUANTITY.addEventListener("change",updateStatus);

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