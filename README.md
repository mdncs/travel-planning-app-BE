
## Travel Planning App API

# Project Title
This is a repository for building a travel planning appwhich calculates the most efficient route given the starting point, the activities to be undertaken, and the preferred number of activities per day. 

The database used is Neo4j, a graph database which allows for an easier way to generate recommendations by querying relationships between nodes, as well as providing visual representation of these relationships.

The API used for fetching data via geolocation and for calculating the most efficient route is the HERE api, which can be found here:
https://developer.here.com/. Google's Places APi has been considered for this API, however, due to legal restrictions when using the data it provides, the HERE API was chosen instead.

Some geolocation data has been provided in ./utils/cities.json (to be used with ./utils/createCoordinatesRefObj.js) due to the HERE API being limited in the data it provides (no images or descriptions for the results).

# Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

# Prerequisites
The packages and dependences required for running this API are available in the package.json file and can be installed by running the following command: npm install

This API uses Node.js 9.7.1 and neo4j-driver 1.6.1 v3.4.10, as well as Mocha, Chai, and Supertest for testing.

The Neo4j documentation is very informative for database setup and Cypher querying:
https://neo4j.com/docs/developer-manual/current/

# Installing
For local use, a config folder is needed to switch between the development, test, and production environments.

All packages needed can be found in the package.json file.

# Step 1 - Creating database entries
The functions for creating Neo4j entries can be found in ./data/seed.js and contain Cypher queries specifically created for the set of data which the HERE API provides (after the data is formatted by the function buildFrontEndObjects in ./utils/getSchedule.js). Sample data has been provided in ./data/cityData.

# Step 2 - Testing
Tests have been provided for for each endpoint with all methods used, as well as for each error which can occur at each endpoint. A script has been set up for running the tests: npm test

# Routes

Cities

GET /api: Serves an HTML page with documentation for all the available endpoints

GET /api/cities/:city/places: Gets a number of landmarks based on geolocation

GET /:cityName/restaurants: Gets a number of restaurants based on geolocation

GET /:cityName/hotels: Gets a number of hotels based on geolocation

Itinerary

POST /itinerary: Takes an object with keys for startingPoint, activities, numberPerDay and returns them divided by days and in most efficient order for visiting

# Step 3 - Deployment

The database used for the purposes of this project is hosted on AWS via GrapheneDB. GrapheneDB provides fully-managed Neo4j hosting on Amazon AWS, and also provides free hosting for up to 512MB of storage (1000 nodes and 10.000 relationships). 

The API is hosted on Heroku here: https://be-travel-planning-app.herokuapp.com/api

The Front-End is built with React and React Native, and uses Expo as simulator for Android. The full FE repo can be found here: https://github.com/mdncs/TravelApp and can be initialised for Android from a code editor by running "npm run android" after cloning the repo locally.

For more information on how to deploy and manage your apps on Heroku, their documentation is available here: https://devcenter.heroku.com/