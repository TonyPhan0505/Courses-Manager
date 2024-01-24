import { CourseObject } from "../../redux/slices/course.slice";

export const getCourse = (CoursesData: Array<CourseObject>, courseId: string) => {
    const course = CoursesData.filter((courseItem) => { 
        return courseItem.courseId === courseId;
    })[0];
    return course;
};

export const getManager = (CoursesData: Array<CourseObject>, courseId: string) => {
    const course = getCourse(CoursesData, courseId);
    if (!course) {
        return "undefined";
    } else {
        return course.manager;
    }
};