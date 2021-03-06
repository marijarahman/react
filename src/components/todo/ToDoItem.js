import React from 'react';
import {partial} from '../../lib/utils';
import moment from 'moment';

/**
 * Renders the component.
 * @param props {object}
 * @return {string} - HTML markup for the component
 */
export const ToDoItem = (props) => {
    const handleToggle = partial(props.handleToggle.bind(null, props.id));
    const handleRemove = partial(props.handleRemove, props.id);
    return (
        <li className="todo-list__item" key={props.id}>
            <span>{props.name} -</span>
            <span>starting on</span>
            <span className="todo-list__time">{moment(props.startDate).format('Do MMM YYYY')}</span>
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