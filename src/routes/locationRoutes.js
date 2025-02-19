const express = require('express');
const router = express.Router();
const locationController = require('../controllers/Location/locationController');
const auth = require('../middleware/auth'); // Assuming you want to protect these routes

// Public Routes (if any)
// Example: router.get('/public-route', locationController.somePublicFunction);

// Protected Routes
router.post('/', auth, locationController.createLocation);
router.get('/:id', auth, locationController.getLocation);
router.get('/', auth, locationController.getAllLocations);
router.put('/:id', auth, locationController.updateLocation);
router.delete('/:id', auth, locationController.deleteLocation);
router.get('/dropdown/list', auth, locationController.getLocationDropdown);

module.exports = router; 