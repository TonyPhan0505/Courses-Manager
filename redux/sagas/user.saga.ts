import { 
    userLogin as userLoginApi, 
    fetchUsers as fetchUsersApi 
} from "../../apis/user.api";
import {
    takeEvery,
    put
} from 'redux-saga/effects';
import { 
    loginUser as loginUserReducer, 
    fetchUsers as fetchUsersReducer,
    logoutUser as logoutUserReducer,
    failedLogin as failedLoginReducer
} from "../slices/user.slice";
import AsyncStorage from "@react-native-async-storage/async-storage";

const setAccessToken = async (accessToken: string) => {
    try {
        await AsyncStorage.setItem('accessToken', accessToken);
    } catch (err) {
        console.log(err);
        return false;
    }
    return true;
};

/////////////////////////////// Api callers ///////////////////////////////
function* logInSaga(action: any) {
    const user = action.payload;
    const res: { success: boolean, user: any, accessToken: string } = yield userLoginApi(user.username, user.password);
    if (res && res && res.success) {
        const accessTokenSaved: Boolean = yield setAccessToken(res.accessToken);
        if (accessTokenSaved) {
            yield put(loginUserReducer(res.user));
            console.log(`SUCCESS: successfully logged in user with name ${user.username}`);
        } else {
            console.log(`ERROR: failed to save access token`);
        }
    } else {
        yield put(failedLoginReducer());
        console.log(`ERROR: login failed.`);
    }
}

export function* fetchSaga() {
    const res: { success: boolean, users: Array<Object> } = yield fetchUsersApi();
    if (res && res.success) {
        yield put(fetchUsersReducer(res.users));
        console.log(`SUCCESS: successfully retrieved all users from backend`);
    } else {
        console.log(`ERROR: failed to retrieve users from backend.`);
    }
}

function* logoutSaga() {
    yield put(logoutUserReducer());
    console.log(`SUCCESS: successfully logged out`);
}
//////////////////////////////////////////////////////////////////////////

/////////////////////////////// Listeners ///////////////////////////////
export function* listenLogin() {
    yield takeEvery("user/login", logInSaga);
}

export function* listenFetch() {
    yield takeEvery("user/fetch", fetchSaga);
}

export function* listenLogout() {
    yield takeEvery("user/logout", logoutSaga);
}
/////////////////////////////////////////////////////////////////////////