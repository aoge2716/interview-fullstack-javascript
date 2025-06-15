import mongoose from 'mongoose';
import City from '../src/models/City';
import cities from '../data/cities.json';
import dotenv from 'dotenv';

dotenv.config();

const importData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    await City.insertMany(cities);
    console.log('Cities imported');
    process.exit();
  } catch (err) {
    console.error('Import failed:', err);
    process.exit(1);
  }
};

importData();
