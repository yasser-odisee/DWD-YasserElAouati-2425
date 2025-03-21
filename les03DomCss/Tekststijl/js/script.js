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

// Stijlknoppen
document.querySelector("#stijl1").addEventListener("click", () => {
    text.style.textShadow = "2px 2px 5px rgba(0, 0, 0, 0.5)";
});

document.querySelector("#stijl2").addEventListener("click", () => {
    text.style.backgroundImage = "linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet)";
    text.style.color = "transparent";
    text.style.backgroundClip = "text";
});

document.querySelector("#stijl3").addEventListener("click", () => {
    text.style.transform = "scaleX(-1)";
});
