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
import StudentProfile from "../pages/Student/StudentProfile";

function AppRoutes({}) {
    return (
        <Router>
            <Routes>
                {/*About Page - Default Route */}
                <Route path='*' element={
                    <AuthLayout page='about'>
                        <About/>
                    </AuthLayout>
                }/>

                {/*Sign Up Page*/}
                <Route exact path='/signup' element={
                    <AuthLayout page='signUp'>
                        <SignUpForm/>
                    </AuthLayout>
                }/>

                {/*Sign In Page*/}
                <Route exact path='/signin' element={
                    <AuthLayout page='signIn'>
                        <SignInForm/>
                    </AuthLayout>
                }/>

                {/*Course Profile Page*/}
                <Route path="/course/:id"
                       element={<ProtectedRoute element={CourseProfile}/>}
                />

                {/*Student Profile Page*/}
                <Route path="/student/:id"
                       element={<ProtectedRoute element={StudentProfile}/>}
                />

               {/*Remove the following route later*/}
                <Route path="/" element={<ProtectedRoute element={App}/>}/>

            </Routes>
        </Router>
    );
}

export default AppRoutes;
