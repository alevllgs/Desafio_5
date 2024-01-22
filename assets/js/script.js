let Tareas = [];

function updateSummary() {
    const totalTareas = Tareas.length;
    const completedTareas = Tareas.filter(Tarea => Tarea.completed).length;

    document.getElementById('totalTareas').textContent = totalTareas;
    document.getElementById('completedTareas').textContent = completedTareas;
}

function renderTareas() {
    const TareaListContainer = document.getElementById('TareaList');
    TareaListContainer.innerHTML = '';

    Tareas.forEach(Tarea => {
        const TareaItem = document.createElement('div');
        TareaItem.innerHTML = `
            <p>${Tarea.id}</p>
            <p>${Tarea.description}</p>
            <input type="checkbox" ${Tarea.completed ? 'checked' : ''} onchange="toggleTareaStatus(${Tarea.id})">
            <button class="delete-button" onclick="deleteTarea(${Tarea.id})">X</button>
        `;
        TareaListContainer.appendChild(TareaItem);
    });

    updateSummary();
}

function addTarea(description) {
    const nuevaTarea = {
        id: Tareas.length + 1,
        description: description,
        completed: false
    };

    Tareas.push(nuevaTarea);
    renderTareas();
}

function deleteTarea(TareaId) {
    Tareas = Tareas.filter(Tarea => Tarea.id !== TareaId);
    renderTareas();
}

function toggleTareaStatus(TareaId) {
    Tareas = Tareas.map(Tarea => {
        if (Tarea.id === TareaId) {
            Tarea.completed = !Tarea.completed;
        }
        return Tarea;
    });

    renderTareas();
}

document.getElementById('todoForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const todoInput = document.getElementById('todoInput');
    const nuevaTareaDescription = todoInput.value.trim();

    if (nuevaTareaDescription !== '') {
        addTarea(nuevaTareaDescription);
        todoInput.value = '';
    }
});

// Inicialización con tareas de ejemplo
addTarea('Tarea de ejemplo');
addTarea('Tarea de ejemplo2');
addTarea('Tarea de ejemplo');

