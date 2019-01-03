'use strict'

const { ipcRenderer } = require('electron');

// delete todo by its text value
const deleteTodo = (e) => {
    ipcRenderer.send('delete-todo', e.target.textContent)
}

// open the new add todo window when the button is clicked
document.getElementById('createTodoBtn').addEventListener('click', () => {
    ipcRenderer.send('add-todo-window');
})

// on recieve of info
ipcRenderer.on('todos', (event, todos) => {
    // get the todo list ul
    const todoList = document.getElementById('todoList');

    //create html string
    const todoItems = todos.reduce((html, todo) => {
        html += `<tr class="active todo-item"><td>${todo}</td></tr>`

        return html
    },'')

    // sent list html to the todo items
    todoList.innerHTML = todoItems

    // add click handelers to delete the todo item
    todoList.querySelectorAll('.todo-item').forEach(item => {
        item.addEventListener('click', deleteTodo)
    })
})