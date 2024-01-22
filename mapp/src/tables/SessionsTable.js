import React, {useContext, useEffect, useState} from 'react';
import DataTable from 'react-data-table-component';
import {getStudents} from "../firebase/firestore";
import {CourseContext} from "../contexts/CourseContext";
import {CoursesContext} from "../contexts/CoursesContext";


const StudentTable = ({data}) => {


    const columns = [
        {
            name: 'Date',
            selector: (row) => row.date,
            sortable: true,
        },
        {
            name: 'Attendance',
            selector: (row) => row.attendance,
            sortable: false,
        },
        {
            name: 'Notes',
            selector: (row) => row.notes,
            sortable: false,
        },
    ];

    return (
        <div className='container mt-5 border rounded-2xl border-gray-200'>
            <DataTable
                columns={columns}
                data={data}
                pagination
            />
        </div>
    );
};

export default StudentTable;
