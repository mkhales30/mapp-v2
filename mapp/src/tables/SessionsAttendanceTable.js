import React from 'react';
import DataTable from 'react-data-table-component';
import {customStyles} from "./customStyles";


function SessionsAttendanceTable ({data}) {

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
            name: 'Status',
            selector: (row) => row.status,
            sortable: true,
        },
        {
            name: 'Scanned In',
            selector: (row) => row.in,
            sortable: true,
        },
        {
            name: 'Note',
            selector: (row) => row.note,
            sortable: true,
        },
    ];

    return (
        <div className='container mt-5 border rounded border-gray-200' style={{ marginBottom: '20px' }}>
            <DataTable
                columns={columns}
                data={data}
                pagination
                customStyles={customStyles}
            />
        </div>
    );
};

export default SessionsAttendanceTable;
