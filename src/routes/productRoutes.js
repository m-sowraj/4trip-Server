const express = require('express');
const router = express.Router();
const {
    createProduct,
    updateProduct,
    getProduct,
    getProducts
} = require('../controllers/Partners/productController');


router.get('/', getProducts);
router.get('/:id', getProduct);
router.post('/', createProduct);
router.put('/:id', updateProduct);

module.exports = router;
