const express = require('express');
const router = express.Router();
const manageBookingController = require('../controllers/common/managebookingcontroller');
const UserAuth = require('../middleware/userAuth');



router.post('/', UserAuth , manageBookingController.createBooking);
router.put('/:id', manageBookingController.editBooking);
router.get('/:id', manageBookingController.getBookingById);
router.get('/', manageBookingController.getManyBookings);

module.exports = router;

