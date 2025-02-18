"use strict";
// @ts-nocheck
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
exports.fetchFoodInfoFromDb = exports.getNonProteinFoodsWithPaginationAndSearch = exports.getProteinFoodsWithPaginationAndSearch = void 0;
var models_1 = require("../models");
var getProteinFoodsWithPaginationAndSearch = function (page, pageSize, searchQuery) { return __awaiter(void 0, void 0, void 0, function () {
    var skipAmount, query, exactMatchQuery, partialMatchQuery, proteinFoods;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                skipAmount = (page - 1) * pageSize;
                query = { category: "Protein" };
                if (searchQuery) {
                    exactMatchQuery = { food: searchQuery };
                    partialMatchQuery = { food: { $regex: searchQuery, $options: 'i' } };
                    query.$or = [
                        exactMatchQuery,
                        partialMatchQuery, // Then try partial matching
                    ];
                }
                return [4 /*yield*/, models_1.Food.find(query, { food: 1, _id: 0, portionSize: 1, energyKcal: 1 })
                        .sort({ food: 1 })
                        .skip(skipAmount)
                        .limit(pageSize)];
            case 1:
                proteinFoods = _a.sent();
                // const foodNames = proteinFoods.map((food: any) => food.food);
                return [2 /*return*/, { protein: proteinFoods }];
        }
    });
}); };
exports.getProteinFoodsWithPaginationAndSearch = getProteinFoodsWithPaginationAndSearch;
var getNonProteinFoodsWithPaginationAndSearch = function (page, pageSize, searchQuery) { return __awaiter(void 0, void 0, void 0, function () {
    var skipAmount, query, exactMatchQuery, partialMatchQuery, nonProteinFoods;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                skipAmount = (page - 1) * pageSize;
                query = { category: { $ne: "Protein" } };
                if (searchQuery) {
                    exactMatchQuery = { food: searchQuery };
                    partialMatchQuery = { food: { $regex: searchQuery, $options: 'i' } };
                    query.$or = [
                        exactMatchQuery,
                        partialMatchQuery, // Then try partial matching
                    ];
                }
                return [4 /*yield*/, models_1.Food.find(query, { food: 1, _id: 0, portionSize: 1, energyKcal: 1 })
                        .sort({ 'food': 1 })
                        .skip(skipAmount)
                        .limit(pageSize)];
            case 1:
                nonProteinFoods = _a.sent();
                return [2 /*return*/, { nonproteinfood: nonProteinFoods }];
        }
    });
}); };
exports.getNonProteinFoodsWithPaginationAndSearch = getNonProteinFoodsWithPaginationAndSearch;
var fetchFoodInfoFromDb = function (userId, foodName) { return __awaiter(void 0, void 0, void 0, function () {
    var foodInfoFromFoodSchema, foodInfoFromUserFoodDBSchema;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, models_1.Food.findOne({ food: foodName })];
            case 1:
                foodInfoFromFoodSchema = _a.sent();
                if (!foodInfoFromFoodSchema) return [3 /*break*/, 2];
                return [2 /*return*/, foodInfoFromFoodSchema];
            case 2: return [4 /*yield*/, models_1.UserFooddb.findOne({ user: userId, food: foodName })];
            case 3:
                foodInfoFromUserFoodDBSchema = _a.sent();
                // Return the result from UserFooddb, even if it's null
                return [2 /*return*/, foodInfoFromUserFoodDBSchema];
        }
    });
}); };
exports.fetchFoodInfoFromDb = fetchFoodInfoFromDb;
