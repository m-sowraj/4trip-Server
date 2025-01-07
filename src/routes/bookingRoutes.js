const express = require('express');
const router = express.Router();
const agentAuth = require('../middleware/userAuth');
const {
    createBooking,
    verifyBooking,
    getBooking,
    updateBooking,
    deleteBooking,
    getallBooking
} = require('./../controllers/Agent/CustomerSide/bookingController');

// Public routes
router.post('/verify', verifyBooking);
router.get('/:id', getBooking);
router.get('/', getallBooking);

// Protected routes (only agents can create/update/delete bookings)
router.post('/',  createBooking);
router.patch('/:id', updateBooking);
router.delete('/:id',  deleteBooking);

module.exports = router; 