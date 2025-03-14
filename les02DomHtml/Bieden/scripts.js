const btnSubmit = document.querySelector('#btnSubmit');
const bidAmount = document.querySelector('#bod');
const bidderName = document.querySelector('#bidnaam');
const message = document.querySelector('#message');
let highestBid = 0;
let highestBidder = '';
btnSubmit.addEventListener('click', function() {
    const bidValue = Number(bidAmount.value.trim());
    if (!bidValue || bidValue < 0) {
        //Stelt de tekstinhoud van het HTML-element message (online gevonden maar heb het voledig begrepen)
        message.textContent = 'Er is nog geen bod uitgebracht';
    } else {
        if (bidValue > highestBid) {
            highestBid = bidValue;
            highestBidder = bidderName.value.trim();
            message.textContent = `Gefeliciteerd! Je hebt momenteel het hoogste bod.`;
        } else {
            message.textContent = `Jammer! ${highestBidder} heeft een hoger bod.`;
        }
    }
});