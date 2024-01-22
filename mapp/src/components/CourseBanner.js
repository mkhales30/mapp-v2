import React from 'react';
import course_background from "../assets/course_background.jpg";
import {faChevronRight} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";


function CourseBanner({course, breadCrumb, header, updateCourse}) {

    return (
        <div className='flex flex-col w-full'>
            <div className='h-52'>
                <img className='w-full h-full object-cover' src={course_background} alt=""/>
                <h1 className='text-3xl text-white -mt-16 pl-12 '>{course != null && breadCrumb == null ? course.courseName + ', Section ' + course.courseSection : header} </h1>
                <div
                    className={breadCrumb ? 'block  text-white -mt-16 pl-12 flex flex-row gap-2 items-center' : 'hidden'}>
                    <div className='hover:cursor-pointer hover:underline'
                         onClick={() => updateCourse(course)}>{course != null ? course.courseName : ''}</div>
                    <FontAwesomeIcon className='w-2' icon={faChevronRight}/>
                    <div>{breadCrumb}</div>
                </div>
            </div>
        </div>
    );
}

export default CourseBanner;