const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const {
  placesToVisit,
  getPlacesByLocation,
  getAllPlaces,
  updatePlace,
  deletePlace
} = require('../controllers/client/destinationController');

const {
  createSuperAdmin,
  getReviewCompletedData,
  getYetToBeReviewedData,
  loginSuperAdmin,
  addThingsToCarry,
  getThingsToCarry,
  updateThingsToCarry,
  deleteThingsToCarry
} = require('../controllers/Superadmin/superAdminController');

const SuperAdminAuth = require('../middleware/superAdminAuth');

// const uploadFields = [
//     { name: 'image', maxCount: 10 }, // Allow up to 5 images
//     { name: 'video', maxCount: 3 }, // Allow up to 3 videos
//   ];

router.post('/places', SuperAdminAuth, placesToVisit);
router.get('/allplaces', getAllPlaces);
router.get('/places/:location', getPlacesByLocation);
router.put('/places/:id', SuperAdminAuth, updatePlace);
router.delete('/places/:id', SuperAdminAuth, deletePlace);

router.get('/completed_data', SuperAdminAuth, getReviewCompletedData);
router.get('/reviewdata', SuperAdminAuth, getYetToBeReviewedData);
router.post('/login', loginSuperAdmin);
router.post('/thingstocarry', SuperAdminAuth, addThingsToCarry);
router.get('/thingstocarry/:location_id', SuperAdminAuth, getThingsToCarry);
router.put(
  '/thingstocarry/:location_id/:item_id',
  SuperAdminAuth,
  updateThingsToCarry
);
router.delete(
  '/thingstocarry/:location_id/:item_id',
  SuperAdminAuth,
  deleteThingsToCarry
);

module.exports = router;
