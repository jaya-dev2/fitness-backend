// @ts-nocheck

import { WorkoutResponse } from "../models";
import { DaysArray} from "../constants";

export const saveWorkoutResponse = async (
  coachId: string,
  clientId: string,
  daysArray: DaysArray[],
  name: string
): Promise<any> => {

  const workoutResponse = new WorkoutResponse({
    coachId: coachId,
    clientId: clientId,
    daysArray: daysArray,
    name: name
  });

  try {
    const savedWorkoutResponse = await workoutResponse.save(); // Call save() on the instance
    return savedWorkoutResponse;
  } catch (error) {
    // Handle error
    console.error(error);
    throw error;
  }
};

export const getWorkoutResById = async (workoutResponseId: string): Promise<any> => {
  const workoutRes = await WorkoutResponse.findById(workoutResponseId)
  return workoutRes;
 };


export const getWorkoutResByUserId = async (_id: string, lmt: int): Promise<any> => {
  const workoutRes = await WorkoutResponse.find( {clientId: _id})
  .sort({ createdAt: 'desc' })
  .limit(lmt)
  return workoutRes;
 };