import mongoose, { Document } from 'mongoose';
const Schema = mongoose.Schema;

const CoachUserSchema = new Schema(
    {
   email: {
      type: String,
        lowercase: true,
        trim: true,
        unique: true,
        required: false,
    },
    firebaseUserID: {
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
    clients: [
      {
        type: Schema.Types.ObjectId,
        ref: 'ClientUser',
        
      },
    ],
    firebaseFCM: {
      type: String,
      required: false,
    }
  },
    {
      timestamps: true,
    });
    export interface CoachUser extends Document {
      email: string;
      clients: string;
      firebaseUserId: string;
      displayName?: string;
      displayPicture?: string;
      firebaseFCM: string;
    }
  export default mongoose.model('CoachUser', CoachUserSchema);