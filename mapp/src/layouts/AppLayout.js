import React, {useEffect, useState} from 'react';
import AppSidebar from "../components/App/AppSidebar";
import {getCourses} from "../firebase/firestore";
import {auth} from "../firebase/firebase";
import {setSelectedCourse} from "../store/slices/selectedCourseSlice";
import {useDispatch, useSelector} from "react-redux";
import AddCourseModal from "../modals/AddCourseModal";

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
                dispatch(setSelectedCourse(response.at(0)))
            }
        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    };

    const updateSelectedCourse = (selectedCourse) => {
        dispatch(setSelectedCourse(selectedCourse))
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
                            updateCourse={updateSelectedCourse}
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