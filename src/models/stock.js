const mongoose = require('mongoose');

const StockItemSchema = new mongoose.Schema({
  regNo: { type: String, required: true, unique: true },
  make: { type: String, required: true },
  model: { type: String, required: true },
  modelYear: { type: Number, required: true },
  kms: { type: Number, required: true },
  color: { type: String, required: true },
  vin: { type: String, required: true, unique: true },
  retailPrice: { type: Number, required: true },
  costPrice: { type: Number, required: true },
  accessories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Accessory' }],
  images: [{ type: String }], // Paths to the images of the stock item
  dtCreated: { type: Date, default: Date.now },
  dtUpdated: { type: Date, default: Date.now },
});

StockItemSchema.index({ make: 'text', model: 'text' });

module.exports = mongoose.model('StockItem', StockItemSchema);

