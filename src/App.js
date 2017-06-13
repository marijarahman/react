import React, {Component} from 'react';
import './App.css';
import {Sidebar, ToDoForm, ToDoDates, ToDoList, Header} from './components/todo/index';
import {addToDo, generateNumber, findById, toggleTodo, updateTodo, removeTodo, filterTodos,} from './lib/todoHelpers';
import {pipe, partial} from './lib/utils';
import {loadTodos, createTodo, saveTodo, destroyTodo} from './lib/todoService';
import moment from 'moment';

class App extends Component {
    state = {
        todos: [],
        currentToDo: '',
        startDate: moment()
    };

    static contextTypes = {
        route: React.PropTypes.string
    };

    /**
     * @function componentDidMount
     * @description React lifecycle method - is invoked immediately after a component is mounted
     */
    componentDidMount() {
        loadTodos().then(todos => this.setState({todos}));
    }

    /**
     * @function componentDidUpdate
     * @description React lifecycle method - is invoked immediately after updating occurs.
     */
    componentDidUpdate() {
        const currentDate = moment().format('LL');

        console.log(moment(currentDate).isAfter(this.state.todos[0], 'year'));
        this.state.todos.forEach(todo => {
            if (currentDate > moment(todo.startDate).format('LL')) {
                return destroyTodo(todo.id);
            }
        })
    }

    /**
     * @function handleRemove
     * @description - remove todo from list
     * @param id {number} - todo's id
     * @param evt {object}
     */
    handleRemove = (id, evt) => {
        evt.preventDefault();
        const updatedTodos = removeTodo(this.state.todos, id);
        this.setState({
            todos: updatedTodos
        });
        destroyTodo(id).then(() => this.showTempMessage('Todo Removed'));
    };

    /**
     * @function handleToggle
     * @description - updating todo's data and saving it
     * @param id {number}
     */
    handleToggle = (id) => {
        const getToggleTodo = pipe(findById, toggleTodo);
        const updated = getToggleTodo(id, this.state.todos);
        const getUpdatedTodos = partial(updateTodo, this.state.todos);
        const updatedTodos = getUpdatedTodos(updated);
        this.setState({todos: updatedTodos});
        saveTodo(updated).then(() => this.showTempMessage('Todo updated'));
    };

    /**
     * @function handleSubmit
     * @description - creating new todo and saving it
     * @param evt {object}
     */
    handleSubmit = (evt) => {
        evt.preventDefault();
        const newId = generateNumber();
        const newTodo = {
            name: this.state.currentToDo,
            startDate: this.state.startDate,
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

    /**
     * @function handleInputChange
     * @description setting currentToDo state to new value
     * @param evt {object}
     */
    handleInputChange = (evt) => {
        this.setState({
            currentToDo: evt.target.value
        })
    };

    /**
     * @function handleEmptySubmit
     * @description setting errorMessage state to current error message
     * @param evt
     */
    handleEmptySubmit = (evt) => {
        evt.preventDefault();
        this.setState({
            errorMessage: 'Please provide a todo name'
        })
    };

    /**
     * @function handleDateChange
     * @description setting startDate state to today's date
     * @param date
     */
    handleDateChange = (date) => {
        this.setState({
            startDate: date
        })
    };

    /**
     * @function showTempMessage
     * @description setting message state to current success message
     * @param msg
     */
    showTempMessage = (msg) => {
        this.setState({message: msg});
        setTimeout(() => this.setState({message: ''}), 2500);
    };

    /**
     * Renders the component.
     *
     * @return {string} - HTML markup for the component
     */
    render() {
        // conditional applying function whether is to do name provided
        const submitHandler = this.state.currentToDo ? this.handleSubmit : this.handleEmptySubmit;
        const displayTodos = filterTodos(this.state.todos, this.context.route);

        return (
            <div className="app width--full height--full">
                <Header/>
                <div className="Todo-App height--full width--full">
                    {this.state.errorMessage && <span className="notification notification--error">{this.state.errorMessage}</span>}
                    {this.state.message && <span className="notification notification--success">{this.state.message}</span>}
                    <Sidebar>
                        <ToDoForm handleInputChange={this.handleInputChange}
                                  currentToDo={this.state.currentToDo}
                                  startDate={this.state.startDate}
                                  handleDateChange={this.handleDateChange}
                                  handleSubmit={submitHandler}/>
                        <ToDoDates todos={this.state.todos}/>
                    </Sidebar>
                    <ToDoList todos={displayTodos}
                              handleToggle={this.handleToggle}
                              handleRemove={this.handleRemove}/>
                </div>
            </div>
        );
    }
}

export default App;
