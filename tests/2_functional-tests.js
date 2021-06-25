const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
  suite("Integration tests with chai-http", function () {
    test("Test GET /api/convert with a valid input such as 10L", function (done) {
      chai
        .request(server)
        .get("/api/convert")
        .query({ input: '10L' })
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.body.initNum, 10);
          assert.equal(res.body.initUnit, 'L');
          assert.approximately(res.body.returnNum, 2.6, 0.1);
          assert.equal(res.body.returnUnit, 'gal');
          assert.equal(res.body.string, '10 liters converts to 2.64172 gallons');
          done();
        });
    });

    test("Test GET /api/convert with an invalid input such as 32g", function (done) {
      chai
        .request(server)
        .get("/api/convert")
        .query({ input: '32g' })
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.body, 'invalid unit');
          done();
        });
    });

    test("Test GET /api/convert with an invalid number such as 3/7.2/4kg", function (done) {
      chai
        .request(server)
        .get("/api/convert")
        .query({ input: '3/7.2/4kg' })
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.body, 'invalid number');
          done();
        });
    });

    test("Test GET /api/convert with an invalid number AND unit such as 3/7.2/4kilomegagram", function (done) {
      chai
        .request(server)
        .get("/api/convert")
        .query({ input: '3/7.2/4kilomegagram' })
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.body, 'invalid number and unit');
          done();
        });
    });

    test("Test GET /api/convert with no number such as kg", function (done) {
      chai
        .request(server)
        .get("/api/convert")
        .query({ input: 'kg' })
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.body.initNum, 1);
          assert.equal(res.body.initUnit, 'kg');
          assert.approximately(res.body.returnNum, 2.2, 0.1);
          assert.equal(res.body.returnUnit, 'lbs');
          assert.equal(res.body.string, '1 kilograms converts to 2.20462 pounds');
          done();
        });
    });
  });
});
