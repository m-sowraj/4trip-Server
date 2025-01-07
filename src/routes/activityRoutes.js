const express = require('express');
const router = express.Router();
const activityController = require('../controllers/Partners/activityController');
const UserAuth = require('../middleware/userAuth');


router.post('/',UserAuth, activityController.createActivity);
router.put('/:id', activityController.updateActivity);
router.get('/:id', activityController.getActivity);
router.get('/', activityController.getActivities);

module.exports = router;
