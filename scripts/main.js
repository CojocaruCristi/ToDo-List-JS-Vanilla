console.log("How to use:\n To poot one in important value you need to use RightClick on the item.\n To delete the task you need to use combination of keyBoard  CTRL + RightClick on the item.")


let input = document.querySelector("#mainInput")
let button = document.querySelector("#mainButton")
let list = document.querySelector("#mainList")

let taskSelector = []

if (localStorage.getItem("tasks")) {
    taskSelector = JSON.parse(localStorage.getItem("tasks"))
    displayTasks()
}

button.addEventListener("click", function () {
    let task = {
        name: input.value,
        checked: false,
        important: false
    }

    taskSelector.push(task)

    displayTasks()
    localStorage.setItem('tasks', JSON.stringify(taskSelector))

})


function displayTasks() {
    let taskMessage = ''
    taskSelector.forEach((item, index) => {
        taskMessage += `
        <input type="checkbox" id="item_${index}" ${item.checked ? "checked" : ""}>
        <lable for="item_${index}" class=${item.important ? "important" : ""}>${item.name}</lable><br/>
        `
    })
    list.innerHTML = taskMessage
}

list.addEventListener("change", event => {
    let IdInput = event.target.getAttribute("id")
    let forLable = list.querySelector(`[for=${IdInput}]`)
    let valueLable = forLable.innerHTML

    taskSelector.forEach(item => {
        if (item.name === valueLable) {
            item.checked = !item.checked
            localStorage.setItem('tasks', JSON.stringify(taskSelector))
        }
    })

})

list.addEventListener("contextmenu", event => {
    event.preventDefault()
    taskSelector.forEach((item, index) => {
        if (item.name === event.target.innerHTML) {
            if (event.ctrlKey || event.metaKey) {
                taskSelector.splice(index, 1)
            } else {
                item.important = !item.important
            }
            displayTasks()
            localStorage.setItem('tasks', JSON.stringify(taskSelector))
        }
    })
})