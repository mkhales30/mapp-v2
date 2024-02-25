import { configureStore } from '@reduxjs/toolkit'
import selectedCourseReducer from './slices/selectedCourseSlice'
import selectedStudentReducer from './slices/selectedStudentSlice'
import studentsReducer from './slices/studentsSlice'

export default configureStore({
    reducer: {
        selectedCourse: selectedCourseReducer,
        selectedStudent: selectedStudentReducer,
        students: studentsReducer,
    },
})