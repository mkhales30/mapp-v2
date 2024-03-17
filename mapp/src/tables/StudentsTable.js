import React from 'react';
import DataTable from 'react-data-table-component';
import { customStyles } from "./customStyles";
import * as XLSX from 'xlsx';


function StudentsTable({ data, updateSelectedStudent, isDarkMode }) {

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
            selector: (row) => row.lastAttended,
            sortable: true,
        },
        {
            name: 'Attendance Grade',
            selector: (row) => row.attendanceGrade,
            sortable: true,
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
            <div className="mb-3"></div>
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
            <button
                onClick={() => handleExportAllData()}
                className={`flex flex-row gap-2 block ${isDarkMode ? 'bg-stone-800 border border-white' : 'bg-gray-800 text-white'} hover:bg-green-800 text-center px-4 py-2 rounded text-sm`}
            >
                <div>Export All Data</div>
            </button>
        </div>
    );
};

export default StudentsTable;
