import React from 'react';
import DataTable from 'react-data-table-component';
import {customStyles} from "./customStyles";
import * as XLSX from 'xlsx';


function StudentsTable ({data, updateSelectedStudent}) {

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


    return (
        <div className='container mt-5 border rounded border-gray-200'>
            <div className="mb-3">
                
                <button 
                 onClick={() => handleExportAllData()} 
                className='flex flex-row gap-2 block bg-stone-800 text-white hover:bg-green-800 text-center px-4 py-2 rounded text-sm'>
                    <div>Export All Data</div>
                   
                </button>
            </div>

        
            <DataTable
                columns={columns}
                data={data}
                onRowClicked={handleRowClick}
                pagination
                customStyles={customStyles}
            />
        </div>
    );
};
    
export default StudentsTable;
