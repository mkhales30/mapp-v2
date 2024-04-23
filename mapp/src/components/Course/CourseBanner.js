import React, {useEffect} from 'react'
import course_background from '../../assets/course_background.jpg'
import {faChevronRight, faTrash} from '@fortawesome/free-solid-svg-icons'
import {faPenToSquare} from '@fortawesome/free-regular-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {deleteCourse} from "../../firebase/firestore";

function CourseBanner({course, breadCrumb, updateCourses, toggleEditCourseModal, header, session}) {
    const handleDeleteCourse = async () => {
        try {
            if (course) { // Do nothing if no course selected
                const confirmDelete = window.confirm("Are you sure you want to delete this course?");

                if (confirmDelete) {
                    // Assume you'll have 'deleteCourse' in 'firestore.js'
                    await deleteCourse(course.id);

                    // Handle UI updates:
                    //  (1)  Reload courses or refresh (simplest, potentially harsh reload)
                    //  (2)  Remove element related to that 'selectedCourse' using state + DOM manipulation, but state may hold stale data for the brief period until your next fetch cycle from Firestore potentially!
                }
            }
        } catch (error) {
            console.error("Error deleting course:", error);
            // Display a user-friendly error message...
        }
    };

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
                <div className="absolute top-4 right-4 flex flex-row gap-2">
                    {/*Edit Course Button*/}
                    <button onClick={toggleEditCourseModal}
                            className=" font-extralight bg-blue-500/60 rounded hover:bg-blue-600/60 p-2 text-xs">
                        <div className="flex gap-2 items-center">
                            Edit Course
                            <FontAwesomeIcon icon={faPenToSquare}/>
                        </div>
                    </button>
                    <button
                        disabled={!course} // Disable if no course is selected
                        className='flex flex-row gap-2 items-center text-xs  block bg-red-600/60 font-extralight  hover:bg-red-700/60  text-white text-center p-2  h-fit rounded text-sm'
                        onClick={handleDeleteCourse} // We'll create this function next
                    >
                        <div> Delete Course</div>
                        <FontAwesomeIcon icon={faTrash}/>
                    </button>
                </div>
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