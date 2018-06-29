const {
    fetchAllCities,
    fetchRestaurants,
    fetchLandmarks
} = require('../models/cities');

exports.getAllCities = (req, res, next) => {
    res.send(fetchAllCities()[0])
    .catch(err => next(err));
}

exports.getRestaurants = (req, res, next) => {
    fetchRestaurants()
    .then(({items}) => res.send(items))
    .catch(err => next(err));
}

exports.getLandmarks = (req, res, next) => {
    fetchLandmarks().then(({items}) => res.send({items}))
    .catch(err => next(err));
}

exports.get