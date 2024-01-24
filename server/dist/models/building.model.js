"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
////////////// Import dependencies //////
const mongoose_1 = __importDefault(require("mongoose"));
const buildingSchema = mongoose_1.default.Schema;
////////////////////////////////////////
////////////// Create a database schema ////////////
const BuildingSchema = new buildingSchema({
    buildingId: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    buildingName: {
        type: String,
        required: true,
        trim: true
    }
});
///////////////////////////////////////////////////
//////////////////////// Exports //////////////////////
exports.default = mongoose_1.default.model('Building', BuildingSchema);
//////////////////////////////////////////////////////
//# sourceMappingURL=building.model.js.map