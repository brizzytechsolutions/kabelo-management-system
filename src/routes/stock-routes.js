const express = require('express');
const router = express.Router();
const stockController = require('../controllers/stock-controller');
const authMiddleware = require('../middlewares/auth-middleware');
const upload = require('../utils/upload');

/**
 * @swagger
 * tags:
 *   name: Stock
 *   description: API for managing car dealership stock
 */

/**
 * @swagger
 * /api/stock:
 *   get:
 *     summary: Get all stock items
 *     tags: [Stock]
 *     responses:
 *       200:
 *         description: List of stock items
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/StockItem'
 */
router.get('/', authMiddleware, stockController.getAllStocks);

/**
 * @swagger
 * /api/stock/{id}:
 *   get:
 *     summary: Get a single stock item by ID
 *     tags: [Stock]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The stock item ID
 *     responses:
 *       200:
 *         description: A single stock item
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/StockItem'
 */
router.get('/:id', authMiddleware, stockController.getStockById);

/**
 * @swagger
 * /api/stock:
 *   post:
 *     summary: Create a new stock item
 *     tags: [Stock]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/NewStockItem'
 *     responses:
 *       201:
 *         description: The created stock item
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/StockItem'
 */
router.post('/', authMiddleware, upload.array('images', 3), stockController.createStock);

/**
 * @swagger
 * /api/stock/{id}:
 *   put:
 *     summary: Update a stock item
 *     tags: [Stock]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The stock item ID
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/NewStockItem'
 *     responses:
 *       200:
 *         description: The updated stock item
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/StockItem'
 */
router.put('/:id', authMiddleware, upload.array('images', 3), stockController.updateStock);

/**
 * @swagger
 * /api/stock/{id}:
 *   delete:
 *     summary: Delete a stock item
 *     tags: [Stock]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The stock item ID
 *     responses:
 *       200:
 *         description: Stock item deleted
 */
router.delete('/:id', authMiddleware, stockController.deleteStock);

module.exports = router;
