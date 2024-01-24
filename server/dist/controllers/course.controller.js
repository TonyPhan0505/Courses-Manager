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
exports.deleteCourse = exports.edit = exports.create = exports.fetch = void 0;
///////////////////////////// Import dependencies ///////////////////////////////
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const course_model_1 = __importDefault(require("../models/course.model"));
////////////////////////////////////////////////////////////////////////////////
////////////////////// Functions to be executed for HTTP routes ///////////////////////
const fetch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const accessToken = req.body.accessToken;
    jsonwebtoken_1.default.verify(accessToken, process.env.LOGIN_SECRET_KEY, (fetchCourseVerifyError) => __awaiter(void 0, void 0, void 0, function* () {
        if (fetchCourseVerifyError) {
            return res.status(400).send({ success: false, message: `ERROR: ${fetchCourseVerifyError}.` });
        }
        else {
            course_model_1.default.find({}).then(courses => {
                return res.status(200).send({ success: true, courses });
            }).catch(fetchCourseError => {
                return res.status(500).send({ success: false, message: `ERROR: ${fetchCourseError}.` });
            });
        }
    }));
});
exports.fetch = fetch;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const accessToken = req.body.accessToken;
    const newCourse = req.body.newCourse;
    jsonwebtoken_1.default.verify(accessToken, process.env.LOGIN_SECRET_KEY, (createCourseVerifyError) => __awaiter(void 0, void 0, void 0, function* () {
        if (createCourseVerifyError) {
            return res.status(400).send({ success: false, message: `ERROR: ${createCourseVerifyError}.` });
        }
        else {
            const query = {
                courseName: newCourse.courseName,
                trainer: newCourse.trainer,
                manager: newCourse.manager,
                buildingId: newCourse.buildingId,
                roomId: newCourse.roomId
            };
            yield course_model_1.default.find(query).then((results) => {
                for (const result of results) {
                    const resultStartedDate = new Date(result.startedDate).getDate();
                    const resultStartedMonth = new Date(result.startedDate).getMonth();
                    const resultStartedYear = new Date(result.startedDate).getFullYear();
                    const resultEndedDate = new Date(result.endedDate).getDate();
                    const resultEndedMonth = new Date(result.endedDate).getMonth();
                    const resultEndedYear = new Date(result.endedDate).getFullYear();
                    const newStartedDate = new Date(newCourse.startedDate).getDate();
                    const newStartedMonth = new Date(newCourse.startedDate).getMonth();
                    const newStartedYear = new Date(newCourse.startedDate).getFullYear();
                    const newEndedDate = new Date(newCourse.endedDate).getDate();
                    const newEndedMonth = new Date(newCourse.endedDate).getMonth();
                    const newEndedYear = new Date(newCourse.endedDate).getFullYear();
                    if (resultStartedDate === newStartedDate
                        &&
                            resultStartedMonth === newStartedMonth
                        &&
                            resultStartedYear === newStartedYear
                        &&
                            resultEndedDate === newEndedDate
                        &&
                            resultEndedMonth === newEndedMonth
                        &&
                            resultEndedYear === newEndedYear) {
                        return res.status(409).send({ success: false, message: "Duplicated" });
                    }
                }
                const newRecord = new course_model_1.default({
                    courseId: newCourse.courseId,
                    courseName: newCourse.courseName,
                    trainer: newCourse.trainer,
                    manager: newCourse.manager,
                    startedDate: newCourse.startedDate,
                    endedDate: newCourse.endedDate,
                    buildingId: newCourse.buildingId,
                    roomId: newCourse.roomId
                });
                newRecord.save().then(() => {
                    return res.status(200).send({ success: true, message: `SUCCESS: successfully created new course.` });
                }).catch(saveCourseError => {
                    return res.status(500).send({ success: false, message: `ERROR: ${saveCourseError}.` });
                });
            }).catch(err => {
                return res.status(500).send({ success: false, message: `Internal server error when creating new course. ${err}.` });
            });
        }
    }));
});
exports.create = create;
const edit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedCourse = req.body.updatedCourse;
    const accessToken = req.body.accessToken;
    jsonwebtoken_1.default.verify(accessToken, process.env.LOGIN_SECRET_KEY, (editCourseVerifyError) => __awaiter(void 0, void 0, void 0, function* () {
        if (editCourseVerifyError) {
            return res.status(400).send({ success: false, message: `ERROR: ${editCourseVerifyError}.` });
        }
        else {
            yield course_model_1.default.updateOne({ courseId: updatedCourse.courseId }, updatedCourse);
            return res.status(200).send({ success: true, message: `SUCCESS: course named ${updatedCourse.courseName} was successfully updated.` });
        }
    }));
});
exports.edit = edit;
const deleteCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const courseId = req.body.courseId;
    const accessToken = req.body.accessToken;
    jsonwebtoken_1.default.verify(accessToken, process.env.LOGIN_SECRET_KEY, (deleteCourseVerifyError) => __awaiter(void 0, void 0, void 0, function* () {
        if (deleteCourseVerifyError) {
            return res.status(400).send({ success: false, message: `ERROR: Invalid access token when deleting course. ${deleteCourseVerifyError}.` });
        }
        else {
            yield course_model_1.default.deleteOne({ courseId });
            return res.status(200).send({ success: true, message: `SUCCESS: successfully deleted course.` });
        }
    }));
});
exports.deleteCourse = deleteCourse;
//////////////////////////////////////////////////////////////////////////////////////
//# sourceMappingURL=course.controller.js.map