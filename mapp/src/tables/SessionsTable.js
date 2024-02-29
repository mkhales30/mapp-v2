import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import {customStyles} from "./customStyles";
import { getCourses, getSessions } from '../firebase/firestore';
import { auth } from '../firebase/firebase';
import EditSessionModal from '../modals/EditSessionModal';


function SessionsTable ({data, updateSelectedSession}){
    // State variables
    const [courses, setCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState(() => {
        const storedCourse = localStorage.getItem('selectedCourse');
        return storedCourse ? JSON.parse(storedCourse) : null;
    });
    const [sessions, setSessions] = useState([]);
    const [selectedSession, setSelectedSession] = useState(null);
    const [editSessionModal, setEditSessionModal] = useState(false);

    // Fetch courses from firestore
    const fetchCourses = async () => {
        try {
            const response = await getCourses(auth.currentUser.uid);
            setCourses(response);
            if (!selectedCourse && response.length > 0) {
                setSelectedCourse(response[0]);
                localStorage.setItem('selectedCourse', JSON.stringify(response[0]));
            }
        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    };

    // Fetch courses from firestore and set selected course
    useEffect(() => {
        const fetchData = async () => {
            try {
                const coursesData = await fetchCourses();
                if (!selectedCourse && coursesData.length > 0) {
                    setSelectedCourse(coursesData[0]);
                    localStorage.setItem('selectedCourse', JSON.stringify(coursesData[0]));
                }
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };

        fetchData();

    }, [selectedCourse]);

    // Function to update selected course
    const updateSelectedCourse = (course) => {
        setSelectedCourse(course);
        setSelectedSession(null);
        localStorage.setItem('selectedCourse', JSON.stringify(course));
    }

    // Fetch sessions when selected course changes
    useEffect(() => {
        const fetchCourseData = async () => {
            try {
                if (selectedCourse) {

                    const sessionsData = await getSessions(selectedCourse.id); // Fetch sessions for selected course
                    setSessions(sessionsData);
                }
            } catch (error) {
                console.error('Error fetching sessions:', error);
            }
        };

        fetchCourseData();

    }, [selectedCourse]);

    const columns = [
        {
            name: 'Date',
            selector: (row) => row.sessionName,
            sortable: true,
        },
        {
            name: 'Attendance',
            selector: (row) => 'N/A',
            sortable: true,
        },
        {
            name: 'Notes',
            selector: (row) => 'N/A',
            sortable: true,
        },
        {
            name: 'Actions',
            cell: (row) => (
                <button onClick={() => handleEditClick(row)} className="bg-blue-500 hover:bg-blue-700 text-white font-normal py-2 px-4 rounded">Edit</button>
            ),
            ignoreRowClick: true,
            button: "true",
            style: { paddingRight: '4px' }
        },
    ];

    // Handle edit click event
    const handleEditClick = (session) => {
        setSelectedSession(session);
        setEditSessionModal(true);
    };

    // Handle modal close event
    const handleModalClose = () => {
        setEditSessionModal(false);
        setSelectedSession(null);
    };

    const handleRowClick = (row) => {
        updateSelectedSession(row)
    };

    return (
        <div className='container mt-5 border rounded border-gray-200'>
            <DataTable
                columns={columns}
                data={data}
                pagination
                customStyles={customStyles}
                onRowClicked={handleRowClick}
            />
            {editSessionModal && selectedSession && (
                <EditSessionModal
                    session={selectedSession}
                    toggleModal={handleModalClose}
                    updateSelectedCourse={updateSelectedCourse}
                    courses={courses}
                />
            )}
        </div>
    );
};

export default SessionsTable;
