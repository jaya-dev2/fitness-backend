import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const NotificationSchema = new Schema(
{
    fromUserId: {
        type: String,
        required: true,  
    },
    toUserId: {
        type: String,
        required: true,  
    },
    dietRequestId: {
        type: String,
        required: false,  
    },
    dietResponseId: {
        type: String,
        required: false,
    },
    workoutRequestId: {
        type: String,
        required: false,  
    },
    workoutResponseId: {
        type: String,
        required: false,  
    },
    seen: {
        type: Boolean,
        default: false,
    }, 
},
{
  timestamps: true,
}
);
export default mongoose.model('Notification', NotificationSchema);