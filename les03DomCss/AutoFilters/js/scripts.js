const image = document.querySelector("img");
const filters = document.querySelectorAll(".filter");
const opacitySlider = document.querySelector("input[type='range']");
const opacityLabel = document.querySelector("span:last-of-type");

function removeAllFilters() {
    image.className = "";
}
filters.forEach(filter => {
    filter.addEventListener("click", function() {
        removeAllFilters();
        const filterType = this.textContent.toLowerCase();
        if (filterType !== "normal") {
            image.classList.add(filterType); 
        }
        
        filters.forEach(btn => btn.classList.remove("active"));
        this.classList.add("active");
    });
});


opacitySlider.addEventListener("input", function() {
    image.style.opacity = this.value; 
    opacityLabel.textContent = `${Math.round(this.value * 100)}%`;
});
