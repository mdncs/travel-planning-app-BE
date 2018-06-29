const router = require('express')();
const citiesRouter = require('./cities.js');
const itineraryRouter = require('./itinerary');

router.get('/', (req, res, next) => {
    res.send('Welcome!');
})

router.use('/cities', citiesRouter);

module.exports = router;