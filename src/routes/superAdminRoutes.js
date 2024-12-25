const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
    loginSuperAdmin,
    createSuperAdmin,
    getSuperAdmin,
    updateSuperAdmin,
    deleteSuperAdmin
} = require('../controllers/superAdminController');

// Public routes
router.post('/login', loginSuperAdmin);
router.post('/register', createSuperAdmin);

// Protected routes (require authentication)
router.get('/profile', auth, getSuperAdmin);
router.patch('/update', auth, updateSuperAdmin);
router.delete('/delete', auth, deleteSuperAdmin);

module.exports = router; 