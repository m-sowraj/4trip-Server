const jwt = require('jsonwebtoken');
const RegistrationDb=require('../../models/Registration')
const SuperAdminDb=require('../../models/SuperAdmin')
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: multer.memoryStorage() }); 


const loginSuperAdmin = async (req, res) => {
    try {
        const { phone_number, password } = req.body;
        const check_phoneNumber = await RegistrationDb.findOne({ phone_number });

        if (!check_phoneNumber) {
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
    const { place_name, Location, Nearby, best_time } = req.body;
  
    try {
    
      if (!place_name || !Location || !Nearby || !best_time) {
        return res.status(400).json({ message: 'Missing Information' });
      }
  

      const imageFiles = req.files['image'] || [];
      const videoFiles = req.files['video'] || [];
  
      const images = imageFiles.map((file) => ({
        data: file.buffer, 
        mimeType: file.mimetype,
        originalName: file.originalname, 
      }));
  
      const videos = videoFiles.map((file) => ({
        data: file.buffer, 
        mimeType: file.mimetype,
        originalName: file.originalname, 
      }));

      const newPlace = new SuperAdminDb({
        place_name,
        Location,
        Nearby,
        best_time,
        longitude,
        latitude,
        media: { images, videos }, 
      });
  
      await newPlace.save();
      res.status(201).json({ message: 'Place added successfully', data: newPlace });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error adding place', error: error.message });
    }
  };

const getPlaceToVist=async(req,res)=>{

const {location}=req.body

try{
    const places= await SuperAdminDb.find(location);
    if(!places){
        return res.status(400).json({message:"no places found"})
    }
    return res.status(200).json({data:places});
}

catch (error) {
    return res.status(500).json({ message: error.message });

  }

}


module.exports={loginSuperAdmin,createSuperAdmin,getReviewCompletedData,getYetToBeReviewedData,reviewRegistration,placesToVisit,getPlaceToVist}


  




