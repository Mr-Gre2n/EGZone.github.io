//Navbar placeholder (frist elemant)
const NAVBAR_PLACEHOLDER = document.createElement('div');
document.body.insertBefore(NAVBAR_PLACEHOLDER, document.body.firstChild);

//Footer placeholder (last elemant)
const FOOTER_PLACEHOLDER = document.createElement('div'); 
document.body.appendChild(FOOTER_PLACEHOLDER);


//Load CSS Files
function loadCSS(href) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    document.head.appendChild(link);
}

//CSS Files
loadCSS('../CSS/navbarStyle.css');
loadCSS('../CSS/footerStyle.css');
loadCSS('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&icon_names=account_circle');

//Navbar
fetch('../HTML/navbar.html')
.then(res => res.text())
.then(data => {
    NAVBAR_PLACEHOLDER.innerHTML = data;
    const script = document.createElement('script');
    script.src = '../JS/navbarScript.js';
    document.body.appendChild(script);
});

//Footer
fetch('../HTML/footer.html')
.then(res => res.text())
.then(data => {
    FOOTER_PLACEHOLDER.innerHTML = data;
    const script = document.createElement('script');
    script.src = '../JS/footerScript.js';
    document.body.appendChild(script);
});