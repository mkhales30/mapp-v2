import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { addNotes } from '../firebase/firestore';
import { updateAttendanceInDatabase } from '../firebase/firestore';
import { customStyles } from "./customStyles";

function StatusCell({ value, onChange, row }) {
    const [status, setStatus] = useState(value);

    useEffect(() => {
        setStatus(value);
    }, [value]);

    const handleChange = async () => {
        const newStatus =
            status === 'Present' ? 'Absent' :
                status === 'Absent' ? 'Late in' :
                    status === 'Late in' ? 'Early out' :
                        status === 'Early out' ? 'Excused' :
                            'Present';
        setStatus(newStatus);
        onChange(newStatus);
        // Call a function to update the database
        await updateAttendanceInDatabase(row, newStatus);
    };

    const getStatusColor = () => {
        switch (status) {
            case 'Present':
                return { bgColor: 'bg-green-200', textColor: 'text-green-900' };
            case 'Absent':
                return { bgColor: 'bg-red-200', textColor: 'text-red-900' };
            case 'Late in':
            case 'Early out':
                return { bgColor: 'bg-yellow-200', textColor: 'text-yellow-900' };
            case 'Excused':
                return { bgColor: 'bg-blue-200', textColor: 'text-blue-900' };
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

/* // Component for notes column UI
function NotesCell({ value, onChange, isDarkMode, courseId, sessionId }) {
    const [studentNotes, setStudentNotes] = useState(value);

    useEffect(() => {
        setStudentNotes(value);
    }, [value]);

    const handleChange = (event) => {
        const newNotes = event.target.value;
        setStudentNotes(newNotes);
        onChange(newNotes);
        if (newNotes !== undefined && newNotes !== '') { // Check if newNotes is not undefined and not an empty string
            addNotes(courseId, sessionId, newNotes); // Pass courseId and sessionId
        }
    };

    return (
        <input
            type="text"
            value={studentNotes}
            onChange={handleChange}
            className={`w-full px-2 py-1 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500 mr-8 ${isDarkMode ? 'text-black' : 'text-black'}`}
        />
    );
} */

function SessionsAttendanceTable({ data, isDarkMode, updateSelectedStudent/* , courseId, sessionId */ }) {

    const handleRowClick = (row) => {
        updateSelectedStudent(row)
    };

    const handleChange = (row, newStatus) => {
        // Update the status of the row
        // Use a setState function or dispatch an action here depending on state management approach
        row.status = newStatus;
    };

   /*  const handleNoteChange = (row, newNote) => {
        // Update the note of the row
        // Use a setState function or dispatch an action here depending on state management approach
        row.note = newNote;
    }; */

    // Conditional row styles to change cursor to pointer when hovering over rows
    const conditionalRowStyles = [
        {
            when: (row) => true,
            style: {
                cursor: 'pointer',
            },
        },
    ];

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
            name: 'Notes',
            selector: (row) => row.note,
            sortable: true,
           /*  cell: row => (
                <NotesCell
                    value={row.note}
                    onChange={(newNote) => handleNoteChange(row, newNote)}
                    isDarkMode={isDarkMode}
                    courseId={courseId}
                    sessionId={sessionId}
                />
            ), */
        },
    ];

    return (
        <div className='container mt-5 border rounded border-gray-200' style={{ marginBottom: '20px' }}>
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
        </div>
    );
};

export default SessionsAttendanceTable;