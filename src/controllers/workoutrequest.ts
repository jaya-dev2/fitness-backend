import { Request, Response } from "express";
import { findFCMCoachById, getWorkoutReqById} from "../db";
import { createOrAddWorkoutRequest, getWorkoutReqByUserId } from "../db/workoutrequest";


const WorkoutRequestController = {
    create: async (req: Request, res: Response): Promise<any> => {
      const {
        clientId,
        date,
        fitness_level,
        goal,
        place,
        equipment,
        days_per_week,
        coachId
      } = req.body;
  
      try {
        const workoutrequest: any = await createOrAddWorkoutRequest(
          clientId,
            date,
            fitness_level,
            goal,
            place,
            equipment,
            days_per_week
        );
        const coachFCM = await findFCMCoachById (coachId)
        return res.json({workoutrequestId: workoutrequest.workoutrequestId, coachFCM: coachFCM.firebaseFCM});
      } catch (error) {
        console.error("Error while creating workout request -->", error);
        return res.status(500).json({ error: "An error occurred while creating the workout request." });
      }
    },

    getbyid: async (req: Request, res: Response): Promise<any> => {
      const { workoutRequestId } = req.body;
      try {
        const workoutrequest = await getWorkoutReqById(workoutRequestId);
        return res.send(workoutrequest);
      } catch (error) {
        console.error("Error while fetching workout request:", error);
        return res.status(500).json({ error: "An error occurred while fetching workout request." });
      } 
  
  },

  history: async (req: Request, res: Response): Promise<any> => {
    const { clientId } = req.body;
    try {
      const workoutrequest = await getWorkoutReqByUserId(clientId, 25);
      return res.send(workoutrequest);
    } catch (error) {
      console.error("Error while fetching workout request:", error);
      return res.status(500).json({ error: "An error occurred while fetching workout request." });
    } 

},
}

export default WorkoutRequestController;   