const {
    fetchPlacesByCity,
    fetchRestaurantsByCity,
    fetchHotelsByCity
} = require('../models/cities');
const cities = require('../utils/cities.json');

exports.getPlacesByCity = (req, res, next) => {
    const { cityName } = req.params;
    fetchPlacesByCity(cityName)
        .then(items => {
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


exports.getHotelsByCity = (req, res, next) => {
    const { cityName } = req.params;
    const search = req.query.search || '';
    const { lat, lng } = cities.find(({ name }) => cityName === name) || { lat: 52.9737, lng: -1.481 };
    return fetchHotelsByCity(lat, lng, search)
        .then(({ data }) => {
            const { items } = data.results;
            const refinedItems = items.map(hotel => {
                    let { position, title, id } = hotel;
                    const link = addMapLink(hotel, cityName);
                    const imageUrl = 'https://1001freedownloads.s3.amazonaws.com/vector/thumb/81568/pib-darkAlt2.png';
                    const description = '';
                    return { id, position, title, link, description, imageUrl, city: cityName };
                });
            return res.send({ items: refinedItems });
        })
    .catch(err => next(err))
}