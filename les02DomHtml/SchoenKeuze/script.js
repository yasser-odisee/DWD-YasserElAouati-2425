document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('frmOrder');
  const emailInput = document.getElementById('inpEmail');
  const selectMeasure = document.getElementById('selMeasure');
  const messageLabel = document.getElementById('lblMessage');
  form.setAttribute('novalidate', 'novalidate');
  const accessories = {
    "polish": 12.29,
    "shoe stretcher": 8.89,
    "shoe horn": 18.70
  };
  form.addEventListener('submit', function (event) {
    event.preventDefault();
    let errorCount = 0;
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      let errorCount = 0;
      if (emailInput.value.trim() === '') {
        displayErrorMessage('msgEmail', 'Ongeldig e-mailadres');
        errorCount++;
      } else {
        clearErrorMessage('msgmail');
      }
      if (!isValidEmail(emailInput.value)) {
        displayErrorMessage('msgEmail', 'Email mag niet leeg zijn!');
        errorCount++;
      } else {
        clearErrorMessage('msgEmail');
      }
      if (selectMeasure.value === '') {
        displayErrorMessage('msgMeasure', 'Selecteer je maat');
        errorCount++;
      } else {
        clearErrorMessage('msgMeasure');
      }
      if (errorCount === 0) {
        form.submit();
      }
    });
  });
  if (errorCount === 0) {
    const Gekozenschoen = document.querySelector('#figShoe figcaption').textContent;
    const Gekozenmaat = selectMeasure.value;
    let Totaalprijs = 54.99;
    const selectedAccessoryCheckboxes = document.querySelectorAll('#accessories input[type="checkbox"]:checked');
    const Accessories = [];
    selectedAccessoryCheckboxes.forEach(function (checkbox) {
      const AccessoriesName = checkbox.name;
      Accessories.push(AccessoriesName);
      Totaalprijs += accessories[AccessoriesName];
    });
    const messageText = `Je keuze: ${Gekozenschoen}, ${Gekozenmaat}, ${Accessories.join(', ')} (totaalprijs: € ${Totaalprijs.toFixed(2)})`;
    messageLabel.textContent = messageText;
  } else {
    messageLabel.textContent = '';
  }
});
function isValidEmail(email) {
  if (!email) return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
function displayErrorMessage(elementId, message) {
  document.getElementById(elementId).textContent = message;
}
function clearErrorMessage(elementId) {
  document.getElementById(elementId).textContent = '';
}
const modelLinks = document.querySelectorAll('#model a');
const shoeImage = document.querySelector('#figShoe img');
const shoeCaption = document.querySelector('#figShoe figcaption');
modelLinks.forEach(function (link) {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    const imageUrl = this.getAttribute('href');
    const modelText = this.textContent;
    shoeImage.setAttribute('src', imageUrl);
    shoeCaption.textContent = `JORDAN 1 MID ${modelText}`;
  });
});