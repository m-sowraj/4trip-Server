const express = require('express');
const router = express.Router();
const agentAuth = require('../middleware/agentAuth');
const {
    loginAgent,
    createAgent,
    getAgentProfile,
    updateAgent,
    deleteAgent
} = require('../controllers/Agent/agentController');

// Public routes
router.post('/login', loginAgent);
router.post('/register', createAgent);

// Protected routes
router.get('/profile', getAgentProfile);
router.patch('/update', updateAgent);
router.delete('/delete', deleteAgent);

module.exports = router; 