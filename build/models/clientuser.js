"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var Schema = mongoose_1.default.Schema;
var ClientUserSchema = new Schema({
    email: {
        type: String,
        lowercase: true,
        trim: true,
        required: false,
    },
    firebaseUserId: {
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
    inviteAccepted: {
        type: Boolean,
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
    duration: {
        type: String,
        required: false,
    },
    coachId: {
        type: Schema.Types.ObjectId,
        ref: 'CoachUser'
    }
}, {
    timestamps: true,
});
exports.default = mongoose_1.default.model('ClientUser', ClientUserSchema);
