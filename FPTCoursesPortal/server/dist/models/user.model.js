"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
////////////// Import dependencies //////
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const userSchema = mongoose_1.default.Schema;
////////////////////////////////////////
////////////// Create a database schema ////////////
const UserSchema = new userSchema({
    username: {
        type: String,
        unique: true,
        trim: true,
        required: true
    },
    hashedPassword: {
        type: String,
        required: true,
        trim: true
    }
});
///////////////////////////////////////////////////
//////////// compare raw password with its hashed version //////////
UserSchema.methods.comparePassword = function (password) {
    return bcrypt_1.default.compareSync(password, this.hashedPassword);
};
///////////////////////////////////////////////////////////////////
//////////////////////// Exports //////////////////////
exports.default = mongoose_1.default.model('User', UserSchema);
//////////////////////////////////////////////////////
//# sourceMappingURL=user.model.js.map