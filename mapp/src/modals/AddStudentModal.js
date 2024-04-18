import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { addStudent, updateDoc, doc, arrayUnion } from "../firebase/firestore";
import { db } from '../firebase/firebase';
import { isStudentEmailUnique, addEnrollment, isStudentEnrolled } from '../firebase/firestore';
import { useEffect } from 'react';
import { getAllStudents } from '../firebase/firestore';
import Select from 'react-select';

function AddStudentModal({ course, toggleModal, updateStudents, isDarkMode }) {
  
  const [isCreateStudentView, setIsCreateStudentView] = useState(false);
  
  const [studentData, setStudentData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    isEmailValid: false, // Track Email Validity
    enrollmentStatus: 'Enrolled',
    attendanceGrade: '100',
  });

  const [allStudents, setAllStudents] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);

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

  const handleCreateStudent = async (e) => {
    e.preventDefault();

    if (!studentData.firstName || !studentData.lastName || !studentData.email || !studentData.isEmailValid) {
      alert('Please fill all required fields with valid input.');
      return;
    }

const isEmailUnique = await isStudentEmailUnique(studentData.email);
    if (!isEmailUnique) {
      alert('A student with this email already exists.');
      return;
    }
    

    const studentId = await addStudent(studentData);
    await addEnrollment(studentId, course.id);

    updateStudents();
    toggleModal();
  };

  const handleAddStudent = async (e) => {
    e.preventDefault();
  
    const addStudentPromises = selectedStudents.map(async (student) => {
      const isEnrolled = await isStudentEnrolled(student.email, course.id);
  
      if (!isEnrolled) {
        await addEnrollment(student.id, course.id);
      } else {
        console.log(`Student ${student.firstName} ${student.lastName} is already enrolled in the course.`);
      }
    });
  
    await Promise.all(addStudentPromises);
    updateStudents();
    toggleModal();
  };

  const handleStudentSelect = (selectedOptions) => {
    setSelectedStudents(selectedOptions);
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
      <div className="bg-black opacity-80 h-full w-full top-0 left-0 right-0 bottom-0 fixed"></div>
      <div className="absolute grid h-screen w-screen place-items-center">
        <div className={`relative flex flex-col gap-4 ${isDarkMode ? 'bg-gray-300' : 'bg-white'} min-w-[500px] max-h-[500px] p-8 rounded`}>
          <p className="text-2xl text-center" style={{ color: isDarkMode ? '#333' : '#000' }}>
            {isCreateStudentView ? 'Create Student' : 'Add Students'}
          </p>
          <button>
            <FontAwesomeIcon className="absolute top-2 right-2 w-3 h-3" onClick={toggleModal} icon={faX} style={{ color: isDarkMode ? '#333' : '' }} />
          </button>
          {isCreateStudentView ? (
            <form className="flex flex-col gap-2" onSubmit={handleCreateStudent}>
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
                  className={`border-gray-200 border rounded w-full p-2 focus:outline-0 ${isDarkMode ? 'text-black' : ''} ${!studentData.isEmailValid ? 'border-red-500' : ''}`}
                  value={studentData.email}
                  onChange={updateStudentData}
                />
                {!studentData.isEmailValid && (
                  <p className="text-xs text-red-500">Please enter a valid email address.</p>
                )}
              </div>
              <button className='bg-stone-800 text-white text-center px-4 py-2 w-full rounded text-lg' type="submit">
                Create Student
              </button>
            </form>
          ) : (
            <form className="flex flex-col gap-2" onSubmit={handleAddStudent}>
              <div className='flex flex-col gap-1'>
                <label className="font-light text-sm" style={{ color: isDarkMode ? '#333' : '#000' }}>Enter Student Names or Emails</label>
                <Select
                  isMulti
                  name="students"
                  options={allStudents}
                  className="basic-multi-select"
                  classNamePrefix="select"
                  getOptionLabel={(student) => `${student.firstName} ${student.lastName} (${student.email})`}
                  getOptionValue={(student) => student.id}
                  value={selectedStudents}
                  onChange={handleStudentSelect}
                  placeholder="Enter student names or emails"
                />
              </div>
              <button className='bg-stone-800 text-white text-center px-4 py-2 w-full rounded text-lg' type="submit">
                Add Students
              </button>
            </form>
          )}
          <button
            className="absolute top-2 right-10 text-sm underline"
            onClick={() => setIsCreateStudentView(!isCreateStudentView)}
          >
            {isCreateStudentView ? 'Add Students' : 'Create Student'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddStudentModal;