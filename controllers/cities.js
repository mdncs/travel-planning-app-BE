const {
    fetchPlacesByCity,
    fetchRestaurantsByCity,
    fetchHotelsByCity
} = require('../models/cities');
// const manchesterData = require('../utils/manchester.json');
const liverpoolData = require('../utils/liverpool.json');
const { addMapLink } = require('../utils/utils.js');
const cities = require('../utils/cities.json');

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

exports.getHotelsByCity = (req, res, next) => {
    const {cityName} = req.params; 
    const search = req.query.search || '';
    const {lat, lng} = cities.find(({name}) => cityName === name) || {lat: 52.9737, lng: -1.481}; 
    return fetchHotelsByCity(lat, lng, search)
    .then(({data}) => {
        const {items} = data.results;
        const refinedItems = items.map(hotel => {
            let {position, title, id} = hotel; 
            const link = addMapLink(hotel, cityName); 
            const imageUrl = 'https://1001freedownloads.s3.amazonaws.com/vector/thumb/81568/pib-darkAlt2.png';
            const description = ''; 
            return {id, position, title, link, description, imageUrl, city: cityName};
        });
        return res.send({items: refinedItems});
    })
    .catch(next);
}