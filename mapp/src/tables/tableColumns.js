export const studentTableColumns = [
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

export const sessionsTableColumns = [
    {
        name: 'Date',
        selector: (row) => row.sessionName,
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