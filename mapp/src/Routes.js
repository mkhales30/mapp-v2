import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {SignInLayout} from './SignInLayout';
import SignInForm from './SignInForm';
import App from './App';
import SignUpForm from "./SignUpForm";

function AppRoutes(props) {
    return (
        <Router>
            <Routes>
                <Route path='/' element={
                    <SignInLayout page='signIn'>
                        <SignInForm />
                    </SignInLayout>
                } />

                <Route exact path='/signup' element={
                    <SignInLayout page='signUp'>
                        <SignUpForm/>
                    </SignInLayout>
                }/>

                {/* Add more routes as needed */}
                <Route path="*" element={<App />} /> {/* Fallback route */}
            </Routes>
        </Router>
    );
}

export default AppRoutes;
