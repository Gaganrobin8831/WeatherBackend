import mongoose from 'mongoose';

export const connectToDatabase = async () => {
  try {
  const connectionDb =  await mongoose.connect(process.env.DB_URL);
    console.log(`Database connection successful ${connectionDb.connection.host}`);
  } catch (error) {
    console.error('Database connection error:', error);
    throw error;
  }
};