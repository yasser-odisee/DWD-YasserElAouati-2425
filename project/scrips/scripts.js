const chatForm = document.querySelector('#chat-form');
const chatMessages = document.querySelector('#chat-messages');
const emailInput = document.querySelector('#email');
const messageInput = document.querySelector('#message');
const gifModal = document.querySelector('#gif-modal');
const closeModal = document.querySelector('#close-modal');
const gifContainer = document.querySelector('#gif-container');

// Gravatar API URL
const GRAVATAR_URL = 'https://www.gravatar.com/avatar/';
const DEFAULT_AVATAR = 'https://www.gravatar.com/avatar/?d=identicon';

// Giphy API sleutel en URL
const GIPHY_API_KEY = 'eINiaZPpl2ltCKl82cXUamrJ233mCMFd';
const GIPHY_API_URL = `https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_API_KEY}&limit=5&q=`;

// LocalStorage sleutel
const STORAGE_KEY = 'chatroom_data';

// Laad opgeslagen chatgeschiedenis direct
loadChatHistory();

// Event listener voor het formulier
chatForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = emailInput.value.trim();
  const message = messageInput.value.trim();

  if (email && message) {
    addMessage(email, message);
    saveChatHistory();
    chatForm.reset();
  }
});

// Voeg een bericht toe aan de chat
function addMessage(email, message) {
  const avatarUrl = getGravatarUrl(email);
  const messageElement = document.createElement('div');
  messageElement.classList.add('message');
  messageElement.innerHTML = `
    <img src="${avatarUrl}" alt="Avatar" data-tooltip="${email}">
    <p>${message}</p>
  `;
  chatMessages.appendChild(messageElement);

  // Scroll naar beneden
  chatMessages.scrollTop = chatMessages.scrollHeight;

  // Voeg dubbelklik-event toe aan berichten
  messageElement.querySelector('p').addEventListener('dblclick', (e) => {
    const word = e.target.textContent;
    showGifModal(word);
  });
}

// Haal Gravatar URL op
function getGravatarUrl(email) {
  const hash = md5(email.trim().toLowerCase()); // MD5 hash van het e-mailadres
  return `${GRAVATAR_URL}${hash}?d=${encodeURIComponent(DEFAULT_AVATAR)}`;
}

// Toon GIF-modal
async function showGifModal(query) {
  gifContainer.innerHTML = ''; // Leeg de container
  try {
    const response = await fetch(GIPHY_API_URL + query);
    const data = await response.json();
    
    data.data.forEach((gif) => {
      const img = document.createElement('img');
      img.src = gif.images.fixed_height.url;
      img.addEventListener('click', () => {
        addMessage(emailInput.value.trim(), `<img src="${gif.images.fixed_height.url}" alt="GIF">`);
        gifModal.style.display = 'none';
      });
      gifContainer.appendChild(img);
    });
    
    gifModal.style.display = 'flex';
  } catch (error) {
    console.error('Error fetching GIFs:', error);
  }
}

// Sluit de modal
closeModal.addEventListener('click', () => {
  gifModal.style.display = 'none';
});

// Sla chatgeschiedenis op in LocalStorage
function saveChatHistory() {
  const chatData = {
    email: emailInput.value.trim(),
    messages: Array.from(chatMessages.children).map((message) => message.innerHTML),
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(chatData));
}

// Laad chatgeschiedenis uit LocalStorage
function loadChatHistory() {
  const chatData = JSON.parse(localStorage.getItem(STORAGE_KEY));
  if (chatData) {
    emailInput.value = chatData.email;
    chatData.messages.forEach((message) => {
      const messageElement = document.createElement('div');
      messageElement.classList.add('message');
      messageElement.innerHTML = message;
      
      // Add double-click event to loaded messages
      const messageText = messageElement.querySelector('p');
      if (messageText) {
        messageText.addEventListener('dblclick', (e) => {
          const word = e.target.textContent;
          showGifModal(word);
        });
      }
      
      chatMessages.appendChild(messageElement);
    });
  }
}

// MD5-functie voor Gravatar (vereist voor hashing)
function md5(string) {
  return CryptoJS.MD5(string).toString();
}
