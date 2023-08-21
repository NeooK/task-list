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
// Обробник натискання клавіші "Enter"
taskInput.addEventListener('keydown', event => {
    if (event.key === 'Enter') {
        addTask();
    }
});

addButton.addEventListener('click', () => {
    addTask();
});

function addTask() {
    const task = taskInput.value.trim();

    if (task === '') {
        console.log('Поле вводу порожнє.');
    } else {
        // Генеруємо задачу та додаємо її до списку
        generateTask(task);

        // Зберігаємо задачі
        saveTasksToLocalStorage();
    }
}
function generateTask(task) {
    const taskItem = `<li class="task-item">
                        <span class="task-text">${task}</span>
                        <button class="delete-button js-task-delete">-</button>
                    </li>`;
    console.log('task', task)
    taskList.innerHTML = taskList.innerHTML + taskItem;

    taskInput.value = '';
}
// Слідкуємо за кліком елементів, які будуть нові в цьому статичному елементі
taskList.addEventListener('click', function (event) {

    // Відбираємо елемент, яки нам потрібен по кліку
    const checkElDelete = event.target.classList.contains('js-task-delete');

    // Слідкуємо тільки за кнопкою видалення
    if (checkElDelete) {

        // Отримання батьківського елемента (елемента завдання)
        const taskItem = event.target.closest('.task-item');

        // Видаляємо елемент
        taskItem.remove();

        // Зберігаємо задачі
        saveTasksToLocalStorage();
    }
})

function saveTasksToLocalStorage() {
    const tasks = Array.from(document.querySelectorAll('.task-text')).map(task => task.textContent);
    localStorage.setItem('tasks', tasks.join(','));
}
