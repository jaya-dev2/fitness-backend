import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const FoodSchema = new Schema({
    
      category: {
        type: String,
        required: false,
      },
      food: {
        type: String,
        required: true,
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
FoodSchema.index({ food: 'text' });

    export default mongoose.model('Food', FoodSchema, 'fooddbs');