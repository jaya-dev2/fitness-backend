import mongoose, { Document, Schema, Model } from 'mongoose';

const ExerciseSchema = new Schema({
  muscleGroup: {
    type: String,
    required: false,
  },
  name: {
    type: String,
    required: false,
  },
  IsUnitInSecs: {
    type: Boolean,
    required: false,
  },
  notes: {
    type: String,
    required: false,
  },
  videoLink: {
    type: String,
    required: false,
  },
  sets: [
    {
      reps: {
        type: Number,
      },
    },
  ],
  warmupSets: [
    {
      reps: {
        type: Number,
      },
    },
  ],
});


const WorkoutResponseSchema = new Schema(
  {
    daysArray: [
      {
        exerciseArray: [ExerciseSchema],
        day: {
          type: Number,
          required: false,
        },
        group: {
          type: String,
          required: false,
        },
      },
    ],
    coachId: {
      type: Schema.Types.ObjectId,
      ref: 'CoachUser',
    },
    clientId: {
      type: Schema.Types.ObjectId,
      ref: 'ClientUser',
    },
    name: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('WorkoutResponse', WorkoutResponseSchema);
