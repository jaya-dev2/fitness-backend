"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var Schema = mongoose_1.default.Schema;
var FoodSchema = new Schema({
    category: {
        type: String,
        required: false,
    },
    food: {
        type: String,
        required: true,
    },
    portionSize: {
        type: String,
        required: true,
    },
    proteinGram: {
        type: Number,
        required: true,
    },
    carbGram: {
        type: Number,
        required: true,
    },
    fatGram: {
        type: Number,
        required: true,
    },
    energyKcal: {
        type: Number,
        required: true,
    }
});
//  Add indexing for text search on 'food' field
FoodSchema.index({ food: 'text' });
exports.default = mongoose_1.default.model('Food', FoodSchema, 'fooddbs');
