const test = require('./testing-base');
const inspectionsEndpoint = test.endpoints.inspections;

const expect = require('chai').expect;

const Spaceship = require('../entities/models').Spaceship;
const Mothership = require('../entities/models').Mothership;
const Passenger = require('../entities/models').Passenger;
const Inspection = require('../entities/models').Inspection;

describe('Inspections test', done => {

    before(done => {
        // Remove all elements
        Promise.all([
            Spaceship.remove({}),
            Mothership.remove({}),
            Passenger.remove({}),
            Inspection.remove({})
        // create necessary
        ]).then(() => 
            Promise.all([
                Mothership.create({
                    id: 1,
                    name: "Mothership 1"
                }),
                Spaceship.create({
                    id: 1,
                    name: "Spaceship 1",
                    maxPassengers: 10,
                    fromMothership_id: 1,
                    toMothership_id: 1
                }),
                Passenger.create({
                    id: 1,
                    name: "Passenger 1",
                    spaceship_id: 1
                })
        ]))
        .then(() => done())
        .catch(done);
    })

    it('should create a new inspection', done => {
        test.post(inspectionsEndpoint)
            .send({
                id: 1,
                inspector: "gadget",
                spaceshipId: 1,
                passengersIds: [1]
            }).end((err, res) => {
                expect(err).to.be.null;
                expect(res.body.ok).to.be.true;
                expect(res.body.result).to.have.property('date');
                done();
            })
    })

    it('should throw an error for inexisting inspection', done => {
        test.get(inspectionsEndpoint + '/7')
            .end((err, res) => {
                console.log(res.body);
                expect(err).to.be.null;
                expect(res.body.ok).to.be.false;
                expect(res.body).to.have.property("error");
                done();
            });
    })

})