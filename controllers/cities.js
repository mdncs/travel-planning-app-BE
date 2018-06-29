const {
    fetchPlacesByCity
} = require('../models/cities');

exports.getPlacesByCity = (req, res, next) => {
    fetchPlacesByCity()
    .then(({items}) => res.send(items))
    .catch(err => next(err));
}