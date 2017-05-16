import React from 'react';
import logo from '../../images/logo.svg';
import moment from 'moment';

export const Header = () => {
    const currentTime = moment().format('dddd, MMM Do YYYY');
    return (
        <header className="header">
            <span className="header__current-time">{currentTime}</span>
            <div className="header__logo">
                <img src={logo} className="App-logo" alt="logo" />
            </div>
        </header>
    )
};