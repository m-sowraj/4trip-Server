const express = require('express');
const router = express.Router();
const agentAuth = require('../middleware/agentAuth');
const {
    createBooking,
    verifyBooking,
    getBooking,
    updateBooking,
    deleteBooking
} = require('../controllers/bookingController');

// Public routes
router.post('/verify', verifyBooking);
router.get('/:id', getBooking);

// Protected routes (only agents can create/update/delete bookings)
router.post('/', agentAuth, createBooking);
router.patch('/:id', agentAuth, updateBooking);
router.delete('/:id', agentAuth, deleteBooking);

module.exports = router; 