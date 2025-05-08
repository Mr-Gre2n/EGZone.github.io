/***********************
*      Methods
***********************/

function checkIfLoggedInUser(){
    const loggedInUser = JSON.parse(localStorage.getItem('LoggedInUser'));
    if (!loggedInUser || loggedInUser.length === 0) {
      document.getElementById("add-product-link").style.display = "none";
      return;
    }else{
      document.getElementById("login-link").style.display = "none";
      document.getElementById("sign-up-link").style.display = "none";
    }
  }

checkIfLoggedInUser();