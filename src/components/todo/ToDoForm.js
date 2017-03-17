import React from 'react';

export const ToDoForm = (props) => (
    <aside className="sidebar">
        <h1 className="text--primary-color">Create New To do</h1>
        <form className="form" onSubmit={props.handleSubmit}>
            <div className="form__row">
                <label className="form__label" htmlFor="">Title</label>
                <input className="form__input"
                       type="text"
                       onChange={props.handleInputChange}
                       value={props.currentToDo}/>
            </div>
            <div className="form__row">
                <label className="form__label" htmlFor="">Group</label>
                <select className="form__select form__select--full-width" name="" id="">
                    { props.groups.map(group => <option className="form__option" value=""> {group.name} </option> )}
                </select>
            </div>
            <div className="form__row">
                <button className="button button--transparent">Cancel</button>
                <button className="button button--confirm">Save</button>
            </div>
        </form>
    </aside>
);

// validation
ToDoForm.propTypes = {
    currentToDo: React.PropTypes.string.isRequired,
    handleInputChange: React.PropTypes.func.isRequired,
    handleSubmit: React.PropTypes.func.isRequired
};
