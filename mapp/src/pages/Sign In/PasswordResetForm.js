import React, { useState } from 'react';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';

function PasswordResetForm({ toggleModal }) {
  const [email, setEmail] = useState('');
  const [resetSent, setResetSent] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const auth = getAuth();

    try {
      await sendPasswordResetEmail(auth, email);
      setResetSent(true);
    } catch (error) {
      console.error('Error sending password reset email:', error);
      setError('Failed to send password reset email. Please try again.');
    }
  };

  return (
    <div>
      {!resetSent ? (
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <button type="submit">Send Password Reset Email</button>
          {error && <p>{error}</p>}
        </form>
      ) : (
        <div>
          <p>Password reset email sent. Please check your inbox.</p>
          <button onClick={toggleModal}>Close</button>
        </div>
      )}
    </div>
  );
}

export default PasswordResetForm;