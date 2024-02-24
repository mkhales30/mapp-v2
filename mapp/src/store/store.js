import { configureStore } from '@reduxjs/toolkit'
import selectedCourseReducer from './slices/selectedCourseSlice'

export default configureStore({
    reducer: {
        selectedCourse: selectedCourseReducer,
    },
})