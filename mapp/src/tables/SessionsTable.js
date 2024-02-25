import React from 'react';
import DataTable from 'react-data-table-component';
import {customStyles, sessionsColumns} from "./customStyles";
import {sessionsTableColumns} from "./tableColumns";


function SessionsTable ({data, updateSelectedSession}){


    const handleRowClick = (row) => {
        updateSelectedSession(row)
    };

    return (
        <div className='container mt-5 border rounded border-gray-200'>
            <DataTable
                columns={sessionsTableColumns}
                data={data}
                pagination
                customStyles={customStyles}
                onRowClicked={handleRowClick}
            />
        </div>
    );
};

export default SessionsTable;
