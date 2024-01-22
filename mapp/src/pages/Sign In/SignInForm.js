import React, { useState } from 'react';
// import { useHistory } from 'react-router-dom'; // Commented out for future routing
import FormWrapper from "../../components/FormWrapper";
import TextInput from "../../components/TextInput";
import SecondaryButton from "../../components/SecondaryButton";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"; // Import your Firebase configuration

function SignInForm() {
    const auth = getAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const history = useHistory(); // Commented out for future routing

    const handleSignIn = async (e) => {


        e.preventDefault();

        try {
            console.log("Attempting to sign in with email:", email);
            await signInWithEmailAndPassword(auth, email, password);

            // Uncomment the following lines for routing
            // history.push('/dashboard');

            const timestamp = new Date().toLocaleString();
            alert(`User has been logged in at ${timestamp}.`);
            window.location.href = '/app';
        } catch (error) {
            console.error('Sign-in error:', error.message);
            alert(`Sign-in error: ${error.message}`);
        }
    };

    return (
        <form onSubmit={handleSignIn}>
            <FormWrapper title="Log In">
                <div className="flex flex-col gap-4">
                    <TextInput
                        required
                        type="email"
                        label="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextInput
                        required
                        type="password"
                        label="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <SecondaryButton text="Log In" type="submit" />
                </div>
            </FormWrapper>
        </form>
    );
}

export default SignInForm;
