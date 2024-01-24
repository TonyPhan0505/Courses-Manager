"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/////////////////////// Import dependencies /////////////////////
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const userRouter = express_1.default.Router();
/////////////////////////////////////////////////////////////////
/////////////////////////// Routes ///////////////////////////
userRouter.route('/login')
    .post(user_controller_1.login);
userRouter.route('/signUp')
    .post(user_controller_1.signUp);
userRouter.route('/fetch')
    .get(user_controller_1.fetch);
/////////////////////////////////////////////////////////////
///////// Exports /////////
exports.default = userRouter;
//////////////////////////
//# sourceMappingURL=user.route.js.map