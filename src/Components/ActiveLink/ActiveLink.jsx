import React from 'react';
import { NavLink } from 'react-router-dom';

const ActiveLink = ({title,to,children}) => {
    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                isActive ? "text-green-900"  : "text-white hover:text-gray-300 duration-300"
            }
        >
            {children}
        </NavLink>
    );
};

export default ActiveLink;