import React, { useContext } from 'react';
import { UserContext } from '../Providers/AuthProviders';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const {user, loading} = useContext(UserContext);
    const location = useLocation();

    if(loading){
        return <progress className="progress w-56"></progress>
    }else if(user){
        return children;
    }else {
        return <Navigate to="/login" state={{ from: location }} replace ></Navigate>;
    }
};

export default PrivateRoute;