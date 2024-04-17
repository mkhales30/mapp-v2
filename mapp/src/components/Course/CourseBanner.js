import React from 'react'
import course_background from '../../assets/course_background.jpg'
import {faChevronRight} from '@fortawesome/free-solid-svg-icons'
import {faPenToSquare} from '@fortawesome/free-regular-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

function CourseBanner({course, breadCrumb, updateCourses, toggleEditCourseModal, header, session}) {
    let banner;

    // Session Profile Banner
    if (session) {
        banner =
            <div>
                {/*Breadcrumb*/}
                <div className="text-white -mt-2  flex flex-row gap-2 items-center">
                    <div className="hover:cursor-pointer hover:underline"
                         onClick={() => updateCourses(course)}>{course ? course.courseName : ''}
                    </div>
                    <FontAwesomeIcon className="w-2" icon={faChevronRight}/>
                    <div>{breadCrumb}</div>
                </div>
                <div className='text-white text-2xl'>
                    {session.sessionName}
                </div>
            </div>
    }

    // Default Banner View with 'Edit Course' Button
    else if (course) {
        banner =
            <div>
                {/*Edit Course Button*/}
                <button onClick={toggleEditCourseModal} className="absolute top-4 right-4 font-extralight bg-gray-500/30 rounded p-2 text-xs">
                    <div className="flex gap-2 items-center">
                        <FontAwesomeIcon icon={faPenToSquare}/>
                        Edit Course
                    </div>
                </button>
                {/*Course Name*/}
                <div className="text-sm uppercase">{'Section ' + course.courseSection} </div>
            </div>
    }

    return (
        <div className="flex flex-col w-full">
            <div className="h-52">
                <div className="flex flex-col w-full">
                    <div className="h-52">
                        <img className="w-full h-full object-cover" src={course_background}/>
                        <div className="flex flex-col text-white -mt-16 pl-12">
                            {banner}
                            <h1 className="text-3xl text-white ">{header}</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CourseBanner