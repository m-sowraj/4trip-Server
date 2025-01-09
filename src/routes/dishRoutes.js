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
router.put('/:id', updateDish);
router.delete('/:id', deleteDish);

module.exports = router; 