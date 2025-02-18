import { Request, Response } from "express";
import { createOrAddDietRequest, findFCMCoachById, getDietReqForUserId, nutritionFromDB } from "../db";


const DietRequestController = {
    create: async (req: Request, res: Response): Promise<any> => {
      const {
        _id,
        date,
        breakfast,
        lunch,
        dinner,
        snacks,
        coachId,
        macronutrientsKcal
      } = req.body;
  
      try {
        const dietrequest: any = await createOrAddDietRequest(
          _id, 
          date,
          breakfast,
          lunch,
          dinner,
          snacks,
          macronutrientsKcal
        );
        const coachFCM = await findFCMCoachById (coachId)
        return res.json({dietrequestId: dietrequest.dietrequestId, coachFCM: coachFCM.firebaseFCM});
      } catch (error) {
        console.error("Error while creating diet request -->", error);
        return res.status(500).json({ error: "An error occurred while creating the diet request." });
      }
    },

    
    getnutritionalinfo: async (req: Request, res: Response): Promise<any> => {
      const { dietRequestId } = req.body;
      try {
        const categorizedData = await nutritionFromDB(dietRequestId);
    
        if (!categorizedData) {
          return res.status(404).json({ error: "Nutrition information not found." });
        }
    
        return res.json(categorizedData);
      } catch (error) {
        console.error("Error while fetching nutrition information:", error);
        return res.status(500).json({ error: "An error occurred while fetching nutrition information." });
      }
    },
    
    
history: async (req: Request, res: Response): Promise<any> => {
  const { clientId } = req.body;
  try {
    const dietrequest = await getDietReqForUserId(clientId);
    return res.send(dietrequest);
  } catch (error) {
    console.error("Error while fetching diet dietrequest:", error);
    return res.status(500).json({ error: "An error occurred while fetching diet dietrequest." });
  } 

}
}

    export default DietRequestController;   