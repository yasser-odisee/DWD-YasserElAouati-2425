// Elementen selecteren
const form = document.querySelector(".chat-form");
const emailInput = document.getElementById("email");
const commentInput = document.getElementById("comment");
const chatlog = document.querySelector(".chatlog");

// Eventlistener voor het formulier
form.addEventListener("submit", function(e) {
  e.preventDefault(); // voorkom herladen van pagina

  const email = emailInput.value.trim();
  const comment = commentInput.value.trim();

  // Formchecking
  if (email === "" || comment === "") {
    alert("Vul een e-mailadres en een comment in.");
    return;
  }

  // Chatbericht aanmaken
  const bericht = document.createElement("div");
  bericht.className = "chat-message";

  const avatar = document.createElement("img");
  avatar.src = "https://www.gravatar.com/avatar/?d=mp"; // standaard avatar
  avatar.alt = "User avatar";

  const tekst = document.createElement("p");
  tekst.textContent = comment;

  // Samenstellen
  bericht.appendChild(avatar);
  bericht.appendChild(tekst);
  chatlog.appendChild(bericht);


  // Formulier wissen
  commentInput.value = "";
});
