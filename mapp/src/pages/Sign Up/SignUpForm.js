import '../../styles/index.css';
import React, { useState } from 'react';
import { useMultistepForm } from '../../hooks/useMultiForm';
import emailForm from './multistepForms/EmailForm';
import passForm from './multistepForms/PassForm';
import { Final } from './multistepForms/Final';
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import SecondaryButton from "../../components/SecondaryButton";
import { Stepper } from "./Stepper";
import { getFirestore, collection, addDoc } from "firebase/firestore";

function SignUpForm() {
  const auth = getAuth();
  const db = getFirestore();
  const usersCollection = collection(db, "Users");

  const INITIAL_DATA = {
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    uid: "", // Add a field for User UID
  };

  const [data, setData] = useState(INITIAL_DATA);

  function updateFields(fields) {
    setData((prev) => {
      return { ...prev, ...fields };
    });
  }

  const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next } =
    useMultistepForm([
      React.createElement(emailForm, { ...data, updateFields }),
      React.createElement(passForm, { ...data, updateFields }),
      React.createElement(Final, { ...data, updateFields }),
    ]);

  async function onSubmit(e) {
    e.preventDefault();

    if (isLastStep) {
      try {
        // Use Firebase's createUserWithEmailAndPassword to create a new user
        const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
        const user = userCredential.user;

        // Set the User UID in the data
        setData((prev) => ({ ...prev, uid: user.uid }));

        // Create a Firestore database entry and include the User UID
        await addDoc(usersCollection, {
          uid: user.uid, // Include the User UID
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          pass: data.password,
          // You can add more user data here if needed
        });

        alert("Successful Account Creation");
        await sendEmailVerification(auth.currentUser).then(() => {
          // Email verification sent!
          // ...
        });
      } catch (error) {
        // Handle any registration errors here
        alert("Registration failed. Please try again.");
        console.log(error);
      }
    } else {
      next();
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <Stepper className="mb-48"
        steps={[
          "Enter your email address",
          "Create your password",
          "Complete",
        ]}
        currentStep={currentStepIndex + 1}
      />
      <div className="flex flex-col gap-4 mt-24">
        {step}
        <div className='buttonContainer'>
          <SecondaryButton type="submit" text={isLastStep ? "Complete" : "Next"} />
          {!isFirstStep && (
            <button className='mt-4 bg-gray-200 text-black text-center px-4 py-2 w-full rounded text-lg' type="button" onClick={back}>
              Back
            </button>
          )}
        </div>
      </div>
    </form>
  );
}

export default SignUpForm;
