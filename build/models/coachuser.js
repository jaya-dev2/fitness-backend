"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var Schema = mongoose_1.default.Schema;
var CoachUserSchema = new Schema({
    email: {
        type: String,
        lowercase: true,
        trim: true,
        unique: true,
        required: false,
    },
    firebaseUserID: {
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
    clients: [
        {
            type: Schema.Types.ObjectId,
            ref: 'ClientUser',
        },
    ],
}, {
    timestamps: true,
});
exports.default = mongoose_1.default.model('CoachUser', CoachUserSchema);
