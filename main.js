let input_box = document.querySelector(".to_do_input");
let task_footer = document.querySelector(".task_footer");
let tasks = document.querySelector(".tasks");
let tasks_data = []

function load_data(){
    let stored_tasks = localStorage.getItem("tasks"); 
    tasks_data = JSON.parse(stored_tasks);
    for(let i = 0 ; i < tasks_data.length ; i++){
        let task = document.createElement("div");
        task.classList.add("task");
        task.innerHTML = tasks_data[i].task_html;
        tasks.insertBefore(task,task_footer);
        let line = document.createElement("hr");
        line.classList.add("line");
        tasks.insertBefore(line,task_footer);
    }
    
}

window.addEventListener("load",load_data);

function save_data() {
    try {
        console.log("Saving data...", tasks_data);
        localStorage.setItem("tasks", JSON.stringify(tasks_data));
        console.log("Data saved successfully!");
    } catch (e) {
        console.error("LocalStorage Error:", e);
    }
}

function AddTask(task_text) {
    if (!task_text.trim()) return; 
    let task = document.createElement("div");
    task.classList.add("task");
    task.innerHTML = `
        <img src="" class="empty_task">
        <h1 class="task_discription">${task_text}</h1>
    `;
    tasks.insertBefore(task,task_footer);
    let line = document.createElement("hr");
    line.classList.add("line");
    tasks.insertBefore(line,task_footer);
    let task_data = {
        task_html: task.innerHTML,
        status: "Uncompleted"
    }
    tasks_data.push(task_data);
    save_data()
}


input_box.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        let task_text = input_box.value.trim(); 

        if (task_text) {
            console.log(task_text);
            AddTask(task_text); 
            input_box.value = ""; 
        }
    }
});
