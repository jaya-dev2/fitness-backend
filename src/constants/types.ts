export interface AuthUser {
  _id: string;
  user_id: string;
  email: string;
  name: string;
  picture: string; 
}

export interface FoodDiary {
  mealName: String;
  food: String;
  category: String;
  amount: String;
  servingSize: Number;
  energy: Number;
  protein: Number;
  carb: Number;
  fat: Number;
 }
 
 export interface HealthData {
   stepCount: Number;
   totalActiveEnergyBurned: Number;
   totalBasalEnergyBurned: Number;
   totalEnergyBurned: Number;
   totalWorkoutDuration: Number;
  }
  
 export interface MacronutrientsKcal {
   targetCalorie: Number;
   protein: Number;
   carb: Number;
   fat: Number;
  }
 
  export interface MacroSchema {
   energy: Number;
   protein: Number;
   carb: Number;
   fat: Number;
  }

  export interface Exercise {
    muscleGroup: String;
    secondaryMuscleGroup: String [];
    name: String;
    notes: String;
    videoLink: String;
    sets: Sets[];
    warmupSets: WarmupSets [];
   }

   export interface DaysArray {
    day: string, 
    group: string,
    exerciseArray: Exercise [],
    }
  
   export interface Sets {
    weight: Number;
    reps: Number;
   }
  
   export interface WarmupSets {
    weight: Number;
    reps: Number;
   }


 export interface Onboarding {
  callName?: string,
  dateOfBirth?: string,
  age?: number,
  height?: { inches?: number; cm?: number },
  weight?: { kg?: number; lbs?: number },
  gender?: string,
  goal?: string,
  workoutinhrs?: string,
  //medicalConditions?: string[]; // Add the medicalConditions property
 }


export interface chatgptMealObj {
  category?: string,
  ingredients: string,
  serving?: string,
  quantity: string,
  calories: string,
  protein: string,
  carbs: string,
  fat: string,
}

  
export type mongoDBObj = {
  _id: string;
  category: string;
  food: string;
  portionSize: string;
  energyKcal: number;
  proteinGram: number;
  carbGram: number;
  fatGram: number;
}[]


export interface DietObj {
  breakfast?: chatgptMealObj[];
  lunch?: chatgptMealObj[];
  dinner?: chatgptMealObj[];
  snacks?: chatgptMealObj[];
}

export interface MealPreference {
  breakfast: string[];
  lunch: string[];
  dinner: string[];
  snacks: string[];
  tdee: string;
}

declare global {
  namespace Express {
    interface Request {
      file: any; // Adjust the type according to your needs
    }
  }
}