// @ts-nocheck
import { FoodDiary, HealthData, MacronutrientsKcal, MacroSchema } from "../constants";
import DietLog from "../models/dietlog";
import User from "../models/user";

export const saveDietLog = async (
  userId: string,
  dietName: string,
  date: string,
  healthData: HealthData,
  macronutrientsKcal:MacronutrientsKcal,
  breakfast: FoodDiary[],
  lunch: FoodDiary[],
  dinner: FoodDiary[],
  snacks: FoodDiary[],
  breakfastTotal: MacroSchema,
  lunchTotal: MacroSchema,
  dinnerTotal: MacroSchema,
  snacksTotal: MacroSchema,
  TotalConsumedKcal: MacroSchema
): Promise<any> => {
  // Check if a DietLog document already exists for the specified userId and date
  let dietLog = await DietLog.findOne({ user: userId, date });


    if (dietLog) {
      // If a DietLog document exists, update the foodDiary property with the new data
      dietLog.dietName = dietName;
      dietLog.healthData = healthData;
      dietLog.macronutrientsKcal = macronutrientsKcal;
      dietLog.breakfast = breakfast ? breakfast.filter((meal) => meal !== null) : [];
      dietLog.lunch = lunch ? lunch.filter((meal) => meal !== null) : [];
      dietLog.dinner = dinner ? dinner.filter((meal) => meal !== null) : [];
      dietLog.snacks = snacks ? snacks.filter((meal) => meal !== null) : [];
      dietLog.breakfastTotal = breakfastTotal; 
      dietLog.lunchTotal = lunchTotal;
      dietLog.dinnerTotal = dinnerTotal;
      dietLog.snacksTotal = snacksTotal;
      dietLog.TotalConsumedKcal = TotalConsumedKcal; 
    }
 else {
    // If a DietLog document does not exist, create a new one with the new data
    dietLog = new DietLog({
      user: userId,
      dietName: dietName,
      date: date,
      healthData: healthData,
      macronutrientsKcal: macronutrientsKcal,
      breakfast: breakfast,
      lunch: lunch,
      dinner: dinner,
      snacks: snacks,
      breakfastTotal: breakfastTotal,
      lunchTotal: lunchTotal,
      dinnerTotal: dinnerTotal,
      snacksTotal: snacksTotal,
      TotalConsumedKcal: TotalConsumedKcal
    });
  }
  // Save the updated or new DietLog document to the database
  const savedDietLog = await dietLog.save();
  return savedDietLog;
};

export const fetchDietLogsWithPagination = async (
  userId: string,
  page: number,
  pageSize: number,
  searchQuery: string
): Promise<any> => {
  const skipAmount = (page - 1) * pageSize; // Calculate how many items to skip

  let Query: any = { user: userId, dietName: { $ne: null } };
  if (searchQuery) {
    const exactMatchQuery = { dietName: searchQuery };
    const partialMatchQuery = { dietName: { $regex: searchQuery, $options: 'i' } }; // Case-insensitive matching

    Query.$or = [
      exactMatchQuery, // First try to find an exact match
      partialMatchQuery, // Then try partial matching
    ];
  }
  const dietList = await DietLog.find(Query, {
    dietName: 1,
    date: 1,
    TotalConsumedKcal: 1,
    _id: 1,
  })
    .sort({ date: -1 })
    .skip(skipAmount)
    .limit(pageSize);

    return dietList;
  };

  export const getDietLogsById = async (
    DietLogId: string
  ): Promise<any> => {
    const dietLogs = await DietLog.find({_id: DietLogId});
    return dietLogs;
  };

export const getDietLogsByDate = async (
  userId: string,
  startDate: string,
  endDate: string
): Promise<any> => {
  if (new Date(startDate) > new Date(endDate)) {
    [startDate, endDate] = [endDate, startDate];
  }
  const dietLogs = await DietLog.find({
    user: userId,
    date: { $gte: startDate, $lte: endDate },
  });
  return dietLogs;
};


export const createOrAddDietLog = async (
  userId: String,
  date: String,
  macronutrientsKcal:MacronutrientsKcal,
  breakfast?: FoodDiary,
  lunch?: FoodDiary,
  dinner?: FoodDiary,
  snacks?: FoodDiary
): Promise<any> => {
  const addDietLog = await DietLog.findOneAndUpdate(
    { user: userId, date: date, macronutrientsKcal: macronutrientsKcal},
    { $push: { breakfast:breakfast,lunch: lunch,dinner: dinner,snacks: snacks } },
    { new: true, upsert: true }
  );
  return addDietLog;
};



