import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const MacroSchema = new Schema({
  energy: {
    type: Number
  },
  protein: {
    type: Number
  },
  carb: {
    type: Number
  },
  fat: {
    type: Number
  },
});

const MealSchema = new Schema({
  food: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: false,
  },
  amount: {
    type: String,
    required: true,
  },
  servingSize: {
    type: Number,
    required: true,
  },
  energy: {
    type: Number
  },
  protein: {
    type: Number
  },
  carb: {
    type: Number
  },
  fat: {
    type: Number
  },
});

const DietLogSchema = new Schema({
  dietName: {
    type: String,
    required: false,
  },
  date: {
    type: String,
    // default: Date.now,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  healthData: {
    stepCount: {
      type: Number,
      required: false,
    },
    totalActiveEnergyBurned: {
      type: Number,
      required: false,
    },
    totalBasalEnergyBurned: {
      type: Number,
      required: false,
    },
    totalEnergyBurned: {
      type: Number,
      required: false,
    },
    totalWorkoutDuration: {
      type: Number,
      required: false,
    },
  },
  macronutrientsKcal: {
    targetCalorie: {
      type: Number,
      required: true,
    },
    protein: {
      type: Number,
      required: true,
    },
    carb: {
      type: Number,
      required: true,
    },
    fat: {
      type: Number,
      required: true,
    },
  },
  breakfast: [MealSchema], 
  lunch: [MealSchema],
  dinner: [MealSchema],
  snacks: [MealSchema],
  breakfastTotal: MacroSchema,
  lunchTotal: MacroSchema,
  dinnerTotal: MacroSchema,
  snacksTotal: MacroSchema,
  TotalConsumedKcal: MacroSchema
},
{
  timestamps: true,
});

export default mongoose.model('DietLog', DietLogSchema);
