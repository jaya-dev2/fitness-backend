import mongoose, { Document } from 'mongoose';
const Schema = mongoose.Schema;


const OnboardingSchema = new Schema({
  callName: {
    type: String,
    required: false,
  },
  dateOfBirth: {
    type: String,
    required: false,
  },
  age: {
    type: Number,
    required: false,
  },
  height: {
    ft: {
      type: Number,
      required: false,
    },
    in: {
      type: Number,
      required: false,
    },
    cm: {
      type: Number,
      required: false,
    },
  },
  weight: {
    kg: {
      type: Number,
      required: false,
    },
    lbs: {
      type: Number,
      required: false,
    },
  },
  gender: {
    type: String,
    required: false,
  },
  goal: {
    type: String,
    required: false,
  },
  //medicalConditions: {
    //type: [String], // Array of strings
    //required: false,
  //},
  workoutinhrs: {
    type: String,
    required: false,
  },
});

const ClientUserSchema = new Schema(
    {
      email: {
        type: String,
        lowercase: true,
        trim: true,
        required: false,
      },
      firebaseUserId: {
        type: String,
        required: false,
      },
      displayName: {
        type: String,
        required: false,
      },
      displayPicture: {
        type: String,
        required: false,
      },
      inviteAccepted:{
        type: Boolean,
        required: false,
      },
      startDate: {
        type: String,
        required: false,
      },
      endDate: {
        type: String,
        required: false,
      },
      duration: {
        type: String,
        required: false,
      },
      coachId: {
        type: Schema.Types.ObjectId,
        ref: 'CoachUser'
      },
      firebaseFCM: {
        type: String,
        required: false,
      },
      onboarding: OnboardingSchema,
      status: {
        type: String,
        required: false,
      },
    },
    {
      timestamps: true,
    });
    export interface ClientUser extends Document {
      email: string;
      firebaseUserId: string;
      displayName?: string;
      displayPicture?: string;
      inviteAccepted: boolean;
      startDate: string;
      endDate: string;
      duration: string;
      firebaseFCM: string;
      notificationSettings: boolean
    }
  export default mongoose.model('ClientUser', ClientUserSchema);