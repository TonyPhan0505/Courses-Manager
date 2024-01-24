///////////////////////////// Import dependencies ///////////////////////////////
import roomJWT from 'jsonwebtoken';
import Room from '../models/room.model';
////////////////////////////////////////////////////////////////////////////////

//////////////////////// Functions to be executed for HTTP routes ///////////////////////////
export const fetch = async (req: any, res: any) => {
    const accessToken = req.body.accessToken;
    roomJWT.verify(accessToken, process.env.LOGIN_SECRET_KEY, async (verifyRoomVerifyError: any) => {
        if (verifyRoomVerifyError) {
            return res.status(400).send({ success: false, message: `ERROR: ${verifyRoomVerifyError}.` });
        } else {
            Room.find({}).then(rooms => {
                return res.status(200).send({ success: true, rooms });
            }).catch(fetchRoomError => {
                return res.status(500).send({ success: false, message: `ERROR: ${fetchRoomError}.` });
            });
    }});
};

// use in postman only
export const create = async (req: any, res: any) => {
    const accessToken = req.body.accessToken;
    const newRoom = req.body.newRoom;
    roomJWT.verify(accessToken, process.env.LOGIN_SECRET_KEY, async (createRoomVerifyError: any) => {
        if (createRoomVerifyError) {
            return res.status(400).send({ success: false, message: `ERROR: ${createRoomVerifyError}.` });
        } else {
            const newRecord = new Room({
                roomId: newRoom.roomId,
                roomName: newRoom.roomName
            });
            await newRecord.save().then(() => {
                return res.status(200).send({ success: true, message: `SUCCESS: successfully created new room.` });
            }).catch(saveRoomError => {
                return res.status(500).send({ success: false, message: `ERROR: ${saveRoomError}.` });
            });
        }
    });
};
////////////////////////////////////////////////////////////////////////////////////////////