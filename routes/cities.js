const router = require('express').Router();
const {
    getPlacesByCity
} = require('../controllers/cities');

router.get('/city/places', getPlacesByCity);

module.exports = router;