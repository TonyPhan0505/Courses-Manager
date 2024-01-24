import { fetchRooms as fetchRoomsApi } from "../../apis/room.api";
import {
    takeEvery,
    put
} from 'redux-saga/effects';

import { fetchRooms as fetchRoomsReducer } from "../slices/room.slice";

/////////////////////////////// Api callers ///////////////////////////////
export function* fetchSaga() {
    const res: { success: boolean, rooms: Array<Object> } = yield fetchRoomsApi();
    if (res && res.success) {
        yield put(fetchRoomsReducer(res.rooms));
        console.log(`SUCCESS: successfully retrieved all rooms from backend`);
    } else {
        console.log("ERROR: failed to retrieve rooms from backend");
    }
}
//////////////////////////////////////////////////////////////////////////

/////////////////////////////// Listeners ///////////////////////////////
export function* listenFetch() {
    yield takeEvery("room/fetch", fetchSaga);
}
////////////////////////////////////////////////////////////////////////