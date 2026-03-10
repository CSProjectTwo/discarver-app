import mongoose from 'mongoose';

const connectDB = async (): Promise<void> => {
  try {
    // process.env.MONGO_URI might be undefined, so we tell TS it's a string
    const conn = await mongoose.connect(process.env.MONGO_URI as string);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error: any) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;