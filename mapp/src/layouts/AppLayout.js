import React, {useEffect, useState} from 'react';
import AppSidebar from "../components/App/AppSidebar";
import {getCourses} from "../firebase/firestore";
import {auth} from "../firebase/firebase";
import {updateSelectedCourse} from "../store/slices/selectedCourseSlice";
import {useDispatch, useSelector} from "react-redux";
import AddCourseModal from "../modals/AddCourseModal";
import CourseBanner from "../components/Course/CourseBanner";

function AppLayout(props) {
    const [courses, setCourses] = useState([]);

    const selectedCourse = useSelector((state) => state.selectedCourse.value)
    const dispatch = useDispatch()

    const [addCourseModal, setAddCourseModal] = useState(false);

    const toggleAddCourseModal = () => {
        setAddCourseModal(!addCourseModal);
    }



    const fetchCourses = async () => {
        try {
            const response = await getCourses(auth.currentUser.uid);
            setCourses(response);
            if (selectedCourse === null) {
                dispatch(updateSelectedCourse(response[0]))
            }
        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    };


    const updateCourse = (selectedCourse) => {
        dispatch(updateSelectedCourse(selectedCourse))
    }

    // Once this component is rendered this function will fire and call the fetchCourses method
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