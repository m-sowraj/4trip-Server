const express = require('express');
const router = express.Router();
const agentAuth = require('../middleware/agentAuth');
const {
    loginAgent,
    createAgent,
    getAgentProfile,
    updateAgent,
    deleteAgent
} = require('../controllers/agentController');

// Public routes
router.post('/login', loginAgent);
router.post('/register', createAgent);

// Protected routes
router.get('/profile', agentAuth, getAgentProfile);
router.patch('/update', agentAuth, updateAgent);
router.delete('/delete', agentAuth, deleteAgent);

module.exports = router; 