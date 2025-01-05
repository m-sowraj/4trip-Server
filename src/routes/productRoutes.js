const express = require('express');
const router = express.Router();
const {
    createProduct,
    updateProduct,
    getProduct,
    getProducts
} = require('../controllers/Partners/productController');


router.get('product/', getProducts);
router.get('product/:id', getProduct);
router.post('product/', createProduct);
router.put('product/:id', updateProduct);

module.exports = router;
