const axios = require('axios');
const { refObj } = require('../utils/createCoordinatesRefObj.js');
const neo4j = require('neo4j-driver');
const driver = neo4j.v1.driver('bolt://hobby-kejliagjjjpngbkedcdfljbl.dbs.graphenedb.com:24786', neo4j.v1.auth.basic('production', 'b.6blrZy9Faq7A.icW7AUVODH1fqA3J'));
const session = driver.session();

const fetchPlacesByCity = cityName => {
    return session.run(`MATCH (p:Place) WHERE p.city = '${cityName}' RETURN p`)
        .then(result => {
            const actual = [];
            result.records.forEach(record => actual.push(Object.values(record)[2][0].properties));
            console.log(actual)
            return actual.map (object => {
                return {...object, bookmark: false};
            });
        })
        .catch(err => next(err));
}



// fetching directly from API by coordinates
// const fetchPlacesByCity = cityName => {
//     const coordinates = refObj()[cityName.toLowerCase()];
//     return axios.get(`https://places.cit.api.here.com/places/v1/discover/explore?at=${coordinates}&cat=sights-museums&size=20&app_id=DemoAppId01082013GAL&app_code=AJKnXv84fjrb0KIHawS0Tg`)
//     .then(res => res.data.results)
//     .catch(err => next(err));
// };

const fetchRestaurantsByCity = cityName => {
    const coordinates = refObj()[cityName.toLowerCase()];
    console.log(cityName)
    return axios.get(`https://places.cit.api.here.com/places/v1/discover/explore?at=${coordinates}&cat=eat-drink&size=40&app_id=DemoAppId01082013GAL&app_code=AJKnXv84fjrb0KIHawS0Tg`)
    .then(res => res.data.results)
    .catch(err => next(err));
};

const fetchHotelsByCity = (lat, lng, query) => {
    return axios.get(`https://places.cit.api.here.com/places/v1/discover/search?at=${lat},${lng}&q=${query}&Accept-Language=en-GB%2Cen%3Bq%3D0.5&app_id=${app_id}&app_code=${app_code}`);
}

module.exports = {
    fetchPlacesByCity,
    fetchRestaurantsByCity,
    fetchHotelsByCity
};