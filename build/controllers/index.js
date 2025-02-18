"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkoutLogController = exports.UserFooddbController = exports.FoodController = exports.DietLogController = exports.ClientUserController = exports.CoachUserController = void 0;
var coachuser_1 = require("./coachuser");
Object.defineProperty(exports, "CoachUserController", { enumerable: true, get: function () { return __importDefault(coachuser_1).default; } });
var clientuser_1 = require("./clientuser");
Object.defineProperty(exports, "ClientUserController", { enumerable: true, get: function () { return __importDefault(clientuser_1).default; } });
var dietlog_1 = require("./dietlog");
Object.defineProperty(exports, "DietLogController", { enumerable: true, get: function () { return __importDefault(dietlog_1).default; } });
var foodlist_1 = require("./foodlist");
Object.defineProperty(exports, "FoodController", { enumerable: true, get: function () { return __importDefault(foodlist_1).default; } });
var userfooddb_1 = require("./userfooddb");
Object.defineProperty(exports, "UserFooddbController", { enumerable: true, get: function () { return __importDefault(userfooddb_1).default; } });
var workoutlog_1 = require("./workoutlog");
Object.defineProperty(exports, "WorkoutLogController", { enumerable: true, get: function () { return __importDefault(workoutlog_1).default; } });
