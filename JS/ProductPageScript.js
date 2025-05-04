
//*********************************************************************************************************************/

                                        //read the product ID from URL
                                          
const STRING_PARAMETERS = window.location.search;

const URL_PARAMETERS = new URLSearchParams(STRING_PARAMETERS);

const PRODUCT_ID = URL_PARAMETERS.get('id');

// console.log (PRODUCT_ID);
// 404Page.html
//---------------------------------------------------------------------------------------------------------------------------//

//                                           //access the products from local storage

const STRING_DATA = localStorage.getItem('Products');

//string to array 

const PRODUCTS = JSON.parse(STRING_DATA);                                              

// console.log(PRODUCTS);

function ToErrorPage(PARAMETER) {
  if (!PARAMETER) {
    window.location.href = "404ErrorPage.html";
  }
}

ToErrorPage(PRODUCTS);



// //----------------------------------------------------------------------------------------------------------------------------//
                                            
//                                           //aim the target product

let TARGET_PRODUCT

for (let i = 0; i < PRODUCTS.length; i++) {
    if (PRODUCTS[i].ID === PRODUCT_ID) {
        TARGET_PRODUCT = PRODUCTS[i]; 
  }
}

ToErrorPage(TARGET_PRODUCT);

// console.log(TARGET_PRODUCT);

//                                                                                    

// //----------------------------------------------------------------------------------------------------------------------------//

//                                           //show product data

 document.getElementById("title").innerHTML = TARGET_PRODUCT.Title;

 document.getElementById("price").innerHTML = TARGET_PRODUCT.Price;

 document.getElementById("features").innerHTML = TARGET_PRODUCT.Description;

 document.getElementById("stock").innerHTML = TARGET_PRODUCT.Status;

 document.getElementById("selected-img").src = TARGET_PRODUCT.Image;

//----------------------------------------------------------------------------------------------------------------------------//

                                          //choose quantity

let MAX_QTY = TARGET_PRODUCT.Quantity;
let MIN_QTY = 1;
let SELECTED_QTY_STR = document.getElementById("product-qty");

function increase() {
  let SELECTED_QTY_INT = parseInt(SELECTED_QTY_STR.value);
    if (SELECTED_QTY_INT <= MAX_QTY) {
      SELECTED_QTY_INT = SELECTED_QTY_INT + 1;
    }
}

function decrease() {
  let SELECTED_QTY_INT = parseInt(SELECTED_QTY_STR.value);
    if (SELECTED_QTY_INT >= MIN_QTY) {
      SELECTED_QTY_INT = SELECTED_QTY_INT - 1;
    }
}

document.getElementById("btnDecrease").addEventListener("click",decrease);
document.getElementById("btnIncrease").addEventListener("click",increase);

//console.log(SELECTED_QTY_INT)

//*****************************************************************************************************************************
//*****************************************************************************************************************************
                                         //local storage for cart

var cart = [];


function creatCartInLocalStorage() {
    localStorage.setItem('Cart', JSON.stringify(cart));
}


if (!localStorage.getItem("Cart")) {
  createCartInLocalStorage();
}

function check() {
  const SELECTED_QTY = parseInt(document.getElementById("product-qty").value);


  if (TARGET_PRODUCT.Quantity < 1) {
    alert("The product is out of stock!");
    return;
  }


  cart = JSON.parse(localStorage.getItem("Cart"));

 
  let existingProductIndex = cart.findIndex(item => item.ID === TARGET_PRODUCT.ID);

  if (existingProductIndex !== -1) {
    cart[existingProductIndex].Quantity += SELECTED_QTY;
  }
  else {
    const ADDED_PRODUCT = {
      ID: TARGET_PRODUCT.ID,
      Title: TARGET_PRODUCT.Title,
      Price: TARGET_PRODUCT.Price,
      Image: TARGET_PRODUCT.Image,
      Quantity: SELECTED_QTY
    };

    cart.push(ADDED_PRODUCT);  
  }

  localStorage.setItem("Cart", JSON.stringify(cart));

  alert("Product added to cart successfully");
}


document.getElementById("add").addEventListener("click", check);
