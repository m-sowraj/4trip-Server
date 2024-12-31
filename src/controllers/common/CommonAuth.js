const RegistrationModel = require('../../models/Registration');
const bcrypt = require('bcrypt');

const Registration = async (req, res) => {
  try {
    
    const checkByMail = await RegistrationModel.findOne({ email: req.body.email });
    const checkByPhone = await RegistrationModel.findOne({ phone_number: req.body.phone_number });

    if (checkByMail || checkByPhone) {
      return res.status(400).json({ message: "The email or phone number is already registered" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const registration = new RegistrationModel({
      ...req.body, 
      password: hashedPassword, 
    });
    await registration.save();
    const savedRegistration = await RegistrationModel.findById(registration._id).select('-password');
    res.status(201).json({ message: "Registration successful", data: savedRegistration });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = Registration;


