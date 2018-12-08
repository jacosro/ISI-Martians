const test = require('./testing-base');
const passengersEndpoint = test.endpoints.passengers;

const expect = require('chai').expect;


describe('Passengers test', () => {

    it('should get all the passengers', done => {
        test.get(passengersEndpoint)
            .end((err, res) => {
                res.body.result.should.be.an('array');
                done();
            })
    });

    it('should create a new passenger', done => {
        const newPassenger = {
            name: "passenger 1",
            spaceship: null
        };

        test.post(passengersEndpoint)
            .send(newPassenger)
            .end((err, res) => {
                res.body.result.name.should.equal(newPassenger.name);
                expect(res.body.result.spaceship).to.be.eq(newPassenger.spaceship);
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
                expect(err).to.not.be.null;

                expect(res).to.have("status").equal(400);
            })
    })
});