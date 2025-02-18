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
exports.createOrAddDietLog = exports.getDietLogsByDate = exports.getDietLogsById = exports.fetchDietLogsWithPagination = exports.saveDietLog = void 0;
var dietlog_1 = __importDefault(require("../models/dietlog"));
var saveDietLog = function (userId, dietName, date, healthData, macronutrientsKcal, breakfast, lunch, dinner, snacks, breakfastTotal, lunchTotal, dinnerTotal, snacksTotal, TotalConsumedKcal) { return __awaiter(void 0, void 0, void 0, function () {
    var dietLog, savedDietLog;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, dietlog_1.default.findOne({ user: userId, date: date })];
            case 1:
                dietLog = _a.sent();
                if (dietLog) {
                    // If a DietLog document exists, update the foodDiary property with the new data
                    dietLog.dietName = dietName;
                    dietLog.healthData = healthData;
                    dietLog.macronutrientsKcal = macronutrientsKcal;
                    dietLog.breakfast = breakfast ? breakfast.filter(function (meal) { return meal !== null; }) : [];
                    dietLog.lunch = lunch ? lunch.filter(function (meal) { return meal !== null; }) : [];
                    dietLog.dinner = dinner ? dinner.filter(function (meal) { return meal !== null; }) : [];
                    dietLog.snacks = snacks ? snacks.filter(function (meal) { return meal !== null; }) : [];
                    dietLog.breakfastTotal = breakfastTotal;
                    dietLog.lunchTotal = lunchTotal;
                    dietLog.dinnerTotal = dinnerTotal;
                    dietLog.snacksTotal = snacksTotal;
                    dietLog.TotalConsumedKcal = TotalConsumedKcal;
                }
                else {
                    // If a DietLog document does not exist, create a new one with the new data
                    dietLog = new dietlog_1.default({
                        user: userId,
                        dietName: dietName,
                        date: date,
                        healthData: healthData,
                        macronutrientsKcal: macronutrientsKcal,
                        breakfast: breakfast,
                        lunch: lunch,
                        dinner: dinner,
                        snacks: snacks,
                        breakfastTotal: breakfastTotal,
                        lunchTotal: lunchTotal,
                        dinnerTotal: dinnerTotal,
                        snacksTotal: snacksTotal,
                        TotalConsumedKcal: TotalConsumedKcal
                    });
                }
                return [4 /*yield*/, dietLog.save()];
            case 2:
                savedDietLog = _a.sent();
                return [2 /*return*/, savedDietLog];
        }
    });
}); };
exports.saveDietLog = saveDietLog;
var fetchDietLogsWithPagination = function (userId, page, pageSize, searchQuery) { return __awaiter(void 0, void 0, void 0, function () {
    var skipAmount, Query, exactMatchQuery, partialMatchQuery, dietList;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                skipAmount = (page - 1) * pageSize;
                Query = { user: userId, dietName: { $ne: null } };
                if (searchQuery) {
                    exactMatchQuery = { dietName: searchQuery };
                    partialMatchQuery = { dietName: { $regex: searchQuery, $options: 'i' } };
                    Query.$or = [
                        exactMatchQuery,
                        partialMatchQuery, // Then try partial matching
                    ];
                }
                return [4 /*yield*/, dietlog_1.default.find(Query, {
                        dietName: 1,
                        date: 1,
                        TotalConsumedKcal: 1,
                        _id: 1,
                    })
                        .sort({ date: -1 })
                        .skip(skipAmount)
                        .limit(pageSize)];
            case 1:
                dietList = _a.sent();
                return [2 /*return*/, dietList];
        }
    });
}); };
exports.fetchDietLogsWithPagination = fetchDietLogsWithPagination;
var getDietLogsById = function (DietLogId) { return __awaiter(void 0, void 0, void 0, function () {
    var dietLogs;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, dietlog_1.default.find({ _id: DietLogId })];
            case 1:
                dietLogs = _a.sent();
                return [2 /*return*/, dietLogs];
        }
    });
}); };
exports.getDietLogsById = getDietLogsById;
var getDietLogsByDate = function (userId, startDate, endDate) { return __awaiter(void 0, void 0, void 0, function () {
    var dietLogs;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                if (new Date(startDate) > new Date(endDate)) {
                    _a = [endDate, startDate], startDate = _a[0], endDate = _a[1];
                }
                return [4 /*yield*/, dietlog_1.default.find({
                        user: userId,
                        date: { $gte: startDate, $lte: endDate },
                    })];
            case 1:
                dietLogs = _b.sent();
                return [2 /*return*/, dietLogs];
        }
    });
}); };
exports.getDietLogsByDate = getDietLogsByDate;
var createOrAddDietLog = function (userId, date, macronutrientsKcal, breakfast, lunch, dinner, snacks) { return __awaiter(void 0, void 0, void 0, function () {
    var addDietLog;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, dietlog_1.default.findOneAndUpdate({ user: userId, date: date, macronutrientsKcal: macronutrientsKcal }, { $push: { breakfast: breakfast, lunch: lunch, dinner: dinner, snacks: snacks } }, { new: true, upsert: true })];
            case 1:
                addDietLog = _a.sent();
                return [2 /*return*/, addDietLog];
        }
    });
}); };
exports.createOrAddDietLog = createOrAddDietLog;
