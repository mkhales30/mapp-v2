import React, {useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faX} from "@fortawesome/free-solid-svg-icons";
import {addStudent} from "../firebase/firestore";

function AddStudentModal(props) {

    // Add student Form Handler
    const [studentData, setStudentData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        enrollmentStatus: 'Enrolled',
        attendanceGrade: '100'
    })

    let name, value;
    const updateStudentData = (e) => {
        name = e.target.name;
        value = e.target.value;
        setStudentData({...studentData, [name]: value})
    }

    {/*handleAddStudent -> this function fires once the add student button is pressed, it then adds to the database*/
    }
    const handleAddStudent = async () => {
        await addStudent(props.course.id, studentData);
        props.updateStudents(); // Update students in the parent component
        props.toggleModal();
    };

    return (
        <div
            className="relative flex flex-col gap-4 bg-white min-w-[500px] max-h-[500px] p-8 rounded">
            <p className="text-2xl text-center">New Student</p>
            <button>
                <FontAwesomeIcon className={" absolute top-2 right-2 w-3 h-3"} onClick={props.toggleModal}
                                 icon={faX}/>
            </button>
            <form className="flex flex-col gap-2 ">
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

            </form>
            <button className='bg-stone-800 text-white text-center px-4 py-2 w-full rounded text-lg'
                    type="submit"
                    onClick={handleAddStudent}>
                Create Student
            </button>
        </div>
    );
}

export default AddStudentModal;