const mongoose = require('mongoose');

const AccessorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    image: { type: String, required: true },
});

module.exports = mongoose.model('Accessory', AccessorySchema);
