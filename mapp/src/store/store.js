import { configureStore } from '@reduxjs/toolkit'
import selectedCourseReducer from './slices/selectedCourseSlice'
import selectedStudentReducer from './slices/selectedStudentSlice'
import studentsReducer from './slices/studentsSlice'
import sessionsReducer from './slices/sessionsSlice'

export default configureStore({
    reducer: {
        selectedCourse: selectedCourseReducer,
        selectedStudent: selectedStudentReducer,
        students: studentsReducer,
        sessions: sessionsReducer,
    },
})