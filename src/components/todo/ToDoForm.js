import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export class ToDoForm extends React.Component {
    render() {
        return (
            <aside className="sidebar">
                <h1 className="text--primary-color">Create New To do</h1>
                <form className="form" onSubmit={this.props.handleSubmit}>
                    <div className="form__row">
                        <label className="form__label" htmlFor="">Title</label>
                        <input className="form__input"
                               type="text"
                               onChange={this.props.handleInputChange}
                               value={this.props.currentToDo}/>
                        <DatePicker
                            selected={this.props.startDate}
                            onChange={this.props.handleDateChange}/>
                    </div>
                    <div className="form__row">
                        <button className="button button--transparent">Cancel</button>
                        <button className="button button--confirm">Save</button>
                    </div>
                </form>

                <div className="todo-list__row">
                    <a href="" className="todo-list__date">Today</a>
                    <span className="todo-list__number">(1)</span>
                </div>
                <div className="todo-list__row">
                    <a href="" className="todo-list__date">Next 7 days</a>
                    <span className="todo-list__number">(4)</span>
                </div>
            </aside>
        )
    }
}

// validation
ToDoForm.propTypes = {
    currentToDo: React.PropTypes.string.isRequired,
    handleInputChange: React.PropTypes.func.isRequired,
    handleSubmit: React.PropTypes.func.isRequired
};
