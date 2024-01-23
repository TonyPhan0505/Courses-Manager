import {
    fetchBuildings as fetchBuildingsApi
} from '../../apis/building.api';
import {
    takeEvery,
    put
} from 'redux-saga/effects';
import { fetchBuildings as fetchBuildingsReducer } from '../slices/building.slice';

/////////////////////////////// Api callers ///////////////////////////////
export function* fetchSaga() {
    const res: { success: boolean, buildings: Array<Object> } = yield fetchBuildingsApi();
    if (res && res.success) {
        yield put(fetchBuildingsReducer(res.buildings));
        console.log(`SUCCESS: successfully retrieved all buildings from backend`);
    } else {
        console.log(`ERROR: failed to retrieve buildings from backend`);
    }
}
//////////////////////////////////////////////////////////////////////////

/////////////////////////////// Listeners ///////////////////////////////
export function* listenFetch() {
    yield takeEvery('building/fetch', fetchSaga);
}
//////////////////////////////////////////////////////////////////////////