const express = require('express');
const router = express.Router();
const {
    createProduct,
    updateProduct,
    getProduct,
    getProducts
} = require('../controllers/Partners/productController');
const auth = require('../middleware/auth');

router.get('/',  getProducts);
router.get('/:id', getProduct);
router.post('/', auth, createProduct);
router.put('/:id', auth, updateProduct);

module.exports = router;
