import React, {useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faX} from "@fortawesome/free-solid-svg-icons";
import {addSession, getSessions} from "../firebase/firestore";
import {useDispatch, useSelector} from "react-redux";
import {updateSessions} from "../store/slices/sessionsSlice";

function AddSessionModal({toggleModal}) {
    // This will be used to dispatch actions to the redux store
    const dispatch = useDispatch();

    //Get the selected course from the redux store
    const course = useSelector(state => state.selectedCourse.value);

    // Add session Form Data
    const [sessionData, setSessionData] = useState({
        sessionName: '',
    })

    // Tracks the name and value of the modified input fields
    let name, value;
    // Updates the form data when the input fields are modified
    const updateSessionData = (e) => {
        name = e.target.name;
        value = e.target.value;
        setSessionData({...sessionData, [name]: value})
    }
    // Function to add a session to a course and update the redux store
    const handleAddSession = async () => {
        await addSession(course.id, sessionData);
        const sessions = await getSessions(course.id);
        dispatch(updateSessions(sessions));
        toggleModal();
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
            </div>
        </div>
    );
}

export default AddSessionModal;