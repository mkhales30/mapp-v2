import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { addSession } from "../firebase/firestore";

function AddSessionModal({ updateSessions, toggleModal, course, isDarkMode }) {

    // Add session Form Handler
    const [sessionData, setSessionData] = useState({
        sessionName: '',
    })

    let name, value;
    const updateSessionData = (e) => {
        name = e.target.name;
        value = e.target.value;
        setSessionData({ ...sessionData, [name]: value })
    }

    const handleAddSession = async () => {
        await addSession(course.id, sessionData);
        updateSessions(); // Update sessions in the parent component
        toggleModal();
    };

    return (
        <div className='h-full w-full top-0 left-0 right-0 bottom-0 fixed z-30'>
            <div
                className="bg-black opacity-80 h-full w-full top-0 left-0 right-0 bottom-0 fixed"></div>
            <div className="absolute grid h-screen w-screen place-items-center">
                <div
                    className={`relative flex flex-col gap-4 ${isDarkMode ? 'bg-gray-300' : 'bg-white'} min-w-[500px] max-h-[500px] p-8 rounded`}>
                    <p className={`text-2xl text-center ${isDarkMode ? 'text-black' : ''}`}>New Session</p>
                    <button>
                        <FontAwesomeIcon className="absolute top-2 right-2 w-3 h-3" onClick={toggleModal} icon={faX} style={{ color: isDarkMode ? '#333' : '' }} />
                    </button>
                    <form className="flex flex-col gap-2 ">
                        <div className='flex flex-col gap-1'>
                            <label className="font-light text-sm" style={{ color: isDarkMode ? '#333' : '#000' }}>Session Name</label>
                            <input
                                name="sessionName"
                                type="text"
                                className={`border-gray-200 border rounded w-full p-2 focus:outline-0 ${isDarkMode ? 'text-black' : ''}`}
                                value={sessionData.sessionName}
                                onChange={updateSessionData}
                            />
                        </div>

                    </form>
                    <button className='bg-stone-800 text-white text-center px-4 py-2 w-full rounded text-lg'
                        type="submit"
                        onClick={handleAddSession}>
                        Create Session
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AddSessionModal;