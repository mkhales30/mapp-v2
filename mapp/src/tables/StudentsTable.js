import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { customStyles } from "./customStyles";
import EditStudentModal from ".././modals/EditStudentModal";
import { getCourses, getStudents, getSessions } from '../firebase/firestore'; 
import { auth } from '../firebase/firebase';

function StudentsTable({ data, updateSelectedStudent }) {
    // State variables
    const [courses, setCourses] = useState([]);
    const [students, setStudents] = useState([]);
    const [sessions, setSessions] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [selectedSession, setSelectedSession] = useState(null);
    const [editStudentModal, setEditStudentModal] = useState(false);

    // Fetch courses from firestore
    const fetchCourses = async () => {
        try {
            const response = await getCourses(auth.currentUser.uid);
            setCourses(response);
            if (selectedCourse === null && response.length > 0) {
                setSelectedCourse(response[0]);
                fetchStudents(response[0].id);
                fetchSessions(response[0].id);
            }
        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    };

    // Fetching courses, students, and sessions
    useEffect(() => {
        const fetchData = async () => {
            await fetchCourses();
            if (selectedCourse) {
                await fetchStudents(selectedCourse.id);
                await fetchSessions(selectedCourse.id);
            }
        };
    
        fetchData();
    
    }, [selectedCourse]);  

    // Fetch students of a specific course from firestore
    const fetchStudents = async (courseID) => {
        try {
            const response = await getStudents(courseID);
            setStudents(response);
        } catch (error) {
            console.error('Error fetching students:', error);
        }
    };

    // Fetch sessions of a specific course from firestore
    const fetchSessions = async (courseId) => {
        try {
            const sessionData = await getSessions(courseId);
            setSessions(sessionData);
        } catch (error) {
            console.error('Error fetching sessions:', error);
        }
    };

    // Function to update selected session
    const updateSelectedSession = (selectedSession) => {
        setSelectedSession(selectedSession);
    }

    // Function to update selected course
    const updateSelectedCourse = async (selectedCourse) => {
        setSelectedCourse(selectedCourse);
        setSelectedStudent(null);
        setSelectedSession(null);
        try {
            await fetchStudents(selectedCourse.id);
            await fetchSessions(selectedCourse.id);
        } catch (error) {
            console.error('Error fetching students or sessions:', error);
        }
    }

    // Handle edit click event
    const handleEditClick = (student) => {
        setSelectedStudent(student);
        setEditStudentModal(true);
    };

    // Columns configuration for DataTable
    const columns = [
        {
            name: 'First Name',
            selector: (row) => row.firstName,
            sortable: true,
        },
        {
            name: 'Last Name',
            selector: (row) => row.lastName,
            sortable: true,
        },
        {
            name: 'Enrollment Status',
            selector: (row) => row.enrollmentStatus,
            sortable: true,
        },
        {
            name: 'Last Attended Session',
            selector: (row) => 'N/A',
            sortable: true,
        },
        {
            name: 'Attendance Grade',
            selector: (row) => row.attendanceGrade,
            sortable: true,
        },
        {
            name: 'Actions',
            cell: (row) => (
                <button onClick={() => handleEditClick(row)} className="bg-blue-500 hover:bg-blue-700 text-white font-normal py-2 px-4 rounded">Edit</button>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
            style: { paddingRight: '4px' }
        },
    ];

    // Handle row click event
    const handleRowClick = (row) => {
        updateSelectedStudent(row)
    };

    return (
        <div className='container mt-5 border rounded border-gray-200'>
            <DataTable
                columns={columns}
                data={data}
                onRowClicked={handleRowClick}
                pagination
                customStyles={customStyles}
            />
            {selectedStudent && (
                <EditStudentModal
                    course={selectedCourse}
                    student={selectedStudent}
                    toggleModal={() => setEditStudentModal(!editStudentModal)}
                    updateStudents={() => fetchStudents(selectedCourse.id)}
                    updateSelectedSession={updateSelectedSession} 
                    updateSelectedCourse={updateSelectedCourse} 
                />
            )}
        </div>
    );
};

export default StudentsTable;