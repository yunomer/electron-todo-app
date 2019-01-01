'use strict';

const path = require('path');
const { app, ipcMain } = require('electron');

//The constructors
const Window = require('./Window');
const DataStore = require('./DataStore');

// Create our JSON datastore/database
const database = new DataStore({name: "todoStorage"});

function main() {
    let mainWindow = new Window({
        file: path.join('renderer', 'index.html')
    })
    // initialize the add todo window
    let addTodoWindow

    // initialize with todo data
    mainWindow.once('show', () => {
        mainWindow.webContents.send('todos', database.todos)
    })

    // Create add todo window
    ipcMain.on('add-todo-window', () => {
        //If todo window does not already exist
        if(!addTodoWindow) {
            addTodoWindow = new Window({
                file: path.join('renderer', 'add.html'),
                width: 400,
                height: 400,
                parent: mainWindow
            })

            //on close of child window
            addTodoWindow.on('closed', () => {
                addTodoWindow = null
            })
        }
    })

    // Add todo from the add todo window
    ipcMain.on('add-todo', (event, todo) => {
        const updatedTodos = database.addTodo(todo).todos;
        mainWindow.send('todos',updatedTodos);
    })

    // delete todo from the main todo window
    ipcMain.on('delete-todo', (event, todo) => {
        const updatedTodos = database.deleteTodo(todo).todos

        mainWindow.send('todos', updatedTodos)
    })
}



app.on('ready', main);

app.on('window-all-closed', function() {
    app.quit();
})