const jwt = require('jsonwebtoken');
const RegistrationDb=require('../../models/Registration')
const SuperAdminDb=require('../../models/SuperAdmin')
const multer = require('multer');
const storage = multer.memoryStorage();
const bcrypt = require('bcrypt');
const upload = multer({ storage: multer.memoryStorage() }); 
const ThingsToCarryDb = require('../../models/ThingsToCarry');
const Location = require('../../models/Location');



const loginSuperAdmin = async (req, res) => {
    try {
        const { phone_number, password } = req.body;
        const admin = await RegistrationDb.findOne({ phone_number , reg_type: 'superadmin' });

        if (!admin) {
            return res.status(401).json({ error: 'Invalid login credentials' });
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid login credentials' });
        }
        const token = jwt.sign({ id: admin._id }, 'your_jwt_secret_key', { expiresIn: '7d' });

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
      const CompleteData = await RegistrationDb.find({ isnew: "false" })
        .select('-password')  
        .skip(skipValue)  
        .limit(limit);  
  
      if (CompleteData.length === 0) {
        return res.status(404).json({ message: "No records available" });
      }
  
      return res.status(200).json({ data: CompleteData });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };


  const getYetToBeReviewedData = async (req, res) => {
    const {index = 0, limit = 50 } = req.body;
  
    try {
      const skipValue = index * limit;
      const CompleteData = await RegistrationDb.find({ isNew: "true" }).select('-password')  
        .select('-password')  
        .skip(skipValue)  
        .limit(limit);  
  
      if (CompleteData.length === 0) {
        return res.status(404).json({ message: "No records available" });
      }
  
      return res.status(200).json({ data: CompleteData });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

  const reviewRegistration = async (req, res) => {
    const { id, isapproved } = req.body;
  
    try {
      const all_Data = await RegistrationDb.findById(id);
  
      if (!all_Data) {
        return res.status(404).json({ message: "Data not found" });
      }
      if (isapproved) {
        all_Data.isNew = 'false'; 
        await all_Data.save();  
  
        return res.status(200).json({ message: "Successfully Approved" });
      } else {
        return res.status(400).json({ message: "Approval status is required" });
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
  

  const placesToVisit = async (req, res) => {
    const { place_name, Location, Nearby, best_time , latitude,longitude } = req.body;
  
    try {
    
      if (!place_name || !Location || !Nearby || !best_time) {
        return res.status(400).json({ message: 'Missing Information' });
      }
  

      // const imageFiles = req.files['image'] || [];
      // const videoFiles = req.files['video'] || [];
  
      // const images = imageFiles.map((file) => ({
      //   data: file.buffer, 
      //   mimeType: file.mimetype,
      //   originalName: file.originalname, 
      // }));
  
      // const videos = videoFiles.map((file) => ({
      //   data: file.buffer, 
      //   mimeType: file.mimetype,
      //   originalName: file.originalname, 
      // }));

      const newPlace = new SuperAdminDb({
        place_name,
        location:Location,
        near_by_attractions:Nearby,
        best_time_to_visit:best_time,
        longitude,
        latitude,
        short_summary:req.body.short_summary,
        is_deleted: false,
        // media: { images, videos }, 
      });
  
      await newPlace.save();
      res.status(201).json({ message: 'Place added successfully', data: newPlace });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error adding place', error: error.message });
    }
  };

const getPlaceToVist = async (req, res) => {
  const { location } = req.body;

  try {
    const query = location ? { location, is_deleted: false } : { is_deleted: false };
    const places = await SuperAdminDb.find(query);
    
    if (!places || places.length === 0) {
      return res.status(404).json({ message: "no places found" });
    }
    return res.status(200).json({ data: places });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updatePlace = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    // Don't allow updating of is_deleted through this endpoint
    delete updates._id; // Prevent _id modification
    delete updates.is_deleted; // Prevent direct is_deleted modification

    const place = await SuperAdminDb.findOne({ _id: id, is_deleted: false });
    
    if (!place) {
      return res.status(404).json({ message: "Place not found" });
    }

    // If is_deleted is being set to true, handle deletion
    if (updates.delete === true) {
      place.is_deleted = true;
      await place.save();
      return res.status(200).json({ message: "Place deleted successfully" });
    }

    // Handle regular updates
    const updatedPlace = await SuperAdminDb.findByIdAndUpdate(
      id,
      { ...updates },
      { new: true, runValidators: true }
    );

    res.status(200).json({ 
      message: "Place updated successfully", 
      data: updatedPlace 
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addThingsToCarry = async (req, res) => {
  try {
    const { name, location_id } = req.body;

    if (!name || !location_id) {
      return res.status(400).json({ message: 'Name and location_id are required' });
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

    const location = await SuperAdminDb.findOne({ 
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
      data: thingsToCarry.map(item => ({
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

    const location = await SuperAdminDb.findOne({
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

    const location = await SuperAdminDb.findOne({
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

module.exports={loginSuperAdmin,createSuperAdmin,getReviewCompletedData,getYetToBeReviewedData,reviewRegistration,placesToVisit,getPlaceToVist,updatePlace,addThingsToCarry,getThingsToCarry,updateThingsToCarry,deleteThingsToCarry}


  




