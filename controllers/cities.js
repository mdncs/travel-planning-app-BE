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
    .then(items => {
        console.log(items)
        // console.log(items)
        // const items = places.map((item, index) => {
        //     const mapLink = addMapLink(item, cityName);
        //     if (cityName === 'london') {
        //         return {
        //             position: item.position,
        //             title: item.title,
        //             imageUrl: londonData[index].imageUrl,
        //             description: londonData[index].description,
        //             city: cityName,
        //             link: mapLink
        //         }
        //     }
        // })
        res.send({items});
    })
    .catch(err => next(err));
}

exports.getRestaurantsByCity = (req, res, next) => {
    const { cityName } = req.params;
    fetchRestaurantsByCity(cityName)
    .then(({items}) => res.send({items}))
    .catch(err => next(err));
}

