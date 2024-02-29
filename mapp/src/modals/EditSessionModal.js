import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { editSession } from '../firebase/firestore';

function EditSessionModal({ session, toggleModal, courses }) {
    const [sessionData, setSessionData] = useState({
        sessionName: session.sessionName
    });

    // Function to handle editing session data
    const handleEditSession = async (event) => {
        event.preventDefault();
        const sessionCourse = courses.find(course => course.id === session.courseId); // Finding the course associated with the session

        try {
            console.log("Updating session with course ID:", sessionCourse.id, "and session ID:", session.id);
            await editSession(sessionCourse.id, session.id, sessionData); // Calling the editSession function to update the session in Firestore
            toggleModal();
        } catch (error) {
            console.error('Error updating session in modal:', error);
            console.log('Course ID:', sessionCourse.id, 'Session ID:', session.id);
        }
    };

    // Function to update session data in state
    const updateSessionData = (e) => {
        const { name, value } = e.target;
        setSessionData({ ...sessionData, [name]: value });
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
                <form className="flex flex-col gap-2" onSubmit={handleEditSession}>
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