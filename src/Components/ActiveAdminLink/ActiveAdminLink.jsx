import React from 'react';
import { NavLink } from 'react-router-dom';

const ActiveAdminLink = ({title,to,children}) => {
    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                isActive ? "text-xl flex items-center bg-slate-800/80 p-2 duration-300  rounded"  : "text-xl flex items-center font-thin p-2 hover:bg-slate-500 duration-300 rounded"
            }
        >
            {children}
        </NavLink>
    );
};

export default ActiveAdminLink;