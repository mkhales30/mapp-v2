import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { updateStudent } from '../firebase/firestore';

function EditStudentModal({ course, student, toggleModal, updateStudents, updateSelectedSession, updateSelectedCourse }) {
    // State for student data
  const [studentData, setStudentData] = useState({
      firstName: student.firstName,
      lastName: student.lastName,
      email: student.email,
      enrollmentStatus: student.enrollmentStatus,
      attendanceGrade: student.attendanceGrade,
  });

  // Function to handle student update
  const handleUpdateStudent = async (event) => {
    event.preventDefault();
    
    try {
      // Update student data in Firestore
      await updateStudent(course.id, student.id, studentData);
      // Update local state and close modal
      updateStudents();
      updateSelectedCourse(course);
      updateSelectedSession(course);
      toggleModal();
      setTimeout(() => {
        window.location.reload();
    }, 300);
    } catch (error) {
      console.error('Error updating student:', error);
    }
  };

  // Function to update student data in local state
  const updateStudentData = (event) => {
    const { name, value } = event.target;
    setStudentData((prevStudentData) => ({
      ...prevStudentData,
      [name]: value,
    }));
  };

  return (
      <div className='h-full w-full top-0 left-0 right-0 bottom-0 fixed z-30'>
          <div className="bg-black opacity-80 h-full w-full top-0 left-0 right-0 bottom-0 fixed"></div>
          <div className="absolute grid h-screen w-screen place-items-center">
              <div className="relative flex flex-col gap-4 bg-white min-w-[500px] max-h-[500px] p-8 rounded">
                  <p className="text-2xl text-center">Edit Student</p>
                  <button>
                      <FontAwesomeIcon className={" absolute top-2 right-2 w-3 h-3"} onClick={toggleModal} icon={faTimes} />
                  </button>
                  <form className="flex flex-col gap-2" onSubmit={handleUpdateStudent}>
                      <div className='flex flex-col gap-1'>
                          <label className='font-light text-gray-600 text-sm'>First Name</label>
                          <input
                              name="firstName"
                              type="text"
                              className='border-gray-200 border rounded w-full p-2 focus:outline-0'
                              value={studentData.firstName}
                              onChange={updateStudentData}
                          />
                      </div>
                      <div className='flex flex-col gap-1'>
                          <label className='font-light text-gray-600 text-sm'>Last Name</label>
                          <input
                              name="lastName"
                              type="text"
                              className='border-gray-200 border rounded w-full p-2 focus:outline-0'
                              value={studentData.lastName}
                              onChange={updateStudentData}
                          />
                      </div>
                      <div className='flex flex-col gap-1'>
                          <label className='font-light text-gray-600 text-sm'>Email</label>
                          <input
                              name="email"
                              type="text"
                              className='border-gray-200 border rounded w-full p-2 focus:outline-0'
                              value={studentData.email}
                              onChange={updateStudentData}
                          />
                      </div>
                      <div className='flex flex-col gap-1'>
                          <label className='font-light text-gray-600 text-sm'>Enrollment Status</label>
                          <input
                              name="enrollmentStatus"
                              type="text"
                              className='border-gray-200 border rounded w-full p-2 focus:outline-0'
                              value={studentData.enrollmentStatus}
                              onChange={updateStudentData}
                          />
                      </div>
                      <button className='bg-stone-800 text-white text-center px-4 py-2 w-full rounded text-lg' type="submit">
                          Update Student
                      </button>
                  </form>
              </div>
          </div>
      </div>
  );
}

export default EditStudentModal;