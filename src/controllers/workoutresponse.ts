import { Request, Response } from "express";
import { findFCMClientById } from "../db";
import { getWorkoutResById, getWorkoutResByUserId, saveWorkoutResponse } from "../db/workoutresponse";


const WorkoutResponseController = {
  create: async (req: Request, res: Response): Promise<any> => {
    const {
      coachId,
      clientId,
      daysArray,
      workoutName
    } = req.body;
    
    const savedWorkoutResp: any = await saveWorkoutResponse (
        coachId,
        clientId,
        daysArray,
        workoutName
    );
    const clientFCM = await findFCMClientById (clientId)
    return res.json({savedWorkoutResp, clientFCM: clientFCM.firebaseFCM});    
  },
  getbyid: async (req: Request, res: Response): Promise<any> => {
    const { workoutResponseId } = req.body;
    try {
      const workoutresponse = await getWorkoutResById(workoutResponseId);
      return res.send(workoutresponse);
    } catch (error) {
      console.error("Error while fetching workout response:", error);
      return res.status(500).json({ error: "An error occurred while fetching workout response." });
    } 
},

getbyuser: async (req: Request, res: Response): Promise<any> => {
  const { clientId } = req.body;
  try {
    const workoutresponse = await getWorkoutResByUserId(clientId, 1);
    return res.send(workoutresponse);
  } catch (error) {
    console.error("Error while fetching workout response:", error);
    return res.status(500).json({ error: "An error occurred while fetching workout response." });
  } 
},

history: async (req: Request, res: Response): Promise<any> => {
  const { clientId } = req.body;
  try {
    const workoutresponse = await getWorkoutResByUserId(clientId, 25);
    return res.send(workoutresponse);
  } catch (error) {
    console.error("Error while fetching workout response:", error);
    return res.status(500).json({ error: "An error occurred while fetching workout response." });
  } 
}
}

export default WorkoutResponseController;
