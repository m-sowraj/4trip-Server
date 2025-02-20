const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');

const superAdminRoutes = require('./src/routes/superAdminRoutes');
const agentRoutes = require('./src/routes/agentRoutes');
const bookingRoutes = require('./src/routes/bookingRoutes');
const dishRoutes = require('./src/routes/dishRoutes');
const CommonAuthRoutes = require('./src/routes/commonauth')
const activityRoutes = require('./src/routes/activityRoutes');
const managebookingRoutes = require('./src/routes/managebookingRoutes');
const locationRoutes = require('./src/routes/locationRoutes');
const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/superadmin', superAdminRoutes);
app.use('/api/agents', agentRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/dishes', dishRoutes);
app.use('/api/commonauth',CommonAuthRoutes)
app.use("/api/activity", activityRoutes);
app.use('/api/managebooking', managebookingRoutes);
app.use('/api/locations', locationRoutes);


// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 