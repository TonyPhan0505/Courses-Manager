"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
////////////// Import dependencies //////
const mongoose_1 = __importDefault(require("mongoose"));
const roomSchema = mongoose_1.default.Schema;
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
exports.default = mongoose_1.default.model('Room', RoomSchema);
//////////////////////////////////////////////////////
//# sourceMappingURL=room.model.js.map