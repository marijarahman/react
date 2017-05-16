import React from 'react';
import {Link} from '../router';

export const Footer = () => {
    return (
    <div className="form__row">
        <div className="dropdown">
            <span>Filter todos</span>
            <ul className="dropdown__content">
                <li className="dropdown__item"><Link to="/">All</Link></li>
                <li className="dropdown__item"><Link to="/active">Active</Link></li>
                <li className="dropdown__item"><Link to="/complete">Complete</Link></li>
            </ul>
        </div>
    </div>
    )
};