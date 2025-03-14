const image = document.querySelector("img");
const filters = document.querySelectorAll(".filter");
const opacitySlider = document.querySelector("input[type='range']");
const originalGrayscaleValue = 100;
function removeAllFilters() {
    image.classList.remove("grayscale", "sepia", "hue", "blur", "invert");
    image.style.filter = 'none';
}
filters.forEach(filter => {
    filter.addEventListener("click", function() {
        removeAllFilters();
        const filterType = this.textContent.toLowerCase();
       //chatgpt gebruikt voor de grayfilter maar de rest zelf gevonden
        if (filterType === "grayscale") {
            const grayscaleValue = opacitySlider.value < 100 ? parseInt(opacitySlider.value) * 100 : originalGrayscaleValue;
            image.style.filter = `grayscale(${grayscaleValue}%)`;
        } else if (filterType === "sepia") {
            image.style.filter = "sepia()";
        } else if (filterType === "hue") {
            image.style.filter = "hue-rotate(180deg)";
        } else if (filterType === "blur") {
            image.style.filter = `blur(5px)`;
        } else {
            image.classList.add(filterType);
        }
        filters.forEach(btn => btn.classList.remove("active"));
        this.classList.add("active");
    });
});
opacitySlider.addEventListener("input", function() {
    image.style.opacity = this.value;
    document.querySelector("span:last-of-type").textContent = `${Math.round(this.value * 100)}%`;
});