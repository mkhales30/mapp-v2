import React from 'react';
import DataTable from 'react-data-table-component';
import {customStyles} from "./customStyles";


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
        </div>
    );
};

export default StudentsTable;
