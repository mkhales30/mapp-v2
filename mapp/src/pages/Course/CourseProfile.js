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
    const [isLoading, setIsLoading] = useState(true);

    let {id} = useParams();
    const [course, setCourse] = useState(null);

    // These variables are used to hide and show the various modals of the App
    const [addStudentModal, setAddStudentModal] = useState(false);
    const [addSessionModal, setAddSessionModal] = useState(false);

    // Toggles for the modals to show/hide them
    const toggleAddStudentModal = () => {setAddStudentModal(!addStudentModal);}
    const toggleAddSessionModal = () => {setAddSessionModal(!addSessionModal);}


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
                isLoading ? <p>Loading...</p> :
                    (
                        <div>
                            <CourseBanner course={course}/>
                            <CourseNavigationBar
                                toggleAddStudentModal={toggleAddStudentModal}
                                toggleAddSessionModal={toggleAddSessionModal}
                            />
                        </div>
                    )
            }

            {/*Add Student Modal -> opens when the add student button is clicked */}
            {addStudentModal && <AddStudentModal toggleModal={toggleAddStudentModal}/>}

            {/*Add Session Modal -> opens when the add session button is clicked */}
            {addSessionModal && <AddSessionModal toggleModal={toggleAddSessionModal}/>
            }

        </AppLayout>
    );
}

export default CourseProfile;