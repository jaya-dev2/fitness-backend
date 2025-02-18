import { Request, Response } from "express";
import { findFCMClientById } from "../db";
import { getDietResponseForUserId, getDietResponseFromCoach, saveDietResponse } from "../db/dietresponse";



const DietResponseController = {
  create: async (req: Request, res: Response): Promise<any> => {
    const {
      coachId,
      clientId,
      dietName,
      date,
      macronutrientsKcal,
      breakfast,
      lunch,
      dinner,
      snacks,
      breakfastTotal,
      lunchTotal,
      dinnerTotal,
      snacksTotal
    } = req.body;

    try {
      const savedDietResponse: any = await saveDietResponse(
        coachId,
        clientId,
        dietName,
        date,
        macronutrientsKcal,
        breakfast,
        lunch,
        dinner,
        snacks,
        breakfastTotal,
        lunchTotal,
        dinnerTotal,
        snacksTotal
      );
      const clientFCM = await findFCMClientById (clientId)
      return res.json({savedDietResponse, clientFCM: clientFCM.firebaseFCM});      
    } catch (error) {
      console.error("Error while saving dietresponse -->", error);
      return res.status(500).json({ error: "An error occurred while saving the dietresponse." });
    }
  },

  getdietresponse: async (req: Request, res: Response): Promise<any> => {
    const { dietResponseId } = req.body;
    try {
      const dietresponse = await getDietResponseFromCoach(dietResponseId);
      return res.send(dietresponse);
    } catch (error) {
      console.error("Error while fetching diet response:", error);
      return res.status(500).json({ error: "An error occurred while fetching diet response." });
    } 

},

history: async (req: Request, res: Response): Promise<any> => {
  const { clientId } = req.body;
  try {
    const dietresponse = await getDietResponseForUserId(clientId);
    return res.send(dietresponse);
  } catch (error) {
    console.error("Error while fetching diet response:", error);
    return res.status(500).json({ error: "An error occurred while fetching diet response." });
  } 

}
}
export default DietResponseController;