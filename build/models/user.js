"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var types_1 = require("../constants/types");
var Schema = mongoose_1.default.Schema;
var UserSchema = new Schema({
    role: {
        type: String,
        required: true,
        enum: Object.values(types_1.UserRole),
    },
    // userId: {
    //   type: String,
    //   required: true,
    // },
    clientEmail: {
        type: String,
        lowercase: true,
        trim: true,
        unique: true,
        required: false,
    },
    coachEmail: {
        type: String,
        lowercase: true,
        trim: true,
        unique: true,
        required: false,
    },
    fullName: {
        type: String,
        required: false,
    },
    displayName: {
        type: String,
        required: false,
    },
    displayPicture: {
        type: String,
        required: false,
    },
    startDate: {
        type: String,
        required: false,
    },
    endDate: {
        type: String,
        required: false,
    },
}, {
    timestamps: true,
});
exports.default = mongoose_1.default.model('User', UserSchema);
