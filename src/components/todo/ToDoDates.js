import React from 'react';
import {Link} from '../router/Link';
import moment from 'moment';

/**
 * Renders the component.
 * @param props {object}
 * @return {string} - HTML markup for the component
 */
export const ToDoDates = (props) => {
    const currentDate = moment().format('LL');
    const todayTodosLength = props.todos.filter(item => moment(item.startDate).format('LL') === currentDate).length;
    const otherTodosLength = props.todos.filter(item => moment(item.startDate).format('LL') !== currentDate).length;
    return (
        <div>
            <div className="todo-list__row">
                <Link to="/today" className="todo-list__date">Today</Link>
                <span className="todo-list__number">({todayTodosLength})</span>
            </div>
            <div className="todo-list__row">
                <Link to="/other" className="todo-list__date">Other</Link>
                <span className="todo-list__number">({otherTodosLength})</span>
            </div>
        </div>
    )
};