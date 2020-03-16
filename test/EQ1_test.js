var expect = require("chai").expect,
  supertest = require("supertest"),
  moment = require("moment"),
  baseUrl = "https://www.googleapis.com/civicinfo/v2/elections",
  validKey = "?key=AIzaSyChCq7r4LPMM5GFDx4njmzArYb6569fErw",
  api = supertest(baseUrl);

describe("Validate the Google Civic API Election Query Endpoint", function() {
  it("Validates the election query get request returns a 200 response", done => {
    api
      .get(validKey)
      .set("Accept", "application/json")
      .end(function(err, res) {
        expect(200, done);
      });
    done();
  });

  it("Validates the 'kind' and 'elections' key values are returned and are not null", done => {
    api
      .get(validKey)
      .set("Accept", "application/json")
      .end(function(err, res) {
        expect(res.body).to.have.property("kind");
        expect(res.body.kind).to.not.be.null;
        expect(res.body).to.have.property("elections");
        expect(res.body.elections).to.not.be.null;
      });
    done();
  });

  it("should validate the kind key value", done => {
    api
      .get(validKey)
      .set("Accept", "application/json")
      .end(function(err, res) {
        expect(res.body).to.have.property("kind");
        expect(res.body.kind).to.equal("civicinfo#electionsQueryResponse");
      });
    done();
  });

  it("should validate that all keys are returned for each item in the elections list", done => {
    api
      .get(validKey)
      .set("Accept", "application/json")
      .end(function(err, res) {
        expect(res.body).to.have.property("elections");
        res.body.elections.forEach(element => {
          expect(element).to.have.property("id");
          expect(element.id).to.not.be.null;
          expect(element).to.have.property("name");
          expect(element.name).to.not.be.null;
          expect(element).to.have.property("electionDay");
          expect(element.electionDay).to.not.be.null;
          expect(element).to.have.property("ocdDivisionId");
          expect(element.ocdDivisionId).to.not.be.null;
        });
        done();
      });
  });

  it("should validate the values of the first election returned", done => {
    api
      .get(validKey)
      .set("Accept", "application/json")
      .end(function(err, res) {
        expect(res.body).to.have.property("elections");
        expect(res.body.elections[0].id).to.equal("2000");
        expect(res.body.elections[0].name).to.equal("VIP Test Election");
        expect(res.body.elections[0].electionDay).to.equal("2021-06-06");
        expect(res.body.elections[0].ocdDivisionId).to.equal(
          "ocd-division/country:us"
        );
      });
    done();
  });

  it("validates the election dates are in the correct format", done => {
    var dateFormat = "YYYY-MM-DD";

    api
      .get(validKey)
      .set("Accept", "applicaiton/json")
      .end(function(err, res) {
        expect(res.body).to.have.property("elections");
        res.body.elections.forEach(element => {
          expect(moment(element.electionDay, dateFormat, true).isValid()).to.be
            .true;
        });
      });
    done();
  });

  it("Validates that 5 elections are returned", done => {
    api
      .get(validKey)
      .set("Accept", "application/json")
      .end(function(err, res) {
        expect(res.body).to.have.property("elections");
        expect(res.body.elections).length(5);
      });
    done();
  });

  it("Validates that access is not granted to user with invalid key", done => {
    var invalidKey = "?key=AIzaSyChCq7r4LPMM5GFDx4njmzArYb6INVALID";
    api
      .get(invalidKey)
      .set("Accept", "application/json")
      .end(function(err, res) {
        expect(400, done);
        expect(res.body.error.message).to.equal("Bad Request")
        expect(res.body.error.errors[0].reason).to.equal("keyInvalid")
      });
    done();
  });

  it("Validates that access is not granted to user with null key", done => {
    var nullKey = "?key=";
    api
      .get(nullKey)
      .set("Accept", "application/json")
      .end(function(err, res) {
        expect(400, done);
        expect(res.body.error.message).to.equal("Bad Request")
        expect(res.body.error.errors[0].reason).to.equal("keyInvalid")
      });
    done();
  });
});
