const express = require('express');
const router = express.Router();
const {
    createProduct,
    updateProduct,
    getProduct,
    getProducts
} = require('../controllers/Partners/productController');
const UserAuth = require('../middleware/userAuth');

router.get('/',  UserAuth,getProducts);
router.get('/:id', UserAuth,getProduct);
router.post('/',UserAuth, createProduct);
router.put('/:id',UserAuth, updateProduct);

module.exports = router;
