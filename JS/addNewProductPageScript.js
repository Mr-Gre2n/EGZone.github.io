function checkFilled(el) {
    // For select, check value (usually "")
    const isFilled = el.value.trim() !== '';
    el.classList.toggle('filled', isFilled);
}

  // Select all inputs, selects, and textareas
const elements = document.querySelectorAll('input, select, textarea');

elements.forEach(el => {
    el.addEventListener('input', () => checkFilled(el));
    el.addEventListener('change', () => checkFilled(el)); // for select
    checkFilled(el); // check initial state (in case of pre-filled values)
});