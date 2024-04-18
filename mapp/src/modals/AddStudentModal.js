import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { addStudent, updateDoc, doc, arrayUnion } from "../firebase/firestore";
import { db } from '../firebase/firebase';
import { isStudentEmailUnique, addEnrollment, isStudentEnrolled } from '../firebase/firestore';
import { useEffect } from 'react';
import { getAllStudents } from '../firebase/firestore';
import { sendQRCodeEmail } from '../sendgrid/email'; // Import the function to send email



function AddStudentModal({ course, toggleModal, updateStudents, isDarkMode }) {
  const [studentData, setStudentData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    isEmailValid: false, // Track Email Validity
    enrollmentStatus: 'Enrolled',
    attendanceGrade: '100',
  });

  const [allStudents, setAllStudents] = useState([]);

  const updateStudentData = (e) => {
    const { name, value } = e.target;
    const isEmailField = name === 'email';

    setStudentData((prevState) => ({
      ...prevState,
      [name]: value,
      isEmailValid: isEmailField ? isValidEmail(value) : prevState.isEmailValid
    }));
  };

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  const handleAddStudent = async (e) => {
    e.preventDefault();

    if (studentData.selectedStudent) {
      // Enroll existing student
      const isEnrolled = await isStudentEnrolled(studentData.selectedStudent, course.id);
      if (isEnrolled) {
        alert('The selected student is already enrolled in this course.');
        return;
      }

      await addEnrollment(studentData.selectedStudent, course.id);
    } else {
      // Add new student
      if (!studentData.firstName || !studentData.lastName || !studentData.email || !studentData.isEmailValid) {
        alert('Please fill all required fields with valid input.');
        return;
      }

      const studentId = await addStudent(studentData);
      await addEnrollment(studentId, course.id);
      await sendQRCodeEmail(studentData.email, studentId);
    }
    

    updateStudents();
    toggleModal();
  };

  useEffect(() => {
    const fetchAllStudents = async () => {
      try {
        const students = await getAllStudents();
        setAllStudents(students);
      } catch (error) {
        console.error('Error fetching all students:', error);
      }
    };

    fetchAllStudents();
  }, []);

  return (
    <div className='h-full w-full top-0 left-0 right-0 bottom-0 fixed z-30'>
      <div
        className="bg-black opacity-80 h-full w-full top-0 left-0 right-0 bottom-0 fixed"></div>
      <div className="absolute grid h-screen w-screen place-items-center">
        <div
          className={`relative flex flex-col gap-4 ${isDarkMode ? 'bg-gray-300' : 'bg-white'} min-w-[500px] max-h-[500px] p-8 rounded`}>
          <p className="text-2xl text-center" style={{ color: isDarkMode ? '#333' : '#000' }}>New Student</p>
          <button>
            <FontAwesomeIcon className="absolute top-2 right-2 w-3 h-3" onClick={toggleModal} icon={faX} style={{ color: isDarkMode ? '#333' : '' }} />
          </button>
          <form className="flex flex-col gap-2 ">
            <div className='flex flex-col gap-1'>
              <label className='font-light text-gray-700 text-sm'>Select Existing Student (Optional)</label>
              <select
                name="selectedStudent"
                className={`border-gray-200 border rounded w-full p-2 focus:outline-0 ${isDarkMode ? 'text-black' : ''}`}
                value={studentData.selectedStudent}
                onChange={updateStudentData}
              >
                <option value="">-- Select --</option>
                {allStudents.map(student => (
                  <option key={student.id} value={student.id}>
                    {student.firstName} {student.lastName}
                  </option>
                ))}
              </select>
            </div>
            <div className='flex flex-col gap-1'>
              <label className="font-light text-sm" style={{ color: isDarkMode ? '#333' : '#000' }}>First Name</label>
              <input
                name="firstName"
                type="text"
                className={`border-gray-200 border rounded w-full p-2 focus:outline-0 ${isDarkMode ? 'text-black' : ''}`}
                value={studentData.firstName}
                onChange={updateStudentData}
              />
            </div>
            <div className='flex flex-col gap-1'>
              <label className="font-light text-sm" style={{ color: isDarkMode ? '#333' : '#000' }}>Last Name</label>
              <input
                name="lastName"
                type="text"
                className={`border-gray-200 border rounded w-full p-2 focus:outline-0 ${isDarkMode ? 'text-black' : ''}`}
                value={studentData.lastName}
                onChange={updateStudentData}
              />
            </div>

            <div className='flex flex-col gap-1'>
              <label className="font-light text-sm" style={{ color: isDarkMode ? '#333' : '#000' }}>Email</label>
              <input
                name="email"
                type="text"
                className={`border-gray-200 border rounded w-full p-2 focus:outline-0 ${isDarkMode ? 'text-black' : ''} ${!studentData.isEmailValid ? 'border-red-500' : ''}`} // Add Error Styling
                value={studentData.email}
                onChange={updateStudentData}
              />
              {!studentData.isEmailValid && (
                <p className="text-xs text-red-500">Please enter a valid email address.</p>
              )}
            </div>

          </form>
          <form className="flex flex-col gap-2" onSubmit={handleAddStudent}> {/* Add onSubmit handler */}
            {/* Input fields */}

            <button className='bg-stone-800 text-white text-center px-4 py-2 w-full rounded text-lg' type="submit">
              Create Student
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddStudentModal;