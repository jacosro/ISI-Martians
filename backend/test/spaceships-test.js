const test = require('./testing-base');
const spaceshipsEndpoint = test.endpoints.spaceships;

const expect = require('chai').expect;

const Spaceship = require('../entities/models').Spaceship;

describe('Spaceships test', () => {

    before(done => {
        Spaceship.remove()
            .then(() => done());
    })

    it('should get all the spaceships', done => {
        test.get(spaceshipsEndpoint)
            .end((err, res) => {
                expect(res.body.ok).to.be.true;
                expect(res.body.result).to.be.an('array');
                done();
            })
    });

    it('should create a new spaceship', done => {
        const newSpaceship = {
            id: 1,
            name: "spaceship 1",
            maxPassengers: 10,
            fromMothership_id: 1,
            toMothership_id: 1
        };

        test.post(spaceshipsEndpoint)
            .send(newSpaceship)
            .end((err, res) => {
                expect(res.body.ok).to.be.true;
                expect(res.body.result).to.contain(newSpaceship);
                done();
            })
    })
});