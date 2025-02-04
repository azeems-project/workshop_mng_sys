// routes/workshopRoutes.js
const { getLocationDetails } = require('../utils/googleMaps');

router.get('/workshops/:workshopId/location', async (req, res) => {
  const { workshopId } = req.params;
  const workshop = await Workshop.findById(workshopId);
  const locationDetails = await getLocationDetails(workshop.location);
  res.status(200).json(locationDetails);
});