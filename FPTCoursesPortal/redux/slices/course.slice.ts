import { createSlice } from "@reduxjs/toolkit";

export type CourseObject = {
    courseId: string;
    courseName: string;
    trainer: string;
    manager: string;
    startedDate: Date;
    endedDate: Date;
    buildingId: string;
    roomId: string;
};

const initialCourses: Array<CourseObject> = [];

export const courseSlice = createSlice({
    name: 'course',
    initialState: {
        courses: initialCourses,
        isDuplicated: 2
    },
    reducers: {
        fetchCourses: (state, action) => {
            const courses = action.payload;
            state.courses = courses;
        },
        createCourse: (state, action) => {
            const newCourse = action.payload;
            const updatedCourses = [...state.courses, newCourse];
            state.courses = updatedCourses;
        },
        editCourse: (state, action) => {
            const updatedCourse = action.payload;
            const courseId = updatedCourse.courseId;
            let updatedCourses = [...state.courses];
            for (let i = 0; i < updatedCourses.length; i++) {
                if (updatedCourses[i].courseId === courseId) {
                    updatedCourses[i] = {...updatedCourses[i], ...updatedCourse};
                    break;
                }
            }
            state.courses = updatedCourses;
        },
        deleteCourse: (state, action) => {
            const courseId = action.payload;
            const updatedCourses = state.courses.filter((course) => { return course.courseId !== courseId });
            state.courses = updatedCourses;
        },
        setIsDuplicated: (state, action) => {
            const status = action.payload;
            state.isDuplicated = status;
        }
    }
});

export const { 
    fetchCourses, 
    createCourse, 
    editCourse, 
    deleteCourse,
    setIsDuplicated
} = courseSlice.actions;

export default courseSlice.reducer;