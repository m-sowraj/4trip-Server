const express = require('express');
const router = express.Router();
const {
    createDish,
    getDishes,
    getDishById,
    updateDish,
    deleteDish
} = require('./../controllers/Partners/dishController');
const UserAuth = require('../middleware/userAuth');

// Public routes
router.post('/',UserAuth, createDish);
router.get('/', UserAuth, getDishes);
router.get('/:id', UserAuth, getDishById);

//protected-routes
router.put('/:id', UserAuth, updateDish);
router.delete('/:id', UserAuth, deleteDish);

module.exports = router; 