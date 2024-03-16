import React, { useState } from 'react';
import FormWrapper from "../../components/FormWrapper";
import TextInput from "../../components/TextInput";
import SecondaryButton from "../../components/SecondaryButton";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import PasswordResetForm from './PasswordResetForm';

function SignInForm() {
  const auth = getAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPasswordResetModal, setShowPasswordResetModal] = useState(false);

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      const timestamp = new Date().toLocaleString();
      alert(`User has been logged in at ${timestamp}.`);
      window.location.href = '/';
    } catch (error) {
      console.error('Sign-in error:', error.message);
      alert(`Sign-in error: ${error.message}`);
    }
  };

  const togglePasswordResetModal = () => {
    setShowPasswordResetModal(!showPasswordResetModal);
  };

  return (
    <div>
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

      <button type="button" onClick={togglePasswordResetModal}>
        Forgot Password?
      </button>
      {showPasswordResetModal && (
        <PasswordResetForm toggleModal={togglePasswordResetModal} />
      )}
    </div>
  );
}

export default SignInForm;