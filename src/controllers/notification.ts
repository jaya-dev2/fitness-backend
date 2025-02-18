import { Request, Response } from "express";
import { createNotification, updateNotificationSeen } from "../db";


const NotificationController = {
    createNotification: async (req: Request, res: Response): Promise<any> => {
        const { 
            fromUserId, 
            toUserId, 
            dietRequestId, 
            dietResponseId,
            workoutRequestId,  
            workoutResponseId,  
            seen 
        } = req.body; 
        try {
            const createdNotification = await createNotification(fromUserId, toUserId, dietRequestId, dietResponseId, workoutRequestId, workoutResponseId, seen); 
            return res.send(createdNotification); 
        }
        catch (error) {
        console.error(`Unable to create notification.`, error);
        return res.status(403).json({ error: `Unable to create notification.`});
        }
    },
    updateNotificationSeen: async (req: Request, res: Response): Promise<any> => {
        const { notificationId } = req.body;
        const notifications = await updateNotificationSeen(notificationId);
        return res.send(notifications);
      },

    };
    export default NotificationController;