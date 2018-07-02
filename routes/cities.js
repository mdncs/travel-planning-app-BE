const router = require('express').Router();
const {
    getPlacesByCity,
    getRestaurantsByCity
} = require('../controllers/cities');

router.get('/:cityName/places', getPlacesByCity);
router.get('/:cityName/restaurants', getRestaurantsByCity);

module.exports = router;