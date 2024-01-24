"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/////////////////////// Import dependencies /////////////////////
const express_1 = __importDefault(require("express"));
const room_controller_1 = require("../controllers/room.controller");
const roomRouter = express_1.default.Router();
/////////////////////////////////////////////////////////////////
/////////////////////////// Routes ///////////////////////////
roomRouter.route('/fetch')
    .post(room_controller_1.fetch);
roomRouter.route('/create')
    .post(room_controller_1.create);
/////////////////////////////////////////////////////////////
///////// Exports /////////
exports.default = roomRouter;
//////////////////////////
//# sourceMappingURL=room.route.js.map