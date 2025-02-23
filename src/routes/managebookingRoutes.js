const express = require('express');
const router = express.Router();
const manageBookingController = require('../controllers/common/managebookingcontroller');
const UserAuth = require('../middleware/userAuth');



router.post('/', UserAuth , manageBookingController.createBooking);
router.put('/:id',UserAuth, manageBookingController.editBooking);
router.get('/:id',UserAuth, manageBookingController.getBookingById);
router.get('/',UserAuth, manageBookingController.getManyBookings);

module.exports = router;

