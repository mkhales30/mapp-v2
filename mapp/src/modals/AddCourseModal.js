import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { addCourse } from "../firebase/firestore";
import { auth } from "../firebase/firebase";

function AddCourseModal({ updateCourses, toggleModal, isDarkMode }) {
    // Add Course Form Handler
    const [courseData, setCourseData] = useState({
        courseName: '',
        courseSection: '',
        uid: auth.currentUser.uid
    });

    const updateCourseData = (e) => {
        const { name, value } = e.target;
        setCourseData({ ...courseData, [name]: value });
    };

    const handleAddCourse = async () => {
        await addCourse(courseData.courseName, courseData.courseSection, courseData.uid);
        updateCourses(); // Update courses in the parent component
        toggleModal();
    };

    return (
        <div className='h-full w-full top-0 left-0 right-0 bottom-0 fixed z-30'>
            <div className="bg-black opacity-80 h-full w-full top-0 left-0 right-0 bottom-0 fixed"></div>
            <div className="absolute grid h-screen w-screen place-items-center">
                <div className={`relative flex flex-col gap-4 ${isDarkMode ? 'bg-gray-300' : 'bg-white'} min-w-[500px] max-h-[500px] p-8 rounded`}>
                    <p className={`text-2xl text-center ${isDarkMode ? 'text-black' : ''}`}>New Course</p>
                    <button>
                        <FontAwesomeIcon className="absolute top-2 right-2 w-3 h-3" onClick={toggleModal} icon={faX} style={{ color: isDarkMode ? '#333' : '' }} />
                    </button>
                    <form className="flex flex-col gap-2">
                        <div className='flex flex-col gap-1'>
                            <label className="font-light text-sm" style={{ color: isDarkMode ? '#333' : '#000' }}>Course Name</label>
                            <input
                                name="courseName"
                                type="text"
                                className={`border-gray-200 border rounded w-full p-2 focus:outline-0 ${isDarkMode ? 'text-black' : ''}`}
                                value={courseData.courseName}
                                onChange={updateCourseData}
                            />
                        </div>
                        <div className='flex flex-col gap-1'>
                            <label className="font-light text-sm" style={{ color: isDarkMode ? '#333' : '#000' }}>Course Section</label>
                            <input
                                name="courseSection"
                                type="text"
                                className={`border-gray-200 border rounded w-full p-2 focus:outline-0 ${isDarkMode ? 'text-black' : ''}`}
                                value={courseData.courseSection}
                                onChange={updateCourseData}
                            />
                        </div>
                    </form>
                    <button className='bg-stone-800 text-white text-center px-4 py-2 w-full rounded text-lg'
                        type="submit"
                        onClick={handleAddCourse}>
                        Create Course
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AddCourseModal;