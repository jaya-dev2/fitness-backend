// @ts-nocheck
import { ClientUser, CoachUser } from '../models';

export const createCoachUser = async (
    email: String,
    firebaseUserID: String,
    displayName?: String,
    displayPicture?: String,
    firebaseFCM?: String
  ): Promise<any> => {
    const coachUser = await CoachUser.create({
    email,
    firebaseUserID,
    displayName,
    displayPicture,
    firebaseFCM
    });
    return coachUser;
  };

  export const updateCoachUserFirebaseFCM = async (email: string, displayName?: string, displayPicture?: string, firebaseFCM?: string) : Promise<any> => {
    const filter = { email: email}

    let objForUpdate = {};
    if (displayName) objForUpdate.displayName = displayName;
    if (displayPicture) objForUpdate.displayPicture = displayPicture;
    if (firebaseFCM) objForUpdate.firebaseFCM = firebaseFCM;
    objForUpdate = { $set: objForUpdate };
  
    const user = await CoachUser.findOneAndUpdate(
      filter, 
      objForUpdate,
      { new: true });
    return user;
  };


  export const getUserByCoachEmail = async (email: string): Promise<any> => {
    const user = await CoachUser.findOne({ email });
    return user;
  };


  export const findCoachById = async (id: string): Promise<any> => {
    const coachUser = await CoachUser.findById(id);
    return coachUser;
 };

 export const findFCMCoachById = async (coachId: string): Promise<any> => {
  const coachFCM = await CoachUser.findOne({_id: coachId},{firebaseFCM: 1,_id: 0})
  return coachFCM;
 };

  export const getClientsForCoach = async (coachId: string): Promise<any> => {
    const coach = await CoachUser.findOne({ _id: coachId}).populate('clients');
    if (!coach) {
      // Handle cases where the coach doesn't exist
      return { error: 'Coach not found.' };
    }
    const clientUserDetails = await ClientUser.find({coachId: coachId})
    .sort({'startDate': -1})
  
    return {coachId: coach._id, clients: clientUserDetails};
  };

  export const deleteCoachUser = async(_id: string): Promise<any> => {
    const user = await CoachUser.findByIdAndRemove(_id);
    await DietLog.deleteMany({user: clientId});
    await DietResponse.deleteMany({clientId: clientId});
    await WorkoutResponse.deleteMany({clientId: clientId});
    await Notification.deleteMany({
      $or: [
        { fromUserId: clientId },
        { toUserId: clientId }
      ]
    });  
    return user;
  };
