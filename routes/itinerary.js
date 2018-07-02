const router = require('express').Router();
const { sendItinerary } = require('../controllers/itinerary.js');

router.post('/', sendItinerary);

module.exports = router;