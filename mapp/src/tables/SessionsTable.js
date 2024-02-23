import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import { customStyles, sessionsColumns } from "./customStyles";
import EditSessionModal from '../modals/EditSessionModal';

function SessionsTable({ data, updateSelectedSession, courseId, updateSessions }) {
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedSession, setSelectedSession] = useState(null);

  const handleRowClick = (row) => {
    updateSelectedSession(row);
  };

  const handleEditClick = (row) => {
    setSelectedSession(row);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
  };

  const columnsWithActions = [...sessionsColumns, {
    name: 'Actions',
    cell: (row) => (
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-normal py-2 px-4 rounded" onClick={() => handleEditClick(row)}>
        Edit
      </button>
    ),
    button: true,
  }];

  return (
    <div className='container mt-5 border rounded border-gray-200'>
      <DataTable
        columns={columnsWithActions}
        data={data}
        pagination
        customStyles={customStyles}
        onRowClicked={handleRowClick}
      />
      {showEditModal && (
        <EditSessionModal
          course={{ id: courseId }}
          session={selectedSession}
          toggleModal={handleCloseEditModal}
          updateSelectedSession={updateSelectedSession}
          updateSessions={updateSessions}
        />
      )}
    </div>
  );
};

export default SessionsTable;