/***********************
*      Variables
***********************/

/*********************************************************************************************************************/

/***********************
*      Methods
***********************/

function checkIfLoggedInUser(){
    
    const loggedInUser = localStorage.getItem('LoggedInUser');
    if (!loggedInUser) 
      return;

    try {
      
      const userData = JSON.parse(loggedInUser);
      if (!userData || Object.keys(userData).length === 0)
        return;
  
      document.getElementById("login-link").style.display = "none";
      document.getElementById("sign-up-link").style.display = "none";
    }
    catch (error) {
      console.error('Error parsing user data:', error);
    }
  }

  //function check execution
  window.addEventListener('DOMContentLoaded', checkIfLoggedInUser);