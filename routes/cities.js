const router = require('express').Router();
const {
    getAllCities,
    getRestaurants,
    getLandmarks
} = require('../controllers/cities');

router.get('/', getAllCities);
router.get('/restaurants', getRestaurants);
router.get('/landmarks', getLandmarks);

module.exports = router;