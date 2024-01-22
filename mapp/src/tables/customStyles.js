export const customStyles = {
    rows: {
        style: {
            '&:hover': {
                cursor: 'pointer',
                backgroundColor: '#f2f2f2',
                borderRadius: '0px'
            },
        },
    },
};


export const sessionsColumns = [
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