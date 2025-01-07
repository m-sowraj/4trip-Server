const express = require('express');
const router = express.Router();
const {
    createDish,
    getDishes,
    getDishById,
    updateDish,
    deleteDish
} = require('./../controllers/Partners/dishController');
const agentAuth = require('../middleware/userAuth');

// Public routes
router.post('/', createDish);
router.get('/', getDishes);
router.get('/:id', getDishById);

//protected-routes
router.patch('/:id',agentAuth, updateDish);
router.delete('/:id',agentAuth, deleteDish);

module.exports = router; 