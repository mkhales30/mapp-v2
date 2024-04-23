import React, {useEffect, useState} from 'react';
import QRCode from './QRCode';
import {getStudentAttendanceData, removeStudentFromCourse, updateEnrollmentStatus} from '../../firebase/firestore';
import {useNavigate} from 'react-router-dom';
import StudentsAttendanceTable from "../../tables/StudentsAttendanceTable";

function Student({student, courseId, toggleRefreshStudents, isDarkMode}) {
    // Access student document ID directly
    const studentDocumentId = student.id;
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [attendanceData, setAttendanceData] = useState([])

    // Fetch attendance data  for student from firestore
    useEffect(() => {
        const fetchAttendanceData = async () => {
            try {
                const response = await getStudentAttendanceData(student.id, courseId);
                setAttendanceData(response);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching student attendance data:', error);
            }
        }

        fetchAttendanceData();
    }, []);


    //handleDeleteStudent -> this function fires once the remove from class button is pressed, it then deletes the student from the database
    const handleClickRemove = async () => {
        console.log("Remove Pressed")
        try {
            await removeStudentFromCourse(student.id, courseId);
            toggleRefreshStudents();
            navigate('/');
        } catch (error) {
            console.error("Error removing student from course:", error);
        }
    };


    const [enrollmentStatus, setEnrollmentStatus] = useState('Enrolled');
    const handleEnrollmentClick = async () => {
        try {
            let newStatus;
            switch (enrollmentStatus) {
                case 'Enrolled':
                    newStatus = 'Dropped';
                    break;
                case 'Dropped':
                    newStatus = 'Withdrawn';
                    break;
                case 'Withdrawn':
                    newStatus = 'Enrolled';
                    break;
                default:
                    newStatus = 'Enrolled';
            }

            // Update the enrollment status in Firestore
            await updateEnrollmentStatus(courseId, student.id, newStatus);

            // Update the local state
            setEnrollmentStatus(newStatus);
        } catch (error) {
            console.error("Error updating enrollment status:", error);
        }
    };

    return (
        <div>
            <div className="grid grid-cols-6 gap-4 p-2">
                <div className="col-span-4">
                    <div className='ml-12'>
                        <div className='flex justify-between items-center'>
                            <div className='mb-4 col-span-3'>
                                <div className={`font-light mt-4 ${isDarkMode ? 'text-gray-400' : 'text-black'}`}>
                                    <span className="font-bold">{student.email}</span>
                                </div>
                                <div className='text-gray-400 font-light text-sm'>
                                    {student.lastAttended ? 'Last attended:' : ''}
                                    <span className='font-light text-black underline'>{student.lastAttended}</span>
                                </div>
                            </div>

                            <div className='col-span-3'>
                                <div className='flex flex-row gap-2 place-content-end'>

                                    <button onClick={handleEnrollmentClick}
                                            className={`flex items-center gap-2 rounded text-white text-sm py-2 px-4 ${enrollmentStatus.toLowerCase()} ${enrollmentStatus.toLowerCase() === 'enrolled' ? 'bg-green-700' : enrollmentStatus.toLowerCase() === 'dropped' ? 'bg-yellow-600' : 'bg-red-700'}`}>
                                        <p>{enrollmentStatus}</p>
                                    </button>

                                    <button onClick={handleClickRemove}
                                            className='flex  gap-2 items-center rounded hover:text-red-600 hover:border-red-600 text-gray-400 font-light text-sm py-2 px-4 border-gray-300-50 border-2'>
                                        Remove from class
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className='text-2xl font-medium mt-12'>Attendance Report</div>
                        {!loading && <StudentsAttendanceTable data={attendanceData} isDarkMode={isDarkMode}/>}
                    </div>
                </div>
                <div className="p-4">
                    <QRCode studentDocumentId={studentDocumentId} student={student}/>
                </div>


            </div>
        </div>
    );
}

export default Student;