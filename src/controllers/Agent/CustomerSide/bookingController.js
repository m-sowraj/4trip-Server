const Booking = require('../../../models/Booking');

// Create Booking
const createBooking = async (req, res) => {
    try {
        const booking = new Booking({...req.body,  created_by: req.user._id });
        await booking.save();
        res.status(201).json(booking);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Login/Verify Booking
const verifyBooking = async (req, res) => {
    try {
        const { booking_id, name } = req.body;
        const booking = await Booking.findOne({
            _id: booking_id,
            name: name
        });

        if (!booking) {
            return res.status(401).json({ error: 'Invalid booking credentials' });
        }

        res.json(booking);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getBooking = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id)
            .populate('agent_id')
            .populate('Destination_id');
        if (!booking) {
            return res.status(404).json({ error: 'Booking not found' });
        }
        res.json(booking);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getallBooking = async (req, res) => {
    try {
        filter = {}
        if (req.user.reg_type == 'agent'){
            filter = { created_by: req.user._id }
        }

        const booking = await Booking.find(filter)
            .populate('agent_id')
            .populate('Destination_id');
        if (!booking) {
            return res.status(404).json({ error: 'Booking not found' });
        }
        res.json(booking);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Update Booking
const updateBooking = async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['email', 'name', 'phone_number', 'Destination_id'];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).json({ error: 'Invalid updates!' });
    }

    try {
        const booking = await Booking.findById(req.params.id);
        if (!booking) {
            return res.status(404).json({ error: 'Booking not found' });
        }

        updates.forEach(update => booking[update] = req.body[update]);
        await booking.save();
        res.json(booking);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete Booking
const deleteBooking = async (req, res) => {
    try {
        const booking = await Booking.findByIdAndDelete(req.params.id);
        if (!booking) {
            return res.status(404).json({ error: 'Booking not found' });
        }
        res.json({ message: 'Booking deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createBooking,
    verifyBooking,
    getBooking,
    updateBooking,
    deleteBooking,
    getallBooking
}; 