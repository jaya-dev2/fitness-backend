// @ts-nocheck

import { DietRequest } from "../models";
import { Food} from "../models";


export const createOrAddDietRequest = async (
    userId: string,
    date: string,
    breakfast: string[],
    lunch: string[],
    dinner: string[],
    snacks: string[],
    macronutrientsKcal: MacronutrientsKcal
  ): Promise<any> => {
    // Check if a Dietrequest document already exists for the specified userId and date
    let dietrequest = await DietRequest.findOne({ userId: userId, date });

      if (dietrequest) {
        // If a DietLog document exists, update the food name with the new data
        dietrequest.breakfast = breakfast ? breakfast.filter((meal) => meal !== null) : [];
        dietrequest.lunch = lunch ? lunch.filter((meal) => meal !== null) : [];
        dietrequest.dinner = dinner ? dinner.filter((meal) => meal !== null) : [];
        dietrequest.snacks = snacks ? snacks.filter((meal) => meal !== null) : [];
        dietrequest.macronutrientsKcal = macronutrientsKcal;
      }
   else {
      // If a DietLog document does not exist, create a new one with the new data
      dietrequest = new DietRequest({
        user: userId,
        date: date,
        breakfast: breakfast,
        lunch: lunch,
        dinner: dinner,
        snacks: snacks,
        macronutrientsKcal: macronutrientsKcal
      });
    }
    // Save the updated or new Dietrequest document to the database
    const savedDietRequest = await dietrequest.save();
    return {dietrequestId: savedDietRequest._id};
  };
  export const nutritionFromDB = async (dietRequestId: string): Promise<any> => {
    try {
    const mealPreference = await DietRequest.findById(dietRequestId, {_id: 0, breakfast: 1,  lunch: 1, dinner: 1, snacks: 1})
    const allFoods = mealPreference.breakfast.concat(
      mealPreference.lunch,
      mealPreference.dinner,
      mealPreference.snacks
    );
    //const nutritionInfo = await Food.find({ food: { $in: allFoods } });
    const nutritionInfo = await Food.aggregate([
      {
          $match: { food: { $in: allFoods } }
      },
      {
        $project: {
            _id: 0,
            category: 1,
            ingredients: "$food",
            calories: { $toString: "$energyKcal" },
            protein: { $toString: "$proteinGram" },
            carbs: { $toString: "$carbGram" },
            fat: { $toString: "$fatGram" },
            quantity: { $toString: "$portionSize"}
        }
    }
  ]);
    const categorizedData = {
      breakfast: nutritionInfo.filter(meal => mealPreference.breakfast.includes(meal.ingredients)),
      lunch: nutritionInfo.filter(meal => mealPreference.lunch.includes(meal.ingredients)),
      dinner: nutritionInfo.filter(meal => mealPreference.dinner.includes(meal.ingredients)),
      snacks: nutritionInfo.filter(meal => mealPreference.snacks.includes(meal.ingredients))
    }
    return categorizedData;
    }
   catch (error) {
    console.error('Error fetching nutrition information:', error);
    throw error; 
  }
};


export const getDietReqForUserId = async (_id: string): Promise<any> => {
  try {
  const dietreq = await DietRequest.find( {clientId: _id})
  .sort({ createdAt: 'desc' })
  .limit(25)
  
  return dietreq; 
  }
 catch (error) {
  console.error('Error fetching diet response:', error);
  throw error; 
}
};
 

