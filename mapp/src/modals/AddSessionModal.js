import React, {useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faX} from "@fortawesome/free-solid-svg-icons";
import {addSession} from "../firebase/firestore";

function AddSessionModal(props) {

    // Add session Form Handler
    const [sessionData, setSessionData] = useState({
        sessionName: '',
    })

    let name, value;
    const updateSessionData = (e) => {
        name = e.target.name;
        value = e.target.value;
        setSessionData({...sessionData, [name]: value})
    }

    const handleAddSession = async () => {
        await addSession(props.course.id, sessionData);
        props.updateSessions(); // Update sessions in the parent component
        props.toggleModal();
    };

    return (
        <div
            className="relative flex flex-col gap-4 bg-white min-w-[500px] max-h-[500px] p-8 rounded">
            <p className="text-2xl text-center">New Session</p>
            <button>
                <FontAwesomeIcon className={" absolute top-2 right-2 w-3 h-3"} onClick={props.toggleModal}
                                 icon={faX}/>
            </button>
            <form className="flex flex-col gap-2 ">
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

            </form>
            <button className='bg-stone-800 text-white text-center px-4 py-2 w-full rounded text-lg'
                    type="submit"
                    onClick={handleAddSession}>
                Create Session
            </button>
        </div>
    );
}

export default AddSessionModal;