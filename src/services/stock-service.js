const StockItem = require('../models/stock');

class StockService {
  async getAllStocks({ search = '', page = 1, pageSize = 10 }) {
    page = parseInt(page, 10);
    pageSize = parseInt(pageSize, 10);

    const filter = search ? { $text: { $search: search } } : {};

    const stocks = await StockItem.find(filter)
        .skip((page - 1) * pageSize)
        .limit(pageSize)
        .populate('accessories'); // Ensure populate is correct

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
        const imagePaths = files.map(file => `/uploads/${file.filename}`);
        const stockData = { ...data, images: imagePaths };

        const stock = new StockItem(stockData);
        await stock.save();
        console.log('Saved stock item with images:', stock.images);
        return stock;
    } catch (err) {
        console.error('Error saving stock item:', err);
        throw err;
    }
}


  async updateStock(id, data) {
    let stock = await StockItem.findById(id);
    if (!stock) {
      throw new Error('Stock item not found');
    }

    Object.assign(stock, data);
    stock.dtUpdated = Date.now();
    await stock.save();
    return stock;
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
