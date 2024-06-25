import mongoose from 'mongoose';

const mongoDBConnect = () => {
  try {
    mongoose.set('strictQuery', true);
    mongoose.connect(process.env.MONGO_STRING);
    console.log(`MongoDB connect successfully`);
  } catch (error) {
    console.log(error.message);
  }
};

export default mongoDBConnect;
