import {
    fetchCourses as fetchCoursesApi,
    createCourse as createCourseApi,
    editCourse as editCourseApi,
    deleteCourse as deleteCourseApi
} from '../../apis/course.api';
import {
    deleteCascadeClass as deleteCascadeClassApi
} from '../../apis/class.api';
import {
    takeEvery,
    put
} from 'redux-saga/effects';
import {
    fetchCourses as fetchCoursesReducer,
    createCourse as createCourseReducer,
    editCourse as editCourseReducer,
    deleteCourse as deleteCourseReducer,
    setIsDuplicated as setIsDuplicatedReducer
} from '../slices/course.slice';

import { deleteCascade as deleteCascadeReducer } from '../slices/class.slice';

/////////////////////////////// Api callers ///////////////////////////////
export function* fetchSaga() {
    const res: { success: boolean, courses: Array<Object> } = yield fetchCoursesApi();
    if (res && res.success) {
        yield put(fetchCoursesReducer(res.courses));
        console.log(`SUCCESS: successfully retrieved all courses from backend`);
    } else {
        console.log("ERROR: failed to retrieve courses from backend");
    }
}

function* createSaga(action: any) {
    const newCourse = action.payload;
    const res: { success: boolean, message: string } = yield createCourseApi(newCourse);
    if (res && res.success) {
        yield put(createCourseReducer(newCourse));
        yield put(setIsDuplicatedReducer(0));
        console.log(`SUCCESS: successfully created a new course named ${newCourse.courseName}`);
    } else {
        if (res.success === false && res.message === "Duplicated") {
            yield put(setIsDuplicatedReducer(1));
            console.log("ERROR: this course is duplicated");
        }
        console.log(`ERROR: failed to create new course named ${newCourse.courseName}. \n${res.message}`);
    }
}

function* editSaga(action: any) {
    const updatedCourse = action.payload;
    const res: { success: boolean, message: string } = yield editCourseApi(updatedCourse);
    if (res && res.success) {
        yield put(editCourseReducer(updatedCourse));
        console.log(`SUCCESS: successfully edited course with id ${updatedCourse.courseId}`);
    } else {
        console.log(`ERROR: failed to edit course with id ${updatedCourse.courseId}. \n${res.message}`)
    }
}

function* deleteSaga(action: any) {
    const courseId = action.payload;
    const deleteCourseRes: { success: boolean, message: string } = yield deleteCourseApi(courseId);
    if (deleteCourseRes && deleteCourseRes.success) {
        yield put(deleteCourseReducer(courseId));
        const deleteClassesRes: { success: boolean } = yield deleteCascadeClassApi(courseId);
        if (deleteClassesRes.success) {
            yield put(deleteCascadeReducer(courseId));
            console.log(`SUCCESS: successfully removed course with id ${courseId} and all of its classes`);
        }
    } else {
        console.log(`ERROR: could not remove course with id ${courseId}. \n${deleteCourseRes.message}`);
    }
}

function* resetIsDuplicatedSaga() {
    yield put(setIsDuplicatedReducer(2));
}
//////////////////////////////////////////////////////////////////////////

/////////////////////////////// Listeners ///////////////////////////////
export function* listenFetch() {
    yield takeEvery("course/fetch", fetchSaga);
}

export function* listenCreate() {
    yield takeEvery("course/create", createSaga);
}

export function* listenEdit() {
    yield takeEvery("course/edit", editSaga);
}

export function* listenDelete() {
    yield takeEvery("course/delete", deleteSaga);
}

export function* listenResetIsDuplicated() {
    yield takeEvery("course/resetIsDuplicated", resetIsDuplicatedSaga);
}
////////////////////////////////////////////////////////////////////////