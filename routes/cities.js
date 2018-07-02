const router = require('express').Router();
const {
    getPlacesByCity,
    getRestaurantsByCity,
    sendChosenPlaces
} = require('../controllers/cities');

router.get('/:cityName/places', getPlacesByCity);
router.get('/:cityName/restaurants', getRestaurantsByCity);
router.post('/:cityName/places/selected', sendChosenPlaces);

module.exports = router;