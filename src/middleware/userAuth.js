const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Booking = require('../models/Booking');

const UserAuth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.type === 'booking') {
      const booking = await Booking.findOne({ _id: decoded.id });
      if (!booking) {
        throw new Error();
      }
      req.token = token;
      req.booking = booking;
      req.authType = 'booking';
    } else {
      const user = await User.findOne({ _id: decoded.id });
      if (!user) {
        throw new Error();
      }
      req.token = token;
      req.user = user;
      req.authType = 'user';
    }

    next();
  } catch (error) {
    res.status(401).send({ error: 'Please authenticate.' });
  }
};

module.exports = UserAuth;
