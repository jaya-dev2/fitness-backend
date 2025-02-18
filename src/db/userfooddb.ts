// @ts-nocheck

import { Food, UserFooddb } from "../models";

export const savefood = async (
  userId?: string,
  category?: string,
  food: string,
  portionSize: string,
  proteinGram: number,
  carbGram: number,
  fatGram: number,
  energyKcal: number,
): Promise<any> => {

  console.log("food:" + food);
  // Check if a food document already exists in the Food collection
  let existingFoodInFood = await Food.findOne({ food: food });

  // Check if a food document already exists in the UserFooddb collection
  let existingFoodInUserFooddb = await UserFooddb.findOne({ food: food, user: userId });

  if (existingFoodInFood || existingFoodInUserFooddb) {
    // If a food document exists in either collection, throw an error with the message
    throw new Error(`Food "${food}" already exists in the database.`);
  } else {
    // If a food document does not exist in either collection, create a new one with the new data
    const newFood = new UserFooddb({
      user: userId,
      category: category,
      food: food,
      portionSize: portionSize,
      proteinGram: proteinGram,
      carbGram: carbGram,
      fatGram: fatGram,
      energyKcal: energyKcal,
    });

    // Save the new food document to the UserFooddb collection
    const savedFood = await newFood.save();

    return savedFood;
  }
};


export const getUserProteinFoodsWithPaginationAndSearch = async (
  userId: string,
  coachId: string,
  page: number,
  pageSize: number,
  searchQuery: string
): Promise<{ protein: string[] }> => {
  const skipAmount = (page - 1) * pageSize; // Calculate how many items to skip

  // Protein Foods Query
  let proteinQuery: any = {
    category: "Protein",
    $or: [
      { user: userId },
      { user: coachId }
    ]
  };

  if (searchQuery) {
    const exactMatchQuery = { food: searchQuery };
    const partialMatchQuery = { food: { $regex: searchQuery, $options: 'i' } }; // Case-insensitive matching

    proteinQuery.$or = [
      exactMatchQuery, // First try to find an exact match
      partialMatchQuery, // Then try partial matching
    ];
  }

  const userProteinFoods = await UserFooddb.find(
    proteinQuery,
    { food: 1, _id: 0, portionSize: 1, energyKcal: 1 }
  )
    .sort({ food: 1 })
    .skip(skipAmount)
    .limit(pageSize);

  return { userproteinfood: userProteinFoods };
};

export const getUserNonProteinFoodsWithPaginationAndSearch = async (
  userId: string,
  coachId: string,
  page: number,
  pageSize: number,
  searchQuery: string
): Promise<{ protein: string[] }> => {
  const skipAmount = (page - 1) * pageSize; // Calculate how many items to skip

  // Non-Protein Foods Query
  let nonProteinQuery: any = {
    category: { $ne: "Protein" },
    $or: [
      { user: userId },
      { user: coachId }
    ]
  };


  if (searchQuery) {
    const exactMatchQuery = { food: searchQuery };
    const partialMatchQuery = { food: { $regex: searchQuery, $options: 'i' } }; // Case-insensitive matching

    nonProteinQuery.$or = [
      exactMatchQuery, // First try to find an exact match
      partialMatchQuery, // Then try partial matching
    ];
  }

  const userNonProteinFoods = await UserFooddb.find(
    nonProteinQuery,
    { food: 1, _id: 0, portionSize: 1, energyKcal: 1 }
  )
    .sort({ food: 1 })
    .skip(skipAmount)
    .limit(pageSize);

  return { userNonProteinFood: userNonProteinFoods };
};
