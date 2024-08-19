const stockService = require('../services/stock-service');

// In the controller
exports.getAllStocks = async (req, res, next) => {
  try {
    console.log('Query Params:', req.query);
    const { search, page, pageSize } = req.query;

    const result = await stockService.getAllStocks({ search, page, pageSize });

    const transformedItems = result.items.map(item => ({
      id: item._id.toString(), 
      regNo: item.regNo,
      make: item.make,
      model: item.model,
      modelYear: item.modelYear,
      kms: item.kms,
      color: item.color,
      vin: item.vin,
      retailPrice: item.retailPrice,
      costPrice: item.costPrice,
      accessories: item.accessories,
      images: item.images, // Ensure images are correctly passed here
      dtCreated: item.dtCreated,
      dtUpdated: item.dtUpdated,
    }));

    res.json({ items: transformedItems, total: result.total });
  } catch (err) {
    console.error('Error fetching stocks:', err.message);
    res.status(400).json({ error: err.message });
  }
};

exports.getStockById = async (req, res, next) => {
  try {
    const stock = await stockService.getStockById(req.params.id);

    const transformedStock = {
      ...stock._doc,
      id: stock._id.toString(),
    };

    res.json(transformedStock);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


exports.createStock = async (req, res, next) => {
  try {
    console.log('Request body:', req.body);
    console.log('Request files:', req.files);

    const stock = await stockService.createStock(req.body, req.files);
    res.status(201).json(stock);
  } catch (err) {
    console.error('Error creating stock:', err);
    res.status(400).json({ error: err.message });
  }
};

exports.updateStock = async (req, res, next) => {
  try {
    const stock = await stockService.updateStock(req.params.id, req.body);
    res.json(stock);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteStock = async (req, res, next) => {
  try {
    const stock = await stockService.deleteStock(req.params.id);
    if (!stock) {
      return res.status(404).json({ message: 'Stock item not found' });
    }
    res.json({ message: 'Stock item deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

