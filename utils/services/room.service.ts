import { RoomObject } from "../../redux/slices/room.slice";

export const getRoom = (RoomsData: Array<RoomObject>, roomId: string) => {
    const room = RoomsData.filter((roomItem) => {
        return roomItem.roomId === roomId;
    })[0];
    return room;
};

export const getRoomName = (RoomsData: Array<RoomObject>, roomId: string) => {
    const room = getRoom(RoomsData, roomId);
    if (!room) {
        return "undefined";
    } else {
        return room.roomName;
    }
};