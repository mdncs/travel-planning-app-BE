const router = require('express').Router();
const { sendItinerary } = require('../controllers/itinerary.js');

router.get('/', (req, res, next) => res.send('Hi!'));
router.post('/', sendItinerary);

module.exports = router;