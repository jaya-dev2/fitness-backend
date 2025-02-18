import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const WorkoutLogSchema = new Schema({
    exerciseArray: [
        {
          muscleGroup: {
            type: String,
            required: false
          },
          name: {
            type: String,
            required: false
          },
          IsUnitInSecs: {
            type: Boolean,
            required: false
          },
          notes: {
            type: String,
            required:false
          },
          videoLink:{
            type: String,
            required: false
          },
        sets: [{
          weight: {
            type: Number
          },
          reps: {
            type: Number
          }
        }
        ],
        warmupSets: [{
          weight: {
            type: Number
          },
          reps: {
            type: Number
          }
        }
        ]

}],    
      date: {
        type: String,
        // default: Date.now,
      },
      day: {
        type: Number,
        required: false,
      },
      group: {
        type: String,
        required: false,
      },
      user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    },
    {
      timestamps: true,
    }
    );
    export default mongoose.model('WorkoutLog', WorkoutLogSchema);
    