const {
    fetchPlacesByCity,
    fetchRestaurantsByCity
} = require('../models/cities');
const manchesterData = require('../utils/manchester.json');

exports.getPlacesByCity = (req, res, next) => {
    const { cityName } = req.params;
    fetchPlacesByCity(cityName)
    .then(({items}) => {
        const places = items.map((item, index) => {
            if (cityName === 'manchester') {
                return {
                    ...item,
                    imageUrl: manchesterData[index].imageUrl,
                    description: manchesterData[index].description
                }
            }
        });
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