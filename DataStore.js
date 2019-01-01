const Store = require('electron-store');

class DataStore extends Store {
    constructor (settings) {
        super(settings);
        //initialize with todos or an empty array
        this.todos = this.get('todos') || [];
    }

    saveTodos() {
        //save the todo in JSON file
        this.set('todos', this.todos);
        
        //returning this seems to create method chaining
        return this;
    }

    getTodos() {
        //Get the todo else return empty array
        this.todos = this.get('todos') || [];
        return this;
    }

    addTodo(todo) {
        // Need to merge the existing todos with this new one being added
        this.todos = [ ...this.todos, todo];

        return this.saveTodos();
    }

    deleteTodo(todo) {
        //filter out the todo that needs to be deleted.
        this.todos = this.todos.filter(t => t !== todo);

        return this.saveTodos();
    }
}

module.exports = DataStore;