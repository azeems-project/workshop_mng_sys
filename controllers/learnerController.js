const Learner = require('../models/Learner');
const Workshop = require('../models/Workshop');

exports.enrollInWorkshop = async (req, res) => {
  const { learnerId, workshopId } = req.body;
  await Learner.findByIdAndUpdate(learnerId, { $push: { enrolledWorkshops: workshopId } });
  res.status(200).json({ message: 'Enrolled successfully' });
};

exports.getEnrolledWorkshops = async (req, res) => {
  const { learnerId } = req.params;
  const learner = await Learner.findById(learnerId).populate('enrolledWorkshops');
  res.status(200).json(learner.enrolledWorkshops);
};

const { sendEmailNotification } = require('../utils/notifications');
const Workshop = require('../models/Workshop');
const Mentor = require('../models/Mentor');

exports.enrollInWorkshop = async (req, res) => {
  const { learnerId, workshopId } = req.body;
  const learner = await Learner.findById(learnerId);
  const workshop = await Workshop.findById(workshopId).populate('mentor');

  // Enroll learner
  await Learner.findByIdAndUpdate(learnerId, { $push: { enrolledWorkshops: workshopId } });

  // Notify mentor
  if (workshop.mentor.notificationPreferences.email) {
    await sendEmailNotification(
      workshop.mentor.email,
      'New Enrollment',
      `Learner ${learner.name} has enrolled in your workshop "${workshop.title}".`
    );
  }

  // Notify learner
  if (learner.notificationPreferences.email) {
    await sendEmailNotification(
      learner.email,
      'Enrollment Confirmed',
      `You have successfully enrolled in the workshop "${workshop.title}".`
    );
  }

  res.status(200).json({ message: 'Enrolled successfully' });
};