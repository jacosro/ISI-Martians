const test = require('./testing-base');
const spaceshipsEndpoint = test.endpoints.spaceships;

const expect = require('chai').expect;


describe('Spaceships test', () => {

    it('should get all the spaceships', done => {
        test.get(spaceshipsEndpoint)
            .end((err, res) => {
                expect(err).to.be.null;

                expect(res.body.result).to.be.an('array');
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
                expect(err).to.be.null;

                expect(res.body.result).to.have.property("name");
                expect(res.body.result.name).to.equal(newSpaceship.name);
                done();
            })
    })
});