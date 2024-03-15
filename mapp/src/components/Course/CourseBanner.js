import React from "react";
import course_background from "../../assets/course_background.jpg";
import {faChevronRight} from "@fortawesome/free-solid-svg-icons";
import {faPenToSquare, faTrashCan} from "@fortawesome/free-regular-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {deleteCourse, deleteSession} from "../../firebase/firestore";


function CourseBanner({course, breadCrumb, updateCourses, toggleEditCourseModal, header, sessionPage, session, updateSelectedCourse}) {
    const handleDeleteCourse = async () => {
        try {
            if (course) {
                // Do nothing if no course selected
                const confirmDelete = window.confirm("Are you sure you want to delete this course?",);

                if (confirmDelete) {
                    // Assume you'll have 'deleteCourse' in 'firestore.js'
                    await deleteCourse(course.id);

                    // Handle UI updates:
                    //  (1)  Reload courses or refresh (simplest, potentially harsh reload)
                    //  (2)  Remove element related to that 'course' using state + DOM manipulation, but state may hold stale data for the brief period until your next fetch cycle from Firestore potentially!
                }
            }
        } catch (error) {
            console.error("Error deleting course:", error);
            // Display a user-friendly error message...
        }
    };

    const handleDeleteSession = async () => {
        try {
            await deleteSession(course.id, session.id);
            alert('Session Deleted');
            // Updating the selected course will navigate back to the course profile page
            updateSelectedCourse(course);
        } catch (error) {
            console.error('Error deleting session:', error);
        }
    };


    // Banner is a variable that will hold the JSX for the banner
    let banner;

    // Course Banner on the Session Profile Page
    if (sessionPage) {
        banner = (
            <div>
                <div className="absolute flex flex-row gap-2 items-center top-4 right-4">
                    {/*Delete Course Button*/}
                    <button
                        onClick={handleDeleteSession} // We'll create this function next
                        className=" font-extralight bg-red-500/30 rounded p-2 text-xs hover:bg-red-500/50"
                    >
                        <div className="flex gap-2 items-center">
                            <FontAwesomeIcon icon={faTrashCan}/>
                            Delete Session
                        </div>
                    </button>
                </div>
                {/*Breadcrumb -> [Course name > Sessions > Session Name]  */}
                <div className="text-white -mt-2  flex flex-row gap-2 items-center text-sm font-extralight">
                    {/*The course name in the banner will link back to the course profile*/}
                    <div className="hover:cursor-pointer hover:underline" onClick={() => updateCourses(course)}>
                        {course ? course.courseName : ""}
                    </div>
                    <FontAwesomeIcon className="w-2" icon={faChevronRight}/>
                    <div>{breadCrumb}</div>
                </div>
            </div>
        );
    }

    // Course Banner on the Course Profile Page
    else if (course) {
        banner = (<div>
                <div className="absolute flex flex-row gap-2 items-center top-4 right-4">
                    {/*Edit Course Button*/}
                    <button
                        onClick={toggleEditCourseModal}
                        className=" font-extralight bg-gray-500/30 rounded p-2 text-xs hover:bg-gray-500/50"
                    >
                        <div className="flex gap-2 items-center">
                            <FontAwesomeIcon icon={faPenToSquare}/>
                            Edit Course
                        </div>
                    </button>
                    {/*Delete Course Button*/}
                    <button
                        onClick={handleDeleteCourse} // We'll create this function next
                        className=" font-extralight bg-red-500/30 rounded p-2 text-xs hover:bg-red-500/50"
                    >
                        <div className="flex gap-2 items-center">
                            <FontAwesomeIcon icon={faTrashCan}/>
                            Delete Course
                        </div>
                    </button>
                </div>
                {/*Course Name*/}
                <div className="text-sm uppercase">
                    {"Section " + course.courseSection}{" "}
                </div>
            </div>
        );
    }

    return (<div className="flex flex-col w-full">
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
    </div>);
}

export default CourseBanner;
