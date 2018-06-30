const axios = require('axios');
const { refObj } = require('../utils/createCoordinatesRefObj.js');

const fetchPlacesByCity = () => {
    return axios.get(`https://places.cit.api.here.com/places/v1/discover/explore?at=53.4860839%2C-2.242446&cat=sights-museums&size=40&app_id=DemoAppId01082013GAL&app_code=AJKnXv84fjrb0KIHawS0Tg`)
    .then(res => res.data.results)
    .catch(err => next(err))
}

const fetchRestaurantsByCity = cityName => {
    const coordinates = refObj()[cityName];
    return axios.get(`https://places.cit.api.here.com/places/v1/discover/explore?at=${coordinates}&cat=eat-drink&size=40&app_id=DemoAppId01082013GAL&app_code=AJKnXv84fjrb0KIHawS0Tg`)
    .then(res => res.data.results)
    .catch(err => next(err));
}

module.exports = {
    fetchPlacesByCity,
    fetchRestaurantsByCity
};