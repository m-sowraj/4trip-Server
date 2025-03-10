const Product = require('../../models/product');


const createProduct = async (req, res) => {
    try {
        const product = new Product({
            ...req.body,
            location_id: req.user.location_id   ,
            createdBy: req.user._id
        });
        await product.save();
        res.status(201).json(product);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


const updateProduct = async (req, res) => {
    const updates = Object.keys(req.body);


    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        updates.forEach(update => product[update] = req.body[update]);
        await product.save();
        res.json(product);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


const getProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
            .populate('createdBy');

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const getProducts = async (req, res) => {
    try {
        const { createdBy, search, category, minPrice, maxPrice, is_active, is_deleted } = req.query;
        const filter = {};

    
        if (createdBy) filter.createdBy = createdBy;
        if (category) filter.category = category;
        if (is_active) filter.is_active = is_active;
        if (is_deleted) filter.is_deleted = is_deleted;
        if (search) {
            filter.$or = [
                { name: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ];
        }
        if (minPrice || maxPrice) {
            filter.price = {};
            if (minPrice) filter.price.$gte = Number(minPrice);
            if (maxPrice) filter.price.$lte = Number(maxPrice);
        }

        if(req.authType == "user") {
        if(req.user.reg_type === 'partner' && req.user.select_category === 'shop'){
            filter.createdBy = req.user._id;
        }
    } else {
        filter.is_active = true;
        filter.is_deleted = false;
        filter.location_id = req.booking.location_id;
    }

        const products = await Product.find(filter)
            .populate('createdBy')
            .sort({ createdAt: -1 });

        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createProduct,
    updateProduct,
    getProduct,
    getProducts
};
