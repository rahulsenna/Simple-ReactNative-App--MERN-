const mongoose = require('mongoose');

const soldBoughtSchema = new mongoose.Schema({
  itemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true },
  timestamp: { type: Date, default: Date.now }
});

const userSchema = new mongoose.Schema({
  userid: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String },
  age: { type: Number },
  sold: [soldBoughtSchema],
  bought: [soldBoughtSchema]
});

module.exports = mongoose.model('User', userSchema);

