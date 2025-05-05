/***********************
*      Elements
***********************/
const PRO_TITLE = document.getElementById("pro-Title");
const PRO_PRICE = document.getElementById("pro-price");
const PRO_DISCOUNT = document.getElementById("pro-discount");
const PRO_QUANTITY = document.getElementById("product-qty");
const PRO_DESCRIPTION = document.getElementById("pro-description");
const IN_STOCK = document.getElementById("inStock");
const OUT_OF_STOCK = document.getElementById("outOfStock");
const PRO_IMG = document.getElementById("pro-img");
const BTN_ADD_PRODUCT = document.getElementById("btn-addProduct");
const BTN_INCREASE = document.getElementById("btnIncrease");
const BTN_DECREASE = document.getElementById("btnDecrease");
const QTY_CONTAINER = document.getElementById("qty-container");
/***********************
*      Variables
***********************/
const PRODUCTS = JSON.parse(localStorage.getItem("Products"));
let product;
/***********************
*      Methods
***********************/
function show404Page(){
  window.location.href = '404ErrorPage.html';
}

function getProduct() {
  const STRING_PARAMETERS = window.location.search;

  const URL_PARAMETERS = new URLSearchParams(STRING_PARAMETERS);

  const PRODUCT_ID = URL_PARAMETERS.get('id');

  if (!PRODUCT_ID ) {
    show404Page();
    return;
  }

  product = PRODUCTS.find(p => p.ID == PRODUCT_ID);
  
  if (!product) {
    show404Page();
    return;
  }
}

function showProduct() {

  PRO_TITLE.textContent = product.Title;

  if (product.Discount == 0 || product.Discount == "") {
    PRO_DISCOUNT.style.display = "none";
    PRO_PRICE.classList.add("only");
  }
  else {
    PRO_DISCOUNT.textContent =  (product.Price - product.Discount) + "$";
    PRO_DISCOUNT.style.display = "block";
    PRO_PRICE.classList.remove("only");
  }
  PRO_PRICE.textContent = product.Price + "$";

  PRO_DESCRIPTION.textContent = product.Description;
  PRO_IMG.src = product.Image;
  PRO_QUANTITY.max = product.Quantity;
  if (product.Quantity > 0) {
    IN_STOCK.classList.add("active");
    OUT_OF_STOCK.classList.remove("active");
    BTN_ADD_PRODUCT.classList.remove("readonly");
  } else {
    IN_STOCK.classList.remove("active");
    OUT_OF_STOCK.classList.add("active");
    BTN_ADD_PRODUCT.classList.add("readonly");
    QTY_CONTAINER.style.display = "none";
  }
  PRO_QUANTITY.value = getCartQuantity(product.ID);
  PRO_QUANTITY.max = product.Quantity;
  if (PRO_QUANTITY.value >= 1) {
    QTY_CONTAINER.style.display = "block";
    BTN_ADD_PRODUCT.style.display = "none";
  }else{
    QTY_CONTAINER.style.display = "none";
    BTN_ADD_PRODUCT.style.display = "block";
  }
}

function getCartQuantity(productId) {
  const cart = JSON.parse(localStorage.getItem("Cart")) || [];
  const cartItem = cart.find(item => item.ID == productId);
  return cartItem ? cartItem.Quantity : 0;
}


function handleCart(quantity) {
  const cart = JSON.parse(localStorage.getItem("Cart")) || [];
  const existingItem = cart.find(item => item.ID == product.ID);
  if (existingItem) {
    existingItem.Quantity += quantity;
  } else {
    cart.push( {
      ID: product.ID,
      Image: product.Image,
      Title: product.Title,
      Category: product.Category,
      Brand: product.Brand,
      Price:product.Price,
      Discount: product.Discount,
      isNew: product.isNew,
      Quantity: quantity,
      Status: product.Status,
      Description: product.Description,
    });
    PRO_QUANTITY.value = quantity;
  }
  if (existingItem && existingItem.Quantity <= 0){
    cart.splice(cart.indexOf(existingItem), 1);
  }

  if (PRO_QUANTITY.value <=0) {
    QTY_CONTAINER.style.display = "none";
    BTN_ADD_PRODUCT.style.display = "block";
  }else{
    QTY_CONTAINER.style.display = "block";
    BTN_ADD_PRODUCT.style.display = "none";
  }
  localStorage.setItem("Cart", JSON.stringify(cart));
}
/***********************
*     Data Events
***********************/
BTN_ADD_PRODUCT.addEventListener("click", function () {
  handleCart(1);
});

BTN_INCREASE.addEventListener("click", function () {
  if (PRO_QUANTITY.value < PRO_QUANTITY.max) {
    PRO_QUANTITY.value++;
    handleCart(1);
  }
});

BTN_DECREASE.addEventListener("click", function () {
  if (PRO_QUANTITY.value > 0) {
    PRO_QUANTITY.value--;
    handleCart(-1);
  }
});

/***********************
*     UI Events
***********************/
document.addEventListener("DOMContentLoaded", function () {
  getProduct();
  showProduct();
});
