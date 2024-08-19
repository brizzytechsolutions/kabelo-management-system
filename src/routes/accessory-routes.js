const express = require('express');
const router = express.Router();
const accessoryController = require('../controllers/accessory-controller');
const authMiddleware = require('../middlewares/auth-middleware');

/**
 * @swagger
 * tags:
 *   name: Accessory
 *   description: API for managing car accessories
 */

/**
 * @swagger
 * /api/accessory:
 *   get:
 *     summary: Get all accessories
 *     tags: [Accessory]
 *     responses:
 *       200:
 *         description: List of accessories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/definitions/Accessory'
 */
router.get('/', authMiddleware, accessoryController.getAllAccessories);

/**
 * @swagger
 * /api/accessory:
 *   post:
 *     summary: Create a new accessory
 *     tags: [Accessory]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/NewAccessory'
 *     responses:
 *       201:
 *         description: The created accessory
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Accessory'
 */
router.post('/', authMiddleware, accessoryController.createAccessory);

/**
 * @swagger
 * /api/accessory/{id}:
 *   delete:
 *     summary: Delete an accessory
 *     tags: [Accessory]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The accessory ID
 *     responses:
 *       200:
 *         description: Accessory deleted
 */
router.delete('/:id', authMiddleware, accessoryController.deleteAccessory);

module.exports = router;
