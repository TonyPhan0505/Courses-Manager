"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/////////////////////// Import dependencies /////////////////////
const express_1 = __importDefault(require("express"));
const building_controller_1 = require("../controllers/building.controller");
const buildingRouter = express_1.default.Router();
/////////////////////////////////////////////////////////////////
/////////////////////////// Routes ///////////////////////////
buildingRouter.route('/fetch')
    .post(building_controller_1.fetch);
buildingRouter.route('/create')
    .post(building_controller_1.create);
/////////////////////////////////////////////////////////////
///////// Exports /////////
exports.default = buildingRouter;
//////////////////////////
//# sourceMappingURL=building.route.js.map