import React from 'react';

export const Sidebar = (props) => {
    return (
        <aside className="sidebar">
            {props.children}
        </aside>
    )
};