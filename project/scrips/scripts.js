const chatForm = document.querySelector('#chat-form');
const chatMessages = document.querySelector('#chat-messages');
const emailInput = document.querySelector('#email');
const messageInput = document.querySelector('#message');
const gifModal = document.querySelector('#gif-modal');
const closeModal = document.querySelector('#close-modal');
const gifContainer = document.querySelector('#gif-container');
const darkModeToggle = document.querySelector('#dark-mode-toggle');
const recordBtn = document.querySelector('#record-btn');
const gifBtn = document.querySelector('#gif-btn');
const resetBtn = document.querySelector('#reset-btn');

// Gravatar API URL
const GRAVATAR_URL = 'https://www.gravatar.com/avatar/';
const DEFAULT_AVATAR = 'https://www.gravatar.com/avatar/?d=identicon';

// Giphy API sleutel en URL
const GIPHY_API_KEY = 'eINiaZPpl2ltCKl82cXUamrJ233mCMFd';
const GIPHY_API_URL = `https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_API_KEY}&limit=12&q=`;

// LocalStorage sleutel
const STORAGE_KEY = 'chatroom_data';
const DARK_MODE_KEY = 'chatroom_dark_mode';

// Audio recording variables
let mediaRecorder;
let audioChunks = [];
let recordingStartTime;
let recordingInterval;
let isRecording = false;

// Initialisatie
init();

function init() {
  // Laad opgeslagen chatgeschiedenis
  loadChatHistory();
  
  // Laad dark mode voorkeur
  loadDarkModePreference();
  
  // Check for microphone support
  checkMicrophoneSupport();

  // Event listeners
  chatForm.addEventListener('submit', handleFormSubmit);
  closeModal.addEventListener('click', () => gifModal.style.display = 'none');
  darkModeToggle.addEventListener('click', toggleDarkMode);
  recordBtn.addEventListener('mousedown', startRecording);
  recordBtn.addEventListener('mouseup', stopRecording);
  recordBtn.addEventListener('mouseleave', stopRecording);
  gifBtn.addEventListener('click', () => showGifModal(''));
  resetBtn.addEventListener('click', resetChat);

  // Sluit modal wanneer er buiten geklikt wordt
  window.addEventListener('click', (e) => {
    if (e.target === gifModal) {
      gifModal.style.display = 'none';
    }
  });
}

function handleFormSubmit(e) {
  e.preventDefault();
  const email = emailInput.value.trim();
  const message = messageInput.value.trim();

  if (email && message) {
    addTextMessage(email, message);
    saveChatHistory();
    messageInput.value = '';
  }
}

function addTextMessage(email, message) {
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
  const messageParagraph = messageElement.querySelector('p');
  if (messageParagraph) {
    messageParagraph.addEventListener('dblclick', (e) => {
      const word = window.getSelection().toString().trim() || e.target.textContent.trim();
      if (word) {
        showGifModal(word);
      }
    });
  }

  saveChatHistory();
}

function addAudioMessage(email, audioBlob) {
  const avatarUrl = getGravatarUrl(email);
  const audioUrl = URL.createObjectURL(audioBlob);
  const audioElement = document.createElement('audio');
  audioElement.src = audioUrl;
  audioElement.controls = true;
  audioElement.classList.add('audio-player');
  
  const messageElement = document.createElement('div');
  messageElement.classList.add('message');
  messageElement.innerHTML = `
    <img src="${avatarUrl}" alt="Avatar" data-tooltip="${email}">
    <div class="audio-message">
      ${audioElement.outerHTML}
      <span class="audio-duration">0s</span>
    </div>
  `;
  
  // Update duration when metadata is loaded
  audioElement.onloadedmetadata = () => {
    const duration = Math.round(audioElement.duration);
    messageElement.querySelector('.audio-duration').textContent = `${duration}s`;
  };

  chatMessages.appendChild(messageElement);
  chatMessages.scrollTop = chatMessages.scrollHeight;
  
  saveChatHistory();
}

function getGravatarUrl(email) {
  const hash = md5(email.trim().toLowerCase());
  return `${GRAVATAR_URL}${hash}?d=${encodeURIComponent(DEFAULT_AVATAR)}`;
}

async function showGifModal(initialQuery = '') {
  gifModal.style.display = 'flex';
  gifContainer.innerHTML = '<p>Zoek GIFs met trefwoorden...</p>';
  
  const gifSearch = document.querySelector('#gif-search');
  const gifSearchBtn = document.querySelector('#gif-search-btn');
  
  gifSearch.value = initialQuery;
  
  const searchGifs = async (query) => {
    if (!query.trim()) {
      gifContainer.innerHTML = '<p>Voer een zoekterm in...</p>';
      return;
    }
    
    try {
      gifContainer.innerHTML = '<p>GIFs aan het laden...</p>';
      const response = await fetch(`${GIPHY_API_URL}${encodeURIComponent(query)}`);
      const data = await response.json();
      
      if (data.data.length === 0) {
        gifContainer.innerHTML = '<p>Geen GIFs gevonden. Probeer een andere zoekterm.</p>';
        return;
      }
      
      gifContainer.innerHTML = '';
      data.data.forEach((gif) => {
        const img = document.createElement('img');
        img.src = gif.images.fixed_height.url;
        img.alt = gif.title;
        img.addEventListener('click', () => {
          if (emailInput.value.trim()) {
            addTextMessage(emailInput.value.trim(), `<img src="${gif.images.fixed_height.url}" alt="${gif.title}">`);
            gifModal.style.display = 'none';
          } else {
            alert('Voer eerst je e-mailadres in');
          }
        });
        gifContainer.appendChild(img);
      });
    } catch (error) {
      console.error('Error fetching GIFs:', error);
      gifContainer.innerHTML = '<p>Fout bij het laden van GIFs. Probeer het later opnieuw.</p>';
    }
  };
  
  // Verwijder bestaande event listeners om duplicatie te voorkomen
  const newSearchBtn = gifSearchBtn.cloneNode(true);
  gifSearchBtn.parentNode.replaceChild(newSearchBtn, gifSearchBtn);
  
  newSearchBtn.addEventListener('click', () => searchGifs(gifSearch.value.trim()));
  gifSearch.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      searchGifs(gifSearch.value.trim());
    }
  });
  
  if (initialQuery.trim()) {
    await searchGifs(initialQuery);
  }
}

function saveChatHistory() {
  const messages = [];
  
  document.querySelectorAll('.message').forEach((messageElement) => {
    if (messageElement.querySelector('.audio-message')) {
      // Sla audio berichten op als speciaal type
      const email = messageElement.querySelector('img').getAttribute('data-tooltip');
      messages.push({
        type: 'audio',
        email: email,
        html: messageElement.innerHTML
      });
    } else {
      // Normale tekstberichten
      messages.push({
        type: 'text',
        html: messageElement.innerHTML
      });
    }
  });
  
  const chatData = {
    email: emailInput.value.trim(),
    messages: messages
  };
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(chatData));
}

function loadChatHistory() {
  const chatData = JSON.parse(localStorage.getItem(STORAGE_KEY));
  if (chatData) {
    emailInput.value = chatData.email || '';
    chatMessages.innerHTML = '';
    
    chatData.messages.forEach((message) => {
      const messageElement = document.createElement('div');
      messageElement.classList.add('message');
      messageElement.innerHTML = message.html;
      
      // Voor tekstberichten, voeg dubbelklik event toe
      if (message.type === 'text') {
        const messageParagraph = messageElement.querySelector('p');
        if (messageParagraph) {
          messageParagraph.addEventListener('dblclick', (e) => {
            const word = window.getSelection().toString().trim() || e.target.textContent.trim();
            if (word) {
              showGifModal(word);
            }
          });
        }
      }
      
      chatMessages.appendChild(messageElement);
    });
    
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }
}

function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
  const isDarkMode = document.body.classList.contains('dark-mode');
  localStorage.setItem(DARK_MODE_KEY, isDarkMode);
  darkModeToggle.textContent = isDarkMode ? '☀️' : '🌙';
}

function loadDarkModePreference() {
  const darkMode = localStorage.getItem(DARK_MODE_KEY) === 'true';
  if (darkMode) {
    document.body.classList.add('dark-mode');
    darkModeToggle.textContent = '☀️';
  }
}

function checkMicrophoneSupport() {
  if (!navigator.mediaDevices || !window.MediaRecorder) {
    recordBtn.disabled = true;
    recordBtn.title = 'Audio-opname niet ondersteund in uw browser';
    return false;
  }
  return true;
}

async function startRecording(e) {
  e.preventDefault();
  if (isRecording || !emailInput.value.trim()) {
    if (!emailInput.value.trim()) {
      alert('Voer eerst je e-mailadres in');
    }
    return;
  }
  
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder = new MediaRecorder(stream);
    audioChunks = [];
    
    mediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) {
        audioChunks.push(e.data);
      }
    };
    
    mediaRecorder.onstop = () => {
      const audioBlob = new Blob(audioChunks, { type: 'audio/mp3' });
      if (audioBlob.size > 0 && emailInput.value.trim()) {
        addAudioMessage(emailInput.value.trim(), audioBlob);
      }
      
      stream.getTracks().forEach(track => track.stop());
    };
    
    mediaRecorder.start();
    isRecording = true;
    recordBtn.innerHTML = '<div class="recording-indicator"><div class="recording-dot"></div><span class="recording-time">00:00</span></div>';
    
    recordingStartTime = Date.now();
    recordingInterval = setInterval(updateRecordingTime, 1000);
  } catch (error) {
    console.error('Error accessing microphone:', error);
    alert('Microfoontoegang is vereist voor audioberichten. Zorg ervoor dat u toestemming heeft gegeven.');
  }
}

function stopRecording(e) {
  if (e) e.preventDefault();
  if (!isRecording) return;
  
  clearInterval(recordingInterval);
  isRecording = false;
  recordBtn.innerHTML = '🎤';
  
  if (mediaRecorder && mediaRecorder.state !== 'inactive') {
    mediaRecorder.stop();
  }
}

function updateRecordingTime() {
  const elapsed = Math.floor((Date.now() - recordingStartTime) / 1000);
  const minutes = Math.floor(elapsed / 60).toString().padStart(2, '0');
  const seconds = (elapsed % 60).toString().padStart(2, '0');
  recordBtn.querySelector('.recording-time').textContent = `${minutes}:${seconds}`;
}

function resetChat() {
  if (confirm('Weet je zeker dat je de chat wilt resetten? Alle berichten zullen verloren gaan.')) {
    localStorage.removeItem(STORAGE_KEY);
    chatMessages.innerHTML = '';
    messageInput.value = '';
  }
}

function md5(string) {
  return CryptoJS.MD5(string).toString();
}