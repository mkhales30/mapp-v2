import {
  addDoc,
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
  deleteDoc,
  getDoc,
  setDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "./firebase";


// Constants for collection names
export const COLLECTIONS = {
  COURSES: "Courses",
  STUDENTS: "Students",
  SESSIONS: "Sessions",
  USERS: "Users",
};

// Function to add a course
export function addCourse(courseName, courseSection, uid) {
    addDoc(collection(db, COLLECTIONS.COURSES), {
        courseName,
        courseSection,
        uid,
    });
}

// Function to edit a course
export function editCourse(courseName, courseSection, id) {
    const courseRef = doc(db, COLLECTIONS.COURSES, id);
    updateDoc(courseRef, {
        courseName,
        courseSection,
    })
}

// Function to add a student to a course
export async function addStudent(studentsData) {
  const addStudentPromises = studentsData.map(async (studentData) => {
    try {
      const studentsRef = collection(db, COLLECTIONS.STUDENTS);
      const docRef = await addDoc(studentsRef, studentData);
      return docRef.id;
    } catch (error) {
      console.error("Error adding student:", error);
      throw error;
    }
  });

  return Promise.all(addStudentPromises);
}

// Function to edit a student's data
export async function editStudent(studentId, newData) {
    try {
        const studentRef = doc(db, COLLECTIONS.STUDENTS, studentId);
        await updateDoc(studentRef, newData);
        console.log("Student data updated successfully!");
    } catch (error) {
        console.error("Error editing student data:", error);
        throw error;
    }
}

// Function to add a session to a course
export async function addSession(courseId, sessionData) {
    try {
        // Create a reference to the sessions collection for the course
        const sessionsRef = collection(
            db,
            COLLECTIONS.COURSES,
            courseId,
            COLLECTIONS.SESSIONS
        );
        // Add a new session to the collection
        const docRef = await addDoc(sessionsRef, sessionData);
        // Add attendance records for all students in the course
        const enrollmentsRef = collection(db, 'Enrollments');
        const q = query(enrollmentsRef, where('courseId', '==', doc(db, `Courses/${courseId}`)));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(async (document) => {
                const enrollmentData = document.data();
                const studentDoc = await getDoc(enrollmentData.studentId);
                const studentData = studentDoc.data();
                const attendanceRef = collection(db, 'Attendance');
                await addDoc(attendanceRef, {
                    studentId: enrollmentData.studentId, // Reference to student document
                    id: studentDoc.id, // Student ID
                    sessionId: docRef.id,
                    courseId: doc(db, 'Courses', courseId),
                    firstName: studentData.firstName,
                    lastName: studentData.lastName,
                    status: 'Not Scanned',
                    date: new Date (new Date().toDateString()),
                    in: '',
                    note: ''
                });
            }
        );
        return docRef.id;
    } catch (error) {
        console.error("Error adding session:", error);
        throw error;
    }
}

// Function to get attendance data for a session
export async function getAttendanceData(sessionId, courseId) {
    try {
        const attendance = [];
        const attendanceRef = collection(db, 'Attendance');
        const q = query(attendanceRef, where('courseId', '==', doc(db, `Courses/${courseId}`)), where('sessionId', '==', sessionId));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            attendance.push({id: doc.id, ...doc.data()});
        });

        return attendance;
    } catch (error) {
        console.error('Error fetching attendance data:', error);
        throw error;
    }

}

// Function to get student attendance data for a session
export async function getStudentAttendanceData(studentId, courseId) {
    try {
        const attendance = [];
        const attendanceRef = collection(db, 'Attendance');
        const q = query(attendanceRef, where('courseId', '==', doc(db, `Courses/${courseId}`)), where('studentId', '==', doc(db, `Students/${studentId}`)));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            attendance.push({id: doc.id, date: new Date(doc.date).toISOString, ...doc.data()});
        });

        return attendance;
    } catch (error) {
        console.error('Error fetching student attendance data:', error);
        throw error;
    }

}

// Function to edit a session's data
export async function editSession(courseId, sessionId, newData) {
    try {
        const sessionRef = doc(
            db,
            COLLECTIONS.COURSES,
            courseId,
            COLLECTIONS.SESSIONS,
            sessionId
        );

        console.log("Session reference:", sessionRef);
        await updateDoc(sessionRef, newData);
        const path = `${COLLECTIONS.COURSES}/${courseId}/${COLLECTIONS.SESSIONS}/${sessionId}`;
        console.log("Session data updated successfully!", path);
    } catch (error) {
        console.error("Error editing session data:", error);
        throw error;
    }
}

// functon to record attendance for a student
export async function recordAttendance(courseId, studentId, sessionId) {
    try {
        // Create a reference to the student's attendance record
        const attendanceRef = collection(db, 'Attendance');
        const q = query(attendanceRef, where('courseId', '==', doc(db, `Courses/${courseId}`)), where('studentId', '==', doc(db, `Students/${studentId}`)), where('sessionId', '==', sessionId));
        const querySnapshot = await getDocs(q);

        // Creating reference to session
        const sessionRef = doc(db, COLLECTIONS.COURSES, courseId, COLLECTIONS.SESSIONS, sessionId)
        const sessionDoc = await getDoc(sessionRef);
        const sessionData = sessionDoc.data();

        // variables to store the session start time and grace period
        let sessionStartTime = null;
        let gracePeriod = null;

        // get the session start time
        const sessionStartTimeString = sessionData.sessionStart ?? null


        if (sessionStartTimeString !== null) {
            const sessionStartTimeDate = new Date(sessionStartTimeString);
            sessionStartTime = sessionStartTimeDate.toISOString();
        } else {
            sessionStartTime = null;
        }

        // get the session grace period
        const gracePeriodString = sessionData.gracePeriod ?? null
        if (gracePeriodString !== null) {
            const gracePeriodDate = new Date(gracePeriodString);
            gracePeriod = gracePeriodDate.toISOString();
        } else {
            gracePeriod = null;
        }

        // get the current time
        const currentTime = new Date().toISOString();

        // if the course has a start time and has not started yet
        if (sessionStartTime && currentTime < sessionStartTime) {
            window.alert("The session has not started yet, you can not record attendance for this session")
            return
        }
        // if the course has a grace period and the current time is outside the grace period
        if (gracePeriod && currentTime > gracePeriod) {
            window.alert("The grace period has ended, you can no longer record attendance for this session")
            return
        }

        if (!querySnapshot.empty) {
            querySnapshot.forEach(async (document) => {
                await updateDoc(document.ref, {
                    status: 'Present',
                    in: new Date().toLocaleTimeString(),
                });
            });
        } else {
            // check if student enrolled in course
            if (await isStudentEnrolled(studentId, courseId)) {

                // Get the student document
                const studentDoc = await getDoc(doc(db, `Students/${studentId}`));

                // Get the student data
                const studentData = studentDoc.data();

                // Get the firstName and lastName properties
                const firstName = studentData.firstName;
                const lastName = studentData.lastName;

                // create an attendance record for the student for the session
                await addDoc(attendanceRef, {
                    studentId: doc(db, `Students/${studentId}`),
                    id: studentDoc.id,
                    sessionId: sessionId,
                    firstName: firstName,
                    lastName: lastName,
                    courseId: doc(db, `Courses/${courseId}`),
                    status: 'Present',
                    date: new Date (new Date().toLocaleTimeString()),
                    in: new Date().toLocaleTimeString(),
                    note: ''
                });
            } else {

                // if yes add student to course
                if (window.confirm('Student not enrolled in course. Would you like to enroll them?')) {
                    await addEnrollment(studentId, courseId);
                    await recordAttendance(courseId, studentId, sessionId);
                    return;
                }else{
                    return;
                }

            }
        }

    } catch
        (error) {
        console.error('Error recording attendance')
    }
}

// Function to get courses for a user
export async function getCourses(uid) {
    return new Promise((resolve, reject) => {
        const courses = [];
        const q = query(collection(db, COLLECTIONS.COURSES), where("uid", "==", uid));

        onSnapshot(q, (querySnapshot) => {
            querySnapshot.forEach((doc) => {
                courses.push({...doc.data(), id: doc.id});
            });
            resolve(courses);
        }, (error) => {
            reject(error);
        });
    });
}

// Function to get students for a course
export async function getStudents(courseId) {
    try {
        const enrollmentsRef = collection(db, 'Enrollments');
        const q = query(enrollmentsRef, where('courseId', '==', doc(db, 'Courses', courseId)));
        const querySnapshot = await getDocs(q);

        const studentPromises = querySnapshot.docs.map(async (doc) => {
            const enrollmentData = doc.data();
            const studentDoc = await getDoc(enrollmentData.studentId);
            return {id: studentDoc.id, ...studentDoc.data()};
        });

        const students = await Promise.all(studentPromises);
        return students;
    } catch (error) {
        console.error('Error fetching students:', error);
        throw error;
    }
}


// Function to get sessions for a course
export async function getSessions(courseId) {
    try {
        const sessions = [];
        const sessionsRef = collection(
            db,
            COLLECTIONS.COURSES,
            courseId,
            COLLECTIONS.SESSIONS
        );
        const q = query(sessionsRef);

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            sessions.push({...doc.data(), id: doc.id, courseId: courseId}); // Include courseId
        });

        return sessions;
    } catch (error) {
        console.error("Error fetching sessions:", error);
        throw error;
    }
}

/* // Function to add notes for a specific student in a specific session and course
// Need to have it recognize a studentId
export async function addNotes(courseId, sessionId, newNotes) {
    try {
        // Check if newNotes is defined and not an empty string
        if (newNotes !== undefined && newNotes !== '') {
            const sessionRef = doc(db, COLLECTIONS.COURSES, courseId, COLLECTIONS.SESSIONS, sessionId);
            await setDoc(sessionRef, { studentNotes: newNotes }, { merge: true }); // Set notes field with merge option
        }
    } catch (error) {
        console.error("Error adding notes:", error);
        throw error;
    }
} */

export async function removeStudentFromCourse(studentId, courseId) {
    try {
        await deleteEnrollment(studentId, courseId);
    } catch (error) {
        console.error("Error deleting enrollment:", error);
        throw error;
    }
}

// Function to update enrollment status for a student
export async function updateEnrollmentStatus(courseId, studentId, newStatus) {
    try {
        const enrollmentQuery = query(collection(db, "Enrollments"),
            where("courseId", "==", courseId),
            where("studentId", "==", studentId));
        const enrollmentQuerySnapshot = await getDocs(enrollmentQuery);
        enrollmentQuerySnapshot.forEach(async (doc) => {
            await updateDoc(doc.ref, {enrollmentStatus: newStatus});
            console.log(`Enrollment status updated to ${newStatus} for student ${studentId}`);
        });
    } catch (error) {
        console.error("Error updating enrollment status:", error);
        throw error;
    }
}


export async function deleteCourse(courseId) {
    try {
        const courseRef = doc(db, COLLECTIONS.COURSES, courseId);
        await deleteDoc(courseRef);

    } catch (error) {
        console.error("Error deleting course:", error);
        throw error;
    }
}

// Function to delete a session 
export async function deleteSession(courseId, sessionId) {
    try {
        const sessionRef = doc(db, COLLECTIONS.COURSES, courseId, COLLECTIONS.SESSIONS, sessionId);
        await deleteDoc(sessionRef);
    } catch (error) {
        console.error("Error deleting session:", error);
        throw error;
    }
}

export async function isStudentEmailUnique(email) {
    try {
        const studentsRef = collection(db, 'Students');
        const q = query(studentsRef, where('email', '==', email));
        const querySnapshot = await getDocs(q);
        return querySnapshot.empty;
    } catch (error) {
        console.error('Error checking student email uniqueness:', error);
        throw error;
    }
}

export async function addEnrollment(studentId, courseId) {
    try {
        const enrollmentsRef = collection(db, 'Enrollments');
        await addDoc(enrollmentsRef, {
            studentId: doc(db, 'Students', studentId),
            courseId: doc(db, 'Courses', courseId),
        });
    } catch (error) {
        console.error('Error adding enrollment:', error);
        throw error;
    }
}

export async function deleteEnrollment(studentId, courseId) {
    try {
        const enrollmentsRef = collection(db, 'Enrollments');
        const q = query(enrollmentsRef, where('studentId', '==', doc(db, 'Students', studentId)), where('courseId', '==', doc(db, 'Courses', courseId)));
        const querySnapshot = await getDocs(q);

        const deletePromises = querySnapshot.docs.map(doc => deleteDoc(doc.ref));
        await Promise.all(deletePromises);
    } catch (error) {
        console.error("Error deleting enrollment:", error);
        throw error;
    }
}

export async function getAllStudents() {
    try {
        const studentsRef = collection(db, 'Students');
        const querySnapshot = await getDocs(studentsRef);
        const students = querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
        return students;
    } catch (error) {
        console.error('Error fetching all students:', error);
        throw error;
    }
}

export async function isStudentEnrolled(email, courseId) {
  try {
    const studentsRef = collection(db, 'Students');
    const q = query(studentsRef, where('email', '==', email));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return false;
    }

    const studentId = querySnapshot.docs[0].id;
    const enrollmentsRef = collection(db, 'Enrollments');
    const enrollmentQuery = query(
      enrollmentsRef,
      where('studentId', '==', doc(db, 'Students', studentId)),
      where('courseId', '==', doc(db, 'Courses', courseId))
    );
    const enrollmentSnapshot = await getDocs(enrollmentQuery);
    return !enrollmentSnapshot.empty;
  } catch (error) {
    console.error('Error checking student enrollment:', error);
    throw error;
  }
}

export async function getUserData(uid) {
  try {
    const usersRef = collection(db, COLLECTIONS.USERS);
    const q = query(usersRef, where("uid", "==", uid));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const userDoc = querySnapshot.docs[0];
      return { id: userDoc.id, ...userDoc.data() };
    } else {
      console.log("No user data found for the given uid");
      return null;
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
}

export { doc, updateDoc, db ,getDoc};
