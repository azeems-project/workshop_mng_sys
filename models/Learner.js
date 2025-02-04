const mongoose = require('mongoose');

const learnerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  enrolledWorkshops: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Workshop' }],
  notificationPreferences: {
    email: { type: Boolean, default: true },
    push: { type: Boolean, default: false },
  },
});

module.exports = mongoose.model('Learner', learnerSchema);