const taskInput = document.querySelector('#taskInput');
const addButton = document.querySelector('#addButton');
const taskList = document.querySelector('#taskList');

addButton.addEventListener('click', () => {
    const task = taskInput.value.trim();

    if (task === '') {
        console.log('Поле вводу порожнє.');
    } else {
        const taskItem = createTaskItem(task);
        taskList.appendChild(taskItem);
    }

    taskInput.value = '';
});

function createTaskItem(taskText) {
    const taskItem = document.createElement('li');
    taskItem.classList.add("task-item");

    const taskTextElement = document.createElement('span');
    taskTextElement.textContent = taskText;
    taskTextElement.classList.add('task-text');
    taskItem.appendChild(taskTextElement);

    const deleteButton = document.createElement('button');
    deleteButton.classList.add("delete-button");
    deleteButton.textContent = '-';
    deleteButton.addEventListener('click', () => {
        taskList.removeChild(taskItem);
    });

    taskItem.appendChild(deleteButton);

    return taskItem;
}