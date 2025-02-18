import { Request, Response } from "express";


import { getDietLogsByDate, createOrAddDietLog,saveDietLog, fetchDietLogsWithPagination, getDietLogsById } from "../db/dietlog";

//  import {  deleteDietLog,    updateDietLog, } from "../db/dietlog";

const DietLogController = {
  save: async (req: Request, res: Response): Promise<any> => {
    const {
      _id,
      dietName,
      date,
      healthData,
      macronutrientsKcal,
      breakfast,
      lunch,
      dinner,
      snacks,
      breakfastTotal,
      lunchTotal,
      dinnerTotal,
      snacksTotal,
      TotalConsumedKcal
    } = req.body;

    try {
      const savedDietLog: any = await saveDietLog(
        _id,
        dietName,
        date,
        healthData,
        macronutrientsKcal,
        breakfast,
        lunch,
        dinner,
        snacks,
        breakfastTotal,
        lunchTotal,
        dinnerTotal,
        snacksTotal,
        TotalConsumedKcal
      );

      return res.send(savedDietLog);
    } catch (error) {
      console.error("Error while saving diet log -->", error);
      return res.status(500).json({ error: "An error occurred while saving the diet log." });
    }
  },

  getdietlogswithpagination: async (req: Request, res: Response): Promise<any> => {
    const page = parseInt(req.query.page as string) || 1;// Get the requested page number from query parameter
    const pageSize = 10;// Set the number of items per page
    const searchQuery = req.query.search as string || "";
   
    const { _id } = req.body;
    try {
      const dietList = await fetchDietLogsWithPagination(_id, page, pageSize,searchQuery);
      return res.send(dietList);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  },

 getdietlogswithid:async (req: Request, res: Response): Promise<any> => {
  const { _id } = req.body;
    try {
      const dietLogs = await getDietLogsById(_id);
      return res.send(dietLogs);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  },


  getByDate: async (req: Request, res: Response): Promise<any> => {
    const {_id,startDate, endDate} = req.body;
    const dietLogs = await getDietLogsByDate(_id, startDate, endDate);
    return res.send(dietLogs);
},

  create: async (req: Request, res: Response): Promise<any> => {   
    const {
      _id,
      date,
      macronutrientsKcal,
      breakfast,
      lunch,
      dinner,
      snacks  
    } = req.body;
    
    const newDietLog: any = await createOrAddDietLog(
      _id,
      date,
      macronutrientsKcal,
      breakfast ? breakfast.filter((meal) => meal !== null) : [],
      lunch ? lunch.filter((meal) => meal !== null) : [],
      dinner ? dinner.filter((meal) => meal !== null) : [],
      snacks ? snacks.filter((meal) => meal !== null) : []
    );
    
    
    return res.send(newDietLog);
  },

  

  // update: async (req: Request, res: Response): Promise<any> => {
  //   const {foodDiaryId, breakfastId,lunchId,dinnerId,snacksId, breakfast, lunch,dinner,snacks
  //     } = req.body;
    
  //     const updatedDietLog = await updateDietLog(
  //       foodDiaryId,
  //       breakfastId,
  //       lunchId,
  //       dinnerId,
  //       snacksId,
  //       breakfast,
  //       lunch,
  //       dinner,
  //       snacks
  //     );
  //   console.log('updatedDietLog-->' + updatedDietLog)  
  //   return res.send(updatedDietLog);
  // },
  

  // delete: async (req: Request, res: Response): Promise<any> => {
  //   const { foodDiaryId, breakfastId,lunchId,dinnerId,snacksId} = req.body;
    

  //   // Check if the dietlog  is removing the food collection.
    
  //     const deletedDietLog = await deleteDietLog(foodDiaryId, breakfastId,lunchId,dinnerId,snacksId); 
  //     return res.send(deletedDietLog);
    

  //   // return res.status(ErrorCodes.Bad_Request).send(ErrorMessages.Generic);
  // },
 };

export default DietLogController;