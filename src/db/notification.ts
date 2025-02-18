import { CoachUser, Notification } from "../models";


export const createNotification = async (
    fromUserId: String,
    toUserId: String,
    dietRequestId?: String,
    dietResponseId?: String,
    workoutRequestId?: String,
    workoutResponseId?: String,
    seen?: Boolean,
  ): Promise<any> => {

    var query = {}
    if (dietRequestId)
      query = {dietRequestId, seen: false}
    if (dietResponseId)
      query = {dietResponseId, seen: false}
    if (workoutRequestId)
      query = {workoutRequestId, seen: false}
    if (workoutResponseId)
      query = {workoutResponseId, seen: false}

    let notification = await Notification.findOne(query) 
    if(notification)
      return notification;

    const createdNotification = await Notification.create({
        fromUserId, 
        toUserId,
        dietRequestId,
        dietResponseId,
        workoutRequestId,
        workoutResponseId,
        seen
    });
    return createdNotification;
  };

  export const getNotificationByUserId = async ( _id: string): Promise<any> => {
    const notifications = await Notification.find({ toUserId: _id , seen: false});
    return notifications;
  };

  export const updateNotificationSeen = async (notificationId: string): Promise<any> => {
    const notifications = await Notification.findByIdAndUpdate( notificationId, { $set: { seen: true } }, { new: true } )
    return notifications;
  };