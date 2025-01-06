const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {createSuperAdmin,getReviewCompletedData,getYetToBeReviewedData,placesToVist,loginSuperAdmin,placesToVisit,getPlaceToVist}=require('../controllers/Superadmin/superAdminController')


// const uploadFields = [
//     { name: 'image', maxCount: 10 }, // Allow up to 5 images
//     { name: 'video', maxCount: 3 }, // Allow up to 3 videos
//   ];
  
  router.post('/places', placesToVisit);
  router.get('/completed_data',getReviewCompletedData);
  router.get('/reviewdata',getYetToBeReviewedData);
  router.post('/login',loginSuperAdmin);
 router.get('/allplaces',getPlaceToVist)

module.exports = router; 