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
const building_model_1 = __importDefault(require("../models/building.model"));
////////////////////////////////////////////////////////////////////////////////
//////////////////////// Functions to be executed for HTTP routes ///////////////////////////
const fetch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const accessToken = req.body.accessToken;
    jsonwebtoken_1.default.verify(accessToken, process.env.LOGIN_SECRET_KEY, (fetchBuildingVerifyError) => __awaiter(void 0, void 0, void 0, function* () {
        if (fetchBuildingVerifyError) {
            return res.status(400).send({ success: false, message: `ERROR: ${fetchBuildingVerifyError}.` });
        }
        else {
            building_model_1.default.find({}).then((buildings) => {
                return res.status(200).send({ success: true, buildings });
            }).catch(fetchBuildingErr => {
                return res.status(500).send({ success: false, message: `ERROR: ${fetchBuildingErr}.` });
            });
        }
    }));
});
exports.fetch = fetch;
// use in postman only
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const accessToken = req.body.accessToken;
    const newBuilding = req.body.newBuilding;
    jsonwebtoken_1.default.verify(accessToken, process.env.LOGIN_SECRET_KEY, (createBuildingVerifyError) => __awaiter(void 0, void 0, void 0, function* () {
        if (createBuildingVerifyError) {
            return res.status(400).send({ success: false, message: `ERROR: ${createBuildingVerifyError}.` });
        }
        else {
            const newRecord = new building_model_1.default({
                buildingId: newBuilding.buildingId,
                buildingName: newBuilding.buildingName
            });
            yield newRecord.save().then(() => {
                return res.status(200).send({ success: true, message: `SUCCESS: successfully created new building.` });
            }).catch(saveBuildingError => {
                return res.status(500).send({ success: false, message: `ERROR: ${saveBuildingError}.` });
            });
        }
    }));
});
exports.create = create;
////////////////////////////////////////////////////////////////////////////////////////////
//# sourceMappingURL=building.controller.js.map