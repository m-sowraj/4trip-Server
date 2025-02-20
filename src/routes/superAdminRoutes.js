const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  createSuperAdmin,
  getReviewCompletedData,
  getYetToBeReviewedData,
  placesToVisit,
  loginSuperAdmin,
  getPlaceToVist,
  updatePlace,
  addThingsToCarry,
  getThingsToCarry,
  updateThingsToCarry,
  deleteThingsToCarry,
} = require('../controllers/Superadmin/superAdminController');


// const uploadFields = [
//     { name: 'image', maxCount: 10 }, // Allow up to 5 images
//     { name: 'video', maxCount: 3 }, // Allow up to 3 videos
//   ];
  
  router.post('/places', placesToVisit);
  router.put('/places/:id', updatePlace);
  router.get('/completed_data',getReviewCompletedData);
  router.get('/reviewdata',getYetToBeReviewedData);
  router.post('/login',loginSuperAdmin);
 router.get('/allplaces',getPlaceToVist)
 router.post('/thingstocarry', addThingsToCarry);
 router.get('/thingstocarry/:location_id', getThingsToCarry);
 router.put('/thingstocarry/:location_id/:item_id', updateThingsToCarry);
 router.delete('/thingstocarry/:location_id/:item_id', deleteThingsToCarry);

module.exports = router; 