const mongoose = require('mongoose');

const mentorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  notificationPreferences: {
    email: { type: Boolean, default: true },
    push: { type: Boolean, default: false },
  },
});

module.exports = mongoose.model('Mentor', mentorSchema);