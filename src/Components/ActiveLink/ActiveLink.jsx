import React from 'react';
import { NavLink } from 'react-router-dom';

const ActiveLink = ({title,to,children}) => {
    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                isActive ? "text-gray-950 text-xl font-bold"  : "text-gray-500 text-xl font-bold hover:text-gray-950 duration-300"
            }
        >
            {children}
        </NavLink>
    );
};

export default ActiveLink;