import React from 'react';
import DataTable from 'react-data-table-component';

function StudentsAttendanceTable({data, isDarkMode}) {

    const customTableStyles = {
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
    };

    const columns = [
        {
            name: 'Date',
            selector: (row) => row.date,
            sortable: false,
            format: (row) => row.date.toDate().toDateString(), //format firestor timestamp to date string
        },
        {
            name: 'Status',
            selector: (row) => row.status,
            sortable: true,
        },
        {
            name: 'Scanned In',
            selector: (row) => row.in,
            sortable: false,
        },
        {
            name: 'Notes',
            selector: (row) => row.note,
            sortable: false,
        },
    ];

    return (
        <div className='container mt-5 border rounded border-gray-200 mb-20'>
            <DataTable
                columns={columns}
                data={data}
                pagination
                customStyles={customTableStyles}
            />
        </div>
    );
}

export default StudentsAttendanceTable;
