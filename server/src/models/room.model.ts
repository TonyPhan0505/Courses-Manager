////////////// Import dependencies //////
import roomMongoose from 'mongoose';
const roomSchema = roomMongoose.Schema;
////////////////////////////////////////

////////////// Create a database schema ////////////
const RoomSchema = new roomSchema({
    roomId: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    roomName: {
        type: String,
        trim: true,
        required: true
    }
});
///////////////////////////////////////////////////

//////////////////////// Exports //////////////////////
export default roomMongoose.model('Room', RoomSchema);
//////////////////////////////////////////////////////