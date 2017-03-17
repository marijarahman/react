import React from 'react';
import {partial} from '../../lib/utils';

export const ToDoItem = (props) => {
    const handleToggle = partial(props.handleToggle.bind(null, props.id));
    const handleRemove = partial(props.handleRemove, props.id);
    return (
        <li className="todo-list__item" key={props.id}>
            <span>{props.name}</span>
            <input type="checkbox"
                   onChange={handleToggle}
                   checked={props.isComplete}/>
            <span className="delete-item"><a href="" onClick={handleRemove}>x</a></span>
        </li>
    )
};

ToDoItem.propTypes = {
    name: React.PropTypes.string.isRequired,
    isComplete: React.PropTypes.bool,
    id: React.PropTypes.number.isRequired
};