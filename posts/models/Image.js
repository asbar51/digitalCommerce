import mongoose from 'mongoose'

const imageSchema = new mongoose.Schema({
  filename: String,
  path: String,
  uploadDate: { type: Date, default: Date.now },
});

const Image = mongoose.model('Image', imageSchema);

export default Image;