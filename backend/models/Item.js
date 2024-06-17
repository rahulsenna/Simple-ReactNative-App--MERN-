const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  img_url: { type: String, default: "https://www.tocico.org/global_graphics/default-store-350x350.jpg"},
  price: { type: Number, required: true },
  available: { type: Boolean, default: true },
  seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

const Item = mongoose.model('Item', itemSchema);
module.exports = Item;