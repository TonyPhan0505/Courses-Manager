"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/////////////////////// Import dependencies /////////////////////
const express_1 = __importDefault(require("express"));
const class_controller_1 = require("../controllers/class.controller");
const classRouter = express_1.default.Router();
/////////////////////////////////////////////////////////////////
/////////////////////////// Routes ///////////////////////////
classRouter.route('/fetch')
    .post(class_controller_1.fetch);
classRouter.route('/create')
    .post(class_controller_1.create);
classRouter.route('/edit')
    .put(class_controller_1.edit);
classRouter.route('/delete')
    .delete(class_controller_1.deleteClass);
classRouter.route('/deleteCascade')
    .delete(class_controller_1.deleteCascade);
/////////////////////////////////////////////////////////////
///////// Exports /////////
exports.default = classRouter;
//////////////////////////
//# sourceMappingURL=class.route.js.map