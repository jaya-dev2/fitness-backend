import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UserFooddbSchema = new Schema({
    
      category: {
        type: String,
        required: false,
      },
      user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: false,
      },
      food: {
        type: String,
        required: true,
        unique: true,
      },
      portionSize:{
        type: String,
        required: true,
      },
      proteinGram: {
        type: Number,
        required: true,
      },
      carbGram: {
        type: Number,
        required: true,
      },
      fatGram: {
        type: Number,
        required: true,
      },
      energyKcal:{
        type: Number,
        required: true,
      }
    },
   
    );
    //  Add indexing for text search on 'food' field
  UserFooddbSchema.index({ food: 'text' });

    export default mongoose.model('UserFooddb', UserFooddbSchema);