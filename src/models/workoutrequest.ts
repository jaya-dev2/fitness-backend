import mongoose from 'mongoose';

const Schema = mongoose.Schema;


const WorkoutRequestSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'ClientUser',
  },
  date: {
    type: String,
    // default: Date.now,
  },
  fitness_level: {
    type: String,
    required: false,
  },
  goal: {
    type: String,
    required: false,
  },
  place: {
    type: String,
    required: false,
  },
  equipment: {
    type: String,
    required: false,
  },
  days_per_week: {
    type: String,
    required: false,
  },
},
{
  timestamps: true,
});

export default mongoose.model('WorkoutRequest', WorkoutRequestSchema);
