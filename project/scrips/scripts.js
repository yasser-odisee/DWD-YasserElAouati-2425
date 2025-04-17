
const chatForm = document.querySelector('#chat-form');
const chatMessages = document.querySelector('#chat-messages');
const emailInput = document.querySelector('#email');
const messageInput = document.querySelector('#message');

// Gravatar API
const GRAVATAR_URL = 'https://www.gravatar.com/avatar/';
const DEFAULT_AVATAR = 'https://www.gravatar.com/avatar/?d=identicon';

// MD5-hashfunctie (vereist CryptoJS bibliotheek, zie onderaan)
function md5(string) {
  return CryptoJS.MD5(string.trim().toLowerCase()).toString();
}

// Gravatar-profiel ophalen
function getGravatarUrl(email) {
  const hash = md5(email);
  return `${GRAVATAR_URL}${hash}?d=${encodeURIComponent(DEFAULT_AVATAR)}`;
}

// Bericht toevoegen
function addMessage(email, message) {
  const avatarUrl = getGravatarUrl(email);
  const messageElement = document.createElement('div');
  messageElement.classList.add('message');

  messageElement.innerHTML = `
    <img src="${avatarUrl}" alt="Avatar" data-tooltip="${email}">
    <p>${message}</p>
  `;

  chatMessages.appendChild(messageElement);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Event: formulier verzenden
chatForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const email = emailInput.value.trim();
  const message = messageInput.value.trim();

  if (!email || !message) {
    alert("Vul zowel je e-mailadres als een bericht in.");
    return;
  }

  addMessage(email, message);
  chatForm.reset();
});
