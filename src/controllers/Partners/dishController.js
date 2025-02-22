const Dish = require('../../models/Dish');

const createDish = async (req, res) => {
    try {
        if(req.user.reg_type !== 'partner' || req.user.select_category !== 'restaurant'){
            return res.status(403).json({ error: 'Unauthorized to create dish' });
        }
        const dish = new Dish({...req.body , created_by: req.user._id} );
        await dish.save();
        res.status(201).json(dish);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


const getDishes = async (req, res) => {
    try {
        const filters = {}
        if (req.query.name) {
            filters.name = { $regex: req.query.name, $options: 'i' }; 
        }
        if (req.query.category) {
            filters.category = req.query.category;
        }
        if (req.query.price) {
            filters.price = { $lte: req.query.price }; 
        }
        if (req.query.discounted_price) {
            filters.discounted_price = { $lte: req.query.discounted_price }; 
        }
        if (req.query.partner_id) {
            filters.partner_id = req.query.partner_id; 
        }
        if (req.query.availability) {
            filters.availability = req.query.availability == 'true';
        }

        if (req.user.reg_type === 'partner' && req.user.select_category === 'restaurant'){
            filters.created_by = req.user._id;
        }

        const dishes = await Dish.find(filters);
        res.json(dishes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getDishById = async (req, res) => {
    try {
        const dish = await Dish.findById(req.params.id);
        if (!dish) {
            return res.status(404).json({ error: 'Dish not found' });
        }
        res.json(dish);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update Dish
const updateDish = async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'price', 'discounted_price', 'image_url', 'description', 'category' , 'is_active' , 'is_deleted'];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).json({ error: 'Invalid updates!' });
    }

    try {
        const dish = await Dish.findById(req.params.id);
        if (!dish) {
            return res.status(404).json({ error: 'Dish not found' });
        }

        updates.forEach(update => dish[update] = req.body[update]);
        await dish.save();
        res.json(dish);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete Dish
const deleteDish = async (req, res) => {
    try {
        const dish = await Dish.findByIdAndDelete(req.params.id);
        if (!dish) {
            return res.status(404).json({ error: 'Dish not found' });
        }
        res.json({ message: 'Dish deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createDish,
    getDishes,
    getDishById,
    updateDish,
    deleteDish
}; 