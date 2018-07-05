const router = require('express')();
const citiesRouter = require('./cities.js');
const itineraryRouter = require('./itinerary.js');

router.set('view-engine', 'ejs');

router.get('/', (req, res, next) => {
    res.render('api.ejs');
});

router.use('/cities', citiesRouter);
router.use('/itinerary', itineraryRouter);

module.exports = router;