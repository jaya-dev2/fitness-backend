 import { Request, Response } from "express";

import { savefood } from "../db/userfooddb";


const UserFooddbController = {
  saveFood: async (req: Request, res: Response): Promise<any> => {
    const {
      _id,
      category,
      food,
      portionSize,
      proteinGram,
      carbGram,
      fatGram,
      energyKcal,  
    } = req.body;
    
try {
    const savedFood: any = await savefood(
      _id,
    category,
     food,
     portionSize,
     proteinGram,
     carbGram,
     fatGram,
     energyKcal,
    );
    return res.send(savedFood);
  } catch (error) {
    console.error(`Food "${food}" already exists in the database.`, error);
    return res.status(403).json({ error: `Food "${food}" already exists in the database.`});
  }
},
    
};
export default UserFooddbController;
