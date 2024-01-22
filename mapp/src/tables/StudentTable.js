import React, {useContext, useEffect, useState} from 'react';
import DataTable from 'react-data-table-component';
import {getStudents} from "../firebase/firestore";
import {CourseContext} from "../contexts/CourseContext";
import {CoursesContext} from "../contexts/CoursesContext";


const StudentTable = ({data}) => {


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
