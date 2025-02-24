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
const UserAuth = require('../middleware/userAuth');

// Public routes
router.post('/verify', verifyBooking);
router.get('/:id',UserAuth , getBooking);
router.get('/',UserAuth , getallBooking);

// Protected routes (only agents can create/update/delete bookings)
router.post('/', UserAuth , createBooking);
router.patch('/:id',UserAuth , updateBooking);
router.delete('/:id', UserAuth , deleteBooking);

module.exports = router; 