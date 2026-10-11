const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const emptyMessage = document.getElementById("emptyMessage");
const counter = document.getElementById("counter");

let tasks = [];

function updateInterface() {
    emptyMessage.style.display = tasks.length === 0 ? "block" : "none";

    const completed = tasks.filter(task => task.completed).length;

    if (tasks.length === 0) {
        counter.textContent = "0 задач";
    } else {
        counter.textContent = `${tasks.length} задач · ${completed} выполнено`;
    }
}

function renderTasks() {
    taskList.innerHTML = "";

    tasks.forEach(task => {
        const li = document.createElement("li");
        li.className = "task";

        if (task.completed) {
            li.classList.add("completed");
        }

        const checkButton = document.createElement("button");
        checkButton.className = "check";
        checkButton.setAttribute("aria-label", "Отметить задачу выполненной");

        checkButton.addEventListener("click", () => {
            task.completed = !task.completed;
            renderTasks();
        });

        const text = document.createElement("span");
        text.className = "task-text";
        text.textContent = task.text;

        text.addEventListener("click", () => {
            task.completed = !task.completed;
            renderTasks();
        });

        const deleteButton = document.createElement("button");
        deleteButton.className = "delete";
        deleteButton.textContent = "×";
        deleteButton.setAttribute("aria-label", "Удалить задачу");

        deleteButton.addEventListener("click", () => {
            tasks = tasks.filter(item => item.id !== task.id);
            renderTasks();
        });

        li.append(checkButton, text, deleteButton);
        taskList.appendChild(li);
    });

    updateInterface();
}

taskForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const text = taskInput.value.trim();

    if (text === "") {
        taskInput.focus();
        return;
    }

    tasks.push({
        id: Date.now(),
        text: text,
        completed: false
    });

    taskInput.value = "";
    taskInput.focus();

    renderTasks();
});

renderTasks();
