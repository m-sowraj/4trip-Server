const jwt = require('jsonwebtoken');
const User = require('../models/User');

const SuperAdminAuth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: decoded.id });

    if (!user || user.reg_type !== 'superadmin') {
      throw new Error();
    }

    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    res.status(401).send({ error: 'Please authenticate as Super Admin.' });
  }
};

module.exports = SuperAdminAuth;
