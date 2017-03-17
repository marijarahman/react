import React, {Component} from 'react';
import './App.css';
import {ToDoForm, ToDoList, Header} from './components/todo/index';
import {addToDo, generateNumber, findById, toggleTodo, updateTodo, removeTodo, filterTodos,} from './lib/todoHelpers';
import {pipe, partial} from './lib/utils';
import {loadTodos, createTodo, saveTodo, destroyTodo, loadGroups} from './lib/todoService';

class App extends Component {
    state = {
        todos: [],
        currentToDo: '',
        groups: []
    };

    static contextTypes = {
        route: React.PropTypes.string
    };

    componentDidMount() {
        loadTodos().then(todos => this.setState({todos}));
        loadGroups().then(groups => this.setState({groups}));
    }

    handleRemove = (id, evt) => {
        evt.preventDefault();
        const updatedTodos = removeTodo(this.state.todos, id);
        this.setState({
            todos: updatedTodos
        });
        destroyTodo(id).then(() => this.showTempMessage('Todo Removed'));
    };

    handleToggle = (id) => {
        const getToggleTodo = pipe(findById, toggleTodo);
        const updated = getToggleTodo(id, this.state.todos);
        const getUpdatedTodos = partial(updateTodo, this.state.todos);
        const updatedTodos = getUpdatedTodos(updated);
        this.setState({todos: updatedTodos});
        saveTodo(updated).then(() => this.showTempMessage('Todo updated'));
    };

    handleSubmit = (evt) => {
        evt.preventDefault();
        const newId = generateNumber();
        const newTodo = {
            name: this.state.currentToDo,
            isComplete: false,
            id: newId
        };
        const updatedToDos = addToDo(this.state.todos, newTodo);
        this.setState({
            todos: updatedToDos,
            currentToDo: '',
            errorMessage: ''
        });

        createTodo(newTodo).then(() => this.showTempMessage('Todo added'));
    };

    showTempMessage = (msg) => {
        this.setState({message: msg});
        setTimeout(() => this.setState({message: ''}), 2500);
    };

    handleInputChange = (evt) => {
        this.setState({
            currentToDo: evt.target.value
        })
    };

    handleEmptySubmit = (evt) => {
        evt.preventDefault();
        this.setState({
            errorMessage: 'Please provide a todo name'
        })
    };

    render() {
        // conditional applying function whether is to do name provided
        const submitHandler = this.state.currentToDo ? this.handleSubmit : this.handleEmptySubmit;
        const displayTodos = filterTodos(this.state.todos, this.context.route);

        return (
            <div className="app">
                <Header/>
                <div className="Todo-App">
                    {this.state.errorMessage && <span className="notification notification--error">{this.state.errorMessage}</span>}
                    {this.state.message && <span className="notification notification--success">{this.state.message}</span>}
                    <ToDoForm handleInputChange={this.handleInputChange}
                              currentToDo={this.state.currentToDo}
                              groups={this.state.groups}
                              handleSubmit={submitHandler}/>
                    <ToDoList todos={displayTodos}
                              handleToggle={this.handleToggle}
                              handleRemove={this.handleRemove}/>
                </div>
            </div>
        );
    }
}

export default App;