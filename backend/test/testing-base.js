const chai = require('chai');
const chaiHttp = require('chai-http');

const server = require('../bin/www');
const should = chai.should();
const expect = chai.expect;

chai.use(chaiHttp);

const get = endpoint => {
    return chai.request(server)
        .get(endpoint)
};

const post = endpoint => {
    return chai.request(server)
        .post(endpoint)
};

const endpoint = '/api';

const endpoints = {
    passengers: endpoint + '/passengers',
    spaceships: endpoint + '/spaceships',
    motherships: endpoint + '/motherships',
    inspections: endpoint + '/inspections'
};


module.exports = {get: get, post: post, endpoints: endpoints};
