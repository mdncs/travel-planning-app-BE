const {
    fetchPlacesByCity,
    fetchRestaurantsByCity,
    formatChosenPlaces
} = require('../models/cities');
const manchesterData = require('../utils/manchester.json');
const londonData = require('../utils/london.json');
const getSchedule = require('../utils/getSchedule');
const fs = require('fs');
const { addMapLink } = require('../utils/utils.js');

exports.getPlacesByCity = (req, res, next) => {
    const { cityName } = req.params;
    fetchPlacesByCity(cityName)
    .then(({items}) => {
        const places = items.map((item, index) => {
            const mapLink = addMapLink(item, cityName);
            if (cityName === 'manchester') {
                return {
                    position: item.position,
                    title: item.title,
                    imageUrl: manchesterData[index].imageUrl,
                    description: manchesterData[index].description,
                    city: cityName,
                    link: mapLink
                }
            } else if (cityName === 'london') {
                return {
                    position: item.position,
                    title: item.title,
                    imageUrl: londonData[index].imageUrl,
                    description: londonData[index].description,
                    city: cityName,
                    link: mapLink
                }
            } else {
                return item;
            }
        })
        res.send({ places });
    })
    .catch(err => next(err));
}

exports.getRestaurantsByCity = (req, res, next) => {
    const { cityName } = req.params;
    fetchRestaurantsByCity(cityName)
    .then(({items}) => res.send({items}))
    .catch(err => next(err));
}

exports.sendChosenPlaces = (req, res, next) => {
    const places = req.body;
    res.send({places})
    .catch(err => next(err));
}