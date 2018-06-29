const router = require('express').Router();
const {
    getPlacesByCity,
    getRestaurantsByCity
} = require('../controllers/cities');

router.get('/city/places', getPlacesByCity);
router.get('/city/restaurants', getRestaurantsByCity)

module.exports = router;