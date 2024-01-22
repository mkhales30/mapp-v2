import React, {useEffect, useState} from "react";
import {auth} from './firebase/firebase'
import {db, getCourses, getSessions, getStudents} from "./firebase/firestore"
import AddCourseModal from "./modals/AddCourseModal";
import CourseBanner from "./components/Course/CourseBanner";
import AppSidebar from "./components/App/AppSidebar";
import StudentsTable from "./tables/StudentsTable";
import CourseNavigationBar from "./components/Course/CourseNavigationBar";
import SessionsTable from "./tables/SessionsTable";
import StudentProfile from "./pages/Student/StudentProfile";
import SessionProfile from "./pages/Session/SessionProfile";
import AddStudentModal from "./modals/AddStudentModal";

function App() {

    const [courses, setCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [students, setStudents] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [sessions, setSessions] = useState([]);
    const [selectedSession, setSelectedSession] = useState(null);
    const [addCourseModal, setAddCourseModal] = useState(false);
    const [addStudentModal, setAddStudentModal] = useState(false);

    const updateSelectedStudent = (selectedStudent) => {
        console.log("Selected Student", selectedStudent)
        setSelectedStudent(selectedStudent);
    }

    const updateSelectedSession = (selectedSession) => {
        console.log("Selected Session", selectedSession)
        setSelectedSession(selectedSession);
    }

    const toggleAddCourseModal = () => {
        setAddCourseModal(!addCourseModal);
    }

    const toggleAddStudentModal = () => {
        console.log("add student modal should appear")
        setAddStudentModal(!addStudentModal);
    }

    const updateCourse = (clickedCourse) => {
        setSelectedCourse(clickedCourse);
        setSelectedStudent(null);
        setSelectedSession(null);
        fetchStudents(clickedCourse.id)
        fetchSessions(clickedCourse.id);
    }

    // This is the function that fetches the courses
    const fetchCourses = async () => {
        try {
            const response = await getCourses(auth.currentUser.uid);
            setCourses(response);
            if (selectedCourse === null) {
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

    const tabs = [
        {
            label: "Students",
            value: "Students",
            table: <StudentsTable updateSelectedStudent={updateSelectedStudent} data={students}/>,
        },
        {
            label: "Sessions",
            value: "Sessions",
            table: <SessionsTable updateSelectedSession={updateSelectedSession} data={sessions}/>,
        },
    ];


    return (
        <>
            <div className="grid grid-cols-4 h-screen">
                {/*Dashboard Sidebar*/}
                <AppSidebar courses={courses} toggleModal={toggleAddCourseModal} updateCourse={updateCourse}/>

                {/*Main Content Area*/}
                {!selectedStudent && !selectedSession &&
                    <div className='col-span-3'>
                        <CourseBanner course={selectedCourse}/>
                        <div className='px-12 py-4'>
                            <CourseNavigationBar data={tabs} toggleAddStudentModal={toggleAddStudentModal}/>
                        </div>
                    </div>
                }

                {/*Add Course Modal*/}
                {addCourseModal &&
                    <div className='h-full w-full top-0 left-0 right-0 bottom-0 fixed z-30'>
                        <div
                            className="bg-black opacity-80 h-full w-full top-0 left-0 right-0 bottom-0 fixed"></div>
                        <div className="absolute grid h-screen w-screen place-items-center">
                            <AddCourseModal updateCourses={fetchCourses} toggleModal={toggleAddCourseModal}/>
                        </div>
                    </div>
                }

                {/*Add Student Modal*/}
                {addStudentModal &&
                    <div className='h-full w-full top-0 left-0 right-0 bottom-0 fixed z-30'>
                        <div
                            className="bg-black opacity-80 h-full w-full top-0 left-0 right-0 bottom-0 fixed"></div>
                        <div className="absolute grid h-screen w-screen place-items-center">
                            <AddStudentModal course={selectedCourse}
                                             updateStudents={() => fetchStudents(selectedCourse.id)}
                                             toggleModal={toggleAddStudentModal}/>
                        </div>
                    </div>
                }

                {/*Student Profile*/}
                {selectedStudent &&
                    <div className='col-span-3'>
                        <CourseBanner course={selectedCourse} breadCrumb="Student"
                                      header={selectedStudent.firstName + ' ' + selectedStudent.lastName}
                                      updateCourse={updateCourse}/>
                        <StudentProfile student={selectedStudent}/>
                    </div>

                }

                {/*Session Profile*/}
                {selectedSession &&
                    <div className='col-span-3'>
                        <CourseBanner course={selectedCourse} breadCrumb="Sessions" header={selectedSession.date}
                                      updateCourse={updateCourse}/>
                        <SessionProfile session={selectedSession}/>
                    </div>
                }

            </div>
        </>
    )
}

export default App;
