import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../Provider/AuthProvider';

const PrivateRouter = ({children}) => {
    const location = useLocation()
    const { isLoggedIn } = useAuth();
    if (isLoggedIn) {
        return children;
    }
    return <Navigate to='/' state={{ from: location }} replace></Navigate>
};

export default PrivateRouter;