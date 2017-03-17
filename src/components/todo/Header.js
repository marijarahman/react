import React from 'react';

export const Header = () => {
    const currentTime = new Date().toDateString();
    const openNewTodo = () => {  };
    return (
        <header className="header">
            <span className="header__current-time">{currentTime}</span>
            <navigation className="navigation">
                <ul>
                    <li className="navigation__item"><a className="navigation__link" href="">Logout</a></li>
                </ul>
            </navigation>
        </header>
    )
};