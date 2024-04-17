import React, { useEffect, useState } from "react";
import { auth } from './firebase/firebase'
import { db, getCourses, getSessions, getStudents } from "./firebase/firestore"
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
import SettingsProfile from "./pages/Settings/SettingsProfile";
import ProfilePictureUploadModal from "./modals/ProfilePictureUploadModal";


function App() {

    // Students, Sessions and Courses collection will be stored in their respective variable
    const [courses, setCourses] = useState([]);
    const [students, setStudents] = useState([]);
    const [sessions, setSessions] = useState([]);

    // These variables will hold the active course, student, or session if there is one
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [selectedSession, setSelectedSession] = useState(null);
    const [profilePictureURL, setProfilePictureURL] = useState(null);

    // These variables are used to hide and show the various modals of the App
    const [addCourseModal, setAddCourseModal] = useState(false);
    const [addStudentModal, setAddStudentModal] = useState(false);
    const [addSessionModal, setAddSessionModal] = useState(false);

    const [refreshStudents, setRefreshStudents] = useState(false);
    const [profilePictureUploadModal, setProfilePictureUploadModal] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleUpload = (downloadURL) => {
        setProfilePictureURL(downloadURL);
      };
    // Function to toggle the visibility of the profile picture upload modal
    const toggleProfilePictureUploadModal = () => {
        setProfilePictureUploadModal(!profilePictureUploadModal);
    };

    const toggleRefreshStudents = () => {
        setRefreshStudents((prevState) => !prevState);
    };

    // Variables to toggle the SettingsProfile
    const [showSettingsProfile, setShowSettingsProfile] = useState(false);

    // State variable to track the current mode
    const [isDarkMode, setIsDarkMode] = useState(false);

    // Toggle function for dark mode
    const toggleDarkMode = () => {
        setIsDarkMode(prevMode => !prevMode);
    };

    // Load the user's preferred mode state on component mount
    useEffect(() => {
        const savedMode = localStorage.getItem('isDarkMode');
        setIsDarkMode(savedMode === 'true');
    }, [setIsDarkMode]);

    // Effect to save mode preference whenever it changes
    useEffect(() => {
        // Save mode preference to localStorage
        localStorage.setItem('isDarkMode', JSON.stringify(isDarkMode));
    }, [isDarkMode]);

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
        setSelectedCourse(selectedCourse);
        // We reset the active student and active session so the Session Profile and Student profile won't show
        setSelectedStudent(null);
        setSelectedSession(null);
        // Check if selectedCourse is not null before fetching students and sessions
        if (selectedCourse) {
            // Get the students and sessions for the selected course
            fetchStudents(selectedCourse.id)
            fetchSessions(selectedCourse.id);
        }
        setShowSettingsProfile(false);
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
            setStudents(response.map(student => ({ ...student }))); // No longer necessary!!
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
        fetchCourses();
    }, [refreshStudents]);

    // Apply styles directly based on the current mode
    const appStyles = {
        backgroundColor: isDarkMode ? '#333' : '#fff',
        color: isDarkMode ? '#fff' : '#333',
    };

    // These are the tabs of the navigation bar, and the tables these tabs show
    const tabs = [{
        label: "Students",
        value: "Students",
        table: <StudentsTable updateSelectedStudent={updateSelectedStudent} data={students} isDarkMode={isDarkMode} toggleRefreshStudents={toggleRefreshStudents} />,
    }, {
        label: "Sessions",
        value: "Sessions",
        table: <SessionsTable updateSelectedSession={updateSelectedSession} data={sessions} isDarkMode={isDarkMode} />,
    },];



    return (
        <>
            <div className="grid grid-cols-4 h-screen">
                {/* Dashboard Sidebar */}
                <AppSidebar
                    isDarkMode={isDarkMode}
                    setIsDarkMode={setIsDarkMode}
                    selectedCourse={selectedCourse ? selectedCourse : ''}
                    courses={courses}
                    toggleModal={toggleAddCourseModal}
                    updateCourse={updateSelectedCourse}
                    showSettings={setShowSettingsProfile}
                    toggleProfilePictureUploadModal={toggleProfilePictureUploadModal} // Pass the toggle function to the sidebar
                    profilePictureURL={profilePictureURL}
                />

                {/* Main Content Area */}
                <div className={`col-span-3 ${isDarkMode ? 'dark' : ''}`} style={appStyles}>
                    {/* Shows SettingsProfile if showSettingsProfile is true */}
                    {showSettingsProfile && <SettingsProfile isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} toggleDarkMode={toggleDarkMode} setSelectedCourse={setSelectedCourse} setSelectedStudent={setSelectedStudent} />}

                    {/* Main Content Area -> Shows when there isn't a selectedStudent or selectedSession or showSettingsProfile */}
                    {!selectedStudent && !selectedSession && !showSettingsProfile && (
                        <div>
                            <CourseBanner updateCourses={updateSelectedCourse} course={selectedCourse} />
                            <div className={`px-12 py-4 ${isDarkMode ? 'dark' : ''}`} style={appStyles}>
                                <CourseNavigationBar
                                    selectedCourse={selectedCourse}
                                    data={tabs}
                                    toggleAddStudentModal={toggleAddStudentModal}
                                    toggleAddSessionModal={toggleAddSessionModal}
                                    isDarkMode={isDarkMode}
                                />
                            </div>
                        </div>
                    )}

                    {/* Add Course Modal -> opens when the add course button is clicked */}
                    {addCourseModal && <AddCourseModal updateCourses={fetchCourses} toggleModal={toggleAddCourseModal} isDarkMode={isDarkMode} />}

                    {/* Add Student Modal -> opens when the add student button is clicked */}
                    {addStudentModal && (
                        <AddStudentModal
                            course={selectedCourse}
                            updateStudents={() => fetchStudents(selectedCourse.id)}
                            toggleModal={toggleAddStudentModal}
                            isDarkMode={isDarkMode}
                        />
                    )}

                    {/* Add Session Modal -> opens when the add session button is clicked */}
                    {addSessionModal && (
                        <AddSessionModal
                            course={selectedCourse}
                            updateSessions={() => fetchSessions(selectedCourse.id)}
                            toggleModal={toggleAddSessionModal}
                            isDarkMode={isDarkMode}
                        />
                    )}
                     {/* Profile Picture Upload Modal */}
                     {profilePictureUploadModal && (
                        <ProfilePictureUploadModal
                            isOpen={profilePictureUploadModal}
                            onClose={toggleProfilePictureUploadModal}
                            onUpload={handleUpload} // Define a function to handle profile picture upload
                        />
                    )}

                    {/* Student Profile -> opens when there is a selectedStudent */}
                    {selectedStudent && (
                        <div className='col-span-3'>
                            <CourseBanner
                                course={selectedCourse}
                                breadCrumb="Student"
                                header={`${selectedStudent.firstName} ${selectedStudent.lastName}`}
                                updateCourses={updateSelectedCourse}
                            />
                            <StudentProfile student={selectedStudent} courseId={selectedCourse.id} isDarkMode={isDarkMode} />
                        </div>
                    )}

                    {/* Session Profile -> opens when there is a selectedSession */}
                    {selectedSession && (
                        <div className='col-span-3'>
                            <CourseBanner
                                course={selectedCourse}
                                breadCrumb="Sessions"
                                header={selectedSession.date}
                                updateCourses={updateSelectedCourse}
                            />
                            <SessionProfile course={selectedCourse} session={selectedSession} isDarkMode={isDarkMode} />
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default App;
