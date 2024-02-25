import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRightFromBracket, faBookBookmark, faGear, faPlus, faUserGroup} from "@fortawesome/free-solid-svg-icons";
import SignOutButton from "./SignOutButton";
import {useDispatch, useSelector} from "react-redux";
import {updateSelectedCourse} from "../../store/slices/selectedCourseSlice";
import {Link} from "react-router-dom";

function AppSidebar({courses, toggleModal}) {
    const selectedCourse = useSelector((state) => state.selectedCourse.value)
    const dispatch = useDispatch()
    return (

        <div
            className='overflow-x-scroll flex flex-col border-gray-200 border-r-2 px-8 py-12 md:content-center gap-y-8 items-start'>

            {/* User greeting
            <a className='flex flex-row  items-center text-gray-500 gap-x-4'>
                <img className='rounded-full w-12 h-12' src="" alt=""/>
                <div className='flex flex-col'>
                    <div className='text-sm'>Welcome back,</div>
                    <div className='font-light'>{auth.currentUser.firstName}</div>
                </div>
            </a>
            */}

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
                <button className='hover:text-green-500 flex flex-row gap-2 text-gray-400 opacity-50 items-center' onClick={toggleModal}>
                    <div className={'font-light text-sm uppercase'}>Add course</div>
                    <FontAwesomeIcon icon={faPlus}/>
                </button>
            </div>

            {courses.length > 0 ? (
                courses.map((course, index) => {
                    return (
                        <Link
                            onClick={() => dispatch(updateSelectedCourse(course))} key={index}
                            className=' flex flex-row gap-4 items-center text-gray-600' to={`/course/${course.id}`}>
                            <FontAwesomeIcon className='sm:hidden md:block h-4 w-4' icon={faBookBookmark}/>
                            <div
                                className={selectedCourse.id === course.id ? 'text-green-600 flex flex-col font-light items-start' : 'flex flex-col font-light hover:text-green-600 items-start'}>
                                <div className='uppercase text-xs'>{'Section ' + course.courseSection}</div>
                                <div>{course.courseName}</div>
                            </div>
                        </Link>
                    )
                })
            ) : (
                <div className="text-gray-400 font-light">No courses yet</div>
            )}


            {/* Settings Section */}
            <div
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