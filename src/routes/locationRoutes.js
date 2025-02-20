const express = require('express');
const router = express.Router();
const locationController = require('../controllers/Location/locationController');

// Public Routes (if any)
// Example: router.get('/public-route', locationController.somePublicFunction);

// Protected Routes
router.post('/', locationController.createLocation);
router.get('/:id', locationController.getLocation);
router.get('/', locationController.getAllLocations);
router.put('/:id', locationController.updateLocation);
router.delete('/:id', locationController.deleteLocation);
router.get('/dropdown/list', locationController.getLocationDropdown);

module.exports = router; 