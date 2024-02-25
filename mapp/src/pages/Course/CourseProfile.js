import React, {useEffect, useState} from 'react';
import AppLayout from "../../layouts/AppLayout";
import {getCourse, getSessions, getStudents} from "../../firebase/firestore";
import CourseBanner from "../../components/Course/CourseBanner";
import {useParams} from "react-router-dom";
import CourseNavigationBar from "../../components/Course/CourseNavigationBar";
import {useSelector} from "react-redux";
import AddStudentModal from "../../modals/AddStudentModal";
import AddSessionModal from "../../modals/AddSessionModal";
import StudentsTable from "../../tables/StudentsTable";
import SessionsTable from "../../tables/SessionsTable";

function CourseProfile() {
    let {id} = useParams();
    const [isLoading, setIsLoading] = useState(true);

    const [course, setCourse] = useState(null);
    const [sessions, setSessions] = useState([]);

    const [addStudentModal, setAddStudentModal] = useState(false);
    const [addSessionModal, setAddSessionModal] = useState(false);

    const toggleAddStudentModal = () => {
        setAddStudentModal(!addStudentModal);
    }

    const toggleAddSessionModal = () => {
        setAddSessionModal(!addSessionModal);
    }

    // These are the tabs of the navigation bar, and the tables these tabs show
    const tabs = [{
        label: "Students",
        value: "Students",
        table: <StudentsTable/>,
    }, {
        label: "Sessions",
        value: "Sessions",
        table: <SessionsTable data={sessions}/>,
    },];

    // This function fetches the sessions of a specific course from firestore
    const fetchSessions = async (courseId) => {
        try {
            const sessionData = await getSessions(courseId);
            setSessions(sessionData);
        } catch (error) {
            console.error('Error fetching sessions:', error);
        }
    };

    useEffect(() => {
            const fetchCourse = async () => {
                try {
                    const response = await getCourse(id);
                    setCourse(response);
                    setIsLoading(false);
                } catch (error) {
                    console.error('Error fetching course:', error);
                }
            };
            fetchCourse();
        }
        , []);


    return (
        <AppLayout>
            {
                isLoading ? <p>Loading...</p> : (
                    <div>
                        <CourseBanner course={course}/>
                        <CourseNavigationBar
                            tabs={tabs}
                            selectedCourse={course}
                            toggleAddStudentModal={toggleAddStudentModal}
                            toggleAddSessionModal={toggleAddSessionModal}
                        />
                    </div>
                )
            }

            {/*Add Student Modal -> opens when the add student button is clicked */}
            {addStudentModal &&
                <AddStudentModal course={course}
                                 toggleModal={toggleAddStudentModal}
                />
            }

            {/*Add Session Modal -> opens when the add session button is clicked */}
            {addSessionModal &&
                <AddSessionModal course={course}
                                 updateSessions={() => fetchSessions(course.id)}
                                 toggleModal={toggleAddSessionModal}
                />
            }

        </AppLayout>
    );
}

export default CourseProfile;