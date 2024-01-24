import { createSlice } from "@reduxjs/toolkit";

export type ClassData = {
    courseId: string;
    className: string;
    trainer: string;
    date: Date;
    startedTime: Date;
    endedTime: Date;
    buildingId: string;
    roomId: string;
    classId: string;
};

const initialClasses: Array<ClassData> = [];

const classSlice = createSlice({
    name: 'class',
    initialState: {
        classes: initialClasses,
        isTimeConflicted: 2
    },
    reducers: {
        setClasses: (state, action) => {
            const classes = action.payload;
            state.classes = classes;
        },
        createClass: (state, action) => {
            const newClass = action.payload;
            const updatedClasses = [...state.classes, newClass];
            state.classes = updatedClasses;
        },
        editClass: (state, action) => {
            const updatedClass = action.payload;
            const classId = updatedClass.classId;
            let updatedClasses = [...state.classes];
            for (let i = 0; i < updatedClasses.length; i++) {
                if (updatedClasses[i].classId === classId) {
                    updatedClasses[i] = {...updatedClasses[i], ...updatedClass};
                    break;
                }
            }
            state.classes = updatedClasses;
        },
        deleteClass: (state, action) => {
            const classId = action.payload;
            const updatedClasses = state.classes.filter((classItem) => { return classItem.classId !== classId });
            state.classes = updatedClasses;
        },
        deleteCascade: (state, action) => {
            const courseId = action.payload;
            let updatedClasses = state.classes;
            updatedClasses = updatedClasses.filter((classItem) => {
                return classItem.courseId !== courseId;
            });
            state.classes = updatedClasses;
        },
        setIsTimeConflicted: (state, action) => {
            const status = action.payload;
            state.isTimeConflicted = status;
        }
    }
});

export const { 
    setClasses, 
    createClass, 
    editClass, 
    deleteClass, 
    deleteCascade,
    setIsTimeConflicted
} = classSlice.actions;

export default classSlice.reducer;