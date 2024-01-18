import {db} from "./firebase"
import {addDoc, collection, getDocs,query, where, onSnapshot, orderBy, doc} from "firebase/firestore"

const COURSES_COLLECTION = 'courses'
const STUDENTS_COLLECTION = 'students'
const USERS_COLLECTION = 'users'


// addCourse: This function adds a course to the courses collection
export function addCourse(courseName, courseSection,uid){
    addDoc(
        collection(db, COURSES_COLLECTION),
        {courseName : courseName, courseSection, uid}
    );
}

// getCourses: This function retrieves all courses from the course collections
export async function getCourses(uid){
    const courses = []
    const q = query(collection(db, COURSES_COLLECTION), where("uid", "==", uid))
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
            courses.push({...doc.data(), id : doc.id})
        });
    });
    return courses;
}

export async function getCourse(id){
    const unsub = onSnapshot(doc(db, COURSES_COLLECTION, id), (doc) => {
        return  doc.data();
    });
}



