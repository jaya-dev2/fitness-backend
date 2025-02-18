"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var Schema = mongoose_1.default.Schema;
var WorkoutLogSchema = new Schema({
    exerciseArray: [
        {
            muscleGroup: {
                type: String,
                required: false
            },
            name: {
                type: String,
                required: false
            },
            IsUnitInSecs: {
                type: Boolean,
                required: false
            },
            notes: {
                type: String,
                required: false
            },
            videoLink: {
                type: String,
                required: false
            },
            sets: [{
                    weight: {
                        type: Number
                    },
                    reps: {
                        type: Number
                    }
                }
            ],
            warmupSets: [{
                    weight: {
                        type: Number
                    },
                    reps: {
                        type: Number
                    }
                }
            ]
        }
    ],
    date: {
        type: String,
        // default: Date.now,
    },
    day: {
        type: Number,
        required: false,
    },
    group: {
        type: String,
        required: false,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
}, {
    timestamps: true,
});
exports.default = mongoose_1.default.model('WorkoutLog', WorkoutLogSchema);
