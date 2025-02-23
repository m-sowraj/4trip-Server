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

const SuperAdminAuth = require('../middleware/superAdminAuth');


// const uploadFields = [
//     { name: 'image', maxCount: 10 }, // Allow up to 5 images
//     { name: 'video', maxCount: 3 }, // Allow up to 3 videos
//   ];
  
  router.post('/places',SuperAdminAuth, placesToVisit);
  router.put('/places/:id',SuperAdminAuth, updatePlace);
  router.get('/completed_data',SuperAdminAuth,getReviewCompletedData);
  router.get('/reviewdata',SuperAdminAuth,getYetToBeReviewedData);
  router.post('/login',loginSuperAdmin);
 router.get('/allplaces',SuperAdminAuth,getPlaceToVist)
 router.post('/thingstocarry',SuperAdminAuth, addThingsToCarry);
 router.get('/thingstocarry/:location_id',SuperAdminAuth, getThingsToCarry);
 router.put('/thingstocarry/:location_id/:item_id',SuperAdminAuth, updateThingsToCarry);
 router.delete('/thingstocarry/:location_id/:item_id',SuperAdminAuth, deleteThingsToCarry);

module.exports = router; 