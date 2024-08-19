const accessoryService = require('../services/accessory-service');

exports.getAllAccessories = async (req, res, next) => {
  try {
    const accessories = await accessoryService.getAllAccessories();
    res.json(accessories);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.createAccessory = async (req, res, next) => {
  try {
    const accessory = await accessoryService.createAccessory(req.body);
    res.status(201).json(accessory);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteAccessory = async (req, res, next) => {
  try {
    const accessory = await accessoryService.deleteAccessory(req.params.id);
    res.json({ message: 'Accessory deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
