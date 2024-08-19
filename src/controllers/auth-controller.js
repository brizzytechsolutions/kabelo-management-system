// auth-controller.js
const authService = require('../services/auth-service');

exports.register = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const result = await authService.register(username, password);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.login = async (req, res, next) => {
  try {
    console.log('Login attempt:', req.body);
    const { username, password } = req.body;
    const result = await authService.login(username, password);
    console.log('Login successful, result:', result);
    res.json({ success: true, token: result.token });
  } catch (err) {
    console.error('Login error:', err.message);
    res.status(400).json({ success: false, error: err.message });
  }
};
