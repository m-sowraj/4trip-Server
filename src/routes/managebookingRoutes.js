const express = require('express');
const router = express.Router();
const manageBookingController = require('../controllers/common/managebookingcontroller');


router.post('/bookings', manageBookingController.createBooking);
router.put('/bookings/:id', manageBookingController.editBooking);
router.get('/bookings/:id', manageBookingController.getBookingById);
router.get('/bookings', manageBookingController.getManyBookings);

