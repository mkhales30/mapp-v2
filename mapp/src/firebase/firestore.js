import {db} from "./firebase"
import {addDoc, collection, getDocs, onSnapshot, query, where} from "firebase/firestore"

const COURSES_COLLECTION = 'Courses'
const STUDENTS_COLLECTION = 'Students'
const SESSIONS_COLLECTION = 'Sessions'
const USERS_COLLECTION = 'Users'


// addCourse: This function adds a course to the courses collection
export function addCourse(courseName, courseSection, uid) {
    addDoc(
        collection(db, COURSES_COLLECTION),
        {courseName: courseName, courseSection, uid}
    );
}

// Function to add a student to a given course
export async function addStudent(courseId, studentData) {
    try {
        // Generate a 10-digit student ID
        const studentId = Math.floor(Math.random() * 9000000000 + 1000000000);

        // Add studentId to the student data
        studentData = {
            ...studentData,
            studentId,
        };
        // Specify the path to the students subcollection of the course
        const studentsRef = collection(db, COURSES_COLLECTION, courseId, STUDENTS_COLLECTION);

        // Add the student document to the subcollection
        const docRef = await addDoc(studentsRef, studentData);

        return docRef.id;


    } catch (error) {
        console.error("Error adding student:", error);
        throw error;
    }
}


// Function to add a session to a given course
export async function addSession(courseId, sessionData) {
    try {
        // Specify the path to the sessions subcollection of the course
        const sessionsRef = collection(db, COURSES_COLLECTION, courseId, SESSIONS_COLLECTION);

        // Add the session document to the subcollection
        const docRef = await addDoc(sessionsRef, sessionData);

        // You can return the document reference or ID if needed
        return docRef.id;
    } catch (error) {
        console.error("Error adding session:", error);
        throw error;
    }
}

// getCourses: This function retrieves all courses from the course collections for the user with specified uid
export async function getCourses(uid) {
    return new Promise((resolve, reject) => {
        const courses = [];
        const q = query(collection(db, COURSES_COLLECTION), where("uid", "==", uid));

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


export async function getStudents(courseId) {
    try {
        const students = [];
        const studentsRef = collection(db, COURSES_COLLECTION, courseId, STUDENTS_COLLECTION);
        const q = query(studentsRef);

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            students.push({...doc.data(), id: doc.id});
        });

        return students;
    } catch (error) {
        console.error("Error fetching students:", error);
        throw error;
    }
}

export async function getSessions(courseId) {
    try {
        const sessions = [];
        const sessionsRef = collection(db, COURSES_COLLECTION, courseId, SESSIONS_COLLECTION);
        const q = query(sessionsRef);

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            sessions.push({...doc.data(), id: doc.id});
        });

        return sessions;
    } catch (error) {
        console.error("Error fetching sessions:", error);
        throw error;
    }
}


