const Workshop = require('../models/Workshop');
const Activity = require('../models/Activity');

exports.createWorkshop = async (req, res) => {
  const { title, description, mentorId } = req.body;
  const workshop = new Workshop({ title, description, mentor: mentorId });
  await workshop.save();
  res.status(201).json(workshop);
};

exports.addActivity = async (req, res) => {
  const { workshopId, title, description } = req.body;
  const activity = new Activity({ title, description, workshop: workshopId });
  await activity.save();
  await Workshop.findByIdAndUpdate(workshopId, { $push: { activities: activity._id } });
  res.status(201).json(activity);
};

exports.updateActivity = async (req, res) => {
  const { activityId, title, description } = req.body;
  const activity = await Activity.findByIdAndUpdate(activityId, { title, description }, { new: true });
  res.status(200).json(activity);
};

exports.deleteActivity = async (req, res) => {
  const { activityId, workshopId } = req.body;
  await Activity.findByIdAndDelete(activityId);
  await Workshop.findByIdAndUpdate(workshopId, { $pull: { activities: activityId } });
  res.status(200).json({ message: 'Activity deleted' });
};

exports.updatePreferences = async (req, res) => {
    const { mentorId } = req.params;
    const { email, push } = req.body;
    await Mentor.findByIdAndUpdate(mentorId, { notificationPreferences: { email, push } });
    res.status(200).json({ message: 'Preferences updated' });
  };