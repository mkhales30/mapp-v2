import React from 'react';
import DataTable from 'react-data-table-component';
import { sessionsColumns } from "./customStyles";


function SessionsTable({ data, updateSelectedSession, isDarkMode }) {


    const handleRowClick = (row) => {
        updateSelectedSession(row)
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
        <div className='container mt-5 border rounded border-gray-200'>
            <DataTable
                columns={sessionsColumns}
                data={data}
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
                onRowClicked={handleRowClick}
            />
        </div>
    );
};

export default SessionsTable;
