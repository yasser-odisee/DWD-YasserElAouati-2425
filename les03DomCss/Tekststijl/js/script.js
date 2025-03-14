const fontSizeRange = document.querySelector('#fontSizeRange');
const fontColorPicker = document.querySelector('#fontColorPicker');
const text = document.querySelector('#text');
const boldCheckbox = document.querySelector('#bold');
const italicCheckbox = document.querySelector('#italic');
const uppercaseCheckbox = document.querySelector('#uppercase');

fontSizeRange.addEventListener('input', () => {
    text.style.fontSize = fontSizeRange.value + 'px';
});

fontColorPicker.addEventListener('input', () => {
    text.style.color = fontColorPicker.value;
});

boldCheckbox.addEventListener('change', () => {
    text.style.fontWeight = boldCheckbox.checked ? 'bold' : 'normal';
});

italicCheckbox.addEventListener('change', () => {
    text.style.fontStyle = italicCheckbox.checked ? 'italic' : 'normal';
});

uppercaseCheckbox.addEventListener('change', () => {
    text.style.textTransform = uppercaseCheckbox.checked ? 'uppercase' : 'none';
});
//chatgpt gebruikt voor de buttons omdat ik niet zo goed wist wat ik moest doen maar heb het nu wel begrepen.
document.querySelector("#stijl1").addEventListener("click", function() {
    var textElement = document.querySelector("#text");
    textElement.style.textShadow = "2px 2px 5px rgba(0, 0, 0, 0.5)";
});

document.querySelector("#stijl2").addEventListener("click", function() {
    var textElement = document.querySelector("#text");
    textElement.style.backgroundImage = "linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet)";
    textElement.style.color = "transparent";
    textElement.style.webkitBackgroundClip = "text";
});

document.querySelector("#stijl3").addEventListener("click", function() {
    var textElement = document.querySelector("#text");
    textElement.style.transform = "scaleX(-1)";
});
