"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
////////////// Import dependencies //////
const mongoose_1 = __importDefault(require("mongoose"));
const classSchema = mongoose_1.default.Schema;
////////////////////////////////////////
////////////// Create a database schema ////////////
const ClassSchema = new classSchema({
    courseId: {
        type: String,
        required: true,
        trim: true
    },
    className: {
        type: String,
        required: true,
        trim: true
    },
    trainer: {
        type: String,
        required: true,
        trim: true
    },
    date: {
        type: Date,
        required: true
    },
    startedTime: {
        type: Date,
        required: true
    },
    endedTime: {
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
    },
    classId: {
        type: String,
        required: true,
        unique: true,
        trim: true
    }
});
///////////////////////////////////////////////////
//////////////////////// Exports //////////////////////
exports.default = mongoose_1.default.model('Class', ClassSchema);
//////////////////////////////////////////////////////
//# sourceMappingURL=class.model.js.map