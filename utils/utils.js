const axios = require('axios');
const places = require('../demoSearchResults.json');
const start = require('../demoStartPoint.json');
const efficientRes = require('../demoSortedRoutes.json');
const {app_id, app_code} = require('../config.js');
const stripTitle = /[^a-zA-Z\d]/g;

/*'waypoints' is the array that the sequence-request returns. 'destinations' is an array of objects from a HERE search - the ones you want to have an efficient distance for. The sequence-sort doesn't return the actual sorted objects, only a reference of HOW they should be sorted, so this function looks at the returned sort order and then sorts the actual destination info to match it.*/
function sortDestinations(waypoints, destinations){
  const sortedDestinations = waypoints.slice(1,-1).map(waypoint => {
    return destinations.find(destination => {
      return destination.title.replace(stripTitle,'') === waypoint.id;
    });
  });

  return sortedDestinations;
}

splitIntoItinerary(efficientRes.results[0].waypoints, places.results.items.slice(0,6));

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
