import {db} from './firebase'
import {
    addDoc,
    getDoc,
    updateDoc,
    collection,
    doc,
    getDocs,
    onSnapshot,
    query,
    where,
    deleteDoc,
} from "firebase/firestore";


// Constants for collection names
const COLLECTIONS = {
    COURSES: 'Courses',
    STUDENTS: 'Students',
    SESSIONS: 'Sessions',
    USERS: 'Users',
    ATTENDANCE: 'Attendance'
}

// Function to add a course
export function addCourse(courseName, courseSection, uid) {
    addDoc(collection(db, COLLECTIONS.COURSES), {
        courseName,
        courseSection,
        uid,
    })
}

export function editCourse(courseName, courseSection, id) {
    const courseRef = doc(db, COLLECTIONS.COURSES, id);
    updateDoc(courseRef, {
        courseName,
        courseSection,
    })
}

// Function to add a student to a course
export async function addStudent(courseId, studentData) {
    try {
        const studentsRef = collection(
            db,
            COLLECTIONS.COURSES,
            courseId,
            COLLECTIONS.STUDENTS
        )
        const docRef = await addDoc(studentsRef, studentData)
        return docRef.id
    } catch (error) {
        console.error('Error adding student:', error)
        throw error
    }
}

export async function recordAttendance(courseId, studentId, sessionId) {
    try {

        // Creating reference to course
        const courseRef = doc(db, COLLECTIONS.COURSES, courseId)
        // Creating reference to Student document in the course
        const studentRef = doc(db, COLLECTIONS.COURSES, courseId, COLLECTIONS.STUDENTS, studentId)
        // Creating reference to session
        const sessionRef = doc(db, COLLECTIONS.COURSES, courseId, COLLECTIONS.SESSIONS, sessionId)

        // Checking if student,course and session record exists
        const student = await getDoc(studentRef);
        const course = await getDoc(courseRef);
        const session = await getDoc(sessionRef);

       // Creating a query to check if the student has already been marked present for the session
        const q = query(collection(db, COLLECTIONS.ATTENDANCE), where('studentRef', '==', studentRef), where('sessionRef', '==', sessionRef));
        // Execute the query
        const querySnapshot = await getDocs(q);

        // If attendance record already exists, do nothing
        if (!querySnapshot.empty) {
            // do nothing
        }
        // However, if attendance record does not exist, record the attendance of the student
        else{
            // Creating a attendance record if the student does not have one for the session
            if (student.exists() && course.exists() && session.exists()) {
                addDoc(collection(db, COLLECTIONS.ATTENDANCE), {
                    courseRef,
                    studentRef,
                    sessionRef,
                    status: "Present",
                })
            } else {
                // docSnap.data() will be undefined in this case
                console.log("No such document!");
            }
        }

    } catch (error) {
        console.error('Error recording attendance')
    }
}

// Function to edit a student's data
export async function editStudent(courseId, studentId, newData) {
    try {
        const studentRef = doc(
            db,
            COLLECTIONS.COURSES,
            courseId,
            COLLECTIONS.STUDENTS,
            studentId
        );

        console.log("Student reference:", studentRef);
        await updateDoc(studentRef, newData);
        const path = `${COLLECTIONS.COURSES}/${courseId}/${COLLECTIONS.STUDENTS}/${studentId}`;
        console.log("Student data updated successfully!", path);
    } catch (error) {
        console.error("Error editing student data in:", error);
        throw error;
    }
}

// Function to add a session to a course
export async function addSession(courseId, sessionData) {
    try {
        const sessionsRef = collection(
            db,
            COLLECTIONS.COURSES,
            courseId,
            COLLECTIONS.SESSIONS
        )
        const docRef = await addDoc(sessionsRef, sessionData)
        return docRef.id
    } catch (error) {
        console.error('Error adding session:', error)
        throw error
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

// Function to get courses for a user
export async function getCourses(uid) {
    return new Promise((resolve, reject) => {
        const courses = []
        const q = query(collection(db, COLLECTIONS.COURSES), where('uid', '==', uid))

        onSnapshot(q, (querySnapshot) => {
            querySnapshot.forEach((doc) => {
                courses.push({...doc.data(), id: doc.id})
            })
            resolve(courses)
        }, (error) => {
            reject(error)
        })
    })
}

export async function getAttendanceData(sessionId, courseId) {
    return new Promise(async (resolve, reject) => {
        // Creating reference to session
        const sessionRef = doc(db, COLLECTIONS.COURSES, courseId, COLLECTIONS.SESSIONS, sessionId);
        // Creating reference to course
        const courseRef = doc(db, COLLECTIONS.COURSES, courseId);
        const data = [];
        const q = query(collection(db, COLLECTIONS.ATTENDANCE), where('sessionRef', '==', sessionRef), where('courseRef', '==', courseRef));

        onSnapshot(q, async (querySnapshot) => {
            const docsPromises = querySnapshot.docs.map(async (doc) => {
                const attendanceData = doc.data();
                const studentRef = attendanceData.studentRef;
                const studentDoc = await getDoc(studentRef);
                if (studentDoc.exists()) {
                    const studentData = studentDoc.data();
                    // Spread the student's data along with the attendance record at the same level
                    return {
                        ...attendanceData, // Attendance data
                        id: doc.id, // Attendance ID
                        firstName: studentData.firstName, // Student's firstName
                        lastName: studentData.lastName, // The ID of the student document
                        // Include additional student fields as needed
                    };
                }
            });

            // Wait for all student details to be fetched
            const compiledData = await Promise.all(docsPromises);
            resolve(compiledData);
        }, (error) => {
            reject(error);
        });
    });
}

// Function to get students for a course
export async function getStudents(courseId) {
    try {
        const studentsRef = collection(db, COLLECTIONS.COURSES, courseId, COLLECTIONS.STUDENTS);
        const q = query(studentsRef);
        const querySnapshot = await getDocs(q);

        const students = querySnapshot.docs.map(doc => ({
            ...doc.data(),
            id: doc.id,
            courseId: courseId
        }));

        return students;
    } catch (error) {
        console.error('Error fetching students:', error);
        throw error; // Re-throw to allow app to handle if needed
    }
}


// Function to get sessions for a course
export async function getSessions(courseId) {
    try {
        const sessions = []
        const sessionsRef = collection(
            db,
            COLLECTIONS.COURSES,
            courseId,
            COLLECTIONS.SESSIONS
        )
        const q = query(sessionsRef)

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

export async function deleteStudent(courseId, studentId) {
    try {
        // Construct the path to the specific student document
        const studentRef = doc(db, COLLECTIONS.COURSES, courseId, COLLECTIONS.STUDENTS, studentId);

        await deleteDoc(studentRef);
    } catch (error) {
        console.error("Error deleting student:", error);
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