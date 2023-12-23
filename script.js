const inputbox = document.getElementById("input-box");
const listcontainer = document.getElementById("list-container");

function countTasks() {
    return listcontainer.getElementsByTagName('li').length;
}

function addTask() {
    if (inputbox.value === '') {
        alert("Field is empty, you must write something");
    } else if (countTasks() >= 5) {
        alert("You can only add up to 5 tasks");
    } else {
        let li = document.createElement("li");
        li.innerHTML = inputbox.value;
        listcontainer.appendChild(li);

        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);

        saveTasksToLocalStorage(); // Save tasks to localStorage after adding a new task
    }
    inputbox.value = "";
}

// Function to save tasks to localStorage
function saveTasksToLocalStorage() {
    let tasks = [];
    const allTasks = listcontainer.querySelectorAll("li");

    allTasks.forEach(task => {
        tasks.push(task.innerHTML);
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to retrieve tasks from localStorage
function retrieveTasksFromLocalStorage() {
    let tasks = JSON.parse(localStorage.getItem("tasks"));

    if (tasks) {
        tasks.forEach(task => {
            let li = document.createElement("li");
            li.innerHTML = task;
            
            let span = document.createElement("span");
            span.innerHTML = "\u00d7";
            li.appendChild(span);

            listcontainer.appendChild(li);
        });
    }
}

// Call function to retrieve tasks when the page loads
window.addEventListener("load", retrieveTasksFromLocalStorage);
