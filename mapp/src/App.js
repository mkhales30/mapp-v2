import React, {useEffect, useState, useContext, useMemo} from "react";
import {db, getCourses, getStudents} from "./firebase/firestore"
import AddCourseModal from "./AddCourseModal";
import CourseBanner from "./CourseBanner";
import {CourseContext} from "./CourseContext";
import DashboardSidebar from "./DashboardSidebar";
import {CoursesContext} from "./CoursesContext";
import StudentTable from "./StudentTable";


function App() {
    const [loading, setLoading] = useState(true);
    const [courses, setCourses] = useState([]);
    const [activeCourse, setActiveCourse] = useState({});
    const coursesContext = useContext(CoursesContext)

    // Code that toggles when the Add Student Modal appears and closes
    const [modal, setModal] = useState(false);
    const toggleModal = () => {
        setModal(!modal);
    }
    const updateCourse = (clickedCourse) => {
        setActiveCourse(clickedCourse);
    }

    // Once the component is rendered...fetch the courses for the user
    useEffect(() => {

        console.log("Should see this message once")
        let data = [];

        async function fetchCourses() {
            data = await getCourses("test2")
            setCourses(data)
            setActiveCourse({...data.at(0)})
        }

        fetchCourses()
        setLoading(false);

    }, []);

    console.log(courses);
    console.log(coursesContext)

    const data = [
        {
            name: 'Holly Boaz',
            status: <p className='bg-green-100 px-4 py-2 rounded-2xl text-green-950'>Enrolled</p>,
            lastAttendedSession: 'November 25, 2023',
            attendanceGrade: '98%',
        }

    ]


    return (
            <CoursesContext.Provider value={courses}>
                <CourseContext.Provider value={activeCourse}>
                    <div className="grid grid-cols-4 h-screen">
                        <DashboardSidebar toggleModal={toggleModal} updateCourse={updateCourse}/>
                        {/*Add Student Modal*/}
                        {modal &&
                            <div className='h-full w-full top-0 left-0 right-0 bottom-0 fixed'>
                                <div
                                    className="bg-black opacity-80 h-full w-full top-0 left-0 right-0 bottom-0 fixed"></div>
                                <div className="absolute grid h-screen w-screen place-items-center">
                                    <AddCourseModal toggleModal={toggleModal}/>
                                </div>
                            </div>
                        }

                        {/*Main Content Area*/}
                        <div className='col-span-3'>
                            <CourseBanner/>
                            <div className='p-4'>
                                <StudentTable data={data}/>
                            </div>
                        </div>
                    </div>
                </CourseContext.Provider>
            </CoursesContext.Provider>
)
}

export default App;
