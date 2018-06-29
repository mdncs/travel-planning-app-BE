const axios = require('axios');

const fetchAllCities = () => {
    return [{
        name: 'Manchester',
        geolocation: ['53.479', '-2.2461']
    }];
}

const fetchRestaurants = () => {
    return axios.get(`https://places.cit.api.here.com/places/v1/discover/explore;context=Y2F0PWVhdC1kcmluayZmbG93LWlkPTQzMjI3M2Y1LWVkMTAtNWM4YS1hN2QyLTM5Nzc0YzI4NGNlOV8xNTMwMjgxOTU4MTA4XzBfNzM2MSZvZmZzZXQ9MjAmc2l6ZT0yMA?at=53.479%2C-2.2461&app_id=DemoAppId01082013GAL&app_code=AJKnXv84fjrb0KIHawS0Tg`)
    .then(res => res.data)
    .catch(err => next(err))
}

const fetchLandmarks = () => {
    return axios.get(`https://places.cit.api.here.com/places/v1/discover/explore?at=53.479%2C-2.2461&cat=sights-museums&Accept-Language=en-GB%2Cen%3Bq%3D0.9%2Cro-RO%3Bq%3D0.8%2Cro%3Bq%3D0.7%2Cen-US%3Bq%3D0.6&app_id=DemoAppId01082013GAL&app_code=AJKnXv84fjrb0KIHawS0Tg`)
.then(res => res.data.results)
    .catch(err => next(err));
}

module.exports = {
    fetchAllCities,
    fetchRestaurants,
    fetchLandmarks
};