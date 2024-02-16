import React from 'react'
import course_background from '../../assets/course_background.jpg'
import {faChevronRight} from '@fortawesome/free-solid-svg-icons'
import {faPenToSquare} from '@fortawesome/free-regular-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'


function CourseBanner({course, breadCrumb, header, updateCourses, toggleEditCourseModal}) {
    return (
        <div className="flex flex-col w-full">
            <div className="h-52">
                <div className="flex flex-col w-full">
                    <div className="h-52">
                        <img className="w-full h-full object-cover" src={course_background}/>
                        <div className={!header ? 'block flex flex-col text-white -mt-16 pl-12' : 'hidden'}>
                            <button onClick={toggleEditCourseModal} className="absolute top-4 right-4 font-extralight bg-gray-500/30 rounded p-2 text-xs">
                                <div className="flex gap-2 items-center">
                                    <FontAwesomeIcon icon={faPenToSquare}/>
                                    Edit Course
                                </div>
                            </button>
                            <div className="text-sm uppercase">{course ? 'Section ' + course.courseSection : header} </div>
                            <h1 className="text-3xl text-white ">{course ? course.courseName : ''} </h1>
                        </div>

                        <div
                            className="flex flex-col text-white -mt-16 pl-12">
                            <h1 className="text-3xl text-white ">{header ? header : ''} </h1>

                        </div>
                        <div
                            className={breadCrumb ? 'block text-white -mt-16 pl-12 flex flex-row gap-2 items-center' : 'hidden'}>
                            <div className="hover:cursor-pointer hover:underline"
                                 onClick={() => updateCourses(course)}>{course ? course.courseName : ''}</div>
                            <FontAwesomeIcon className="w-2" icon={faChevronRight}/>
                            <div>{breadCrumb}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CourseBanner