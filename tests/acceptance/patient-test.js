/* jshint expr:true */
import { describe, it, beforeEach, afterEach } from 'mocha';
import startApp from '../helpers/start-app';
import destroyApp from '../helpers/destroy-app';

describe('Acceptance: Patient Management', function() {
  let application;

  beforeEach(function() {
    application = startApp();
  });

  afterEach(function() {
    destroyApp(application);
  });

  beforeEach(function() {
    visit("/patients");
  });

  it("has a listing of all the existing patients on the first screen");
  it("has a big button to add a new patient");

  describe("clicking on the new patient", function() {
    it("takes you to the add a patient screen");
    it("has a form for entering the patient details");
    it("it has a save and cancel button");
    it("has the save button disabled");

    describe("entering in valid patient details", function() {
      it("it validates the name, birthday, weight, min HgB target");
      it("enables the save button");
      describe("clicking the save button", function() {
        it("it takes you back to the patient list");
        it("it displays the newly created patient in the patient list");
      });
    });

    describe("entering in invalid patient details", function() {
      it("shows appropriate error messages");
      it("keeps the save button disabled");
    });

    describe("clicking the cancel button", function() {
      it("takes me back to the patient list");
    });
  });


});
