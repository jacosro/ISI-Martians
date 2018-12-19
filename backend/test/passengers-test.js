const test = require('./testing-base');
const passengersEndpoint = test.endpoints.passengers;

const expect = require('chai').expect;

const Passenger = require('../entities/models').Passenger;

describe('Passengers test', () => {

    before(done => {
        Passenger.remove()
            .then(() => done())
    });

    it('should get all the passengers', done => {
        test.get(passengersEndpoint)
            .end((err, res) => {
                expect(res.body.ok).to.be.true;
                res.body.result.should.be.an('array');
                done();
            })
    });

    it('should create a new passenger', done => {
        const newPassenger = {
            id: 1,
            name: "passenger 1",
            spaceship_id: null
        };

        test.post(passengersEndpoint)
            .send(newPassenger)
            .end((err, res) => {
                expect(res.body.ok).to.be.true;
                expect(res.body.result).to.contain(newPassenger);
                done();
            })
    })

    it('should not create a new passenger', done => {
        const badPassenger = {
            name: "whatever",
            otherBadThing: "yeah"
        }

        test.post(passengersEndpoint)
            .send(badPassenger)
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body.ok).to.be.false;
                done();
            })
    })
});