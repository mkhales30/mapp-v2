import {db} from "./firebase"
import {addDoc, collection, getDocs,query, where, onSnapshot, orderBy, doc} from "firebase/firestore"

const COURSES_COLLECTION = 'courses'
const STUDENTS_COLLECTION = 'Students'
const SESSIONS_COLLECTION = 'Sessions'
const USERS_COLLECTION = 'users'


// addCourse: This function adds a course to the courses collection
export function addCourse(courseName, courseSection,uid){
    addDoc(
        collection(db, COURSES_COLLECTION),
        {courseName : courseName, courseSection, uid}
    );
}

// getCourses: This function retrieves all courses from the course collections for the user with specified uid
export async function getCourses(uid){
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


