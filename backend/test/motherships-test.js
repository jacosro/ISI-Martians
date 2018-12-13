const test = require('./testing-base');
const mothershipsEndpoint = test.endpoints.motherships;

const expect = require('chai').expect;

const Mothership = require('../entities/models').Mothership;

describe('Motherships test', () => {

    before((done) => {
        Mothership.remove()
            .then(() => done())
    });

    it('should get all the motherships', done => {
        test.get(mothershipsEndpoint)
            .end((err, res) => {
                expect(res.body.ok).to.be.true;
                res.body.result.should.be.an('array');
                done();
            })
    });
    
    it('should create a new mothership', done => {
        const newMothership = {
            id: 1,
            name: "mothership 1"
        };

        test.post(mothershipsEndpoint)
            .send(newMothership)
            .end((err, res) => {
                expect(res.body.ok).to.be.true;
                res.body.result.should.deep.equal(newMothership);
                console.log(res.body.result)
                done();
            })
    })

    it('should not create a new mothership', done => {
        const newMothership = {
            id: "2",
            // name should be specified
        };

        test.post(mothershipsEndpoint)
            .send(newMothership)
            .end((err, res) => {
                expect(res.body.ok).to.be.false;
                expect(res).to.have.property('error');
                done();
            })
    });
});