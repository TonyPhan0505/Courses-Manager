import { createSlice } from "@reduxjs/toolkit";

export type RoomObject = {
    roomId: string;
    roomName: string;
};

const initialRooms: Array<RoomObject> = [];

export const roomSlice = createSlice({
    name: 'room',
    initialState: {
        rooms: initialRooms
    },
    reducers: {
        fetchRooms: (state, action) => {
            const rooms = action.payload;
            state.rooms = rooms;
        }
    }
});

export const { 
    fetchRooms
} = roomSlice.actions;

export default roomSlice.reducer;