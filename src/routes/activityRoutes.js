const express = require('express');
const router = express.Router();
const activityController = require('../controllers/Partners/activityController');
const UserAuth = require('../middleware/userAuth');


router.post('/',UserAuth, activityController.createActivity);
router.put('/:id',UserAuth, activityController.updateActivity);
router.get('/:id',UserAuth, activityController.getActivity);
router.get('/',UserAuth, activityController.getActivities);

module.exports = router;
