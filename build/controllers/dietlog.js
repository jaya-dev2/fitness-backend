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
Object.defineProperty(exports, "__esModule", { value: true });
var dietlog_1 = require("../db/dietlog");
//  import {  deleteDietLog,    updateDietLog, } from "../db/dietlog";
var DietLogController = {
    save: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, _id, dietName, date, healthData, macronutrientsKcal, breakfast, lunch, dinner, snacks, breakfastTotal, lunchTotal, dinnerTotal, snacksTotal, TotalConsumedKcal, savedDietLog, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = req.body, _id = _a._id, dietName = _a.dietName, date = _a.date, healthData = _a.healthData, macronutrientsKcal = _a.macronutrientsKcal, breakfast = _a.breakfast, lunch = _a.lunch, dinner = _a.dinner, snacks = _a.snacks, breakfastTotal = _a.breakfastTotal, lunchTotal = _a.lunchTotal, dinnerTotal = _a.dinnerTotal, snacksTotal = _a.snacksTotal, TotalConsumedKcal = _a.TotalConsumedKcal;
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, (0, dietlog_1.saveDietLog)(_id, dietName, date, healthData, macronutrientsKcal, breakfast, lunch, dinner, snacks, breakfastTotal, lunchTotal, dinnerTotal, snacksTotal, TotalConsumedKcal)];
                case 2:
                    savedDietLog = _b.sent();
                    return [2 /*return*/, res.send(savedDietLog)];
                case 3:
                    error_1 = _b.sent();
                    console.error("Error while saving diet log -->", error_1);
                    return [2 /*return*/, res.status(500).json({ error: "An error occurred while saving the diet log." })];
                case 4: return [2 /*return*/];
            }
        });
    }); },
    getdietlogswithpagination: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var page, pageSize, searchQuery, _id, dietList, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    page = parseInt(req.query.page) || 1;
                    pageSize = 10;
                    searchQuery = req.query.search || "";
                    _id = req.body._id;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, (0, dietlog_1.fetchDietLogsWithPagination)(_id, page, pageSize, searchQuery)];
                case 2:
                    dietList = _a.sent();
                    return [2 /*return*/, res.send(dietList)];
                case 3:
                    error_2 = _a.sent();
                    console.error(error_2);
                    return [2 /*return*/, res.status(500).json({ message: 'Internal server error' })];
                case 4: return [2 /*return*/];
            }
        });
    }); },
    getdietlogswithid: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var _id, dietLogs, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _id = req.body._id;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, (0, dietlog_1.getDietLogsById)(_id)];
                case 2:
                    dietLogs = _a.sent();
                    return [2 /*return*/, res.send(dietLogs)];
                case 3:
                    error_3 = _a.sent();
                    console.error(error_3);
                    return [2 /*return*/, res.status(500).json({ message: 'Internal server error' })];
                case 4: return [2 /*return*/];
            }
        });
    }); },
    getByDate: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, _id, startDate, endDate, dietLogs;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = req.body, _id = _a._id, startDate = _a.startDate, endDate = _a.endDate;
                    return [4 /*yield*/, (0, dietlog_1.getDietLogsByDate)(_id, startDate, endDate)];
                case 1:
                    dietLogs = _b.sent();
                    return [2 /*return*/, res.send(dietLogs)];
            }
        });
    }); },
    create: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, _id, date, macronutrientsKcal, breakfast, lunch, dinner, snacks, newDietLog;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = req.body, _id = _a._id, date = _a.date, macronutrientsKcal = _a.macronutrientsKcal, breakfast = _a.breakfast, lunch = _a.lunch, dinner = _a.dinner, snacks = _a.snacks;
                    return [4 /*yield*/, (0, dietlog_1.createOrAddDietLog)(_id, date, macronutrientsKcal, breakfast ? breakfast.filter(function (meal) { return meal !== null; }) : [], lunch ? lunch.filter(function (meal) { return meal !== null; }) : [], dinner ? dinner.filter(function (meal) { return meal !== null; }) : [], snacks ? snacks.filter(function (meal) { return meal !== null; }) : [])];
                case 1:
                    newDietLog = _b.sent();
                    return [2 /*return*/, res.send(newDietLog)];
            }
        });
    }); },
    // update: async (req: Request, res: Response): Promise<any> => {
    //   const {foodDiaryId, breakfastId,lunchId,dinnerId,snacksId, breakfast, lunch,dinner,snacks
    //     } = req.body;
    //     const updatedDietLog = await updateDietLog(
    //       foodDiaryId,
    //       breakfastId,
    //       lunchId,
    //       dinnerId,
    //       snacksId,
    //       breakfast,
    //       lunch,
    //       dinner,
    //       snacks
    //     );
    //   console.log('updatedDietLog-->' + updatedDietLog)  
    //   return res.send(updatedDietLog);
    // },
    // delete: async (req: Request, res: Response): Promise<any> => {
    //   const { foodDiaryId, breakfastId,lunchId,dinnerId,snacksId} = req.body;
    //   // Check if the dietlog  is removing the food collection.
    //     const deletedDietLog = await deleteDietLog(foodDiaryId, breakfastId,lunchId,dinnerId,snacksId); 
    //     return res.send(deletedDietLog);
    //   // return res.status(ErrorCodes.Bad_Request).send(ErrorMessages.Generic);
    // },
};
exports.default = DietLogController;
