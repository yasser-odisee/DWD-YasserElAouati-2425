// declaraties (1p)
const btnDarkMode = document.querySelector('#theme-toggle');
const btnReset = document.querySelector('#reset-btn');
const taskElements = document.querySelectorAll('.task');
const clearButtons = document.querySelectorAll('.task-clear');
const editButtons = document.querySelectorAll('.task-edit');
const modal = document.querySelector('#edit-modal');
const modalTextarea = document.querySelector('.modal-editor');
const modalMessage = document.querySelector('.modal-message');
const btnCancel = document.querySelector('.btn-cancel');
const btnOk = document.querySelector('.btn-ok');
const MAX_CHARS = 500;
let currentEditingPart = null;

    // 1. thema toggle (1p)
    btnDarkMode.addEventListener('click', function () {
        document.body.classList.toggle('dark');

        // Sla de voorkeur op in localStorage
        if (document.body.classList.contains('dark')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
    });

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark');
    }
    // 2. reset alles (1p)
    btnReset.addEventListener('click', function () {
        // Selecteer alle taak elementen en maak ze leeg
        taskElements.forEach(taskElement => {
            taskElement.innerHTML = '';
        });

    });

// 3. dagdeel aanklikken (3p)


// 4. clear buttons (2p)
clearButtons.forEach(clearButton => {
    clearButton.addEventListener('click', function (event) {
        // Voorkom dat de link het standaard gedrag volgt (naar een nieuwe pagina navigeren)
        event.preventDefault();

        // Vind het bijbehorende taak element (navigeer omhoog naar planner-part en dan naar de task div)
        const plannerPart = this.closest('.planner-part');
        const taskElement = plannerPart.querySelector('.task');

        // Maak de taak leeg
        taskElement.innerHTML = '';

    });
});

// 5. edit buttons - modal tonen (3p)
editButtons.forEach(editButton => {
    editButton.addEventListener('click', function (event) {
        // Voorkom dat de link het standaard gedrag volgt
        event.preventDefault();

        // Vind het bijbehorende taak element
        const plannerPart = this.closest('.planner-part');
        const taskElement = plannerPart.querySelector('.task');

        // Sla op welk dagdeel we aan het bewerken zijn
        currentEditingPart = plannerPart;

        // Kopieer de taaktekst naar de textarea in de modal
        modalTextarea.value = taskElement.innerHTML.replace(/<br>/g, '\n');

        // Toon de modal
        modal.classList.remove('hidden');

        // Focus op de textarea
        modalTextarea.focus();

        // Update de karakterteller
        updateCharCounter();
    });
});

// 6. modal verbergen met annuleren (1p)
btnCancel.addEventListener('click', function () {
    // Verberg de modal
    modal.classList.add('hidden');

    // Reset de huidige bewerking
    currentEditingPart = null;
});

// 7. modal verbergen met ESC (2p)
document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && !modal.classList.contains('hidden')) {
        // Verberg de modal
        modal.classList.add('hidden');

        // Reset de huidige bewerking
        currentEditingPart = null;
    }
});

// 8. aantal karakters over, beperking tekstlengte (2p)
modalTextarea.addEventListener('input', updateCharCounter);

function updateCharCounter() {
    const currentLength = modalTextarea.value.length;
    const remainingChars = MAX_CHARS - currentLength;

    // Update het bericht met het aantal resterende karakters
    modalMessage.textContent = `Nog ${remainingChars} karakters over`;



    // Beperk de invoer tot het maximum aantal karakters
    if (currentLength > MAX_CHARS) {
        modalTextarea.value = modalTextarea.value.substring(0, MAX_CHARS);
    }
}

// 9. modal bevestigen met ok (2p)
btnOk.addEventListener('click', function (event) {
    // Voorkom dat het formulier wordt verzonden
    event.preventDefault();

    if (currentEditingPart) {
        // Haal de taak div op van het huidige dagdeel
        const taskElement = currentEditingPart.querySelector('.task');

        // Update de taaktekst, vervang nieuwe regels door <br> tags
        taskElement.innerHTML = modalTextarea.value.replace(/\n/g, '<br>');

        // Verberg de modal
        modal.classList.add('hidden');

        // Reset de huidige bewerking
        currentEditingPart = null;

        // Optioneel: Sla de nieuwe staat op in localStorage
        saveTasks();
    }
});

// Hulpfunctie om taken op te slaan (kan worden gebruikt als je localStorage wilt gebruiken)
function saveTasks() {
    const tasks = {};
    document.querySelectorAll('.planner-part').forEach((part, index) => {
        tasks[index] = part.querySelector('.task').innerHTML;
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// 10. toetsnavigatie (2p)