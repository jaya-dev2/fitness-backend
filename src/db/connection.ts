import mongoose from 'mongoose';

export const initDb = async (): Promise<any> => {
  try {
    const options: Record<string, any>  = {
     
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    const db = await mongoose.connect(process.env.MONGO_URL, options);
    console.log('DB connected');
    return db;
  } catch (error) {
    console.error('DB connection failed', error);
    process.exit(1);
  }
};
