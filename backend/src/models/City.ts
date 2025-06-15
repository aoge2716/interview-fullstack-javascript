import mongoose from 'mongoose';

const citySchema = new mongoose.Schema({
  uuid: {type: String, required: true, unique:true },
  cityName: {type: String, required:true},
  count: {type: Number, reuiqred:true},
});

const City = mongoose.model('City', citySchema);
export default City;