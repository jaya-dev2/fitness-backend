import { Request, Response } from "express";
import { saveWorkoutLog, getWorkoutLogsByDate } from "../db/workoutlog";


const WorkoutLogController = {
  save: async (req: Request, res: Response): Promise<any> => {
    const {
      _id,
      date,
      day, 
      group,
      exerciseArray
    } = req.body;
    
    const savedWorkoutLog: any = await saveWorkoutLog (
      _id,
      date,
      day,
      group, 
      exerciseArray
    );
    return res.send(savedWorkoutLog);
  },

  getByDate: async (req: Request, res: Response): Promise<any> => {
    const {_id, day, startDate, endDate} = req.body;
    const workoutLogs = await getWorkoutLogsByDate(_id, day,startDate, endDate);
    return res.send(workoutLogs);
},

}

export default WorkoutLogController;
