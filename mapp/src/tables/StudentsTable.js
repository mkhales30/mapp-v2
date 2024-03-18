import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { customStyles } from "./customStyles";
import * as XLSX from 'xlsx';
import { getCourses, getStudents,toggleRefreshStudents } from '../firebase/firestore';
import { auth } from '../firebase/firebase';
import EditStudentModal from '../modals/EditStudentModal';


function StudentsTable({ data, updateSelectedStudent, toggleRefreshStudents, isDarkMode }) {
    // State variables
    const [courses, setCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState(() => {
        const storedCourse = localStorage.getItem('selectedCourse');
        return storedCourse ? JSON.parse(storedCourse) : null;
    });
    const [students, setStudents] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [editStudentModal, setEditStudentModal] = useState(false);

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
        const fetchStudents = async () => {
          try {
            if (selectedCourse) {
              const studentsData = await getStudents(selectedCourse.id);
              setStudents(studentsData);
            }
          } catch (error) {
            console.error('Error fetching students:', error);
          }
        };
      
        fetchStudents();
      }, [selectedCourse]);

    // Function to update selected course
    const updateSelectedCourse = (course) => {
        setSelectedCourse(course);
        setSelectedStudent(null);
        localStorage.setItem('selectedCourse', JSON.stringify(course));
    }

    // Fetch students when selected course changes
    useEffect(() => {
        const fetchCourseData = async () => {
            try {
                if (selectedCourse) {
                    const studentsData = await getStudents(selectedCourse.id); // Fetch students for selected course
                    setStudents(studentsData);
                }
            } catch (error) {
                console.error('Error fetching students:', error);
            }
        };

        fetchCourseData();

    }, [selectedCourse]);

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
            button: "true",
            style: { paddingRight: '4px' }
        },
    ];

    // Function to export all data to Excel
    const handleExportAllData = () => {

        console.log("hello");
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(data);
        XLSX.utils.book_append_sheet(wb, ws, 'Students_Data');
        XLSX.writeFile(wb, 'students_data.xlsx');
    };


    const handleRowClick = (row) => {
        updateSelectedStudent(row)
    };

    // Handle edit click event
    const handleEditClick = (student) => {
        setSelectedStudent(student);
        setEditStudentModal(true);
    };

    // Handle modal close event
    const handleModalClose = () => {
        setEditStudentModal(false);
        setSelectedStudent(null);
    };

    // Conditional row styles to change cursor to pointer when hovering over rows
    const conditionalRowStyles = [
        {
            when: (row) => true,
            style: {
                cursor: 'pointer',
            },
        },
    ];

    return (
        <div className={`container mt-5 border rounded border-gray-200`}
            style={{
                backgroundColor: isDarkMode ? '#333' : '#fff',
                color: isDarkMode ? '#fff' : '#333',
            }}>
            <DataTable
                columns={columns}
                data={data}
                onRowClicked={handleRowClick}
                pagination
                customStyles={{
                    headRow: {
                        style: {
                            backgroundColor: isDarkMode ? '#333' : '#fff',
                            color: isDarkMode ? '#fff' : '#333',
                            borderBottomColor: isDarkMode ? '#fff' : '',
                        },
                    },
                    rows: {
                        style: {
                            color: isDarkMode ? '#fff' : '#333',
                            background: isDarkMode ? '#333' : '#fff',
                            border: `1px solid ${isDarkMode ? '#fff' : '#F5F5F5'}`,
                        },
                    },
                    borderBottomColor: {
                        style: {
                            color: isDarkMode ? '#fff' : '#333',
                            background: isDarkMode ? '#333' : '#fff',
                        },
                    },
                    pagination: {
                        style: {
                            backgroundColor: isDarkMode ? '#333' : '',
                            color: isDarkMode ? '#fff' : '',
                            border: `1px ${isDarkMode ? '#fff' : '#F5F5F5'}`,
                        },
                    },
                    pageButtonStyles: {
                        base: {
                            color: isDarkMode ? '#fff' : '#333',
                        },
                    },
                }}
                conditionalRowStyles={conditionalRowStyles}
            />

            <div style={{ marginTop: '-1%' }}>
                <button
                    onClick={() => handleExportAllData()}
                    className={`flex flex-row gap-2 block ${isDarkMode ? 'bg-stone-800 border border-white' : 'bg-gray-800 text-white'} hover:bg-green-800 text-center px-4 py-2 rounded text-sm`}>
                    <div>Export All Data</div>
                </button>
            </div>

            {editStudentModal && selectedStudent && (
                <EditStudentModal
                    student={selectedStudent}
                    toggleModal={handleModalClose}
                    updateSelectedCourse={updateSelectedCourse}
                    courses={courses}
                    toggleRefreshStudents={toggleRefreshStudents}
                    isDarkMode={isDarkMode}
                />
            )}
        </div>
    );
};

export default StudentsTable;