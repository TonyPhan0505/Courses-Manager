import {
    fetchClasses as fetchClassesApi,
    createClass as createClassApi,
    editClass as editClassApi,
    deleteClass as deleteClassApi
} from '../../apis/class.api'; 
import {
    takeEvery,
    put
} from 'redux-saga/effects';
import {
    setClasses as setClassesReducer,
    createClass as createClassReducer,
    editClass as editClassReducer,
    deleteClass as deleteClassReducer,
    setIsTimeConflicted as setIsTimeConflictedReducer
} from '../slices/class.slice';

/////////////////////////////// Api callers ///////////////////////////////
export function* fetchSaga() {
    const res: { success: boolean, classes: Array<Object> } = yield fetchClassesApi();
    if (res && res.success) {
        yield put(setClassesReducer(res.classes));
        console.log(`SUCCESS: successfully retrieved all classes from backend`);
    } else {
        console.log(`ERROR: failed to retrieve classes from backend`);
    }
}

function* createSaga(action: any) {
    const newClass = action.payload;
    const res: { success: boolean, message: string } = yield createClassApi(newClass);
    if (res && res.success) {
        yield put(createClassReducer(newClass));
        yield put(setIsTimeConflictedReducer(0));
        console.log(`SUCCESS: successfully created a new class named ${newClass.className}`);
    } else {
        if (res.success === false && res.message === "Time conflict") {
            yield put(setIsTimeConflictedReducer(1));
            console.log("ERROR: the new class has time conflicts");
        }
        console.log(`ERROR: failed to create new class named ${newClass.className}`);
    }
}

function* editSaga(action: any) {
    const updatedClass = action.payload;
    const res: { success: boolean } = yield editClassApi(updatedClass);
    if (res && res.success) {
        yield put(editClassReducer(updatedClass));
        console.log(`SUCCESS: successfully edited class with id ${updatedClass.classId}`);
    } else {
        console.log(`ERROR: failed to edit class with id ${updatedClass.classId}`);
    }
}

function* deleteSaga(action: any) {
    const classId = action.payload;
    const res: { success: boolean } = yield deleteClassApi(classId);
    if (res && res.success) {
        yield put(deleteClassReducer(classId));
        console.log(`SUCCESS: successfully removed class with id ${classId}`);
    } else {
        console.log(`ERROR: failed to remove class with id ${classId}`);
    }
}

function* resetTimeConflictStatusSaga() {
    yield put(setIsTimeConflictedReducer(2));
}
//////////////////////////////////////////////////////////////////////////

/////////////////////////////// Listeners ///////////////////////////////
export function* listenFetch() {
    yield takeEvery('class/fetch', fetchSaga);
}

export function* listenCreate() {
    yield takeEvery('class/create', createSaga);
}

export function* listenEdit() {
    yield takeEvery('class/edit', editSaga);
}

export function* listenDelete() {
    yield takeEvery('class/delete', deleteSaga)
}

export function* listenResetTimeConflictStatus() {
    yield takeEvery('class/resetTimeConflictStatus', resetTimeConflictStatusSaga)
}
//////////////////////////////////////////////////////////////////////////