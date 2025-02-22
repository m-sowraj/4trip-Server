const Activity = require('../../models/activity');

const createActivity = async (req, res) => {
        try {
            if(req.user.reg_type !== 'partner' || req.user.select_category !== 'activity'){
                return res.status(403).json({ error: 'Unauthorized to create activity' });
            }
            const activity = new Activity({
                ...req.body,
                CreatedBy: req.user._id,
                location_id: req.user.location_id
            });
            await activity.save();
            res.status(201).json({ success: true, data: activity });
        } catch (error) {
            res.status(400).json({ success: false, error: error.message });
        }
    }

const updateActivity = async (req, res) => {    
        try {
            const activity = await Activity.findOneAndUpdate(
                { 
                    _id: req.params.id
                },
                req.body,
                { new: true}
            );

            if (!activity) {
                return res.status(404).json({ success: false, error: 'Activity not found' });
            }

            res.json({ success: true, data: activity });
        } catch (error) {
            res.status(400).json({ success: false, error: error.message });
        }
    }

const getActivity = async (req, res) => {
        try {
            const activity = await Activity.findById(req.params.id)
                .populate('CreatedBy');

            if (!activity) {
                return res.status(404).json({ success: false, error: 'Activity not found' });
            }

            res.json({ success: true, data: activity });
        } catch (error) {
            res.status(400).json({ success: false, error: error.message });
        }
    }

const getActivities = async (req, res) => {
        try {
            const {
                search
            } = req.query;

            const query = {};

            if(req.user.reg_type === 'partner' && req.user.select_category === 'activity'){
                query.CreatedBy = req.user._id;
            }


            if (search) {
                query.$or = [
                    { title: { $regex: search, $options: 'i' } },
                    { description: { $regex: search, $options: 'i' } }
                ];
            }
            const activities = await Activity.find(query)
                .populate('CreatedBy')

            res.json({
                success: true,
                data: activities,
            });
        } catch (error) {
            res.status(400).json({ success: false, error: error.message });
        }
    }


module.exports = {
    createActivity,
    updateActivity,
    getActivity,
    getActivities
};
