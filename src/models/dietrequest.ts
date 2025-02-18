import mongoose from 'mongoose';

const Schema = mongoose.Schema;


const DietRequestSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'ClientUser',
  },
  date: {
    type: String,
    // default: Date.now,
  },
  breakfast: [{
    type: String,
    required: false,
  }],
  lunch: [{
    type: String,
    required: false,
  }],
  dinner: [{
    type: String,
    required: false,
  }],
  snacks: [{
    type: String,
    required: false,
  }],
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
},
{
  timestamps: true,
});

export default mongoose.model('DietRequest', DietRequestSchema);
