// @ts-nocheck
import { WorkoutRequest } from "../models";


export const createOrAddWorkoutRequest = async (
    _id: string,
    reqDate: string,
    fitness_level: string,
    goal: string,
    place: string,
    equipment: string,
    days_per_week: string
  ): Promise<any> => {
    // Check if a workoutrequest document already exists for the specified userId and date
    let workoutrequest = await WorkoutRequest.findOne({ userId: _id, date: reqDate });

      if (workoutrequest) {
        // If a workoutLog document exists, update the food name with the new data
        workoutrequest.fitness_level = fitness_level
        workoutrequest.goal = goal
        workoutrequest.place = place
        workoutrequest.equipment = equipment
        workoutrequest.days_per_week = days_per_week;
      }
   else {
      // If a workoutLog document does not exist, create a new one with the new data
      workoutrequest = new WorkoutRequest({
        userId: _id,
        date: reqDate,
        fitness_level: fitness_level,
        goal: goal,
        place: place,
        equipment: equipment,
        days_per_week: days_per_week
      });
    }
    // Save the updated or new workoutrequest document to the database
    const savedworkoutRequest = await workoutrequest.save();
    return {workoutrequestId: savedworkoutRequest._id};
  };


 export const getWorkoutReqById = async (workoutRequestId: string): Promise<any> => {
  const workoutReq = await WorkoutRequest.findById(workoutRequestId)
  return workoutReq;
 };

 export const getWorkoutReqByUserId = async (_id: string, lmt: int): Promise<any> => {
  const workoutReq = await WorkoutRequest.find( {clientId: _id})
  .sort({ createdAt: 'desc' })
  .limit(lmt)
  return workoutReq;
 };