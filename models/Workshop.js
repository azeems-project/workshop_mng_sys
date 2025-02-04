const mongoose = require('mongoose');

const workshopSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  mentor: { type: mongoose.Schema.Types.ObjectId, ref: 'Mentor', required: true },
  activities: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Activity' }],
  location: { type: String, required: true }, 
});



module.exports = mongoose.model('Workshop', workshopSchema);