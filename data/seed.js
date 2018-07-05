// const neo4j = require('neo4j-driver');
// const driver = neo4j.v1.driver('bolt://hobby-kejliagjjjpngbkedcdfljbl.dbs.graphenedb.com:24786', neo4j.v1.auth.basic('production', 'b.6blrZy9Faq7A.icW7AUVODH1fqA3J'));
// const session = driver.session();

/* 
For creating new entry for given city, loading JSON for attractions, then creating relationships between the city and the attractions

const createCityEntryWithRel = cityName => {
    session.run(`CREATE (c:City {name: '${cityName}'}) RETURN c;`)
    .then(() => {
        session.close();
        session.run(`CALL apoc.load.json('file:///home/lorelai/Desktop/NorthcodersWork/travel-planning-app/data/cityData/${cityName}.json')
                    YIELD value AS place
                    MERGE (p:Place {title: place.title})
                    SET p.position = place.position,
	                    p.description = place.description,
                        p.city = place.city,
                        p.imageUrl = place.imageUrl,
                        p.link = place.link
                    RETURN p;`)
    })
    .then(() => {
        session.close();
        session.run(`MATCH (c:City {name: "${cityName}"}) RETURN c;
                    MATCH (p:Place) WHERE p.city = '${cityName}' RETURN p;
                    MATCH (c:City {name: "${cityName}"}), (p:Place) WHERE p.city = '${cityName}' MERGE (c)-[r:CONTAINS]->(p) RETURN c, p;``)
    })
    .then(result => console.log("City added and linked to attractions!"))
}
*/

/* 
For creating new itinerary entry and then relationships between the itinerary and attractions by day (make sure you remove buttons array)

const generateItineraryEntry = (schedule, count = 1) => {
    session.run(`CREATE (i:Itinerary ${name: `Itinerary ${count}`}) RETURN i.name`)
    .then((itineraryName, count) => {
        session.close();
        count++;
        Object.keys(schedule).activities.forEach(day => {
            day.forEach(item => {
                session.run("MATCH (i:Itinerary {name: `${itineraryName}`}), (p:Place) WHERE p.title = item.title MERGE (i)-[r:`${schedule.day.toUpperCase()}`]->(p) RETURN i, p;"")
            })
        })
    })
    .then(() => {
        console.log("Itinerary added and linked to attractions by day!");
        session.close();
    })
}

*/

/* 
Sample query if loading from JSON by days

const loadItineraryFromJsonByDays = (count = 1) => {
    session.run("CREATE (i:Itinerary {name: `Itinerary ${count}`})")
    .then(() => {
        session.close();
        count++;
        session.run("CALL apoc.load.json("file:///home/lorelai/Desktop/NorthcodersWork/travel-planning-app/data/itineraryData/day1.json")
                    YIELD value AS place
                    MATCH (i:Itinerary {name: "Itinerary 2"}), (p:Place) WHERE p.title = place.title MERGE (i)-[r:DAY1]->(p) RETURN i, p;")
    })
    .then(() => console.log("Itinerary added!"))
}
*/