const jwt = require('jsonwebtoken');
const Destination = require('../../models/Destination');
const multer = require('multer');
const storage = multer.memoryStorage();
const bcrypt = require('bcrypt');
const upload = multer({ storage: multer.memoryStorage() });

const placesToVisit = async (req, res) => {
  const {
    place_name,
    Location,
    Nearby,
    best_time,
    latitude,
    longitude,
    image_urls,
    top_destination,
    top_activities
  } = req.body;

  try {
    if (!place_name || !Location) {
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

    const newPlace = new Destination({
      place_name,
      location: Location,
      near_by_attractions: Nearby,
      best_time_to_visit: best_time,
      longitude,
      latitude,
      short_summary: req.body.short_summary,
      is_deleted: false,
      image_urls,
      top_destination: top_destination || false,
      top_activities: top_activities || false
      // media: { images, videos },
    });
    newPlace.save();
    res
      .status(201)
      .json({ message: 'Place added successfully', data: newPlace });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: 'Error adding place', error: error.message });
  }
};

const getPlacesByLocation = async (req, res) => {
  try {
    const { location } = req.params;
    if (!location) {
      return res.status(400).json({ message: 'Location ID is required' });
    }

    const places = await Destination.find({
      location,
      is_deleted: false
    }).populate({
      path: 'location',
      select: '_id name' // Select only _id and name
    });

    const formattedPlaces = places.map((place) => ({
      ...place.toObject(),
      location: place.location._id, // Keep only _id for location
      locationName: place.location.name // Separate location name
    }));

    res.status(200).json({ data: formattedPlaces });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllPlaces = async (req, res) => {
  try {
    const places = await Destination.find({ is_deleted: false }).populate({
      path: 'location',
      select: '_id name' // Select only _id and name
    });

    const formattedPlaces = places.map((place) => ({
      ...place.toObject(),
      location: place.location._id, // Keep only _id for location
      locationName: place.location.name // Separate location name
    }));
    res.status(200).json({ data: formattedPlaces });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updatePlace = async (req, res) => {
  const { id } = req.params;
  const updates = req.body; // Only update fields provided in the request

  try {
    // Find the place that is not deleted
    const place = await Destination.findOne({ _id: id, is_deleted: false });

    if (!place) {
      return res.status(404).json({ message: 'Place not found' });
    }

    // Prevent modification of _id and is_deleted fields
    delete updates._id;
    delete updates.is_deleted;

    // If delete flag is set, perform soft delete
    if (updates.delete === true) {
      place.is_deleted = true;
      await place.save();
      return res.status(200).json({ message: 'Place deleted successfully' });
    }

    // Ensure only one of top_destination or top_activities can be true
    if (updates.top_destination && updates.top_activities) {
      return res.status(400).json({
        message:
          'Either top_destination or top_activities can be true, not both'
      });
    }

    // Map request body fields to database fields only if they exist in the request
    const updatedData = {};
    if (updates.place_name) updatedData.place_name = updates.place_name;
    if (updates.Location) updatedData.location = updates.Location;
    if (updates.Nearby) updatedData.near_by_attractions = updates.Nearby;
    if (updates.best_time) updatedData.best_time_to_visit = updates.best_time;
    if (updates.short_summary)
      updatedData.short_summary = updates.short_summary;
    if (updates.lattitude) updatedData.latitude = updates.lattitude;
    if (updates.longitude) updatedData.longitude = updates.longitude;
    if (updates.image_urls) updatedData.image_urls = updates.image_urls;
    if (updates.hasOwnProperty('top_destination'))
      updatedData.top_destination = updates.top_destination;
    if (updates.hasOwnProperty('top_activities'))
      updatedData.top_activities = updates.top_activities;

    // If no valid fields to update, return an error
    if (Object.keys(updatedData).length === 0) {
      return res
        .status(400)
        .json({ message: 'No valid fields provided for update' });
    }

    // Perform the update
    const updatedPlace = await Destination.findByIdAndUpdate(
      id,
      { $set: updatedData },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      message: 'Place updated successfully',
      data: updatedPlace
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deletePlace = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the place that is not already deleted
    const place = await Destination.findOne({ _id: id, is_deleted: false });

    if (!place) {
      return res.status(404).json({ message: 'Place not found' });
    }

    // Perform soft delete by setting is_deleted to true
    place.is_deleted = true;
    await place.save();

    res.status(200).json({ message: 'Place deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  placesToVisit,
  getPlacesByLocation,
  getAllPlaces,
  updatePlace,
  deletePlace
};
