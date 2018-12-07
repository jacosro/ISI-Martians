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
});