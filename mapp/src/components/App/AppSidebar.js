import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRightFromBracket, faBookBookmark, faGear, faPlus, faUserGroup} from "@fortawesome/free-solid-svg-icons";
import SignOutButton from "./SignOutButton";

function AppSidebar({courses, toggleModal, updateCourse, selectedCourse}) {

    return (
        <div
            className='overflow-x-scroll flex flex-col border-gray-200 border-r-2 px-8 py-12 content-center gap-y-8 items-start'>
            {/*Students Section */}
            <a href='#' className='flex flex-row gap-4 items-center'>
                <FontAwesomeIcon className='h-4 w-4 text-gray-600' icon={faUserGroup}/>
                <div className='text-gray-500 font-light hover:text-green-600'>Students</div>
            </a>

            {/* My Courses Section */}

            <div href='#'
                 className='flex flex-row w-full justify-between text-gray-400 text-sm font-light'>
                <div className='uppercase'>MY COURSES</div>
                {/*Add Course Button*/}
                <button className='hover:text-green-500' onClick={toggleModal}>
                    <FontAwesomeIcon icon={faPlus}/>
                </button>
            </div>

            {courses.length > 0 ? (
                courses.map((course, index) => {
                    return (
                        <button
                            onClick={() => updateCourse(course)} key={index}
                                className=' flex flex-row gap-4 items-center text-gray-600'>
                            <FontAwesomeIcon className='h-4 w-4' icon={faBookBookmark}/>
                            <div className= {selectedCourse === course.courseName ? 'text-green-600 flex flex-col font-light items-start' : 'flex flex-col font-light hover:text-green-600 items-start'}>
                                <div className='uppercase text-xs'>{'Section ' + course.courseSection}</div>
                                <div>{course.courseName}</div>
                            </div>
                        </button>
                    )
                })
            ) : (
                <div className="text-gray-400 font-light">No courses yet</div>
            )}


            {/* Settings Section */}
            <div href='#'
                 className='flex flex-row w-full justify-between text-gray-400 text-sm font-light -mb-4'>
                <div>SETTINGS</div>
            </div>
            <a className='flex flex-row gap-4 items-center'>
                <FontAwesomeIcon className='h-4 w-4 text-gray-600' icon={faGear}/>
                <button className='text-gray-500 font-light hover:text-green-600'>Settings</button>
            </a>

            <div className='flex flex-row gap-4 items-center'>
                <FontAwesomeIcon className='h-4 w-4' icon={faArrowRightFromBracket}/>
                <SignOutButton/>
            </div>


        </div>
    );
}

export default AppSidebar;