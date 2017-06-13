import React from 'react';

/**
 * Renders the component.
 * @param props {object}
 * @return {string} - HTML markup for the component
 */
export const Sidebar = (props) => {
    return (
        <aside className="sidebar">
            {props.children}
        </aside>
    )
};