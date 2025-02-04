const express = require('express');
const router = express.Router();
const learnerController = require('../controllers/learnerController');

router.post('/enroll', learnerController.enrollInWorkshop);
router.get('/enrolled/:learnerId', learnerController.getEnrolledWorkshops);
router.put('/preferences/:learnerId', learnerController.updatePreferences);

module.exports = router;