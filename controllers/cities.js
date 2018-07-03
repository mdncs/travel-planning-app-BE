const {
    fetchPlacesByCity,
    fetchRestaurantsByCity
} = require('../models/cities');
// const manchesterData = require('../utils/manchester.json');
const liverpoolData = require('../utils/liverpool.json');
const { addMapLink } = require('../utils/utils.js');

exports.getPlacesByCity = (req, res, next) => {
    const { cityName } = req.params;
    fetchPlacesByCity(cityName)
    .then((places) => {
        // console.log(items)
        // const places = items.map((item, index) => {
        //     const mapLink = addMapLink(item, cityName);
        //         return {
        //             position: item.position,
        //             title: item.title,
        //             imageUrl: `${cityName}Data`[index].imageUrl,
        //             description: `${cityName}Data`[index].description,
        //             city: cityName,
        //             link: mapLink
        //         }
        // })
        res.send(places);
    })
    .catch(err => next(err));
}

exports.getRestaurantsByCity = (req, res, next) => {
    const { cityName } = req.params;
    fetchRestaurantsByCity(cityName)
    .then(({items}) => res.send({items}))
    .catch(err => next(err));
}

