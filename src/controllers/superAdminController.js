const SuperAdmin = require('../models/SuperAdmin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Generate JWT Token
const generateToken = (admin) => {
    return jwt.sign({ _id: admin._id.toString() }, process.env.JWT_SECRET, {
        expiresIn: '24h'
    });
};

// Login SuperAdmin
const loginSuperAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const admin = await SuperAdmin.findOne({ email });

        if (!admin) {
            return res.status(401).json({ error: 'Invalid login credentials' });
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid login credentials' });
        }

        const token = generateToken(admin);
        res.json({ admin, token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Create SuperAdmin
const createSuperAdmin = async (req, res) => {
    try {
        const { email, phone_number, password } = req.body;

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        const admin = new SuperAdmin({
            email,
            phone_number,
            password: hashedPassword
        });

        await admin.save();
        const token = generateToken(admin);
        res.status(201).json({ admin, token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get SuperAdmin Profile
const getSuperAdmin = async (req, res) => {
    try {
        res.json(req.admin);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update SuperAdmin
const updateSuperAdmin = async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['email', 'phone_number', 'password'];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).json({ error: 'Invalid updates!' });
    }

    try {
        updates.forEach(async (update) => {
            if (update === 'password') {
                req.admin[update] = await bcrypt.hash(req.body[update], 10);
            } else {
                req.admin[update] = req.body[update];
            }
        });

        await req.admin.save();
        res.json(req.admin);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete SuperAdmin
const deleteSuperAdmin = async (req, res) => {
    try {
        await req.admin.remove();
        res.json({ message: 'Super Admin deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    loginSuperAdmin,
    createSuperAdmin,
    getSuperAdmin,
    updateSuperAdmin,
    deleteSuperAdmin
}; 