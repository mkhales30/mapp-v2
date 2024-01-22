import React, {useEffect, useState, useContext, useMemo} from "react";
import {db, getCourses, getSessions, getStudents} from "./firebase/firestore"
import AddCourseModal from "./modals/AddCourseModal";
import CourseBanner from "./CourseBanner";
import DashboardSidebar from "./DashboardSidebar";
import StudentTable from "./tables/StudentTable";
import CourseNavigationBar from "./CourseNavigationBar";
import SessionsTable from "./tables/SessionsTable";


function App() {

    const [courses, setCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [students, setStudents] = useState([]);
    const [sessions, setSessions] = useState([]);
    const [modal, setModal] = useState(false);

    const tabs = [
        {
            label: "Students",
            value: "Students",
            table:  <StudentTable data={students}/>,
        },
        {
            label: "Sessions",
            value: "Sessions",
            table: <SessionsTable data={sessions}/>,
        },
    ];


    console.log(students)
    const toggleModal = () => {
        setModal(!modal);
    }
    const updateCourse = (clickedCourse) => {
        setSelectedCourse(clickedCourse);
        fetchStudents(clickedCourse.id)
        fetchSessions(clickedCourse.id);
    }

    // This is the function that fetches the courses
    const fetchCourses = async () => {
        try {
            const response = await getCourses("test2");
            setCourses(response);
            if(selectedCourse === null){
                setSelectedCourse(response.at(0))
                fetchStudents(response.at(0).id)
                fetchSessions(response.at(0).id)
            }
        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    };

    const fetchStudents = async (courseID) => {
        try {
            const response = await getStudents(courseID);
            setStudents(response);
        } catch (error) {
            console.error('Error fetching students:', error);
        }
    };

    // Function to fetch sessions for a selected course
    const fetchSessions = async (courseId) => {
        try {
            const sessionData = await getSessions(courseId);
            setSessions(sessionData);
        } catch (error) {
            console.error('Error fetching sessions:', error);
        }
    };

    // Once the component is rendered this function will call the fetchCourses
    useEffect(() => {
        let data = [];
        fetchCourses()
    }, []);






    return (
        <>
                <div className="grid grid-cols-4 h-screen">
                    <DashboardSidebar courses={courses} toggleModal={toggleModal} updateCourse={updateCourse}/>

                    {/*Main Content Area*/}
                    <div className='col-span-3'>
                        <CourseBanner course={selectedCourse}/>
                        <div className='px-12 py-4'>
                            <CourseNavigationBar data={tabs} />
                        </div>
                    </div>

                    {/*Add Course Modal*/}
                    {modal &&
                        <div className='h-full w-full top-0 left-0 right-0 bottom-0 fixed z-30'>
                            <div
                                className="bg-black opacity-80 h-full w-full top-0 left-0 right-0 bottom-0 fixed"></div>
                            <div className="absolute grid h-screen w-screen place-items-center">
                                <AddCourseModal updateCourses={fetchCourses} toggleModal={toggleModal}/>
                            </div>
                        </div>
                    }



                </div>
        </>
    )
}

export default App;
