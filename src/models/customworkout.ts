import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const CustomworkoutSchema = new Schema({

  coachId: {
    type: Schema.Types.ObjectId,
    ref: 'CoachUser'
  },
  program: {
    type: String,
    required: true,
  },
  day: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: false,
  },
  exercise_name: {
    type: String,
    required: true,
  },
  sets: {
    type: String,
    required: true,
  },
  reps: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: false,
  },
  links_to_tutorials: {
    type: Schema.Types.Mixed,
    required: false,
  },
  primary_target_muscle_group: {
    type: String,
    required: false,
  },
  secondary_target_muscle_group: {
    type: String,
    required: false,
  },
},
  {
    timestamps: true,
  });
export default mongoose.model('Customworkout', CustomworkoutSchema);
