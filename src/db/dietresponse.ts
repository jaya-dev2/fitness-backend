// @ts-nocheck
import { FoodDiary, HealthData, MacronutrientsKcal, MacroSchema } from "../constants";
import { DietResponse } from "../models";



export const saveDietResponse = async (
  coachId: string,
  clientId: string,
  dietName: string,
  date: string,
  macronutrientsKcal:MacronutrientsKcal,
  breakfast: FoodDiary[],
  lunch: FoodDiary[],
  dinner: FoodDiary[],
  snacks: FoodDiary[],
  breakfastTotal: MacroSchema,
  lunchTotal: MacroSchema,
  dinnerTotal: MacroSchema,
  snacksTotal: MacroSchema
): Promise<any> => {
  // Check if a DietResponse document already exists for the specified userId and date
  let dietResponse = await DietResponse.findOne({ coachId: coachId, clientId: clientId, date });


    if (dietResponse) {
      // If a dietResponse document exists, update the foodDiary property with the new data
      dietResponse.dietName = dietName;
      dietResponse.macronutrientsKcal = macronutrientsKcal;
      dietResponse.breakfast = breakfast ? breakfast.filter((meal) => meal !== null) : [];
      dietResponse.lunch = lunch ? lunch.filter((meal) => meal !== null) : [];
      dietResponse.dinner = dinner ? dinner.filter((meal) => meal !== null) : [];
      dietResponse.snacks = snacks ? snacks.filter((meal) => meal !== null) : [];
      dietResponse.breakfastTotal = breakfastTotal; 
      dietResponse.lunchTotal = lunchTotal;
      dietResponse.dinnerTotal = dinnerTotal;
      dietResponse.snacksTotal = snacksTotal;
    }
 else {
    // If a dietResponse document does not exist, create a new one with the new data
    dietResponse = new DietResponse({
      coachId: coachId,
      clientId: clientId,
      dietName: dietName,
      date: date,
      macronutrientsKcal: macronutrientsKcal,
      breakfast: breakfast,
      lunch: lunch,
      dinner: dinner,
      snacks: snacks,
      breakfastTotal: breakfastTotal,
      lunchTotal: lunchTotal,
      dinnerTotal: dinnerTotal,
      snacksTotal: snacksTotal,
    });
  }
  // Save the updated or new DietLog document to the database
  const savedDietResponse = await dietResponse.save();
  return savedDietResponse;
};

export const getDietResponseFromCoach = async (dietResponseId: string): Promise<any> => {
  try {
  const dietresponse = await DietResponse.findById({_id: dietResponseId})
  return dietresponse; 
  }
 catch (error) {
  console.error('Error fetching diet response:', error);
  throw error; 
}
};


export const getDietResponseForUserId = async (_id: string): Promise<any> => {
  try {
  const dietresponse = await DietResponse.find( {clientId: _id})
  .sort({ createdAt: 'desc' })
  .limit(25)
  
  return dietresponse; 
  }
 catch (error) {
  console.error('Error fetching diet response:', error);
  throw error; 
}
};