import React, { useEffect, useState, useMemo } from 'react';
import { getAllStudents } from '../firebase/firestore';
import course_background from '../assets/course_background.jpg';
import { sendEmail } from '../services/resendService';

function AllStudentsPage({ isDarkMode }) {
  const [students, setStudents] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [emailTitle, setEmailTitle] = useState('');
  const [emailBody, setEmailBody] = useState('');
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');
  const [selectedClasses, setSelectedClasses] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    const fetchAllStudents = async () => {
      try {
        const allStudents = await getAllStudents();
        setStudents(allStudents);
        const uniqueClasses = [...new Set(allStudents.map((student) => student.class))];
        setClasses(uniqueClasses);
      } catch (error) {
        console.error('Error fetching all students:', error);
      }
    };

    fetchAllStudents();
  }, []);

  const handleStudentSelection = (studentId) => {
    setSelectedStudents((prevSelected) => {
      if (prevSelected.includes(studentId)) {
        return prevSelected.filter((id) => id !== studentId);
      } else {
        return [...prevSelected, studentId];
      }
    });
  };

  const openEmailModal = () => {
    setShowEmailModal(true);
  };

  const closeEmailModal = () => {
    setShowEmailModal(false);
  };

  const handleEmailTitleChange = (e) => {
    setEmailTitle(e.target.value);
  };

  const handleEmailBodyChange = (e) => {
    setEmailBody(e.target.value);
  };

  const handleSendEmails = async () => {
    try {
      const selectedStudentEmails = selectedStudents.map((studentId) => {
        const student = students.find((s) => s.id === studentId);
        return student.email;
      });

      await sendEmail(selectedStudentEmails, emailTitle, emailBody);
      console.log('Emails sent successfully');
      closeEmailModal();
    } catch (error) {
      console.error('Error sending emails:', error);
      // Handle error state or display error message
    }
  };

  const handleSort = (column) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const handleClassFilterChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
    setSelectedClasses(selectedOptions);
  };

  const handleSearchQueryChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const sortedStudents = useMemo(() => {
    let sorted = [...students];
    if (sortColumn) {
      sorted.sort((a, b) => {
        const valueA = a[sortColumn].toLowerCase();
        const valueB = b[sortColumn].toLowerCase();
        if (valueA < valueB) return sortDirection === 'asc' ? -1 : 1;
        if (valueA > valueB) return sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
    }
    return sorted;
  }, [students, sortColumn, sortDirection]);

  const filteredStudents = useMemo(() => {
    let filtered = sortedStudents;
    if (selectedClasses.length > 0) {
      filtered = filtered.filter((student) => selectedClasses.includes(student.class));
    }
    if (searchQuery) {
      const lowercaseQuery = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (student) =>
          student.firstName.toLowerCase().includes(lowercaseQuery) ||
          student.lastName.toLowerCase().includes(lowercaseQuery) ||
          student.email.toLowerCase().includes(lowercaseQuery)
      );
    }
    return filtered;
  }, [sortedStudents, selectedClasses, searchQuery]);

  return (
    <div className={`h-full flex flex-col ${isDarkMode ? 'dark' : ''}`}>
      <div className='h-52'>
        <img className='w-full h-full object-cover' src={course_background} alt="" />
        <div className={'block flex flex-col text-white -mt-20 pl-8'}>
          <h1 className='text-3xl text-white mb-1'>{'Students'}</h1>
          <div className='text-sm'>View and manage all students</div>
        </div>
      </div>
      <div className="p-4 flex-1 overflow-auto">
        <div className="mb-4 flex justify-between items-center">
          {/* <div>
            <label htmlFor="classFilter" className="mr-2">Filter by Class:</label>
            <select
              id="classFilter"
              multiple
              value={selectedClasses}
              onChange={handleClassFilterChange}
              className="border rounded py-1 px-2"
            >
              {classes.map((classOption) => (
                <option key={classOption} value={classOption}>
                  {classOption}
                </option>
              ))}
            </select>
          </div> */}
          <div>
            <input
              type="text"
              placeholder="Search students..."
              value={searchQuery}
              onChange={handleSearchQueryChange}
              className={`border rounded py-1 px-2 ${isDarkMode ? 'text-black' : 'text-black'}`}
            />
          </div>
          </div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
        onClick={openEmailModal}
      >
          Send Emails
      </button>
      <div className="overflow-auto">
        <table className="w-full border-collapse">
          <thead className="sticky top-0 bg-gray-100">
            <tr className={`${isDarkMode ? 'bg-gray-800 text-white' : 'bg-gray-200'}`}>
              <th className="px-4 py-2">Select</th>
              <th
                className="px-4 py-2 cursor-pointer"
                onClick={() => handleSort('firstName')}
              >
                First Name {sortColumn === 'firstName' && (
                  <span>{sortDirection === 'asc' ? '▲' : '▼'}</span>
                )}
              </th>
              <th
                className="px-4 py-2 cursor-pointer"
                onClick={() => handleSort('lastName')}
              >
                Last Name {sortColumn === 'lastName' && (
                  <span>{sortDirection === 'asc' ? '▲' : '▼'}</span>
                )}
              </th>
              <th
                className="px-4 py-2 cursor-pointer"
                onClick={() => handleSort('email')}
              >
                Email {sortColumn === 'email' && (
                  <span>{sortDirection === 'asc' ? '▲' : '▼'}</span>
                )}
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student) => (
              <tr key={student.id} className={`${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white'}`}>
                <td className="border px-4 py-2">
                  <input
                    type="checkbox"
                    checked={selectedStudents.includes(student.id)}
                    onChange={() => handleStudentSelection(student.id)}
                  />
                </td>
                <td className="border px-4 py-2">{student.firstName}</td>
                <td className="border px-4 py-2">{student.lastName}</td>
                <td className="border px-4 py-2">{student.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
      {showEmailModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen">
            <div className="fixed inset-0 bg-black opacity-50"></div>
            <div className="bg-white rounded-lg p-8 z-20 w-1/2">
              <h2 className="text-2xl mb-4">Send Emails</h2>
              <div className="mb-4">
                <p className="font-bold">Selected Students:</p>
                <ul>
                  {selectedStudents.map((studentId) => {
                    const student = students.find((s) => s.id === studentId);
                    return (
                      <li key={studentId}>
                        {student.firstName} {student.lastName} ({student.email})
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className="mb-4">
                <label htmlFor="emailBody" className="block font-bold mb-2">
                  Message
                </label>
                <textarea
                  id="emailBody"
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                  rows="4"
                  value={emailBody}
                  onChange={handleEmailBodyChange}
                ></textarea>
              </div>
              <div className="flex justify-end">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                  onClick={handleSendEmails}
                >
                  Send
                </button>
                <button
                  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                  onClick={closeEmailModal}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AllStudentsPage;