const test = require('./testing-base');
const spaceshipsEndpoint = test.endpoints.spaceships;

const expect = require('chai').expect;


describe('Spaceships test', () => {

    it('should get all the spaceships', done => {
        test.get(spaceshipsEndpoint)
            .end((err, res) => {
                res.body.result.should.be.an('array');
                done();
            })
    });

    it('should create a new spaceship', done => {
        const newSpaceship = {
            name: "spaceship 1",
            spaceship: null
        };

        test.post(spaceshipsEndpoint)
            .send(newSpaceship)
            .end((err, res) => {
                res.body.result.name.should.equal(newSpaceship.name);
                done();
            })
    })
});