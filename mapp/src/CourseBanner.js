import React from 'react';
import course_background from "./assets/course_background.jpg";

function CourseBanner({courseName}) {
    return (
        <div className='flex flex-col w-full'>
            <div className='h-52'>
                <img className='w-full h-full object-cover' src={course_background} alt=""/>
                <h1 className='text-3xl text-white -mt-12 pl-12 '>{courseName}</h1>
            </div> 
        </div>
    );
}

export default CourseBanner;