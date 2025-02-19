const Location = require('../../models/Location');

// Create a new Location
const createLocation = async (req, res) => {
    try {
        const { name, latitude, longitude } = req.body;
        const location = new Location({ name, latitude, longitude });
        await location.save();
        res.status(201).json(location);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get a single Location by ID
const getLocation = async (req, res) => {
    try {
        const location = await Location.findById(req.params.id);
        if (!location) {
            return res.status(404).json({ error: 'Location not found' });
        }
        res.json(location);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all Locations
const getAllLocations = async (req, res) => {
    try {
        const locations = await Location.find({ is_deleted: false });
        res.json(locations);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a Location by ID
const updateLocation = async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'latitude', 'longitude'];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).json({ error: 'Invalid updates!' });
    }

    try {
        const location = await Location.findById(req.params.id);
        if (!location) {
            return res.status(404).json({ error: 'Location not found' });
        }

        updates.forEach(update => location[update] = req.body[update]);
        await location.save();
        res.json(location);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a Location by ID
const deleteLocation = async (req, res) => {
    try {
        const location = await Location.findById(req.params.id);
        if (!location) {
            return res.status(404).json({ error: 'Location not found' });
        }

        location.is_deleted = true;
        await location.save();
        res.json({ message: 'Location deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Dropdown API - Get list of Locations with only id and name
const getLocationDropdown = async (req, res) => {
    try {
        const locations = await Location.find({ is_deleted: false }).select('_id name');
        res.json(locations);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createLocation,
    getLocation,
    getAllLocations,
    updateLocation,
    deleteLocation,
    getLocationDropdown
}; 