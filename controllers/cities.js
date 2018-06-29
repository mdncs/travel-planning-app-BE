const {
    fetchPlacesByCity,
    fetchRestaurantsByCity
} = require('../models/cities');

exports.getPlacesByCity = (req, res, next) => {
    fetchPlacesByCity()
    .then(({items}) => res.send(items))
    .catch(err => next(err));
}

exports.getRestaurantsByCity = (req, res, next) => {
    fetchRestaurantsByCity()
    .then(({items}) => res.send({items}))
    .catch(err => next(err));
}