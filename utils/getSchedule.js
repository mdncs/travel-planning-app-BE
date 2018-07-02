const axios = require('axios');
const {app_id, app_code} = require('../config');
const stripTitle = /[^a-zA-Z\d]/g;

/*This takes a HERE API object as the startpoint, an array of HERE objects as activities, and the number of activities per day the user wants. It returns a promise that resolves into an object containing the schedule (So you need to call .then on it afterwards, ie 'getSchedule(args).then(schedule => ...) )*/
exports.getSchedule = function(startPoint, activities, nPerDay){
  console.log('Starting getSchedule')
  const firstQuery = getQueryForEfficientDistance(startPoint, activities);
  return axios.get(firstQuery)
  .then(({data}) => {
    const {waypoints} = data.results[0];
    const sortedDestinations = sortDestinations(waypoints, activities); 
    const arrayOfDaysOut = sortIntoSets(sortedDestinations, nPerDay); 
    const routeQueries = getQueriesForEachDayOfTravel(arrayOfDaysOut, startPoint); 

    return Promise.all(routeQueries.map(query => axios.get(query)))
    .then(arrayOfData => {
      console.log('got routes');
      const arrayOfRoutes = arrayOfData.map(({data}) => data);
      const arrayOfArrivalTimes = arrayOfRoutes.map(({response}) => parseTravelTimes(response.route));
      const finalSchedule = buildFrontEndObjects(arrayOfDaysOut, arrayOfArrivalTimes, startPoint);
      return Promise.resolve(finalSchedule); 
    });
  });
}
/* ------------------------- All functions below this line are invoked by the 'getSchedule' function - they don't need to be invoked independently. -------------------------*/


/* Takes the array containing arrays for each day's activities, the array of arrays for each day's travel times, and the start-point object, and weaves them together into the final object to be sent to the frontend. */
function buildFrontEndObjects(arrayOfDaysOut, arrayOfArrivalTimes, startPoint){
  const buttons = [];
  const data = arrayOfDaysOut.reduce((acc, oneDayArray, i) => {
    acc[`Day${i+1}`] = [startPoint, ...oneDayArray, startPoint].map((activity, j) => {
      return {
        id: j+1,
        title: activity.title,
        time: arrayOfArrivalTimes[i][j],
        description: activity.description || '',
        imageUrl: activity.imageUrl || 'https://1001freedownloads.s3.amazonaws.com/vector/thumb/81568/pib-darkAlt2.png', 
        link: activity.link || '', 
        city: activity.city || ''
      };
    });
    buttons.push(`Day ${i+1}`);
    return acc;
  }, {});
  data.buttons = buttons;
  return data;
}

/* This takes an array of route data. It returns an array of the times they should set off from each point, assuming they start at 9:00 spend 2 hours at each location.*/
function parseTravelTimes(route){
  const {leg} = route[0]; 
  let startTime = 1530432000351; // When passed to Date, produces a time string at precisely 09:00am. Adding traveltime in milliseconds produces the required timestrings. 
  const twoHours = 7200000;
  const arrivalTimes = leg.map((fromXtoY) => {
    const {travelTime} = fromXtoY; 
    const timeOfArrival = new Date(startTime + (travelTime * 1000));
    startTime += (travelTime*1000) + twoHours;
    return `${timeOfArrival}`.slice(16,-18); 
  }); 
  return ['09:00',...arrivalTimes];
}

/*This takes a nested array of the activities for each day, and the start point object. For each day it strips out the coordinates from the activities, adds the starting-point coords to the beginning and end, and then builds a HERE query. The result is an array of queries: each one requests a journey from the hotel, around each of the day's activities, and back to the hotel again. */
function getQueriesForEachDayOfTravel(arrayOfDays, startPoint){
  const hotel = startPoint.position; 
  const arrayOfWaypoints = arrayOfDays.map(oneDayArray => {
    return [hotel, ...oneDayArray.map(destination => destination.position), hotel];
  });
  const arrayOfQueries = arrayOfWaypoints.map(oneDayWPs => {
    const waypoints = oneDayWPs.reduce((acc, [lat, long], i) => `${acc}&waypoint${i}=geo!${lat},${long}`, '');
    const finalQuery = (
      `app_id=${app_id}`      + 
      `&app_code=${app_code}` + 
      `&mode=fastest;car`     +
      waypoints
    );
    return `https://route.cit.api.here.com/routing/7.2/calculateroute.json?${finalQuery}`; 
  });

  return arrayOfQueries; 
}

/*This takes an array of HERE objects sorted by most efficient route, and the number of activities per day the user wants to do. It returns an array of arrays, with each nested array being a set of activities for a day. The function should spread activities to avoid any gross un-evenness - eg: 10 activities at 3 per day needs 4 days to do, but a schedule of 3,3,2,2 is better than 3,3,3,1.*/
function sortIntoSets(activities, nPerDay){
  let daysLeft = Math.ceil(activities.length / nPerDay); 
  let scheduleArr = [];

  activities = activities.slice(); // To avoid any mutation issues. 
  while(activities.length && daysLeft){
    const nForThisDay = Math.ceil(activities.length / daysLeft);
    scheduleArr.push(
      activities.splice(0,nForThisDay)
    );
    daysLeft--;
  }

  return scheduleArr;  
}

/*This takes the efficient route returned from the axios request, and the array of activities. It returns an array of activities sorted by efficient route order. */
function sortDestinations(waypoints, destinations){
  const sortedDestinations = waypoints.slice(1,-1).map(waypoint => {
    return destinations.find(destination => {
      return destination.title.replace(stripTitle,'') === waypoint.id;
    });
  });
  
  return sortedDestinations;
}

/*This takes a startpoint as an object from the HERE API, and an array of activities (also HERE API objects). It returns the query axios needs to request an efficient route calculation. */
function getQueryForEfficientDistance(startPoint, activities){ 
  const qStr = (title, position) => `${title.replace(stripTitle,'')};${position[0]},${position[1]}`;

  const startQuery = qStr(startPoint.title, startPoint.position); 
  const visitQueries = activities.reduce((acc, {title, position}, i) => {
    return `${acc}&destination${i+1}=${qStr(title, position)}`;
  }, '');
  
  const finalQuery = (
    `app_id=${app_id}`         + 
    `&app_code=${app_code}`    + 
    `&start=START${startQuery}`+
    `&end=END${startQuery}`    +
    `&mode=fastest;car`        +
    visitQueries
  );

  return `https://wse.cit.api.here.com/2/findsequence.json?${finalQuery}`;
}