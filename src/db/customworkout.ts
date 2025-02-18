import { Customworkout } from "../models";

export const insertIntoMongo = async (
  excelData: any,
  coachId: String
): Promise<any> => {
  for (const row of excelData) {
    const transformedData = { ...row, coachId };
    await Customworkout.create(transformedData);
  }
};

export const getCoachWorkoutPlanNames = async (coach_id: string): Promise<string[]> => {
  try {
    const distinctNames: string[] = await Customworkout.distinct('program', { coachId: coach_id });
    return distinctNames;
  } catch (error) {
    console.error('Error fetching distinct names:', error);
    throw error;
  }
};

export const getCoachWorkoutPlanByName = async (coach_id: string, program_name: string): Promise<any> => {
  try {
    const workoutPlan = await Customworkout.find({ program: program_name, coachId: coach_id })
      .sort({  day: 1, createdAt: 1 });
    return workoutPlan;
  } catch (error) {
    console.error('Error fetching workout plan by name:', error);
    throw error;
  }
};
