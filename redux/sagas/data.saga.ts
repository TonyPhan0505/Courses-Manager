import {
    takeEvery
} from 'redux-saga/effects';
import { fetchSaga as fetchBuildingsSaga } from './building.saga';
import { fetchSaga as fetchRoomsSaga } from './room.saga';
import { fetchSaga as fetchCoursesSaga } from './course.saga';
import { fetchSaga as fetchClassesSaga } from './class.saga';
import { fetchSaga as fetchUsersSaga } from './user.saga';

/////////////////////////////// Middleware ///////////////////////////////
function* fetchSaga() {
    yield fetchUsersSaga();
    yield fetchBuildingsSaga();
    yield fetchRoomsSaga();
    yield fetchCoursesSaga();
    yield fetchClassesSaga();
}
/////////////////////////////////////////////////////////////////////////

/////////////////////////////// Listeners ///////////////////////////////
export function* listenFetch() {
    yield takeEvery("data/fetch", fetchSaga);
}
///////////////////////////////////////////////////////////////////////