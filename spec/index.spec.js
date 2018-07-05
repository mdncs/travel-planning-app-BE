const app = require('../app');
const { expect } = require('chai');
const request = require('supertest')(app);
const cities = require('../utils/cities.json');

describe('/api', () => {
    it('GET returns a 404 if the request is not on /api', () => {
        return request
            .get('/apf')
            .expect(404)
            .then(res => {
                const { error } = res;
                expect(error.status).to.equal(404);
                expect(error.text).to.equal('Page not found');
            });
    });

    describe('/api/cities/:city/places', () => {
        it('GET returns a 200 and landmarks by geolocation given a city as parameter', () => {
            return request
                .get(`/api/cities/${cities[0].name}/places`)
                .expect(200)
                .then(({ body }) => {
                    expect(body).to.be.an('object');
                    expect(body).has.ownProperty('items');
                    expect(body.items[0]).to.be.an('object');
                    expect(body.items[0].title).to.equal('John Rylands Library');
                    expect(body.items[5].position).to.eql([53.4789, -2.24194]);
                });
        });
        it('GET returns a 404 when passed a city that does not exist', () => {
            return request
                .get(`/api/cities/mrtiddles/places`)
                .expect(404)
                .then(res => {
                    const { error } = res;
                    expect(error.status).to.equal(404);
                    expect(error.text).to.equal('Page not found');
                });
        });
    });

    describe('/api/cities/:city/restaurants', () => {
        it('GET returns a 200 and restaurants by geolocation given a city as parameter', () => {
            return request
                .get(`/api/cities/${cities[0].name}/restaurants`)
                .expect(200)
                .then(({ body }) => {
                    expect(body).to.be.an('object');
                    expect(body).has.ownProperty('items');
                    expect(body.items[0]).to.be.an('object');
                    expect(body.items[0].title).to.equal('Bem Brasil');
                    expect(body.items[5].position).to.eql([53.48155, -2.24847]);
                });
        });
    });
    
    describe('/api/cities/:city/hotels', () => {
        it('GET returns a 200 and hotels by geolocation given a city as parameter', () => {
            return request
                .get(`/api/cities/${cities[0].name}/hotels?search=hotels`)
                .expect(200)
                .then(({ body }) => {
                    expect(body).to.be.an('object');
                    expect(body).has.ownProperty('items');
                    expect(body.items[0]).to.be.an('object');
                    expect(body.items[0].title).to.equal('ibis Manchester City Centre');
                    expect(body.items[3].position).to.eql([53.48334, -2.25102]);
                });
        });
        it('GET returns a 400 when not passed a query', () => {
            return request
                .get(`/api/cities/${[cities[0]].items}/hotels`)
                .expect(400)
                .then(res => {
                    const { error } = res;
                    expect(error.status).to.equal(400);
                    expect(error.text).to.equal('Bad Request');
                });
        });
    });

    describe('/api/itinerary', () => {
        it('POST returns a 200 (not 201 as it returns a list) and an object with activities divided into days', () => {
            const objectToFormat = {
                "startPoint": {
                    "id": "826gcpvj-043045ba891549ef93043f01801a28ff",
                    "position": [
                        51.51248,
                        -0.11879
                    ],
                    "title": "The Waldorf Hilton, London",
                    "link": "https://wego.here.com/united-kingdom/london/hotel/the-waldorf-hilton-london--826gcpvj-043045ba891549ef93043f01801a28ff?map=51.51248,-0.11879,15,normal&x=ep",
                    "description": "",
                    "imageUrl": "https://1001freedownloads.s3.amazonaws.com/vector/thumb/81568/pib-darkAlt2.png",
                    "city": "london"
                },
                "activities": [
                    {
                        "link": "https://wego.here.com/united-kingdom/london/sights-museums/somerset-house--826gcpvj-9b9cb9fef9e34ab4beae220a9b454c7a?map=51.51176,-0.11791,15,normal&x=ep",
                        "description": "Somerset House is a large Neoclassical building situated on the south side of the Strand in central London, overlooking the River Thames, just east of Waterloo Bridge. ",
                        "position": [
                            51.51176,
                            -0.11791
                        ],
                        "title": "Somerset House",
                        "city": "london",
                        "imageUrl": "https://www.somersethouse.org.uk/sites/default/files/styles/header_image/public/HEADER%202_The%20Edmond%20J.%20Safra%20Fountain%20Court_IMG_0435.jpg?itok=HCKiwBFi"
                    },
                    {
                        "link": "https://wego.here.com/united-kingdom/london/museum/british-museum--826gcpvj-99722f1088e640048ff5f334e6cc2a9a?map=51.5187,-0.12504,15,normal&x=ep",
                        "description": "The British Museum, located in the Bloomsbury area of London, United Kingdom, is a public institution dedicated to human history, art and culture.",
                        "position": [
                            51.5187,
                            -0.12504
                        ],
                        "title": "British museum",
                        "city": "london",
                        "imageUrl": "https://www.artfund.org/assets/what-to-see/museums-and-galleries/a-c/british-museum/british-museum-exterior_1.jpg"
                    },
                    {
                        "link": "https://wego.here.com/united-kingdom/london/landmark-attraction/big-ben--826gcpu7-879412259a2c484a99f8de9da21f44c1?map=51.500382,-0.1239,15,normal&x=ep",
                        "description": "Big Ben is the nickname for the Great Bell of the clock at the north end of the Palace of Westminster in London and is usually extended to refer to both the clock and the clock tower.",
                        "position": [
                            51.500382,
                            -0.1239
                        ],
                        "title": "Big Ben",
                        "city": "london",
                        "imageUrl": "https://media-cdn.tripadvisor.com/media/photo-s/08/dd/25/05/big-ben.jpg"
                    },
                    {
                        "link": "https://wego.here.com/united-kingdom/london/museum/tate-modern--826gcpvj-1800ed7a2ebe4105a8e2827263e38b83?map=51.50739,-0.10127,15,normal&x=ep",
                        "description": "Tate Modern is a modern art gallery located in London. It is Britain's national gallery of international modern art and forms part of the Tate group.",
                        "position": [
                            51.50739,
                            -0.10127
                        ],
                        "title": "Tate Modern",
                        "city": "london",
                        "imageUrl": "https://cdn.londonandpartners.com/asset/08d213af8554399bb00a96bd0be145b5.jpg"
                    }
                ],
                "noPerDay": 2
            }
            return request
                .post(`/api/itinerary`)
                .send(objectToFormat)
                .expect(200)
                .then(({ body }) => {
                    expect(body['Day1']).to.be.an('array');
                    expect(body['Day1'][0]).has.ownProperty('title');
                    expect(body['Day1'][0].title).to.equal('The Waldorf Hilton, London');
                });
        });
    });    
})