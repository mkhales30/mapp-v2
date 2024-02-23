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

// Function to update a session's data
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