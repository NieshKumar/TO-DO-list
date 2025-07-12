

document.addEventListener('DOMContentLoaded' , () =>
{
    const taskInput = document.getElementById("task-input");
const addTaskButton = document.getElementById("add-task");
const taskList = document.getElementById("task-list");

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
tasks.forEach((task) => {
    renderTask(task)
    
});

addTaskButton.addEventListener("click" , () => {
    const taskText = taskInput.value.trim()
    if(taskText === "")
    {
        return ;
    }
    const newTask = {
        id: Date.now(),
        text:taskText,
        completed:false,
    }

    tasks.push(newTask)
    saveTasks();
    renderTask(newTask)
    
    taskInput.value = ""
   
    
})
function saveTasks ()
{
    localStorage.setItem("tasks", JSON.stringify(tasks))
}
function renderTask (task)
{
    const li = document.createElement("li")
    li.setAttribute('data-id', task.id)
    if(task.completed)
    {
        li.classList.add("completed")
    }
    li.classList.add("task-item")
    li.innerHTML=`
    <span class="task-text">${task.text} </span>
    <button class="delete-btn">delete</button>`
    taskList.appendChild(li)
    li.querySelector('button').addEventListener('click' , (e) =>
    {
        e.stopPropagation()
        tasks = tasks.filter((t) => t.id !== task.id)
        li.remove()
        saveTasks()
    })
   
    
}
})