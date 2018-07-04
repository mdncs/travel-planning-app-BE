
/* 
CREATE (c:City {name: '${cityName}'}) RETURN c;
CALL apoc.load.json('file:///home/lorelai/Desktop/NorthcodersWork/travel-planning-app/data/${cityName}.json')
YIELD value AS place
MERGE (p:Place {title: place.title})
SET p.position = place.position,
	p.description = place.description,
    p.city = place.city,
    p.imageUrl = place.imageUrl,
    p.link = place.link
RETURN p;

MATCH (c:City {name: "${cityName}"}) RETURN c;
MATCH (p:Place) WHERE p.city = '${cityName}' RETURN p;
MATCH (c:City {name: "${cityName}"}), (p:Place) WHERE p.city = '${cityName}' MERGE (c)-[r:CONTAINS]->(p) RETURN c, p;
*/