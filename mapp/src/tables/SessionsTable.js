import React, {useEffect, useState} from 'react';
import DataTable from 'react-data-table-component';
import {customStyles, sessionsColumns} from "./customStyles";
import {sessionsTableColumns} from "./tableColumns";
import {getSessions} from "../firebase/firestore";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {updateSessions} from "../store/slices/sessionsSlice";


function SessionsTable() {
    // Getting th selected course from the redux store
    const selectedCourse = useSelector(state => state.selectedCourse);
    // Getting the sessions from the redux store
    const sessions = useSelector(state => state.sessions);

    // This will be used to set the loading state of the component
    const [isLoading, setIsLoading] = useState(true);
    // This will be used to navigate to the session profile page in the handleRowClick function
    const navigate = useNavigate();
    // This will be used to dispatch actions to the redux store
    const dispatch = useDispatch();

    // Function to handle row click And navigate to the session profile page
    const handleRowClick = (row) => {
        navigate(`/session/${row.id}`);
    };

    // This useEffect will fetch the sessions of the selected course from firestore
    useEffect(() => {
        const fetchSessions = async () => {
            try {
                const response = await getSessions(selectedCourse.value.id);
                dispatch(updateSessions(response));
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching sessions:', error);
            }
        };
        fetchSessions();
    }, [selectedCourse]);


    return (
        <div className='container mt-5 border rounded border-gray-200'>
            <DataTable
                columns={sessionsTableColumns}
                data={sessions.value}
                pagination
                customStyles={customStyles}
                onRowClicked={handleRowClick}
            />
        </div>
    );
};

export default SessionsTable;
