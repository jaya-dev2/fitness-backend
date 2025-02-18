// @ts-nocheck
import WorkoutLog from '../models/workoutlog';
import { Exercise, Sets, WarmupSets } from "../constants";


export const saveWorkoutLog = async (
  userId: String, date: String, day: Number, group: String, exerciseArray: Exercise []
): Promise<any> => {
  // Check if a Workoutlog document already exists for the specified userId,date,day and type
  let workoutLog = await WorkoutLog.findOne({ user: userId, date});

  if (workoutLog) {
    if (day) workoutLog.day = day;
    if (group) workoutLog.group = group;
    workoutLog.exerciseArray = exerciseArray?.filter(exercise => exercise !== null) || [];
  }
   else {
    // If a workoutLog document does not exist, create a new one with the new data
    workoutLog = new WorkoutLog({
    user: userId, 
    date: date,
    day: day,
    group: group,
    exerciseArray: exerciseArray,
    });
  }

  // Save the updated or new workoutlog document to the database
  const savedWorkoutLog = await workoutLog.save();

  return savedWorkoutLog;
};
export const getWorkoutLogsByDate = async (
  userId: string,
  day?: Number,
  startDate: string,
  endDate: string
): Promise<any> => {
  if (new Date(startDate) > new Date(endDate)) {
    [startDate, endDate] = [endDate, startDate];
  }   
  const filter: any = {
    user: userId,
    date: { $gte: startDate, $lte: endDate },
  };

  if (day) {
    filter.day = day;
  }

  const workoutLogs = await WorkoutLog.find(filter)
  .sort({ date: -1 });

  if (day && workoutLogs.length>1) {
    return workoutLogs[0]
  }

  return workoutLogs;
};