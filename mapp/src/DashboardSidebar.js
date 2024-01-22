import React, {useContext, useEffect} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBookBookmark, faGear, faPlus, faUserGroup} from "@fortawesome/free-solid-svg-icons";

function DashboardSidebar({courses, toggleModal, updateCourse}) {

    useEffect(() => {
        console.log('Courses in DashboardSidebar:', courses);
    }, [courses]);


    return (
        <div className='flex flex-col border-gray-200 border-r-2 px-8 py-12 content-center gap-y-8'>

            {/*Students Section */}
            <a href='#' className='flex flex-row gap-4 items-center'>
                <FontAwesomeIcon className='h-4 w-4 text-gray-600' icon={faUserGroup}/>
                <div className='text-gray-500 font-light hover:text-green-600'>Students</div>
            </a>

            {/* My Courses Section */}

            <div href='#' className='flex flex-row w-full justify-between text-gray-400 text-sm font-light'>
                <div className='uppercase'>MY COURSES</div>
                {/*Add Course Button*/}
                <button onClick={toggleModal}>
                    <FontAwesomeIcon icon={faPlus}/>
                </button>
            </div>

            {courses.length > 0 ? (
                courses.map((course, index) => {
                    return (
                        <button onClick={() => updateCourse(course)} key={index}
                                className='flex flex-row gap-4 items-center'>
                            <FontAwesomeIcon className='h-4 w-4 text-gray-600' icon={faBookBookmark}/>
                            <div className='flex flex-col text-gray-500 font-light hover:text-green-600 items-start'>
                                <div className='uppercase text-xs'>{'Section ' + course.courseSection}</div>
                                <div>{course.courseName}</div>
                            </div>
                        </button>
                    )
                })
            ) : (
                <div className="text-gray-500 font-light">Loading courses...</div>
            )}


            {/* Settings Section */}
            <div href='#'
                 className='flex flex-row w-full justify-between text-gray-400 text-sm font-light -mb-4'>
                <div>SETTINGS</div>
            </div>
            <a href='#' className='flex flex-row gap-4 items-center'>
                <FontAwesomeIcon className='h-4 w-4 text-gray-600' icon={faGear}/>
                <div className='text-gray-500 font-light hover:text-green-600'>Settings</div>
            </a>
        </div>
    );
}

export default DashboardSidebar;