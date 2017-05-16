import React from 'react';
import {ToDoItem} from './ToDoItem';
import {Footer} from './Footer';

export const ToDoList = (props) => {
    return (
        <div className="main-content height--full">
            <h2 className="text--primary-color">To do list</h2>
            <Footer/>
            <ol className="todo-list">
                { props.todos.map(todo => <ToDoItem key={todo.id} {...todo}
                                                    handleToggle={props.handleToggle}
                                                    handleRemove={props.handleRemove}/>)}
            </ol>
        </div>
    )
};

ToDoList.propTypes = {
    todos: React.PropTypes.array.isRequired
};