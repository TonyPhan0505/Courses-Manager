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
exports.signUp = exports.fetch = exports.login = void 0;
///////////////////////////// Import dependencies ///////////////////////////////
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_model_1 = __importDefault(require("../models/user.model"));
/////////////////////////////////////////////////////////////////////////////////
//////////////////////// Functions to be executed for HTTP routes ///////////////////////////
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield user_model_1.default.findOne({ username: req.body.username }).then((user) => {
        if (!user || !user.comparePassword(req.body.password)) {
            return res.status(401).send({ success: false, message: 'ERROR: Invalid username or password.' });
        }
        try {
            const secretKey = process.env.LOGIN_SECRET_KEY;
            const accessToken = jsonwebtoken_1.default.sign({ username: user.username }, secretKey);
            return res.status(200).send({ success: true, user, accessToken });
        }
        catch (loginError) {
            return res.status(500).send({ success: false, message: `ERROR: ${loginError}.` });
        }
    }).catch(checkCredentialsError => {
        return res.status(500).send({ success: false, message: `ERROR: ${checkCredentialsError}.` });
    });
});
exports.login = login;
const fetch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield user_model_1.default.find({}).then(users => {
        return res.status(200).send({ success: true, users });
    }).catch(fetchUserError => {
        return res.status(500).send({ success: false, message: `ERROR: ${fetchUserError}.` });
    });
});
exports.fetch = fetch;
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const newUser = new user_model_1.default({
        username,
        hashedPassword: bcrypt_1.default.hashSync(password, 10)
    });
    yield newUser.save().then(() => {
        return res.status(200).send({ success: true, message: `SUCCESS: successfully created new user named ${username}` });
    }).catch(saveUserError => {
        return res.status(500).send({ success: false, message: `ERROR: failed to create new user. ${saveUserError}` });
    });
});
exports.signUp = signUp;
////////////////////////////////////////////////////////////////////////////////////////////
//# sourceMappingURL=user.controller.js.map