const axios = require('axios');
const places = require('../demoSearchResults.json');
const start = require('../demoStartPoint.json');
const {app_id, app_code} = require('../config.js');

function getQueryForEfficientDistance(startPoint, arr){
  const qStr = (title, position) => `${title.replace(/[^a-zA-Z\d]/g,'')};${position[0]},${position[1]}`;

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
