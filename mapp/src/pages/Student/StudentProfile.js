import React from 'react';
import QRCode from './QRCode';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { deleteStudent } from '../../firebase/firestore';
import { useNavigate } from 'react-router-dom';

function Student({ student, courseId, isDarkMode }) {
  // Access student document ID directly
  const studentDocumentId = student.id;
  console.log(courseId);
  const navigate = useNavigate();


  //handleDeleteStudent -> this function fires once the remove from class button is pressed, it then deletes the student from the database
  const handleClickRemove = async () => {
    console.log("Remove Pressed")
    try {
      // Access courseId 
      await deleteStudent(courseId, student.id);
      // Redirect to the previous page
      navigate('/');
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  return (
    <div>
      <div className='ml-12'>
        <div className='grid grid-cols-6 gap-2 mt-2 mr-6'>
          <div className='mb-4 col-span-3'>
            <div className='text-gray-400 font-light text-sm'>
              {student.email}
            </div>
            <div className='text-gray-400 font-light text-sm'>
              {student.lastAttended ? 'Last attended:' : ''}
              <span className='font-light text-black underline'>{student.lastAttended}</span>
            </div>
          </div>

          <div className='col-span-3'>
            <div className='flex flex-row gap-2 place-content-end'>
              <button className='flex flex-row gap-2 rounded text-white text-sm px-4 py-3 bg-black'>
                <p>Enrolled</p>
                <a href="#">
                  <FontAwesomeIcon icon={faChevronDown} />
                </a>
              </button>

              <button onClick={handleClickRemove} className='flex flex-row gap-2 items-center rounded hover:text-red-600 hover:border-red-600 text-gray-400 font-light text-sm py-2 px-4 border-gray-300-50 border-2'>
                Remove from class
              </button>
            </div>
          </div>

          <div className={`bg-green-200 rounded-2xl col-span-2 mr-4 ${isDarkMode ? 'text-gray-800 border-green-500 border-2' : ''}`}>
            <div className='p-4'>
              <div className='text-5xl text-green-950'>
                {student.attendanceGrade ? student.attendanceGrade : '100'}%
              </div>
              <div className="mt-1">Attendance</div>
            </div>
            <div className={`w-full bg-green-950 rounded-b-2xl px-4 py-2 ${isDarkMode ? 'text-gray-100' : 'text-white'}`}>
              View All
            </div>
          </div>

          <div className={`bg-red-200 rounded-2xl col-span-2 mr-4 ${isDarkMode ? 'text-gray-800 border-red-500 border-2' : ''}`}>
            <div className='p-4'>
              <div className='text-5xl text-red-950'>
                {student.absences ? student.absences : 0}
              </div>
              <div className="mt-1">Absences</div>
            </div>
            <div className={`w-full bg-red-950 rounded-b-2xl px-4 py-2 ${isDarkMode ? 'text-gray-100' : 'text-white'}`}>
              View All
            </div>
          </div>
        </div>

        <div className='text-2xl font-medium mt-12'>Attendance Report</div>
        <QRCode studentDocumentId={studentDocumentId} student={student} />
      </div>
    </div>
  );
}

export default Student;