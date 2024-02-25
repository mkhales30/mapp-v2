// import React, {useState} from 'react';
// import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
// import {faX} from "@fortawesome/free-solid-svg-icons";
// import {addStudent, getStudents} from "../firebase/firestore";
// import {useDispatch, useSelector} from "react-redux";
//
// function AddStudentModal({ toggleModal, updateStudents }) {
//     const course = useSelector(state => state.selectedCourse);
//     const dispatch = useDispatch();
//
//     const [studentData, setStudentData] = useState({
//       firstName: '',
//       lastName: '',
//       email: '',
//       isEmailValid: false, // Track Email Validity
//       enrollmentStatus: 'Enrolled',
//       attendanceGrade: '100',
//     });
//
//     const updateStudentData = (e) => {
//         const { name, value } = e.target;
//         const isEmailField = name === 'email';
//
//         setStudentData((prevState) => ({
//           ...prevState,
//           [name]: value,
//           isEmailValid: isEmailField ? isValidEmail(value) : prevState.isEmailValid // Validate upon 'email' field changes
//         }));
//       };
//
//     function isValidEmail(email) {
//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         return emailRegex.test(email);
//       }
//
//     const handleAddStudent = async (e) => {
//       e.preventDefault(); // Prevent form submission
//
//       // Check for empty fields
//       if (!studentData.firstName || !studentData.lastName || !studentData.email || !studentData.isEmailValid) {
//         alert('Please fill all required fields with valid input.');
//         return;
//       }
//
//       await addStudent(course.id, studentData);
//       toggleModal();
//     };
//
//     return (
//         <div className='h-full w-full top-0 left-0 right-0 bottom-0 fixed z-30'>
//             <div
//                 className="bg-black opacity-80 h-full w-full top-0 left-0 right-0 bottom-0 fixed"></div>
//             <div className="absolute grid h-screen w-screen place-items-center">
//                 <div
//                     className="relative flex flex-col gap-4 bg-white min-w-[500px] max-h-[500px] p-8 rounded">
//                     <p className="text-2xl text-center">New Student</p>
//                     <button>
//                         <FontAwesomeIcon className={" absolute top-2 right-2 w-3 h-3"} onClick={toggleModal}
//                                          icon={faX}/>
//                     </button>
//                     <form className="flex flex-col gap-2 ">
//                         <div className='flex flex-col gap-1'>
//                             <label className='font-light text-gray-600 text-sm'>First Name</label>
//                             <input
//                                 name="firstName"
//                                 type="text"
//                                 className='border-gray-200 border rounded w-full p-2 focus:outline-0'
//                                 value={studentData.firstName}
//                                 onChange={updateStudentData}
//                             />
//                         </div>
//                         <div className='flex flex-col gap-1'>
//                             <label className='font-light text-gray-600 text-sm'>Last Name</label>
//                             <input
//                                 name="lastName"
//                                 type="text"
//                                 className='border-gray-200 border rounded w-full p-2 focus:outline-0'
//                                 value={studentData.lastName}
//                                 onChange={updateStudentData}
//                             />
//                         </div>
//
//                         <div className='flex flex-col gap-1'>
//                         <label className='font-light text-gray-600 text-sm'>Email</label>
//                             <input
//                                 name="email"
//                                 type="text"
//                                 className={`border-gray-200 border rounded w-full p-2 focus:outline-0 ${!studentData.isEmailValid ? 'border-red-500' : ''}`} // Add Error Styling
//                                 value={studentData.email}
//                                 onChange={updateStudentData}
//                             />
//                                 {!studentData.isEmailValid && (
//                                 <p className="text-xs text-red-500">Please enter a valid email address.</p>
//                             )}
//                         </div>
//
//                     </form>
//                     <form className="flex flex-col gap-2" onSubmit={handleAddStudent}> {/* Add onSubmit handler */}
//                     {/* Input fields */}
//
//       <button className='bg-stone-800 text-white text-center px-4 py-2 w-full rounded text-lg' type="submit">
//         Create Student
//       </button>
//     </form>
//                 </div>
//             </div>
//         </div>
//     );
// }
//
// export default AddStudentModal;