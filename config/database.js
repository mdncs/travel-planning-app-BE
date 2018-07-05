const dbSession = {
    neo4j: require('neo4j-driver'),
    driver: neo4j.driver('bolt://hobby-kejliagjjjpngbkedcdfljbl.dbs.graphenedb.com:24786', neo4j.v1.auth.basic('production', 'b.6blrZy9Faq7A.icW7AUVODH1fqA3J')),
    session: driver.session()
}