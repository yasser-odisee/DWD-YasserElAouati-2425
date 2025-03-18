const btnSubmit = document.querySelector('#btnSubmit');
const bidAmount = document.querySelector('#bod');
const bidderName = document.querySelector('#bidnaam');
const message = document.querySelector('#message');
let highestBid = 0;
let highestBidder = '';

btnSubmit.addEventListener('click', function () {
    const bidValue = Number(bidAmount.value.trim());
    const nameValue = bidderName.value.trim();
   
    if (!bidValue || bidValue <= 0) {
        message.textContent = 'Er is nog geen bod uitgebracht';
        return;
    }
   
    if (nameValue === '') {
        message.textContent = 'Vul je naam in!';
        return;
    }
   
    if (bidValue > highestBid) {
        highestBid = bidValue;
        highestBidder = nameValue;
        message.textContent = `Gefeliciteerd ${highestBidder}! Je hebt het hoogste bod van €${highestBid}.`;
    } else {
        message.textContent = `Jammer ${nameValue}, ${highestBidder} heeft al een hoger bod van €${highestBid}.`;
    }

    bidAmount.value = '';
    bidderName.value = '';
});