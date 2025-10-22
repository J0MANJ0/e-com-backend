import mongoose from 'mongoose';

let connected = false;

export const connectDB = async () => {
  if (connected) return;
  try {
    await mongoose.connect(process.env.CONN_STR!);
    connected = true;
    console.log('\nCONNECTED TO DATABASE\n');
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
};
