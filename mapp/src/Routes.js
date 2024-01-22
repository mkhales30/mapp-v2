import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {AuthLayout} from './components/App/AuthLayout';
import SignInForm from './pages/Sign In/SignInForm';
import App from './App';
import SignUpForm from "./pages/Sign Up/SignUpForm";

function AppRoutes(props) {
    return (
        <Router>
            <Routes>
                <Route path='/' element={
                    <AuthLayout page='signIn'>
                        <SignInForm />
                    </AuthLayout>
                } />

                <Route exact path='/signup' element={
                    <AuthLayout page='signUp'>
                        <SignUpForm/>
                    </AuthLayout>
                }/>

                {/* Add more routes as needed */}
                <Route path="*" element={<App />} /> {/* Fallback route */}
            </Routes>
        </Router>
    );
}

export default AppRoutes;
