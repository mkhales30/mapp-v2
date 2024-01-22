import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {AuthLayout} from './components/App/AuthLayout';
import SignInForm from './pages/Sign In/SignInForm';
import App from './App';
import SignUpForm from "./pages/Sign Up/SignUpForm";
import ProtectedRoute from "./ProtectedRoute";
import {About} from "./pages/About/About";

function AppRoutes(props) {
    return (
        <Router>
            <Routes>
                <Route path='*' element={
                    <AuthLayout page='signIn'>
                        <SignInForm/>
                    </AuthLayout>
                }/>

                <Route exact path='/signup' element={
                    <AuthLayout page='signUp'>
                        <SignUpForm/>
                    </AuthLayout>
                }/>

                <Route exact path='/about' element={
                    <AuthLayout page='about'>
                        <About/>
                    </AuthLayout>
                }/>
                <Route
                    path="/"
                    element={<ProtectedRoute element={App}/>}
                />

            </Routes>
        </Router>
    );
}

export default AppRoutes;
