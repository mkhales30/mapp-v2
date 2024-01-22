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
import AddSessionModal from "./modals/AddSessionModal";

function App() {
    console.log(auth.currentUser.uid)

    const [courses, setCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [students, setStudents] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [sessions, setSessions] = useState([]);
    const [selectedSession, setSelectedSession] = useState(null);
    const [addCourseModal, setAddCourseModal] = useState(false);
    const [addStudentModal, setAddStudentModal] = useState(false);
    const [addSessionModal, setAddSessionModal] = useState(false);

    const updateSelectedStudent = (selectedStudent) => {
        console.log("Selected Student", selectedStudent)
        setSelectedStudent(selectedStudent);
    }

    const updateSelectedSession = (selectedSession) => {
        console.log("Selected Session", selectedSession)
        setSelectedSession(selectedSession);
    }
    const updateSelectedCourse = (clickedCourse) => {
        setSelectedCourse(clickedCourse);
        setSelectedStudent(null);
        setSelectedSession(null);
        fetchStudents(clickedCourse.id)
        fetchSessions(clickedCourse.id);
    }

    const toggleAddCourseModal = () => {
        setAddCourseModal(!addCourseModal);
    }

    const toggleAddStudentModal = () => {
        setAddStudentModal(!addStudentModal);
    }

    const toggleAddSessionModal = () => {
        setAddSessionModal(!addSessionModal);
    }

    // This function fetches the courses from firestore
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

    // This function fetches the students of a specific course from firestore
    const fetchStudents = async (courseID) => {
        try {
            const response = await getStudents(courseID);
            setStudents(response);
        } catch (error) {
            console.error('Error fetching students:', error);
        }
    };

    // This function fetches the sessions of a specific course from firestore
    const fetchSessions = async (courseId) => {
        try {
            const sessionData = await getSessions(courseId);
            setSessions(sessionData);
        } catch (error) {
            console.error('Error fetching sessions:', error);
        }
    };

    // Once this component is rendered this function will fire and call the fetchCourses method
    useEffect(() => {
        let data = [];
        fetchCourses()
    }, []);

    // These are the tabs of the navigation bar, and the tables these tabs show

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
                <AppSidebar selectedCourse={selectedCourse ? selectedCourse.courseName : ''} courses={courses}
                            toggleModal={toggleAddCourseModal} updateCourse={updateSelectedCourse}/>

                {/*Main Content Area*/}
                {!selectedStudent && !selectedSession &&
                    <div className='col-span-3'>
                        <CourseBanner course={selectedCourse}/>
                        <div className='px-12 py-4'>
                            <CourseNavigationBar selectedCourse={selectedCourse} data={tabs} toggleAddStudentModal={toggleAddStudentModal}
                                                 toggleAddSessionModal={toggleAddSessionModal}/>
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

                {/*Add Session Modal*/}
                {addSessionModal &&
                    <div className='h-full w-full top-0 left-0 right-0 bottom-0 fixed z-30'>
                        <div
                            className="bg-black opacity-80 h-full w-full top-0 left-0 right-0 bottom-0 fixed"></div>
                        <div className="absolute grid h-screen w-screen place-items-center">
                            <AddSessionModal course={selectedCourse}
                                             updateSessions={() => fetchSessions(selectedCourse.id)}
                                             toggleModal={toggleAddSessionModal}/>
                        </div>
                    </div>
                }

                {/*Student Profile*/}
                {selectedStudent &&
                    <div className='col-span-3'>
                        <CourseBanner course={selectedCourse} breadCrumb="Student"
                                      header={selectedStudent.firstName + ' ' + selectedStudent.lastName}
                                      updateCourses={updateSelectedCourse}/>
                        <StudentProfile student={selectedStudent}/>
                    </div>

                }

                {/*Session Profile*/}
                {selectedSession &&
                    <div className='col-span-3'>
                        <CourseBanner course={selectedCourse} breadCrumb="Sessions" header={selectedSession.date}
                                      updateCourse={updateSelectedCourse}/>
                        <SessionProfile session={selectedSession}/>
                    </div>
                }

            </div>
        </>
    )
}

export default App;
