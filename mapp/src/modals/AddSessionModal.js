import React, {useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faX} from "@fortawesome/free-solid-svg-icons";
import {addSession} from "../firebase/firestore";

function AddSessionModal({updateSessions, toggleModal, course}) {

    // Data to be added to the session
    const [sessionData, setSessionData] = useState({
        sessionName: '',
        sessionStart: null,
        gracePeriod : null,
    })
    // name and value -> holds the name and value of the updated input field
    let name, value;
    // updateSessionData -> updates the session data to be added
    const updateSessionData = (e) => {
        name = e.target.name;
        value = e.target.value;
        setSessionData({...sessionData, [name]: value})
    }
    // handleAddSession -> this function fires once the add session button is pressed, it then adds to the database
    const handleAddSession = async () => {
        const emptyRequiredFields = sessionData.sessionName === '';
        if (emptyRequiredFields) {
            alert("Please fill out the required fields");;
        }else{
            await addSession(course.id, sessionData);
            updateSessions(); // Update sessions in the parent component
            toggleModal();
        }
    };

    return (
        <div className='h-full w-full top-0 left-0 right-0 bottom-0 fixed z-30'>
            <div
                className="bg-black opacity-80 h-full w-full top-0 left-0 right-0 bottom-0 fixed"></div>
            <div className="absolute grid h-screen w-screen place-items-center">
                <div
                    className="relative flex flex-col gap-4 bg-white min-w-[500px] max-h-[500px] p-8 rounded">
                    <p className="text-2xl text-center">New Session</p>
                    <button>
                        <FontAwesomeIcon className={" absolute top-2 right-2 w-3 h-3"} onClick={toggleModal}
                                         icon={faX}/>
                    </button>
                    <form className="flex flex-col gap-2 ">
                        <div className='flex flex-col gap-1'>
                            <label className='font-light text-gray-600 text-sm'>Session Name</label>
                            <input
                                name="sessionName"
                                placeholder={"(i.e, " + new Date(Date.now()).toDateString() + ')'}
                                type="text"
                                className='border-gray-200 border rounded w-full p-2 focus:outline-0'
                                value={sessionData.sessionName}
                                onChange={updateSessionData}
                            />
                        </div>

                        <div className='flex flex-col gap-1'>
                            <label className='font-light text-gray-600 text-sm'>Session Start <span className='text-gray-600 font-extralight text-xs italic'>(Optional)</span></label>
                            <input
                                name="sessionStart"
                                type="datetime-local"
                                className='border-gray-200 border rounded w-full p-2 focus:outline-0'
                                value={sessionData.sessionStart}
                                onChange={updateSessionData}
                            />
                        </div>

                        <div className='flex flex-col gap-1'>
                            <label className='font-light text-gray-600 text-sm'>Grace Period End <span className='text-gray-600 font-extralight text-xs italic'>(Optional)</span></label>

                            <div className='flex gap-2 items-center'>
                                <input
                                    name="gracePeriod"
                                    type="datetime-local"
                                    className='border-gray-200 border rounded w-full p-2 focus:outline-0'
                                    value={sessionData.gracePeriod}
                                    onChange={updateSessionData}
                                />
                            </div>
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