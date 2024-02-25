import React, {useEffect, useState} from 'react';
import DataTable from 'react-data-table-component';
import {customStyles} from "./customStyles";
import * as XLSX from 'xlsx';
import {useDispatch, useSelector} from "react-redux";
import {updateSelectedStudent} from "../store/slices/selectedStudentSlice";
import {getStudents} from "../firebase/firestore";
import {studentTableColumns} from "./tableColumns";
import {useNavigate} from "react-router-dom";
import {updateStudents} from "../store/slices/studentsSlice";

function StudentsTable() {
    // This will be used to navigate to the student profile page in the handleRowClick function
    const navigate = useNavigate();
    // This will be used to dispatch actions to the redux store
    const dispatch = useDispatch();

    // This will be used to set the loading state of the component
    const [isLoading, setIsLoading] = useState(true);

    // Get the current state of the selected course from the redux store
    const selectedCourse = useSelector(state => state.selectedCourse);
    // Getting the current state of the students from the redux store
    const students = useSelector(state => state.students);
    // Getting the current state of the selected student from the redux store
    const selectedStudent = useSelector(state => state.selectedStudent);

    // This useEffect will fetch the students of the selected course from firestore
    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await getStudents(selectedCourse.value.id);
                console.log(response);
                dispatch(updateStudents(response));
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching students:', error);
            }
        };

        fetchStudents();

    }, [selectedCourse]);

    // Function to export all data to Excel
    const handleExportAllData = () => {
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(students.value);
        XLSX.utils.book_append_sheet(wb, ws, 'Students_Data');
        XLSX.writeFile(wb, 'students_data.xlsx');
    };

    // Function to handle row click
    const handleRowClick = (row) => {
        console.log(row)
        dispatch(updateSelectedStudent(row));
        navigate(`/student/${row.id}`);
    };


    return (
        <>
        {isLoading ? <div>Loading...</div> : (
            <div className='container mt-5 border rounded border-gray-200'>

                <DataTable
                    columns={studentTableColumns}
                    data={students.value}
                    onRowClicked={handleRowClick}
                    customStyles={customStyles}
                />

                <button
                    onClick={() => handleExportAllData()}
                    className='flex flex-row gap-2 block bg-stone-800 text-white hover:bg-green-800 text-center px-4 py-2 rounded text-sm'>
                    <div>Export All Data</div>

                </button>
            </div>
        )}
    </>);
}

export default StudentsTable;
