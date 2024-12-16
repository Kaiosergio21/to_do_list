document.getElementById("addTaskBtn").addEventListener("click", addTask);
document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskList = document.getElementById("taskList");
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Por favor, insira uma tarefa.");
        return;
    }

    const task = { text: taskText };
    saveTaskToLocalStorage(task);
    renderTask(task);

    taskInput.value = "";
}

function renderTask(task) {
    const taskList = document.getElementById("taskList");

    const listItem = document.createElement("li");
    const taskSpan = document.createElement("span");
    taskSpan.textContent = task.text;

    const editButton = document.createElement("button");
    editButton.textContent = "Editar";
    editButton.classList.add("edit");
    editButton.addEventListener("click", () => editTask(taskSpan));

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Apagar";
    deleteButton.classList.add("delete");
    deleteButton.addEventListener("click", () => {
        listItem.remove();
        deleteTaskFromLocalStorage(task.text);
    });

    listItem.appendChild(taskSpan);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);

    taskList.appendChild(listItem);
}

function loadTasks() {
    const tasks = getTasksFromLocalStorage();
    tasks.forEach(renderTask);
}

function saveTaskToLocalStorage(task) {
    const tasks = getTasksFromLocalStorage();
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function getTasksFromLocalStorage() {
    const tasks = localStorage.getItem("tasks");
    return tasks ? JSON.parse(tasks) : [];
}

function deleteTaskFromLocalStorage(taskText) {
    let tasks = getTasksFromLocalStorage();
    tasks = tasks.filter(task => task.text !== taskText);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function editTask(taskSpan) {
    const newTask = prompt("Edite sua tarefa:", taskSpan.textContent);
    if (newTask !== null && newTask.trim() !== "") {
        const tasks = getTasksFromLocalStorage();
        const taskIndex = tasks.findIndex(task => task.text === taskSpan.textContent);

        if (taskIndex > -1) {
            tasks[taskIndex].text = newTask.trim();
            localStorage.setItem("tasks", JSON.stringify(tasks));
        }

        taskSpan.textContent = newTask.trim();
    }
}
