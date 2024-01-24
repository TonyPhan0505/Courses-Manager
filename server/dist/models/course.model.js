"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
////////////// Import dependencies //////
const mongoose_1 = __importDefault(require("mongoose"));
const courseSchema = mongoose_1.default.Schema;
////////////////////////////////////////
////////////// Create a database schema ////////////
const CourseSchema = new courseSchema({
    courseId: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    courseName: {
        type: String,
        required: true,
        trim: true
    },
    trainer: {
        type: String,
        required: true,
        trim: true
    },
    manager: {
        type: String,
        required: true,
        trim: true
    },
    startedDate: {
        type: Date,
        required: true
    },
    endedDate: {
        type: Date,
        required: true
    },
    buildingId: {
        type: String,
        required: true
    },
    roomId: {
        type: String,
        required: true
    }
});
///////////////////////////////////////////////////
//////////////////////// Exports //////////////////////
exports.default = mongoose_1.default.model('Course', CourseSchema);
//////////////////////////////////////////////////////
//# sourceMappingURL=course.model.js.map