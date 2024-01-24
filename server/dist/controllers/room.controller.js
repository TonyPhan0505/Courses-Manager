"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = exports.fetch = void 0;
///////////////////////////// Import dependencies ///////////////////////////////
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const room_model_1 = __importDefault(require("../models/room.model"));
////////////////////////////////////////////////////////////////////////////////
//////////////////////// Functions to be executed for HTTP routes ///////////////////////////
const fetch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const accessToken = req.body.accessToken;
    jsonwebtoken_1.default.verify(accessToken, process.env.LOGIN_SECRET_KEY, (verifyRoomVerifyError) => __awaiter(void 0, void 0, void 0, function* () {
        if (verifyRoomVerifyError) {
            return res.status(400).send({ success: false, message: `ERROR: ${verifyRoomVerifyError}.` });
        }
        else {
            room_model_1.default.find({}).then(rooms => {
                return res.status(200).send({ success: true, rooms });
            }).catch(fetchRoomError => {
                return res.status(500).send({ success: false, message: `ERROR: ${fetchRoomError}.` });
            });
        }
    }));
});
exports.fetch = fetch;
// use in postman only
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const accessToken = req.body.accessToken;
    const newRoom = req.body.newRoom;
    jsonwebtoken_1.default.verify(accessToken, process.env.LOGIN_SECRET_KEY, (createRoomVerifyError) => __awaiter(void 0, void 0, void 0, function* () {
        if (createRoomVerifyError) {
            return res.status(400).send({ success: false, message: `ERROR: ${createRoomVerifyError}.` });
        }
        else {
            const newRecord = new room_model_1.default({
                roomId: newRoom.roomId,
                roomName: newRoom.roomName
            });
            yield newRecord.save().then(() => {
                return res.status(200).send({ success: true, message: `SUCCESS: successfully created new room.` });
            }).catch(saveRoomError => {
                return res.status(500).send({ success: false, message: `ERROR: ${saveRoomError}.` });
            });
        }
    }));
});
exports.create = create;
////////////////////////////////////////////////////////////////////////////////////////////
//# sourceMappingURL=room.controller.js.map