import {db} from './firebase'
import {
    addDoc,
    collection,
    getDocs,
    onSnapshot,
    query,
    where,
    doc,
    deleteDoc,
    updateDoc
}
from
"firebase/firestore";

// Constants for collection names
const COLLECTIONS = {
    COURSES: 'Courses',
    STUDENTS: 'Students',
    SESSIONS: 'Sessions',
    USERS: 'Users',
}

/*
    The following functions are used to interact with the Firestore database.
    They are used to add, edit, and delete courses, students, and sessions.
    They also get courses, students, and sessions from the database.
*/


/* addCourse: Adds a course to the database
    * @param courseName -  The name of the course
    * @param courseSection - The section of the course
    * @param uid -  The user id of the user who created the course
 */
export function addCourse(courseName, courseSection, uid) {
    addDoc(collection(db, COLLECTIONS.COURSES), {
        courseName,
        courseSection,
        uid,
    })
}

/* addStudent: Adds a student to a course
    * @param courseId -  The id of the course
    * @param studentData - The data of the student
    * @returns - The id of the student
 */
export function editCourse(courseName, courseSection, id) {
    const courseRef = doc(db, COLLECTIONS.COURSES, id);
    updateDoc(courseRef, {
        courseName,
        courseSection,
    })
}

/* addStudent: Adds a student to a course
    * @param courseId -  The id of the course
    * @param studentData - The data of the student
    * @returns - The id of the student
 */
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

/* addSession: Adds a session to a course
    * @param courseId -  The id of the course
    * @param sessionData - The data of the session
    * @returns - The id of the session
 */
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

/* getCourses: Gets all courses for a user
    * @param uid -  The user id of the logged-in user
    * @returns - An array of courses
 */
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

/* getStudents: Gets all students for a course
    * @param courseId -  The id of the course
 */
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


/* getSessions: Gets all sessions for a course
    * @param courseId -  The id of the course
    * @returns - An array of sessions
 */
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

/* deleteStudent: Deletes a student from a course
    * @param courseId -  The id of the course
    * @param studentId - The id of the student

 */
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

/* deleteCourse: Deletes a course
    * @param courseId -  The id of the course
 */
export async function deleteCourse(courseId) {
    try {
        const courseRef = doc(db, COLLECTIONS.COURSES, courseId);
        await deleteDoc(courseRef);

    } catch (error) {
        console.error("Error deleting course:", error);
        throw error;
    }
}

/* deleteSession: Deletes a session from a course
    * @param courseId -  The id of the course
    * @param sessionId - The id of the session
 */
export async function deleteSession(courseId, sessionId) {
    try {
        const sessionRef = doc(db, COLLECTIONS.COURSES, courseId, COLLECTIONS.SESSIONS, sessionId);
        await deleteDoc(sessionRef);
    } catch (error) {
        console.error("Error deleting session:", error);
        throw error;
    }
}

/* updateSession: Updates a session in a course
    * @param courseId -  The id of the course
    * @param sessionId - The id of the session
    * @param newData - The new data for the session
 */
export async function updateSession(courseId, sessionId, newData) {
  try {
    const sessionRef = doc(
      db,
      COLLECTIONS.COURSES,
      courseId,
      COLLECTIONS.SESSIONS,
      sessionId
    );

    await updateDoc(sessionRef, newData);

    console.log("Session information updated successfully!");
  } catch (error) {
    console.error("Error updating session information:", error);
    throw error;
  }
}