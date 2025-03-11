const jwt = require('jsonwebtoken');
const RegistrationDb = require('../../models/User');
const Destination = require('../../models/Destination');
const multer = require('multer');
const storage = multer.memoryStorage();
const bcrypt = require('bcrypt');
const upload = multer({ storage: multer.memoryStorage() });
const ThingsToCarryDb = require('../../models/ThingsToCarry');
const Location = require('../../models/Location');

const loginSuperAdmin = async (req, res) => {
  try {
    const { phone_number, password } = req.body;
    const admin = await RegistrationDb.findOne({
      phone_number,
      reg_type: 'superadmin'
    });

    if (!admin) {
      return res.status(401).json({ error: 'Invalid login credentials' });
    }
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid login credentials' });
    }
    const token = jwt.sign({ id: admin._id }, 'your_jwt_secret_key', {
      expiresIn: '7d'
    });

    res.json({ admin, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createSuperAdmin = async (req, res) => {
  try {
    const { email, phone_number, password } = req.body;

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

const getReviewCompletedData = async (req, res) => {
  const { index = 0, limit = 50 } = req.body;

  try {
    const skipValue = index * limit;
    const CompleteData = await RegistrationDb.find({ isnew: 'false' })
      .select('-password')
      .skip(skipValue)
      .limit(limit);

    if (CompleteData.length === 0) {
      return res.status(404).json({ message: 'No records available' });
    }

    return res.status(200).json({ data: CompleteData });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getYetToBeReviewedData = async (req, res) => {
  const { index = 0, limit = 50 } = req.body;

  try {
    const skipValue = index * limit;
    const CompleteData = await RegistrationDb.find({ isNew: 'true' })
      .select('-password')
      .select('-password')
      .skip(skipValue)
      .limit(limit)
      .populate('location_id');

    if (CompleteData.length === 0) {
      return res.status(404).json({ message: 'No records available' });
    }

    return res.status(200).json({ data: CompleteData });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const reviewRegistration = async (req, res) => {
  const { id, isapproved } = req.body;

  try {
    const all_Data = await RegistrationDb.findById(id).populate('location_id');
    if (!all_Data) {
      return res.status(404).json({ message: 'Data not found' });
    }
    if (isapproved) {
      all_Data.isNew = 'false';
      await all_Data.save();

      return res.status(200).json({ message: 'Successfully Approved' });
    } else {
      return res.status(400).json({ message: 'Approval status is required' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const addThingsToCarry = async (req, res) => {
  try {
    const { name, location_id } = req.body;

    if (!name || !location_id) {
      return res
        .status(400)
        .json({ message: 'Name and location_id are required' });
    }

    const location = await Location.findOne({
      _id: location_id,
      is_deleted: false
    });

    if (!location) {
      return res.status(404).json({ message: 'Location not found' });
    }

    const thingToCarry = new ThingsToCarryDb({
      name,
      location_id
    });

    await thingToCarry.save();

    res.status(201).json({
      message: 'Things to carry added successfully',
      data: thingToCarry
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getThingsToCarry = async (req, res) => {
  try {
    const { location_id } = req.params;

    const location = await Location.findOne({
      _id: location_id,
      is_deleted: false
    });

    if (!location) {
      return res.status(404).json({ message: 'Location not found' });
    }

    const thingsToCarry = await ThingsToCarryDb.find({
      location_id,
      is_deleted: false
    });

    res.status(200).json({
      data: thingsToCarry.map((item) => ({
        id: item._id,
        name: item.name,
        location_name: location.place_name
      }))
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateThingsToCarry = async (req, res) => {
  try {
    const { location_id, item_id } = req.params;
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Name is required' });
    }

    const location = await Location.findOne({
      _id: location_id,
      is_deleted: false
    });

    if (!location) {
      return res.status(404).json({ message: 'Location not found' });
    }

    const updatedItem = await ThingsToCarryDb.findOneAndUpdate(
      {
        _id: item_id,
        location_id,
        is_deleted: false
      },
      { name },
      { new: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }

    res.status(200).json({
      message: 'Things to carry updated successfully',
      data: updatedItem
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteThingsToCarry = async (req, res) => {
  try {
    const { location_id, item_id } = req.params;

    const location = await Location.findOne({
      _id: location_id,
      is_deleted: false
    });

    if (!location) {
      return res.status(404).json({ message: 'Location not found' });
    }

    const item = await ThingsToCarryDb.findOneAndUpdate(
      {
        _id: item_id,
        location_id,
        is_deleted: false
      },
      { is_deleted: true },
      { new: true }
    );

    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    res.status(200).json({ message: 'Item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  loginSuperAdmin,
  createSuperAdmin,
  getReviewCompletedData,
  getYetToBeReviewedData,
  reviewRegistration,
  addThingsToCarry,
  getThingsToCarry,
  updateThingsToCarry,
  deleteThingsToCarry
};
