const express = require('express');
const router = express.Router();
const mentorController = require('../controllers/mentorController');

router.post('/workshops', mentorController.createWorkshop);
router.post('/workshops/activities', mentorController.addActivity);
router.put('/workshops/activities', mentorController.updateActivity);
router.delete('/workshops/activities', mentorController.deleteActivity);
router.put('/preferences/:mentorId', mentorController.updatePreferences);

module.exports = router;