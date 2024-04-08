import {
  addDoc,
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
  deleteDoc,
  getDoc,
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
    const sessionsRef = collection(
      db,
      COLLECTIONS.COURSES,
      courseId,
      COLLECTIONS.SESSIONS
    );
    const docRef = await addDoc(sessionsRef, sessionData);
    return docRef.id;
  } catch (error) {
    console.error("Error adding session:", error);
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

// Function to get courses for a user
export async function getCourses(uid) {
  return new Promise((resolve, reject) => {
    const courses = [];
    const q = query(collection(db, COLLECTIONS.COURSES), where("uid", "==", uid));

    onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        courses.push({ ...doc.data(), id: doc.id });
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
      return { id: studentDoc.id, ...studentDoc.data() };
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
      sessions.push({ ...doc.data(), id: doc.id, courseId: courseId }); // Include courseId 
    });

    return sessions;
  } catch (error) {
    console.error("Error fetching sessions:", error);
    throw error;
  }
}

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
await updateDoc(doc.ref, { enrollmentStatus: newStatus });
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
    const students = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
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