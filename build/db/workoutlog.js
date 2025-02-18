"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWorkoutLogsByDate = exports.saveWorkoutLog = void 0;
// @ts-nocheck
var workoutlog_1 = __importDefault(require("../models/workoutlog"));
var saveWorkoutLog = function (userId, date, day, group, exerciseArray) { return __awaiter(void 0, void 0, void 0, function () {
    var workoutLog, savedWorkoutLog;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, workoutlog_1.default.findOne({ user: userId, date: date })];
            case 1:
                workoutLog = _a.sent();
                if (workoutLog) {
                    if (day)
                        workoutLog.day = day;
                    if (group)
                        workoutLog.group = group;
                    workoutLog.exerciseArray = (exerciseArray === null || exerciseArray === void 0 ? void 0 : exerciseArray.filter(function (exercise) { return exercise !== null; })) || [];
                }
                else {
                    // If a workoutLog document does not exist, create a new one with the new data
                    workoutLog = new workoutlog_1.default({
                        user: userId,
                        date: date,
                        day: day,
                        group: group,
                        exerciseArray: exerciseArray,
                    });
                }
                return [4 /*yield*/, workoutLog.save()];
            case 2:
                savedWorkoutLog = _a.sent();
                return [2 /*return*/, savedWorkoutLog];
        }
    });
}); };
exports.saveWorkoutLog = saveWorkoutLog;
var getWorkoutLogsByDate = function (userId, day, startDate, endDate) { return __awaiter(void 0, void 0, void 0, function () {
    var filter, workoutLogs;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                if (new Date(startDate) > new Date(endDate)) {
                    _a = [endDate, startDate], startDate = _a[0], endDate = _a[1];
                }
                filter = {
                    user: userId,
                    date: { $gte: startDate, $lte: endDate },
                };
                if (day) {
                    filter.day = day;
                }
                return [4 /*yield*/, workoutlog_1.default.find(filter)
                        .sort({ date: -1 })];
            case 1:
                workoutLogs = _b.sent();
                if (day && workoutLogs.length > 1) {
                    return [2 /*return*/, workoutLogs[0]];
                }
                return [2 /*return*/, workoutLogs];
        }
    });
}); };
exports.getWorkoutLogsByDate = getWorkoutLogsByDate;
