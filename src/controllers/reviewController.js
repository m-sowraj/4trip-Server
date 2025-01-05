const Review = require('../models/Review');

const createReview = async (req, res) => {
    try {
        const review = new Review(req.body);
        await review.save();
        res.status(201).json(review);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getReviews = async (req, res) => {
    try {
        const { dish_id, destination_id, agent_id, sort } = req.query;

   
        const filter = {};
        if (dish_id) {
            filter.dish_id = dish_id;
        }
        if (destination_id) {
            filter.destination_id = destination_id;
        }
        if (agent_id) {
            filter.agent_id = agent_id;
        }
        const sortOptions = {};
        if (sort) {
            sortOptions.rating = sort === 'desc' ? -1 : 1; 
        }

        const reviews = await Review.find(filter)
            .populate('agent_id')
            .populate('dish_id')
            .populate('destination_id')
            .sort(sortOptions);

        res.json(reviews);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get Review by ID
const getReviewById = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id).populate('agent_id').populate('dish_id').populate('destination_id');
        if (!review) {
            return res.status(404).json({ error: 'Review not found' });
        }
        res.json(review);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update Review
const updateReview = async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['reviewType', 'content', 'rating', 'destination_id'];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).json({ error: 'Invalid updates!' });
    }

    try {
        const review = await Review.findById(req.params.id);
        if (!review) {
            return res.status(404).json({ error: 'Review not found' });
        }

        updates.forEach(update => review[update] = req.body[update]);
        await review.save();
        res.json(review);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete Review
const deleteReview = async (req, res) => {
    try {
        const review = await Review.findByIdAndDelete(req.params.id);
        if (!review) {
            return res.status(404).json({ error: 'Review not found' });
        }
        res.json({ message: 'Review deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createReview,
    getReviews,
    getReviewById,
    updateReview,
    deleteReview
}; 