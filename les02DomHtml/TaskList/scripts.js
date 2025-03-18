    const taskList = document.querySelector("#tasks");
    const form = document.querySelector("#frmTask");
    form.addEventListener("submit", function(event) {
        event.preventDefault();
        const priority = document.querySelector("#selPriority").value;
        const deadline = document.querySelector("#datDeadline").value;
        const taskDescription = document.querySelector("#txtTask").value;
        const taskHTML = `
            <div class="task ${priority}">
                <span class="priority material-icons">assignment</span>
                <p class="tasktext">${taskDescription} <span class="deadline">(deadline: ${deadline})</span></p>
                <span class="complete material-icons">more_horiz</span>
            </div>
        `;
       taskList.innerHTML += taskHTML;
    });
    taskList.addEventListener("click", function(event) {
        if (event.target.classList.contains("complete")) {
            const task = event.target.closest(".task");
            task.classList.toggle("complete");
            task.querySelector(".complete").classList.toggle("done");
        }
    });

//dit gedaan met chatgpt aangezien er geen kleuren wouden komen na aantal uur zoeken.
const button = document.querySelector("#btnSubmit");
button.addEventListener("click", function() {
    const priority = document.querySelector("#selPriority").value;
    const iconColorClass = getIconColorClass(priority);
    const icons = document.querySelectorAll(".priority");
    const lastIcon = icons[icons.length - 1];
    lastIcon.classList.add(iconColorClass);
});
//case opstellen om te zien welk icon kleur vertoond moet worden.
function getIconColorClass(priority) {
    switch (priority) {
        case "low":
            return "green-icon";
        case "normal":
            return "orange-icon";
        case "high":
            return "red-icon";
        default:
            return "";
    }
}