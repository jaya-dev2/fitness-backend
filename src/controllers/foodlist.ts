import { Request, Response } from "express";

import { getUserProteinFoodsWithPaginationAndSearch,getUserNonProteinFoodsWithPaginationAndSearch    } from "../db/userfooddb";

import { fetchFoodInfoFromDb, getNonProteinFoodsWithPaginationAndSearch,  getProteinFoodsWithPaginationAndSearch } from "../db/foodlist";

const FoodController = {

 
  
   getfoodswithpaginationandsearch: async (req: Request, res: Response): Promise<any> => {
    const page = parseInt(req.query.page as string) || 1;// Get the requested page number from query parameter
    const pageSize = 50;// Set the number of items per page
    const searchQuery = req.query.search as string || ""; // Get the search query from query parameter
    
    const proteinFoods = await getProteinFoodsWithPaginationAndSearch(page, pageSize, searchQuery);
    const nonProteinFoods = await getNonProteinFoodsWithPaginationAndSearch(page, pageSize, searchQuery);
    
    const { user_id, coach_id } = req.body;
    const userProteinFoods = await getUserProteinFoodsWithPaginationAndSearch(user_id, coach_id, page, pageSize, searchQuery);
    const userNonProteinFoods = await getUserNonProteinFoodsWithPaginationAndSearch(user_id, coach_id, page, pageSize, searchQuery);
  
    const foodList = Object.assign(proteinFoods, nonProteinFoods,userProteinFoods,userNonProteinFoods);
    return res.send(foodList);
  },
  
  getfoodinfo: async (req: Request, res: Response): Promise<any> => {
    try {
      const { foodName, user_id, coach_id } = req.body;
      const foodInfoFromDb = await fetchFoodInfoFromDb(user_id, coach_id, foodName);
  
      // Check if any food information is found
      if (foodInfoFromDb) {
        res.send(foodInfoFromDb)
      } else {
        // No information found
        res.status(404).json({ message: 'Food not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },
};


export default FoodController;
