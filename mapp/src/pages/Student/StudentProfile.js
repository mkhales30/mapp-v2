import React from 'react';
import QRCode from './QRCode';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { deleteStudent } from '../../firebase/firestore';
import { useNavigate } from 'react-router-dom';

function Student({ student,courseId }) {
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
      // Display helpful error messages in a popup or notification component
    }
  };
    
  return (
    <div>
      <div className='mx-12 py-4'>
        <div className='grid grid-cols-6 gap-2'>
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
              <button className='flex flex-row gap-2 rounded text-white text-sm px-4 py-2 bg-black'>
                <p>Enrolled</p>
                <a href="#">
                  <FontAwesomeIcon icon={faChevronDown} />
                </a>
              </button>

              <button onClick= {handleClickRemove} className='hover:text-red-600 hover:border-red-600 text-gray-400 font-light text-xs py-2 px-4 border-gray-300-50 border-2 rounded'
              >
                Remove from class
              </button>
            </div>
          </div>

          <div className='bg-green-200 rounded-2xl col-span-3'>
            <div className='p-4'>
              <div className='text-5xl text-green-950'>
                {student.attendanceGrade ? student.attendanceGrade : '100'}%
              </div>
              <div>Attendance</div>
            </div>
            <div className='w-full bg-green-950 text-white rounded-b-2xl px-4 py-2'>
              View All
            </div>
          </div>

          <div className='bg-red-200 rounded-2xl col-span-3'>
            <div className='p-4'>
              <div className='text-5xl text-red-950'>
                {student.absences ? student.absences : 0}
              </div>
              <div>Absences</div>
            </div>
            <div className='w-full bg-red-950 text-white rounded-b-2xl px-4 py-2'>
              View All
            </div>
          </div>
        </div>

        <div className='text-2xl font-medium mt-12'>Attendance Report</div>
        {/* <StudentsTable data={data}> */}
        {/* </StudentsTable> */}
        <QRCode studentDocumentId={studentDocumentId} student={student} />
      </div>
    </div>
  );
}

export default Student;