import { all } from 'redux-saga/effects';
import { 
    listenLogin as listenLoginUser,
    listenFetch as listenFetchUser,
    listenLogout as listenLogoutUser
} from './user.saga';
import { listenFetch as listenFetchRoom } from './room.saga';
import {
    listenFetch as listenFetchCourse,
    listenCreate as listenCreateCourse,
    listenEdit as listenEditCourse,
    listenDelete as listenDeleteCourse,
    listenResetIsDuplicated
} from './course.saga';
import {
    listenFetch as listenFetchClass,
    listenCreate as listenCreateClass,
    listenEdit as listenEditClass,
    listenDelete as listenDeleteClass,
    listenResetTimeConflictStatus
} from './class.saga';
import { listenFetch as listenFetchBuilding } from './building.saga';
import { listenFetch as listenFetchData } from './data.saga';

export default function* rootSaga() {
    yield all([
        listenLoginUser(),
        listenFetchUser(),
        listenLogoutUser(),
        listenFetchRoom(),
        listenFetchCourse(),
        listenCreateCourse(),
        listenEditCourse(),
        listenDeleteCourse(),
        listenResetIsDuplicated(),
        listenFetchClass(),
        listenCreateClass(),
        listenEditClass(),
        listenDeleteClass(),
        listenResetTimeConflictStatus(),
        listenFetchBuilding(),
        listenFetchData()
    ]);
}