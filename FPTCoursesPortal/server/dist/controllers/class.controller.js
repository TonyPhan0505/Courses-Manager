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
exports.deleteCascade = exports.deleteClass = exports.edit = exports.create = exports.fetch = void 0;
///////////////////////////// Import dependencies ///////////////////////////////
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const class_model_1 = __importDefault(require("../models/class.model"));
////////////////////////////////////////////////////////////////////////////////
////////////////////// Functions to be executed for HTTP routes ///////////////////////
const fetch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const accessToken = req.body.accessToken;
    jsonwebtoken_1.default.verify(accessToken, process.env.LOGIN_SECRET_KEY, (fetchClassVerifyError) => __awaiter(void 0, void 0, void 0, function* () {
        if (fetchClassVerifyError) {
            return res.status(400).send({ success: false, message: `ERROR: ${fetchClassVerifyError}.` });
        }
        else {
            class_model_1.default.find({}).then(classes => {
                return res.status(200).send({ success: true, classes });
            }).catch(fetchClassError => {
                return res.status(500).send({ success: false, message: `ERROR: ${fetchClassError}.` });
            });
        }
    }));
});
exports.fetch = fetch;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const accessToken = req.body.accessToken;
    const newClass = req.body.newClass;
    jsonwebtoken_1.default.verify(accessToken, process.env.LOGIN_SECRET_KEY, (createClassVerifyError) => __awaiter(void 0, void 0, void 0, function* () {
        if (createClassVerifyError) {
            return res.status(400).send({ success: false, message: `ERROR: ${createClassVerifyError}.` });
        }
        else {
            // Check for class conflicts
            const query = {
                buildingId: newClass.buildingId,
                roomId: newClass.roomId,
                $or: [
                    {
                        $and: [
                            { startedTime: { $lte: newClass.startedTime } },
                            { endedTime: { $gte: newClass.startedTime } }
                        ]
                    },
                    {
                        $and: [
                            { startedTime: { $lte: newClass.endedTime } },
                            { endedTime: { $gte: newClass.endedTime } }
                        ]
                    }
                ]
            };
            // Check for conflicts in the database
            class_model_1.default.find(query).then((results) => {
                for (const result of results) {
                    const resultDate = new Date(result.date).getDate();
                    const resultMonth = new Date(result.date).getMonth();
                    const resultYear = new Date(result.date).getFullYear();
                    const newDate = new Date(newClass.date).getDate();
                    const newMonth = new Date(newClass.date).getMonth();
                    const newYear = new Date(newClass.date).getFullYear();
                    if (resultDate === newDate && resultMonth === newMonth && resultYear === newYear) {
                        return res.status(409).send({ success: false, message: "Time conflict" });
                    }
                }
                const newRecord = new class_model_1.default({
                    courseId: newClass.courseId,
                    className: newClass.className,
                    trainer: newClass.trainer,
                    date: newClass.date,
                    startedTime: newClass.startedTime,
                    endedTime: newClass.endedTime,
                    buildingId: newClass.buildingId,
                    roomId: newClass.roomId,
                    classId: newClass.classId
                });
                newRecord.save().then(() => {
                    return res.status(200).send({ success: true, message: `SUCCESS: successfully created new class.` });
                }).catch(saveClassError => {
                    return res.status(500).send({ success: false, message: `ERROR: ${saveClassError}.` });
                });
            }).catch(err => {
                return res.status(500).send({ success: false, message: `Internal server error. ${err}.` });
            });
        }
    }));
});
exports.create = create;
const edit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedClass = req.body.updatedClass;
    const accessToken = req.body.accessToken;
    jsonwebtoken_1.default.verify(accessToken, process.env.LOGIN_SECRET_KEY, (editClassVerifyError) => __awaiter(void 0, void 0, void 0, function* () {
        if (editClassVerifyError) {
            return res.status(400).send({ success: false, message: `ERROR: ${editClassVerifyError}.` });
        }
        else {
            yield class_model_1.default.updateOne({ classId: updatedClass.classId }, updatedClass);
            return res.status(200).send({ success: true, message: `SUCCESS: class named ${updatedClass.className} was successfully updated.` });
        }
    }));
});
exports.edit = edit;
const deleteClass = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const classId = req.body.classId;
    const accessToken = req.body.accessToken;
    jsonwebtoken_1.default.verify(accessToken, process.env.LOGIN_SECRET_KEY, (deleteClassVerifyError) => __awaiter(void 0, void 0, void 0, function* () {
        if (deleteClassVerifyError) {
            return res.status(400).send({ success: false, message: `ERROR: Invalid access token when deleting class. ${deleteClassVerifyError}.` });
        }
        else {
            yield class_model_1.default.deleteOne({ classId });
            return res.status(200).send({ success: true, message: `SUCCESS: successfully deleted class.` });
        }
    }));
});
exports.deleteClass = deleteClass;
const deleteCascade = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const courseId = req.body.courseId;
    const accessToken = req.body.accessToken;
    jsonwebtoken_1.default.verify(accessToken, process.env.LOGIN_SECRET_KEY, (deleteCascadeVerifyError) => __awaiter(void 0, void 0, void 0, function* () {
        if (deleteCascadeVerifyError) {
            return res.status(400).send({ success: false, message: `ERROR: Invalid access token when deleting class. ${deleteCascadeVerifyError}.` });
        }
        else {
            yield class_model_1.default.deleteMany({ courseId });
            return res.status(200).send({ success: true, message: `SUCCESS: successfully deleted classes.` });
        }
    }));
});
exports.deleteCascade = deleteCascade;
//////////////////////////////////////////////////////////////////////////////////////
//# sourceMappingURL=class.controller.js.map