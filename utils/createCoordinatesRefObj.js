const cities = require('./cities.json');

exports.refObj = (cityName) => {
    return cities.reduce((acc, city) => {
        acc[city.name] = `${city.lat}%2C${city.lng}`;
        return acc;
    }, {})
}