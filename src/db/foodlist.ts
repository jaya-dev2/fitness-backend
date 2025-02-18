// @ts-nocheck

import { Food, UserFooddb } from "../models";

export const getProteinFoodsWithPaginationAndSearch = async (
  page: number,
  pageSize: number,
  searchQuery: string
): Promise<{ protein: string[] }> => {
  const skipAmount = (page - 1) * pageSize; // Calculate how many items to skip

  let query: any = { category: "Protein" }; // Initial query with category filter

  if (searchQuery) {
    const exactMatchQuery = { food: searchQuery };
    const partialMatchQuery = { food: { $regex: searchQuery, $options: 'i' } }; // Case-insensitive matching

    query.$or = [
      exactMatchQuery, // First try to find an exact match
      partialMatchQuery, // Then try partial matching
    ];
  }

  const proteinFoods = await Food.find(query, { food: 1, _id: 0, portionSize: 1, energyKcal: 1 })
    .sort({ food: 1 })
    .skip(skipAmount)
    .limit(pageSize);

  // const foodNames = proteinFoods.map((food: any) => food.food);
  return { protein: proteinFoods };
};


export const getNonProteinFoodsWithPaginationAndSearch = async (page: number, pageSize: number, searchQuery: string): Promise<{ protein: string[] }> => {
  const skipAmount = (page - 1) * pageSize; // Calculate how many items to skip


  let query: any = { category: { $ne: "Protein" } }; // Initial query with category filter

  if (searchQuery) {
    const exactMatchQuery = { food: searchQuery };
    const partialMatchQuery = { food: { $regex: searchQuery, $options: 'i' } }; // Case-insensitive matching

    query.$or = [
      exactMatchQuery, // First try to find an exact match
      partialMatchQuery, // Then try partial matching
    ];
  }
  const nonProteinFoods = await Food.find(query, { food: 1, _id: 0, portionSize: 1, energyKcal: 1 })
    .sort({ 'food': 1 })
    .skip(skipAmount)
    .limit(pageSize);
  return { nonproteinfood: nonProteinFoods };
};

export const fetchFoodInfoFromDb = async (userId: string, coachId: string, foodName: string): Promise<any> => {
  const foodInfoFromFoodSchema = await Food.findOne({ food: foodName });

  // If foodInfoFromFoodSchema is found, return it, otherwise, try UserFooddb
  if (foodInfoFromFoodSchema) {
    return foodInfoFromFoodSchema
  } else {
    const foodInfoFromUserFoodDBSchema = await UserFooddb.findOne({
      food: foodName,
       $or: [
        { user: userId },
        { user: coachId }
      ]
    });

    // Return the result from UserFooddb, even if it's null
    return foodInfoFromUserFoodDBSchema;
  }
};







