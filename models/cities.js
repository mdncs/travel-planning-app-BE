const axios = require('axios');

const fetchPlacesByCity = () => {
    return axios.get(`https://places.cit.api.here.com/places/v1/discover/explore?at=53.4796%2C-2.2474&app_id=DemoAppId01082013GAL&app_code=AJKnXv84fjrb0KIHawS0Tg`)
    .then(res => res.data.results)
    .catch(err => next(err))
}

const fetchRestaurantsByCity = () => {
    return axios.get(`https://places.cit.api.here.com/places/v1/discover/explore?at=53.4796%2C-2.2474&cat=eat-drink&size=40&app_id=DemoAppId01082013GAL&app_code=AJKnXv84fjrb0KIHawS0Tg`)
    .then(res => res.data.results)
    .catch(err => next(err));
}

module.exports = {
    fetchPlacesByCity,
    fetchRestaurantsByCity
};