import React, {useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faX} from "@fortawesome/free-solid-svg-icons";
import {editCourse} from '../firebase/firestore'

function EditCourseModal({updateCourses, toggleModal, currentCourse}) {

    // Add Course Form Handler
    const [courseData, setCourseData] = useState({
        courseName: '',
        courseSection: '',
        courseID: currentCourse.id,
    })

    let name, value;
    const updateCourseData = (e) => {
        name = e.target.name;
        value = e.target.value;
        setCourseData({...courseData, [name]: value})
    }

    {/*handleAddCourse -> this function fires once the add course button is pressed, it then adds to the database*/}
    const handleEditCourse = async () => {
        await editCourse(courseData.courseName, courseData.courseSection, courseData.courseID);
        updateCourses(); // Update courses in the parent component
        toggleModal();
    };

    return (
        <div className='h-full w-full top-0 left-0 right-0 bottom-0 fixed z-30'>
            <div
                className="bg-black opacity-80 h-full w-full top-0 left-0 right-0 bottom-0 fixed"></div>
            <div className="absolute grid h-screen w-screen place-items-center">
                <div
                    className="relative flex flex-col gap-4 bg-white min-w-[500px] max-h-[500px] p-8 rounded">
                    <p className="text-2xl text-center">Edit Course</p>
                    <button>
                        <FontAwesomeIcon className={" absolute top-2 right-2 w-3 h-3"} onClick={toggleModal}
                                         icon={faX}/>
                    </button>
                    <form className="flex flex-col gap-2 ">
                        <div className='flex flex-col gap-1'>
                            <label className='font-light text-gray-600 text-sm'>Course Name</label>
                            <input
                                name="courseName"
                                type="text"
                                className='border-gray-200 border rounded w-full p-2 focus:outline-0'
                                value={courseData.courseName}
                                onChange={updateCourseData}
                            />
                        </div>
                        <div className='flex flex-col gap-1'>
                            <label className='font-light text-gray-600 text-sm'>Course Section</label>
                            <input
                                name="courseSection"
                                type="text"
                                className='border-gray-200 border rounded w-full p-2 focus:outline-0'
                                value={courseData.courseSection}
                                onChange={updateCourseData}
                            />
                        </div>

                    </form>
                    <button className='bg-stone-800 text-white text-center px-4 py-2 w-full rounded text-lg'
                            type="submit"
                            onClick={handleEditCourse}>
                        Create Course
                    </button>
                </div>
            </div>
        </div>
    );
}

export default EditCourseModal;