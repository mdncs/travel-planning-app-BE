const getSchedule = require('../utils/getSchedule');

exports.sendItinerary = (req, res, next) => {
    console.log('hello')
    const { startPoint, activities, noPerDay } = req.body;
    return getSchedule(startPoint, activities, noPerDay)
        .then(schedule => res.send(schedule))
        .catch(err => next(err));
}