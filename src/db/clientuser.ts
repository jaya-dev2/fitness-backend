// @ts-nocheck
import { Onboarding } from '../constants';
import { CoachUser, ClientUser, Notification, WorkoutLog, DietLog, DietRequest, DietResponse, UserFooddb, WorkoutRequest, WorkoutResponse } from '../models';
import { findCoachById } from './coachuser';

export const findAndUpdateClientUser = async (
    email: String,
    firebaseUserId: String,
    displayName?: String,
    displayPicture?: String,
    inviteAccepted?: Boolean,
    firebaseFCM?: String,
    notification_settings?: Boolean
  ): Promise<any> => {

    const updateData = {
      firebaseUserId: firebaseUserId,
      displayName: displayName,
      displayPicture: displayPicture,
      inviteAccepted: inviteAccepted,
      firebaseFCM: firebaseFCM,
      notificationSettings: notification_settings
    };
    
    const clientUser = await ClientUser.findOneAndUpdate(
      { email}, // Filter criteria
      { $set: updateData }, // Update data
      { new: true } // To return the updated document
    );
    return clientUser;
  };


  export const getUserByClientEmail = async (email: string): Promise<any> => {
    const user = await ClientUser.findOne({ email });
    return user;
  };

  export const checkIfClientExistUnderCoach = async (email: string, coachId: string): Promise<any> => {
    const user = await ClientUser.findOne({email: email, coachId: coachId})
    return user;
  };

  /* export const userUpdateFirebaseFCM = async (_id: string, firebaseFCM: string, userRole: string): Promise<any> => {
    let user;
  
    if (userRole === 'client') {
      user = await ClientUser.findOneAndUpdate(
        { _id }, // Filter criteria
        { $set: { firebaseFCM } }, // Update data
        { new: true } // To return the updated document
      );
    } else if (userRole === 'coach') {
      user = await CoachUser.findOneAndUpdate(
        { _id }, // Filter criteria
        { $set: { firebaseFCM } }, // Update data
        { new: true } // To return the updated document
      );
    }
  
    return user;
  }; */

  export const addClientToCoach = async (
    coachId: string,
    email: string,
    startDate: string,
    endDate: string,
    duration: string
  ): Promise<any> => {

    // if the client already exists under the coach, just update him

    const clientUser = await ClientUser.findOne({email: email, coachId: coachId})
    
    if (clientUser) {
      const updatedClientUser = await ClientUser.findOneAndUpdate({
        coachId,
        email,
        startDate,
        endDate,
        duration
      })
      return updatedClientUser
    }
    else {
      const newClientUserDetails = await ClientUser.create({
        coachId,
        email,
        startDate,
        endDate,
        duration
    });

      const coachUser = await findCoachById(coachId);
      coachUser.clients.push(newClientUserDetails._id);
      await coachUser.save();
      return newClientUserDetails;
    }
    
  };

export const findFCMClientById = async (clientId: string): Promise<any> => {
    const clientFCM = await ClientUser.findOne({_id: clientId},{firebaseFCM: 1,_id: 0})
    return clientFCM;
   };

export const deleteClientUser = async ( clientId: string,coachId: string): Promise<any> => {
  const user = await ClientUser.findByIdAndRemove(clientId);
  await DietLog.deleteMany({user: clientId});
  await WorkoutLog.deleteMany({user: clientId});
  await UserFooddb.deleteMany({user: clientId});
  await DietRequest.deleteMany({userId: clientId});
  await DietResponse.deleteMany({clientId: clientId});
  await WorkoutRequest.deleteMany({userId: clientId});
  await WorkoutResponse.deleteMany({clientId: clientId});
  await Notification.deleteMany({
    $or: [
      { fromUserId: clientId },
      { toUserId: clientId }
    ]
  });  
  await UserFooddb.deleteMany({user: clientId});
  await CoachUser.findOneAndUpdate({_id:coachId}, { $pull: { clients: clientId } });
  return user;
};


export const updateClientUserStatus = async ( clientId: string, newStatus: string): Promise<any> => {
  const user = await ClientUser.findByIdAndUpdate(
    {_id: clientId},
    { $set: { status: newStatus } },
    { new: true }
  );

  return user;
};
/* 
export const onboardingUser = async (
  _id: String,
  onboarding: Onboarding
):Promise<any> => {
  const filter = { _id: _id }
  let objForUpdate = {};
  if (onboarding) objForUpdate.onboarding = onboarding;
  objForUpdate = { $set: objForUpdate };
  const user = await ClientUser.findOneAndUpdate(
    filter,
    objForUpdate,
    { new: true });

  return user;
}; */
export const onboardingUser = async (
  _id: string,
  onboarding: Partial<Onboarding>
): Promise<any> => {
  try {
    const filter = { _id: _id };
    const existingUser = await ClientUser.findById(_id);

    if (!existingUser) {
      // Handle the case where the user with the given _id is not found
      return null;
    }

    // Check if existingUser.onboarding is defined
    const existingOnboarding = existingUser.onboarding || {};

    // Create a deep copy of the existing onboarding object
    const updatedOnboarding: Onboarding = JSON.parse(JSON.stringify(existingOnboarding));

    // Update each field if a new value is provided
    for (const key in onboarding) {
      if (onboarding[key] !== undefined) {
        if (key === 'height' || key === 'weight') {
          updatedOnboarding[key] = { ...(existingOnboarding[key] || {}), ...onboarding[key] };
        } else {
          updatedOnboarding[key] = onboarding[key];
        }
      }
    }

    existingUser.onboarding = updatedOnboarding;

    const savedUser = await existingUser.save();
    return savedUser;
  } catch (error) {
    console.error('Error updating user:', error);
    return null;
  }
};


