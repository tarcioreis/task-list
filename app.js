let tasks;

// Retrieve localStorage
const savedTasks = JSON.parse(localStorage.getItem("task-list"));

// Check if returns an array
if (Array.isArray(savedTasks)) {
    tasks = savedTasks;
} else {
    tasks = [];
}

// Get input values from user
const inputTask = document.getElementById("task");
const inputDate = document.getElementById("date");
inputTask.style.fontWeight = "bold";

// Panel for tasklist
const taskDiv = document.getElementById("task-list");

let element = document.createElement("div");


const addTask = () => {
    // Time in milliseconds
    if (inputTask.value === "") {
        window.alert("Digite o nome da tarefa");
        return false;
    }
    
    const id = "" + new Date().getTime();
    tasks.push( { name: inputTask.value, date: inputDate.value, id: id, done: false} );
    
    saveTasks();
    render();
};

const deleteTask = (event) => {
    const idButtonImg = event.target.id;
    
    // Remove task based on button id
    tasks = tasks.filter( (task) => {
        if (task.id === idButtonImg)
            return false;
        else
            return true;
    });

    saveTasks();
    render();
}

const checkDone = (event) => {
    console.log(event);
    idCheckbox = event.target.id;
    
    for (task of tasks) {
        if (task.id === idCheckbox)
            task.done = true;
    }

    saveTasks();
    render();
};


// Save data in browser local storage
const saveTasks = () => {
    localStorage.setItem("task-list", JSON.stringify(tasks));
}

const render = () => {
    // Reset the list
    taskDiv.className = "container";
    taskDiv.innerHTML = "";
    inputTask.value = "";

    tasks.forEach( (task) => {
        const check = document.createElement("input");
        check.type = "checkbox";
        check.style = "margin-left: 5%";
        check.style.width = "20px";
        check.style.height = "20px";
        check.id = task.id;
        check.onchange = checkDone;

        const img = document.createElement("img");
        img.src = "./img/delete.png";
        img.style.borderRadius = "3px";
        img.style.marginTop = "10px";
        img.style.width = "20px";
        img.style.height = "20px";
        img.id = task.id;
        img.onclick = deleteTask;

        element = document.createElement("div");
        element.innerText = `${task.date} ${task.name}`;
        element.className = "div";
        if (task.done){
            element.className = "checked div";
            element.style.color = "red";
        }
            

        element.appendChild(check);
        element.appendChild(img);
        taskDiv.appendChild(element);
    });
};

render();


