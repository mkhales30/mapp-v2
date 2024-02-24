import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import AuthLayout from '../layouts/AuthLayout';
import SignInForm from '../pages/Sign In/SignInForm';
import App from '../App';
import SignUpForm from "../pages/Sign Up/SignUpForm";
import ProtectedRoute from "./ProtectedRoute";
import About from "../pages/About/About";
import SessionProfile from "../pages/Session/SessionProfile";
import AppLayout from "../layouts/AppLayout";
import CourseProfile from "../pages/Course/CourseProfile";

function AppRoutes({}) {
    return (
        <Router>
            <Routes>
                <Route path='*' element={
                    <AuthLayout page='about'>
                        <About/>
                    </AuthLayout>
                }/>

                <Route exact path='/signup' element={
                    <AuthLayout page='signUp'>
                        <SignUpForm/>
                    </AuthLayout>
                }/>

                <Route exact path='/signin' element={
                    <AuthLayout page='signIn'>
                        <SignInForm/>
                    </AuthLayout>
                }/>
                <Route
                    path="/course/:id"
                    element={
                    <ProtectedRoute element={CourseProfile}
                    />}
                />

                <Route
                    path="/"
                    element={<ProtectedRoute element={App}/>}
                />

            </Routes>
        </Router>
    );
}

export default AppRoutes;
