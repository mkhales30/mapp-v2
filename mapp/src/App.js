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
import {useDispatch, useSelector} from "react-redux";
import {setSelectedCourse} from "./store/slices/selectedCourseSlice";



function App() {

    const selectedCourse = useSelector((state) => state.selectedCourse.value)
    const dispatch = useDispatch()

    // Students, Sessions and Courses collection will be stored in their respective variable
    const [courses, setCourses] = useState([]);
    const [students, setStudents] = useState([]);
    const [sessions, setSessions] = useState([]);

    // These variables will hold the active course, student, or session if there is one
    // const [selectedCourse, setSelectedCourse] = useState(null);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [selectedSession, setSelectedSession] = useState(null);

    // These variables are used to hide and show the various modals of the App
    const [addCourseModal, setAddCourseModal] = useState(false);
    const [addStudentModal, setAddStudentModal] = useState(false);
    const [addSessionModal, setAddSessionModal] = useState(false);

    // If a student is selected, this function will update the active student ( Note: The Student Profile appears when there is an active Student) 
    const updateSelectedStudent = (selectedStudent) => {
        console.log("Selected Student", selectedStudent)
        setSelectedStudent(selectedStudent);
    }

    // If a session is selected, this function will update the active session ( Note: The Session Profile appears when there is an active Session)
    const updateSelectedSession = (selectedSession) => {
        console.log("Selected Session", selectedSession)
        setSelectedSession(selectedSession);
    }

    // If a course is selected, this function will update the active course
    const updateSelectedCourse = (selectedCourse) => {
        dispatch(setSelectedCourse(selectedCourse))
        // We reset the active student and active session so the Session Profile and Student profile won't show
        setSelectedStudent(null);
        setSelectedSession(null);
        // Get the students and sessions for the selected course
        fetchStudents(selectedCourse.id)
        fetchSessions(selectedCourse.id);
    }

    // These toggle modal functions will set the modal to open when their respective open buttons are clicked
    const toggleAddCourseModal = () => {
        setAddCourseModal(!addCourseModal);
    }

    const toggleAddStudentModal = () => {
        setAddStudentModal(!addStudentModal);
    }

    const toggleAddSessionModal = () => {
        setAddSessionModal(!addSessionModal);
    }

    // This function fetches the courses of the current logged-in user from firestore
    const fetchCourses = async () => {
        try {
            const response = await getCourses(auth.currentUser.uid);
            setCourses(response);
            if (selectedCourse === null) {
                dispatch(setSelectedCourse(response.at(0)))
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
            setStudents(response.map(student => ({...student}))); // No longer necessary!!
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

    const tabs = [{
        label: "Students",
        value: "Students",
        table: <StudentsTable updateSelectedStudent={updateSelectedStudent} data={students}/>,
    }, {
        label: "Sessions",
        value: "Sessions",
        table: <SessionsTable updateSelectedSession={updateSelectedSession} data={sessions}/>,
    },];



    return (<>
        <div className="grid grid-cols-4 h-screen">

            {/*Dashboard Sidebar*/}
            <AppSidebar  courses={courses}
                        toggleModal={toggleAddCourseModal} updateCourse={updateSelectedCourse}/>

            {/*Main Content Area -> Shows when there isn't a selectedStudent or selectedSession*/}
            {!selectedStudent && !selectedSession &&
                <div className='col-span-3'>
                    <CourseBanner updateCourses={updateSelectedCourse} course={selectedCourse}/>
                    <div className='px-12 py-4'>
                        <CourseNavigationBar selectedCourse={selectedCourse}
                                             data={tabs}
                                             toggleAddStudentModal={toggleAddStudentModal}
                                             toggleAddSessionModal={toggleAddSessionModal}/>
                    </div>
                </div>}

            {/*Add Course Modal -> opens when the add course button is clicked*/}
            {addCourseModal &&
                <AddCourseModal updateCourses={fetchCourses} toggleModal={toggleAddCourseModal}/>
            }

            {/*Add Student Modal -> opens when the add student button is clicked */}
            {addStudentModal &&
                <AddStudentModal course={selectedCourse}
                                 updateStudents={() => fetchStudents(selectedCourse.id)}
                                 toggleModal={toggleAddStudentModal}/>
            }

            {/*Add Session Modal -> opens when the add session button is clicked */}
            {addSessionModal &&
                <AddSessionModal course={selectedCourse}
                                 updateSessions={() => fetchSessions(selectedCourse.id)}
                                 toggleModal={toggleAddSessionModal}/>
            }

            {/*Student Profile -> opens when there is a selectedStudent */}
            {selectedStudent && <div className='col-span-3'>
                <CourseBanner course={selectedCourse}
                              breadCrumb="Student"
                              header={selectedStudent.firstName + ' ' + selectedStudent.lastName}
                              updateCourses={updateSelectedCourse}/>
                <StudentProfile student={selectedStudent} courseId={selectedCourse.id}/>
            </div>}

            {/*Session Profile -> opens when there is a selectedSession*/}
            {selectedSession && <div className='col-span-3'>
                <CourseBanner course={selectedCourse}
                              breadCrumb="Sessions"
                              header={selectedSession.date}
                              updateCourses={updateSelectedCourse}/>
                <SessionProfile session={selectedSession}/>
            </div>}

        </div>
    </>)
}

export default App;
