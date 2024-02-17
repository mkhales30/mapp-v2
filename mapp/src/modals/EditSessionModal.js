import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { updateSession } from '../firebase/firestore';

function EditSessionModal({ course, session, toggleModal, updateSessions, updateSelectedSession, updateSelectedCourse }) {
  // State for session data
  const [sessionData, setSessionData] = useState({
    sessionName: session.sessionName,
    // Add other session properties here
  });

  // Function to handle session update
  const handleUpdateSession = async (event) => {
    event.preventDefault();
    
    try {
      // Update session data in Firestore
      await updateSession(course.id, session.id, sessionData);
      
      // Update local state and close modal
      updateSessions();
      updateSelectedCourse(course);
      updateSelectedSession(session);
      toggleModal();
      setTimeout(() => {
        window.location.reload();
      }, 300);
    } catch (error) {
      console.error('Error updating session:', error);
    }
  };

  // Function to update session data in local state
  const updateSessionData = (event) => {
    const { name, value } = event.target;
    setSessionData((prevSessionData) => ({
      ...prevSessionData,
      [name]: value,
    }));
  };

  return (
    <div className='h-full w-full top-0 left-0 right-0 bottom-0 fixed z-30'>
      <div className="bg-black opacity-80 h-full w-full top-0 left-0 right-0 bottom-0 fixed"></div>
      <div className="absolute grid h-screen w-screen place-items-center">
        <div className="relative flex flex-col gap-4 bg-white min-w-[500px] max-h-[500px] p-8 rounded">
          <p className="text-2xl text-center">Edit Session</p>
          <button>
            <FontAwesomeIcon className={" absolute top-2 right-2 w-3 h-3"} onClick={toggleModal} icon={faTimes} />
          </button>
          <form className="flex flex-col gap-2" onSubmit={handleUpdateSession}>
            <div className='flex flex-col gap-1'>
              <label className='font-light text-gray-600 text-sm'>Session Name</label>
              <input
                name="sessionName"
                type="text"
                className='border-gray-200 border rounded w-full p-2 focus:outline-0'
                value={sessionData.sessionName}
                onChange={updateSessionData}
              />
            </div>
            <button className='bg-stone-800 text-white text-center px-4 py-2 w-full rounded text-lg' type="submit">
              Update Session
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditSessionModal;