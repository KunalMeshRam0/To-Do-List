// Get elements from the DOM
const form = document.querySelector("form");
const input = document.querySelector('input[type="text"]');
const taskList = document.querySelector(".task-list");
const numbersContainer = document.getElementById("numbers");

// Array to store tasks
let tasks = [];

// Function to update task count
function updateTaskCount() {
    const completedTasks = tasks.filter((task) => task.completed).length;
    numbersContainer.textContent = `${completedTasks} / ${tasks.length}`;
}

// Function to update task count and progress bar
function updateTaskCount() {
    const completedTasks = tasks.filter((task) => task.completed).length;
    numbersContainer.textContent = `${completedTasks} / ${tasks.length}`;

  // Update progress bar width
    const progressBar = document.querySelector(".progress");
    const progressPercentage =
    tasks.length > 0 ? (completedTasks / tasks.length) * 100 : 0;
    progressBar.style.width = `${progressPercentage}%`;
}

// Function to add a new task
function addTask(taskText) {
    if (taskText.trim() !== "") {
    tasks.push({ text: taskText, completed: false });
    renderTasks();
    input.value = ""; // Clear input after adding task
    }
}

// Function to toggle task completion
function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
}

// Function to delete a task
function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}

// Function to render tasks in the list
function renderTasks() {
  // Clear current list
    taskList.innerHTML = "";

  // Render each task
    tasks.forEach((task, index) => {
    const li = document.createElement("li");

    // Checkbox container
    const checkboxContainer = document.createElement("div");
    checkboxContainer.className = "checkbox-container";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.addEventListener("change", () => toggleTask(index));
    checkboxContainer.appendChild(checkbox);

    // Task text container
    const taskTextContainer = document.createElement("div");
    taskTextContainer.className = "task-text-container";

    const taskText = document.createElement("span");
    taskText.textContent = task.text;
    taskText.style.textDecoration = task.completed ? "line-through" : "none";
    taskTextContainer.appendChild(taskText);

    // Delete button container
    const deleteBtnContainer = document.createElement("div");
    deleteBtnContainer.className = "delete-btn-container";

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "X";
    deleteBtn.className = "delete-btn";
    deleteBtn.onclick = () => deleteTask(index);
    deleteBtnContainer.appendChild(deleteBtn);

    // Append containers to the list item
    li.appendChild(checkboxContainer);
    li.appendChild(taskTextContainer);
    li.appendChild(deleteBtnContainer);

    taskList.appendChild(li);
    });

  // Update task count display
    updateTaskCount();
}

// Event listener for form submission
form.addEventListener("submit", (event) => {
    event.preventDefault();
    addTask(input.value);
});
