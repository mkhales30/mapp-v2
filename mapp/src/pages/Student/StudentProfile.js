import React, {useEffect, useState} from 'react';
import QRCode from './QRCode';
import {faChevronDown} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {deleteStudent, getStudent} from '../../firebase/firestore';
import {useNavigate, useParams} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {updateSelectedStudent} from "../../store/slices/selectedStudentSlice";
import AppLayout from "../../layouts/AppLayout";
import CourseBanner from "../../components/Course/CourseBanner";

function Student() {
    // This will be used to check if the page is still loading
    const [isLoading, setIsLoading] = useState(true);

    // id of the student
    let {id} = useParams();
    const [student, setStudent] = useState(null);


    const course = useSelector((state) => state.selectedCourse.value)
    const navigate = useNavigate();


    //handleDeleteStudent -> this function fires once the remove from class button is pressed, it then deletes the student from the database
    const handleClickRemove = async () => {
        console.log("Remove Pressed")
        try {
            console.log("student id is," + student.id)
            // Access courseId
            await deleteStudent(course.id, id);
            // Redirect to the previous page
            navigate('/course/' + course.id )
        } catch (error) {
            console.error("Error deleting student:", error);
        }
    };

    // This useEffect function fetches the student data from the database
    useEffect(() => {
            const fetchStudent = async () => {
                try {
                    const response = await getStudent(course.id, id);
                    setStudent(response);
                    setIsLoading(false);
                } catch (error) {
                    console.error('Error fetching student:', error);
                }
            };
            fetchStudent();
        }
        , []);

    return (
        <AppLayout>
            {
                isLoading ? <p>Loading...</p> : (
                    <>
                        <CourseBanner header={student.firstName + ' ' + student.lastName}/>
                        <div className='mx-12 py-4'>
                            <div className='grid grid-cols-6 gap-2'>
                                <div className='mb-4 col-span-3'>
                                    <div className='text-gray-400 font-light text-sm'>
                                        {student.email}
                                    </div>
                                    <div className='text-gray-400 font-light text-sm'>
                                        {student.lastAttended ? 'Last attended:' : ''}
                                        <span className='font-light text-black underline'>{student.lastAttended}</span>
                                    </div>
                                </div>

                                <div className='col-span-3'>
                                    <div className='flex flex-row gap-2 place-content-end'>
                                        <button
                                            className='flex flex-row gap-2 rounded text-white text-sm px-4 py-2 bg-black'>
                                            <p>Enrolled</p>
                                            <a href="#">
                                                <FontAwesomeIcon icon={faChevronDown}/>
                                            </a>
                                        </button>

                                        <button onClick={handleClickRemove}
                                                className='hover:text-red-600 hover:border-red-600 text-gray-400 font-light text-xs py-2 px-4 border-gray-300-50 border-2 rounded'>
                                            Remove from class
                                        </button>
                                    </div>
                                </div>

                                <div className='bg-green-200 rounded-2xl col-span-3'>
                                    <div className='p-4'>
                                        <div className='text-5xl text-green-950'>
                                            {student.attendanceGrade ? student.attendanceGrade : '100'}%
                                        </div>
                                        <div>Attendance</div>
                                    </div>
                                    <div className='w-full bg-green-950 text-white rounded-b-2xl px-4 py-2'>
                                        View All
                                    </div>
                                </div>

                                <div className='bg-red-200 rounded-2xl col-span-3'>
                                    <div className='p-4'>
                                        <div className='text-5xl text-red-950'>
                                            {student.absences ? student.absences : 0}
                                        </div>
                                        <div>Absences</div>
                                    </div>
                                    <div className='w-full bg-red-950 text-white rounded-b-2xl px-4 py-2'>
                                        View All
                                    </div>
                                </div>
                            </div>

                            <div className='text-2xl font-medium mt-12'>Attendance Report</div>
                            {/* <StudentsTable data={data}> */}
                            {/* </StudentsTable> */}
                            <QRCode studentDocumentId={id} student={student}/>
                        </div>
                    </>

                )

            }
        </AppLayout>
    );
}

export default Student;