// routes/test.js
const express = require('express');
const router = express.Router();

/**
 * @swagger
 * /api/test:
 *   get:
 *     summary: Test endpoint
 *     description: Returns a simple message
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 */
router.get('/test', (req, res) => {
  res.json('Test endpoint working');
});

module.exports = router;
