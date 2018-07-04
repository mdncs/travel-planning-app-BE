const router = require('express').Router();
const {
    getPlacesByCity,
    getRestaurantsByCity,
    getHotelsByCity
} = require('../controllers/cities');

router.get('/:cityName/places', getPlacesByCity);
router.get('/:cityName/restaurants', getRestaurantsByCity);
router.get('/:cityName/hotels', getHotelsByCity);
module.exports = router;