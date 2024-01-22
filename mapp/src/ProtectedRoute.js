import React from 'react';
import {Navigate} from 'react-router-dom';
import useAuth from './hooks/useAuth'; // Adjust the import path as needed

const ProtectedRoute = ({element: Component, ...rest}) => {
    const {currentUser, loading} = useAuth();

    if (loading) {
        return <div>Loading...</div>; // Or a loading spinner
    }

    return currentUser ? <Component {...rest} /> : <Navigate to="/signin" replace/>;
};

export default ProtectedRoute;
