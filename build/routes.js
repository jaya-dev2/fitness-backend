"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var controllers_1 = require("./controllers");
var dietlog_1 = __importDefault(require("./controllers/dietlog"));
var foodlist_1 = __importDefault(require("./controllers/foodlist"));
var userfooddb_1 = __importDefault(require("./controllers/userfooddb"));
var protectedRoute_1 = require("./utils/protectedRoute");
var router = (0, express_1.Router)();
router.get('/', function (req, res) { return res.send('echo'); });
/**
 * firebase user
 */
router.post('/coachuser/get-or-create', protectedRoute_1.validateFirebaseIdToken, controllers_1.CoachUserController.createCoachUser);
router.post('/clientuser/get-or-create', protectedRoute_1.validateFirebaseIdToken, controllers_1.ClientUserController.createClientUser);
router.post('/add-client', protectedRoute_1.validateFirebaseIdToken, controllers_1.ClientUserController.addClient);
router.post('/checkifclientexistundercoach', protectedRoute_1.validateFirebaseIdToken, controllers_1.ClientUserController.checkIfClientExistUnderCoach);
/**
* Userfooddb
*/
router.post('/food/savefood', protectedRoute_1.validateFirebaseIdToken, userfooddb_1.default.saveFood);
/**
 * dietlog
 */
router.post('/dietLog/save', protectedRoute_1.validateFirebaseIdToken, dietlog_1.default.save);
router.post('/dietLog/date', protectedRoute_1.validateFirebaseIdToken, dietlog_1.default.getByDate);
router.post('/dietLog/fetchdietlist', protectedRoute_1.validateFirebaseIdToken, dietlog_1.default.getdietlogswithpagination);
router.post('/dietLog/getbyid', protectedRoute_1.validateFirebaseIdToken, dietlog_1.default.getdietlogswithid);
/**
* foodlist
*/
router.post('/food/getfoodswithpagination', foodlist_1.default.getfoodswithpaginationandsearch);
router.post('/food/getfoodinfo', foodlist_1.default.getfoodinfo);
/**
* workout log
*/
router.post('/workoutLog/save', protectedRoute_1.validateFirebaseIdToken, controllers_1.WorkoutLogController.save);
router.post('/workoutLog/date', protectedRoute_1.validateFirebaseIdToken, controllers_1.WorkoutLogController.getByDate);
exports.default = router;
