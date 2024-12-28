const jwt = require('jsonwebtoken');
const SuperAdminDB=require('../../models/Registration')


const loginSuperAdmin = async (req, res) => {
    try {
        const { phone_number, password } = req.body;
        const check_phoneNumber = await SuperAdminDB.findOne({ phone_number });

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



const getData = async (req, res) => {
    const { index = 0, limit = 50 } = req.body;
  
    try {
      const skipValue = index * limit;
      const CompleteData = await SuperAdminDB.find({ isnew: "false" })
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


  const getAllData = async (req, res) => {
    const {index = 0, limit = 50 } = req.body;
  
    try {
      const skipValue = index * limit;
      const CompleteData = await SuperAdminDB.find({ isNew: "true" }).select('-password')  
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

  const ReviewData = async (req, res) => {
    const { id, isapproved } = req.body;
  
    try {
      const all_Data = await SuperAdminDB.findById(id);
  
      if (!all_Data) {
        return res.status(404).json({ message: "Data not found" });
      }
      if (isapproved) {
        all_Data.isNew = 'false';  // Update isNew directly
        await all_Data.save();  // Save the changes to the database
  
        return res.status(200).json({ message: "Successfully Approved" });
      } else {
        return res.status(400).json({ message: "Approval status is required" });
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
  
  



  




