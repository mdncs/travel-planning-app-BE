const router = require('express')();
const citiesRouter = require('./cities.js');
const itineraryRouter = require('./itinerary.js');

router.get('/', (req, res, next) => {
    res.send('Welcome!');
})

router.use('/cities', citiesRouter);
router.use('/itinerary', itineraryRouter);

module.exports = router;