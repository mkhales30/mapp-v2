import React, {useEffect, useState} from 'react';
import AppSidebar from "../components/App/AppSidebar";
import {getCourses} from "../firebase/firestore";
import {auth} from "../firebase/firebase";
import {updateSelectedCourse} from "../store/slices/selectedCourseSlice";
import {useDispatch, useSelector} from "react-redux";
import AddCourseModal from "../modals/AddCourseModal";
import CourseBanner from "../components/Course/CourseBanner";

function AppLayout(props) {
    // State to store the courses
    const [courses, setCourses] = useState([]);
    // Get the currently selected course from the redux store
    const selectedCourse = useSelector((state) => state.selectedCourse.value)
   // Get the dispatch function from the redux store to dispatch actions
    const dispatch = useDispatch()

    // set the state of the add course modal to false because it should not be open by default
    const [addCourseModal, setAddCourseModal] = useState(false);

    // Function to toggle the add course modal
    const toggleAddCourseModal = () => {
        setAddCourseModal(!addCourseModal);
    }

    // Function to fetch the courses from the firestore database
    const fetchCourses = async () => {
        try {
            const response = await getCourses(auth.currentUser.uid);
            setCourses(response);
            // If there is no selected course, set the first course in the list as the currently eslected course
            if (selectedCourse === null) {
                dispatch(updateSelectedCourse(response[0]))
            }
        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    };

    // Update the currently selected course in the redux store
    const updateCourse = (selectedCourse) => {
        dispatch(updateSelectedCourse(selectedCourse))
    }

    // Once this component is rendered = it will fetch the courses from the database
    useEffect(() => {
        fetchCourses()

    }, []);

    return (
        <>
            <div className="grid grid-cols-4 h-screen">
                <AppSidebar courses={courses}
                            toggleModal={toggleAddCourseModal}
                            updateCourse={updateCourse}
                />

                <div className='col-span-3'>
                    {props.children}
                </div>

                {/*Add Course Modal -> opens when the add course button is clicked*/}
                {addCourseModal &&
                    <AddCourseModal updateCourses={fetchCourses} toggleModal={toggleAddCourseModal}/>
                }

            </div>
        </>

    );
}

export default AppLayout;