import React, {useEffect, useState} from 'react';
import AppLayout from "../../layouts/AppLayout";
import {getCourse} from "../../firebase/firestore";
import CourseBanner from "../../components/Course/CourseBanner";
import {useParams} from "react-router-dom";
import CourseNavigationBar from "../../components/Course/CourseNavigationBar";

function CourseProfile() {
    let { id } = useParams();

    const [course, setCourse] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

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
                        {/*<CourseNavigationBar/>*/}
                    </div>
                )
            }
        </AppLayout>
    );
}

export default CourseProfile;