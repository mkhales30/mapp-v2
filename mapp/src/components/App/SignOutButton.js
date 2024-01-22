import React from 'react';
import {getAuth, signOut} from 'firebase/auth';

function SignOutButton({}){
    const auth = getAuth();

    const handleSignOut = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
            console.log("Signed out successfully!");
            // Optionally, redirect the user to the sign-in page or update the state
        }).catch((error) => {
            // An error happened.
            console.error("Sign out error:", error);
        });
    };

    return (
        <button className='font-light text-gray-500 hover:text-green-600' onClick={handleSignOut}>
            Sign Out
        </button>
    );
};

export default SignOutButton;
