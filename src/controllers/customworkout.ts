// controllers/excelController.ts
import { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import excel from 'exceljs';
import fs from 'fs';
import path from 'path';
import { getCoachWorkoutPlanByName, getCoachWorkoutPlanNames, insertIntoMongo } from '../db/customworkout';

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const CustomWorkoutController = {
  uploadExcelLocal: [
    upload.single('excelFile'),
    async (req: Request, res: Response): Promise<any> => {
      const { coachId, excelFilePath } = req.body;

      try {
        const desktopPath = path.join('/Users/balakrishnanramasamy/Desktop'); // Adjust the path
        const excelFilePath = path.join(desktopPath, 'workoutsheet.xlsx'); // Adjust the file name

        // Read the Excel file synchronously
        const excelBuffer = fs.readFileSync(excelFilePath);

        const workbook = new excel.Workbook();
        await workbook.xlsx.load(excelBuffer);

        const excelData: Record<string, any>[] = [];
        const invalidRows: Record<string, number[]> = {};

        workbook.eachSheet((worksheet, sheetId) => {
          const sheetName = worksheet.name;

          worksheet.eachRow((row, rowNumber) => {
            if (rowNumber > 1) {
              const rowData = {
                program: row.getCell('A').value,
                day: row.getCell('B').value,
                name: row.getCell('C').value,
                exercise_name: row.getCell('D').value,
                sets: row.getCell('E').value,
                reps: row.getCell('F').value,
                duration: row.getCell('G').value,
                links_to_tutorials: row.getCell('H').value,
                primary_target_muscle_group: row.getCell('I').value,
                secondary_target_muscle_group: row.getCell('J').value,
              };

              excelData.push(rowData);

              const mandatoryFields = ['program', 'day', 'exercise_name', 'sets', 'reps'];
              if (!isValidRow(rowData, mandatoryFields)) {
                if (!invalidRows[sheetName]) {
                  invalidRows[sheetName] = [];
                }
                invalidRows[sheetName].push(rowNumber);
              }
            }
          });
        });

        if (Object.keys(invalidRows).length > 0) {
          const errorMessage = Object.entries(invalidRows)
            .map(([sheetName, rows]) => `Sheet "${sheetName}" is missing mandatory fields for rows ${rows.join(', ')}.`)
            .join(' ');

          throw new Error(`Validation failed. ${errorMessage}`);
        }

        insertIntoMongo(excelData, coachId);

        res.status(200).send('Data inserted successfully');
      } catch (error) {
        if (error.message.includes('Validation failed.')) {
          res.status(400).send(error.message);
        } else {
          res.status(400).send(error.message);
        }
      }
    },
  ],


  fetchWorkoutPlanNames: async (req: Request, res: Response): Promise<any> => {
    const { coach_id } = req.body;
    const workoutPlanNames = await getCoachWorkoutPlanNames(coach_id);
    return res.send(workoutPlanNames);
  },


  fetchWorkoutPlanByName: async (req: Request, res: Response): Promise<any> => {
    const { coach_id, program_name } = req.body;
    const workoutPlanNames = await getCoachWorkoutPlanByName(coach_id, program_name);
    return res.send(workoutPlanNames);
  },
};

export const isValidRow = (row: Record<string, any>, mandatoryFields: string[]): boolean => {
  for (const field of mandatoryFields) {
    if (!row[field]) {
      return false;
    }
  }
  return true;
};

export default CustomWorkoutController;
