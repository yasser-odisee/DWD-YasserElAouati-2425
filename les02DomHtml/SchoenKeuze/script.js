// Verwijzingen naar elementen
const form = document.getElementById('frmOrder');
const emailInput = document.getElementById('inpEmail');
const selectMeasure = document.getElementById('selMeasure');
const messageLabel = document.getElementById('lblMessage');
const modelLinks = document.querySelectorAll('#model a');
const shoeImage = document.querySelector('#figShoe img');
const shoeCaption = document.querySelector('#figShoe figcaption');

form.setAttribute('novalidate', 'novalidate');

const accessories = {
    "polish": 12.29,
    "shoe stretcher": 8.89,
    "shoe horn": 18.70
};

// Form validation en bestelling tonen
form.addEventListener('submit', function (event) {
    event.preventDefault();
    let errorCount = 0;

    // E-mail validatie
    if (emailInput.value.trim() === '') {
        displayErrorMessage('msgEmail', 'Email mag niet leeg zijn!');
        errorCount++;
    } else if (!isValidEmail(emailInput.value)) {
        displayErrorMessage('msgEmail', 'Ongeldig e-mailadres');
        errorCount++;
    } else {
        clearErrorMessage('msgEmail');
    }

    // Schoenmaat validatie
    if (selectMeasure.value === '') {
        displayErrorMessage('msgMeasure', 'Selecteer je maat');
        errorCount++;
    } else {
        clearErrorMessage('msgMeasure');
    }

    // Als er geen fouten zijn, toon de eindtekst
    if (errorCount === 0) {
        const gekozenSchoen = shoeCaption.textContent;
        const gekozenMaat = selectMeasure.value;
        let totaalPrijs = 54.99;

        const geselecteerdeAccessoires = [];
        document.querySelectorAll('#accessories input[type="checkbox"]:checked').forEach(checkbox => {
            const accessoireNaam = checkbox.name;
            geselecteerdeAccessoires.push(accessoireNaam);
            totaalPrijs += accessories[accessoireNaam];
        });

        // Eindboodschap tonen
        const messageText = `Je keuze: ${gekozenSchoen}, maat ${gekozenMaat}, accessoires: ${geselecteerdeAccessoires.join(', ')} (totaalprijs: € ${totaalPrijs.toFixed(2)})`;
        messageLabel.textContent = messageText;
    } else {
        messageLabel.textContent = '';
    }
});

// Modelkeuze updaten
modelLinks.forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();

        // Class 'selected' aanpassen
        const currentSelected = document.querySelector('#model .selected');
        if (currentSelected) {
            currentSelected.classList.remove('selected');
        }
        link.classList.add('selected');

        // Afbeelding en onderschrift updaten
        const imageUrl = this.getAttribute('href');
        const modelText = this.textContent;
        shoeImage.setAttribute('src', imageUrl);
        shoeCaption.textContent = `JORDAN 1 MID ${modelText}`;
    });
});

// Hulpfuncties
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
