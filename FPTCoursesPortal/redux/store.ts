import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from 'redux-saga';
import userReducer from './slices/user.slice';
import roomReducer from './slices/room.slice';
import buildingReducer from './slices/building.slice';
import courseReducer from './slices/course.slice';
import classReducer from './slices/class.slice';
import rootSaga from "./sagas/root.saga";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer: {
        user: userReducer,
        room: roomReducer,
        building: buildingReducer,
        course: courseReducer,
        class: classReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware)
});

sagaMiddleware.run(rootSaga);

export default store;