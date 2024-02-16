import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { customStyles } from "./customStyles";

function StatusCell({ value, onChange }) {
    const [status, setStatus] = useState(value);

    useEffect(() => {
        setStatus(value);
    }, [value]);

    const handleChange = () => {
        const newStatus = status === 'Present' ? 'Absent' : status === 'Absent' ? 'Late in' :
        status === 'Late in' ? 'Early out' :'Present';
        setStatus(newStatus);
        onChange(newStatus);
    };

    const getStatusColor = () => {
        switch (status) {
            case 'Present':
                return { bgColor: 'bg-green-200', textColor: 'text-green-900' };
            case 'Absent':
                return { bgColor: 'bg-red-200', textColor: 'text-red-900' };
            case 'Late in':
                return { bgColor: 'bg-yellow-200', textColor: 'text-yellow-900' };
            case 'Early out':
                return { bgColor: 'bg-yellow-200', textColor: 'text-yellow-900' };
            default:
                return { bgColor: 'bg-gray-200', textColor: 'text-gray-900' };
        }
    };

    const { bgColor, textColor } = getStatusColor();

    return (
        <div className={`rounded-md p-1 cursor-pointer px-2 ${bgColor} ${textColor}`} onClick={handleChange}>
            {status}
        </div>
    );
}

function SessionsAttendanceTable({ data }) {

    const handleChange = (row, newStatus) => {
        // Update the status of the row
        // Use a setState function or dispatch an action here depending on state management approach
        row.status = newStatus;
    };

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
            cell: row => <StatusCell value={row.status} onChange={(newStatus) => handleChange(row, newStatus)} />,
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