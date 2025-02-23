const express = require('express');
const router = express.Router();
const {
    createReview,
    getReviews,
    getReviewById,
    updateReview,
    deleteReview
} = require('../controllers/reviewController');
const UserAuth = require('../middleware/userAuth');

router.post('/',UserAuth, createReview);
router.get('/',UserAuth, getReviews);
router.get('/:id',UserAuth, getReviewById);
router.patch('/:id',UserAuth, updateReview);
router.delete('/:id',UserAuth, deleteReview);

module.exports = router; 