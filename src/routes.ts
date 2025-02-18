import { Request, Response, Router } from 'express';
import {  ClientUserController, CoachUserController, DietRequestController, DietResponseController, 
  NotificationController, WorkoutLogController, WorkoutRequestController, WorkoutResponseController, AiController, CustomWorkoutController } from './controllers';
import DietLogController from './controllers/dietlog';
import FoodController from './controllers/foodlist';
import UserFooddbController from './controllers/userfooddb';
import { validateFirebaseIdToken, sendNotification } from './utils/protectedRoute';

const router = Router();

router.get('/', (req: Request, res: Response) => res.send('echo'));

/**
 * firebase user
 */
 router.post('/coachuser/get-or-create', validateFirebaseIdToken, CoachUserController.createCoachUser);
 router.post('/clientuser/get-or-create', validateFirebaseIdToken, ClientUserController.createClientUser);
 router.post('/add-client', validateFirebaseIdToken, ClientUserController.addClient);
 router.post('/checkifclientexistundercoach', validateFirebaseIdToken, ClientUserController.checkIfClientExistUnderCoach);
//  router.post('/updateFirebaseFCM', validateFirebaseIdToken, ClientUserController.updateFirebaseFCM);
 router.delete('/clientuser/delete', validateFirebaseIdToken, ClientUserController.deleteClientUser);
 router.post('/clientuser/archive', validateFirebaseIdToken, ClientUserController.archiveClientUserStatus);
 router.post('/clientuser/activate', validateFirebaseIdToken, ClientUserController.activateClientUser);
 router.delete('/coachuser/delete', validateFirebaseIdToken, CoachUserController.deleteCoachUser);
 router.post('/firebase-user/onboardingUser', validateFirebaseIdToken, ClientUserController.OnboardingUser);

 /**
 * Userfooddb
 */
router.post('/food/savefood',  validateFirebaseIdToken,UserFooddbController.saveFood);

/**
 * dietlog
 */
router.post('/dietLog/save', validateFirebaseIdToken, DietLogController.save);
router.post('/dietLog/date', validateFirebaseIdToken, DietLogController.getByDate);
router.post('/dietLog/fetchdietlist', validateFirebaseIdToken, DietLogController.getdietlogswithpagination);
router.post('/dietLog/getbyid', validateFirebaseIdToken, DietLogController.getdietlogswithid);

/**
 * dietresponse
 */
 router.post('/dietResponse/create-or-add', validateFirebaseIdToken, DietResponseController.create);
 router.post('/dietResponse/getbyid', validateFirebaseIdToken, DietResponseController.getdietresponse);
 router.post('/dietResponse/history', validateFirebaseIdToken, DietResponseController.history);

/**
 * dietrequest
 */
 router.post('/dietRequest/create-or-add', validateFirebaseIdToken, DietRequestController.create);
 router.post('/dietRequest/getnutritionalinfo', validateFirebaseIdToken, DietRequestController.getnutritionalinfo);
 router.post('/dietRequest/history', validateFirebaseIdToken, DietRequestController.history);

 /**
  * workoutrequest
  */
  router.post('/workoutRequest/create-or-add', validateFirebaseIdToken, WorkoutRequestController.create);
  router.post('/workoutRequest/getbyid', validateFirebaseIdToken, WorkoutRequestController.getbyid);
  router.post('/workoutRequest/history', validateFirebaseIdToken, WorkoutRequestController.history);
  /**
   * workoutreponse
   */
  router.post('/workoutResponse/create-or-add', validateFirebaseIdToken, WorkoutResponseController.create);
  router.post('/workoutResponse/getbyid', validateFirebaseIdToken, WorkoutResponseController.getbyid);
  router.post('/workoutResponse/getbyuser', validateFirebaseIdToken, WorkoutResponseController.getbyuser);
  router.post('/workoutResponse/history', validateFirebaseIdToken, WorkoutResponseController.history);
/**
 * foodlist
 */
    
router.post('/food/getfoodswithpagination', FoodController.getfoodswithpaginationandsearch);
router.post('/food/getfoodinfo',  FoodController.getfoodinfo);

 /**
 * workout log
 */
router.post('/workoutLog/save', validateFirebaseIdToken, WorkoutLogController.save);
router.post('/workoutLog/date', validateFirebaseIdToken, WorkoutLogController.getByDate);

 /**
 * notification
 */
  router.post('/notification/create', validateFirebaseIdToken, NotificationController.createNotification);
  router.post('/updateNotificationSeen', validateFirebaseIdToken, NotificationController.updateNotificationSeen);

  router.post('/workout/fetchProgramNames', CustomWorkoutController.fetchWorkoutPlanNames);
  router.post('/workout/fetchProgramByName', CustomWorkoutController.fetchWorkoutPlanByName);

  router.post('/send-notification', validateFirebaseIdToken, sendNotification);
 
  export default router;