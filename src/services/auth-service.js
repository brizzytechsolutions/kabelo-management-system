const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/auth');

class AuthService {
  async register(username, password) {
    let user = await User.findOne({ username });
    if (user) {
      throw new Error('User already exists');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({ username, password: hashedPassword });
    await user.save();

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    return { token };
  }

  async login(username, password) {
    const user = await User.findOne({ username });
    if (!user) {
      throw new Error('Invalid Credentials');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Invalid Credentials');
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    return { token };
  }
}

module.exports = new AuthService();
