const axios = require('axios');
const places = require('../demoSearchResults.json');
const start = require('../demoStartPoint.json');
const efficientRes = require('../demoSortedRoutes.json');
const {app_id, app_code} = require('../config.js');
const stripTitle = /[^a-zA-Z\d]/g;

/*In each HERE place object, there is another object called 'openingHours'. This contains an array called 'structured', which contains further objects that break down what times and days the venue is open. This function takes that array and returns a simplified object of seven keys, one for each day. If the place is closed on that day, the value is NULL; otherwise, it's an array with two elements: the opening time, and the closing time. Not all HERE place objects have opening times, so that needs to be accounted for. */
function getClarifiedOpeningTimes(arr){
  const convertNumToTimeString = n => '0'.repeat(4-`${n}`.length) + n;

  return arr.reduce((acc, {start, duration, recurrence} ) => {
    const openingTime = +start.slice(1,5); 
    const openForThisLong = (+duration.slice(2,4)*100) + (+duration.slice(-3,-1));
    const closingTime = (openingTime + openForThisLong) % 2400;
    const daysOpen = recurrence.slice(recurrence.lastIndexOf(':')+1).split(',');

    return daysOpen.reduce((acc, day) => {
      acc[day] = [convertNumToTimeString(openingTime), convertNumToTimeString(closingTime)]; 
      return acc; 
    }, acc);
  }, {MO: null, TU: null, WE: null, TH: null, FR: null, SA: null, SU: null});
}

/*'waypoints' is the array that the sequence-request returns. 'destinations' is an array of objects from a HERE search - the ones you want to have an efficient distance for. The sequence-sort doesn't return the actual sorted objects, only a reference of HOW they should be sorted, so this function looks at the returned sort order and then sorts the actual destination info to match it.*/
function sortDestinations(waypoints, destinations){
  const sortedDestinations = waypoints.slice(1,-1).map(waypoint => {
    return destinations.find(destination => {
      return destination.title.replace(stripTitle,'') === waypoint.id;
    });
  });

  return sortedDestinations;
}

/*startPoint is a HERE object for the hotel you stay at. arr is the array called 'items' that HERE gives on a returned search.*/
function getQueryForEfficientDistance(startPoint, arr){ 
  const qStr = (title, position) => `${title.replace(stripTitle,'')};${position[0]},${position[1]}`;

  const startQuery = qStr(startPoint.title, startPoint.position); 
  const visitQueries = arr.reduce((acc, {title, position}, i) => {
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

//console.log(getQueryForEfficientDistance(start, places.results.items));

// const coords = places.results.items.map(place => place.position).slice(0,5); 

// const query = coords.reduce((acc, cPair, i) => `${acc}&destination${i+1}=geo!${cPair[0]},${cPair[1]}`, '');

// axios.get('https://wse.cit.api.here.com/2/findsequence.json' + 
// `?app_id=${app_id}&app_code=${app_code}` + 
// `&start=geo!53.4860839,-2.242446` + query + 
// `&mode=fastest;car`)
// .then(({data}) => console.log(JSON.stringify(data, null, 3)))
// .catch(err => console.log(err)); 
