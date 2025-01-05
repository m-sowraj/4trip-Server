const ManageBooking = require('../../models/managebooking');


const createBooking = async (req, res) => {
    try {
        req.body.createdBy = req.user.id;
        const newBooking = new ManageBooking(req.body);
        await newBooking.save();
        res.status(201).json(newBooking);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const editBooking = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedBooking = await ManageBooking.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedBooking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        res.json(updatedBooking);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getBookingById = async (req, res) => {
    try {
        const { id } = req.params;
        const booking = await ManageBooking.findById(id).populate('registrationId');
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        res.json(booking);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getManyBookings = async (req, res) => {
    try {
        const { registrationId, type } = req.query;
        const filters = {};
        if (registrationId) filters.registrationId = registrationId;
        if (type) filters.type = type;

        const bookings = await ManageBooking.find(filters).populate('registrationId').populate('activityId');
        res.json(bookings);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    createBooking,
    editBooking,
    getBookingById,
    getManyBookings,
};

