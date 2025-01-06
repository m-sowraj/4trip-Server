const jwt = require('jsonwebtoken');
const Agent = require('../models/Registration');

const agentAuth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const agent = await Agent.findOne({ _id: decoded._id });

        if (!agent) {
            throw new Error();
        }

        req.token = token;
        req.agent = agent;
        next();
    } catch (error) {
        res.status(401).send({ error: 'Please authenticate.' });
    }
};

module.exports = agentAuth; 