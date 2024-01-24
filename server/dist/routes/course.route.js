"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/////////////////////// Import dependencies /////////////////////
const express_1 = __importDefault(require("express"));
const course_controller_1 = require("../controllers/course.controller");
const courseRouter = express_1.default.Router();
/////////////////////////////////////////////////////////////////
/////////////////////////// Routes ///////////////////////////
courseRouter.route('/fetch')
    .post(course_controller_1.fetch);
courseRouter.route('/create')
    .post(course_controller_1.create);
courseRouter.route('/edit')
    .put(course_controller_1.edit);
courseRouter.route('/delete')
    .delete(course_controller_1.deleteCourse);
/////////////////////////////////////////////////////////////
///////// Exports /////////
exports.default = courseRouter;
//////////////////////////
//# sourceMappingURL=course.route.js.map