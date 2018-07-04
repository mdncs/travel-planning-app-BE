const {
    fetchPlacesByCity,
    fetchRestaurantsByCity
} = require('../models/cities');
const { addMapLink } = require('../utils/utils.js');

exports.getPlacesByCity = (req, res, next) => {
    const { cityName } = req.params;
    fetchPlacesByCity(cityName)
        .then(items => {
            // const items = places.items.map((item, index) => {
            //     const mapLink = addMapLink(item, cityName);
            //     if (cityName === 'leeds') {
            //         return items;
            //     } else {
            //         return {
            //             position: item.position,
            //             title: item.title,
            //             imageUrl: "",
            //             description: "",
            //             city: cityName,
            //             link: mapLink
            //         }
            //     }
            // })
            res.send({ items });
        })
        .catch(err => next(err));
}

exports.getRestaurantsByCity = (req, res, next) => {
    const { cityName } = req.params;
    fetchRestaurantsByCity(cityName)
        .then(({ items }) => res.send({ items }))
        .catch(err => next(err));
}

