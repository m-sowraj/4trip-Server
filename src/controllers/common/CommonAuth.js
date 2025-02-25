const RegistrationModel = require('../../models/Registration');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Registration = async (req, res) => {
  try {
    
    const checkByMail = await RegistrationModel.findOne({ email: req.body.email  });
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

const Login = async (req, res) => {
  try {
    if (req.body.email) {
    const user = await RegistrationModel.findOne({ email: req.body.email, is_deleted: false , isActive: true , isNew:false , reg_type: req.body.reg_type , select_category: req.body.select_category });
    if (!user) {
    const user = await RegistrationModel.findOne({ email: req.body.email, reg_type: req.body.reg_type , isNew:true, select_category: req.body.select_category });
    if (user) {
      return res.status(400).json({ message: "Account is Not Activated" });
    }
      return res.status(400).json({ message: "Invalid email or password" });
    }
   

    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const token = jwt.sign({ id: user._id }, 'your_jwt_secret_key', { expiresIn: '7d' });
    res.status(200).json({ message: "Login successful", data: user, token , reg_type: user.reg_type , select_category: user.select_category });
  }
  else if (req.body.phone_number) {
    const user = await RegistrationModel.findOne({ phone_number: req.body.phone_number, is_deleted: false , isActive: true , isNew:false, reg_type: req.body.reg_type , select_category: req.body.select_category });
    if (!user) {
      const user = await RegistrationModel.findOne({ phone_number: req.body.phone_number, reg_type: req.body.reg_type , isNew:true, select_category: req.body.select_category });
      if (user) {
        return res.status(400).json({ message: "Account is Not Activated" });
      }
      return res.status(400).json({ message: "Invalid phone number or password" });
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid phone number or password" });
    }
    const token = jwt.sign({ id: user._id  }, 'your_jwt_secret_key', { expiresIn: '7d' });
    res.status(200).json({ message: "Login successful", data: user, token , reg_type: user.reg_type , select_category: user.select_category });
  }




  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const GetUser = async (req, res) => {
  try {
    const user = await RegistrationModel.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ data: user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const GetAllUsers = async (req, res) => {
  try {
    const filters = {
      is_deleted: false
    };
    
    if (req.query.type) {
      filters.reg_type = req.query.type;
    }
    if (req.query.status) {
      filters.status = req.query.status;
    }
    filters.isNew = "false";
    
    console.log(filters);
    const users = await RegistrationModel.find(filters).select('-password');
    res.status(200).json({ data: users });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const UpdateUser = async (req, res) => {
  try {
    const user = await RegistrationModel.findByIdAndUpdate(req.params.id, req.body, { new: true }).select('-password');
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User updated successfully", data: user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { Registration, Login, GetUser, GetAllUsers, UpdateUser };


