import React, {useEffect, useState} from "react";
import {auth} from './firebase/firebase'
import {db, getCourses} from "./firebase/firestore"
import {useDispatch, useSelector} from "react-redux";
import {updateSelectedCourse} from "./store/slices/selectedCourseSlice";
import {useNavigate} from "react-router-dom";


function App() {

    const selectedCourse = useSelector((state) => state.selectedCourse.value)
    const dispatch = useDispatch()
    const navigate = useNavigate();

    // Students, Sessions and Courses collection will be stored in their respective variable
    const [courses, setCourses] = useState([]);

    // This function fetches the courses of the current logged-in user from firestore
    const fetchCourses = async () => {
        try {
            const response = await getCourses(auth.currentUser.uid);
            setCourses(response);
            if (selectedCourse === null) {
                dispatch(updateSelectedCourse(response.at(0)))
                navigate(`/course/${response[0].id}`)
            }
        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    };

    // Once this component is rendered this function will fire and call the fetchCourses method
    useEffect(() => {
        fetchCourses()
    }, []);


    return (
        <>

        </>
    )
}

export default App;
