const StockItem = require('../models/stock');
const Accessory = require('../models/accessory');

class StockService {
  async getAllStocks({ search = '', page = 1, pageSize = 10 }) {
    page = parseInt(page, 10);
    pageSize = parseInt(pageSize, 10);

    const filter = search ? { $text: { $search: search } } : {};

    const stocks = await StockItem.find(filter)
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .populate('accessories'); 

    const total = await StockItem.countDocuments(filter);

    return { items: stocks, total };
  }


  async getStockById(id) {
    const stock = await StockItem.findById(id).populate('accessories');
    if (!stock) {
      throw new Error('Stock item not found');
    }
    return stock;
  }

  async createStock(data, files) {
    try {
      const imagePaths = Array.isArray(files.images) ? files.images.map(file => `/uploads/${file.filename}`) : [];

      const accessoryImages = Object.keys(files)
        .filter(key => key.startsWith('accessories'))
        .map(key => {
          const accessoryIndex = key.match(/\d+/)[0];
          return {
            accessoryIndex: parseInt(accessoryIndex, 10),
            imagePath: `/uploads/${files[key][0].filename}`
          };
        });

      const accessoryIds = await Promise.all(
        data.accessories.map(async (accessory, index) => {
          if (accessoryImages[index]) {
            accessory.image = accessoryImages[index].imagePath;
          }
          const newAccessory = new Accessory(accessory);
          await newAccessory.save();
          return newAccessory._id;
        })
      );

      const stockData = {
        ...data,
        images: imagePaths,
        accessories: accessoryIds 
      };

      const stock = new StockItem(stockData);
      await stock.save();

      return stock;
    } catch (err) {
      console.error('Error saving stock item:', err);
      throw err;
    }
  }

  async updateStock(id, data, files) {
    try {
      let stock = await StockItem.findById(id);
      if (!stock) {
        throw new Error('Stock item not found');
      }

      let accessories = [];
      if (data.accessories) {
        if (typeof data.accessories === 'string') {
          try {
            accessories = JSON.parse(data.accessories);
          } catch (e) {
            throw new Error('Invalid accessories format');
          }
        } else if (Array.isArray(data.accessories)) {
          accessories = data.accessories;
        } else {
          throw new Error('Accessories should be an array');
        }
      }

      const imagePaths = files.images ? files.images.map(file => `/uploads/${file.filename}`) : [];
      if (imagePaths.length > 0) {
        stock.images = imagePaths;
      }

      const accessoryIds = await Promise.all(
        accessories.map(async (accessory, index) => {
          if (files[`accessories[${index}][image]`]) {
            accessory.image = `/uploads/${files[`accessories[${index}][image]`][0].filename}`;
          }

          let updatedAccessory;
          if (accessory.id) {
            updatedAccessory = await Accessory.findByIdAndUpdate(accessory.id, accessory, { new: true });
          } else {
            updatedAccessory = new Accessory(accessory);
            await updatedAccessory.save();
          }
          return updatedAccessory._id;
        })
      );

      stock.accessories = accessoryIds;

      const { images, accessories: _, ...otherFields } = data;
      Object.assign(stock, otherFields);
      stock.dtUpdated = Date.now();
      await stock.save();

      return stock;
    } catch (err) {
      console.error('Error updating stock item:', err);
      throw err;
    }
  }

  async deleteStock(id) {
    const stock = await StockItem.findByIdAndDelete(id);
    if (!stock) {
      throw new Error('Stock item not found');
    }
    return stock;
  }
}

module.exports = new StockService();
