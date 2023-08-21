const taskInput = document.querySelector('#taskInput');
const addButton = document.querySelector('#addButton');
const taskList = document.querySelector('#taskList');

// Під час завантаження сторінки
window.addEventListener('load', () => {
    // Витягуємо дані з localStorage
    const savedTasks = localStorage.getItem('tasks');

    if (savedTasks) {
        // Перетворюємо рядок збережених завдань у масив
        const taskArray = savedTasks.split(',');

        // Генеруємо список завдань з використанням отриманого масиву
        taskArray.forEach(task => {
            generateTask(task);
        });
    }
});

addButton.addEventListener('click', () => {
    const task = taskInput.value.trim();

    if (task === '') {
        console.log('Поле вводу порожнє.');
    } else {
        // Генеруємо задачу та додаємо її до списку
        generateTask(task);

        // Зберігаємо задачі
        saveTasksToLocalStorage();
    }

    taskInput.value = '';
});

function generateTask(taskText) {
    const taskItem = document.createElement('li');
    taskItem.classList.add('task-item');
    taskItem.innerHTML = `
        <span class="task-text">${taskText}</span>
        <button class="delete-button js-task-delete">-</button>
    `;

    // Налаштовуємо кнопку видалення для нової задачі
    const deleteButton = taskItem.querySelector('.delete-button');
    deleteButton.addEventListener('click', () => {
        taskList.removeChild(taskItem);
        saveTasksToLocalStorage();
    });
}

function saveTasksToLocalStorage() {
    const tasks = Array.from(document.querySelectorAll('.task-text')).map(task => task.textContent);
    localStorage.setItem('tasks', tasks.join(','));
}
