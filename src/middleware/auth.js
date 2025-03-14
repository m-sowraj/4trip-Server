const jwt = require('jsonwebtoken');
const SuperAdmin = require('../models/Destination');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await SuperAdmin.findOne({ _id: decoded._id });

    if (!admin) {
      throw new Error();
    }

    req.token = token;
    req.admin = admin;
    next();
  } catch (error) {
    res.status(401).send({ error: 'Please authenticate.' });
  }
};

module.exports = auth;
