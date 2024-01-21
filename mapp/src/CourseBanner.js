import React, {useContext, useEffect} from 'react';
import course_background from "./assets/course_background.jpg";
import {CourseContext} from "./CourseContext";


function CourseBanner({courseName}) {
    const course = useContext(CourseContext);


    return (
        <div className='flex flex-col w-full'>
            <div className='h-52'>
                <img className='w-full h-full object-cover' src={course_background} alt=""/>
                <h1 className='text-3xl text-white -mt-12 pl-12 '>{course.courseName}, Section {course.courseSection}</h1>
            </div> 
        </div>
    );
}

export default CourseBanner;