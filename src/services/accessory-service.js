const Accessory = require('../models/accessory');

class AccessoryService {
  async getAllAccessories() {
    return await Accessory.find();
  }

  async createAccessory(data) {
    const accessory = new Accessory(data);
    await accessory.save();
    return accessory;
  }

  async deleteAccessory(id) {
    const accessory = await Accessory.findByIdAndDelete(id);
    if (!accessory) {
      throw new Error('Accessory not found');
    }
    return accessory;
  }
}

module.exports = new AccessoryService();
