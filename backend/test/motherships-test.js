const test = require('./testing-base');
const mothershipsEndpoint = test.endpoints.motherships;

const expect = require('chai').expect;


describe('Motherships test', () => {

    it('should get all the motherships', done => {
        test.get(mothershipsEndpoint)
            .end((err, res) => {
                res.body.result.should.be.an('array');
                done();
            })
    });

    it('should create a new mothership', done => {
        const newMothership = {
            name: "mothership 1",
            spaceship: null
        };

        test.post(mothershipsEndpoint)
            .send(newMothership)
            .end((err, res) => {
                res.body.result.name.should.equal(newMothership.name);
                done();
            })
    })
});