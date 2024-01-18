import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faUserGroup} from '@fortawesome/free-solid-svg-icons'
import {faBookBookmark} from '@fortawesome/free-solid-svg-icons'
import {faPlus} from '@fortawesome/free-solid-svg-icons'
import {faX} from '@fortawesome/free-solid-svg-icons'
import {faGear} from '@fortawesome/free-solid-svg-icons';
import React, {useEffect, useState} from "react";
import {db, addCourse, getCourses, getCourse} from "./firebase/firestore"
import AddCourseModal from "./AddCourseModal";
import CourseBanner from "./CourseBanner";


function App() {

    const [courses, setCourses] = useState([]);

    // Modal Code
    const [modal, setModal] = useState(false);
    const toggleModal = () => {
        setModal(!modal);
    }

    // Once the component is rendered...fetch the courses for the auth user from database
    useEffect(() => {
        getCourses("test2").then((courses) => setCourses(courses));
    }, [courses]);

    return (
        <div className="grid grid-cols-4 h-screen">
            {/*Sidebar*/}

            <div className='flex flex-col border-gray-200 border-r-2 px-8 py-12 content-center gap-y-8'>

                {/*Sidebar Menu -> Students Section */}
                <a href='#' className='flex flex-row gap-4 items-center'>
                    <FontAwesomeIcon className='h-4 w-4 text-gray-600' icon={faUserGroup}/>
                    <div className='text-gray-500 font-light hover:text-green-600'>Students</div>
                </a>

                {/*Sidebar Menu -> My Courses Section */}

                <div href='#' className='flex flex-row w-full justify-between text-gray-400 text-sm font-light'>
                    <div className='uppercase'>MY COURSES</div>
                    {/*Add Course Button*/}
                    <button onClick={toggleModal}>
                        <FontAwesomeIcon icon={faPlus}/>
                    </button>
                </div>

                {courses.map((course, index) => {
                    return (
                        <button key={index} className='flex flex-row gap-4 items-center'>
                            <FontAwesomeIcon className='h-4 w-4 text-gray-600' icon={faBookBookmark}/>
                            <div
                                className='text-gray-500 font-light hover:text-green-600'>{course.courseName} {course.courseSection}</div>
                        </button>)
                })}

                {/* Sidebar Menu -> Settings Section */}
                <div href='#' className='flex flex-row w-full justify-between text-gray-400 text-sm font-light -mb-4'>
                    <div>SETTINGS</div>
                </div>
                <a href='#' className='flex flex-row gap-4 items-center'>
                    <FontAwesomeIcon className='h-4 w-4 text-gray-600' icon={faGear}/>
                    <div className='text-gray-500 font-light hover:text-green-600'>Settings</div>
                </a>

                {/*Add Student Modal*/}
                {modal &&
                    <div className='h-full w-full top-0 left-0 right-0 bottom-0 fixed'>
                        <div className="bg-black opacity-80 h-full w-full top-0 left-0 right-0 bottom-0 fixed"></div>
                        <div className="absolute grid h-screen w-screen place-items-center">
                            <AddCourseModal toggleModal={toggleModal}/>
                        </div>
                    </div>
                }

            </div>
            {/*Main Content Area*/}
            <div className='col-span-3'>
                <CourseBanner courseName="WIP"/>


            </div>


        </div>
    )
}

export default App;
