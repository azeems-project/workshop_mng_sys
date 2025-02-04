const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  workshop: { type: mongoose.Schema.Types.ObjectId, ref: 'Workshop', required: true },
});

module.exports = mongoose.model('Activity', activitySchema);