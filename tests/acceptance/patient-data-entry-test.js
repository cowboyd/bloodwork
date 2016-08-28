/* jshint expr:true */
import { describe, it, beforeEach, afterEach } from 'mocha';
import startApp from '../helpers/start-app';
import destroyApp from '../helpers/destroy-app';

describe('Acceptance: PatientDataEntry', function() {
  let application;

  beforeEach(function() {
    application = startApp();
  });

  afterEach(function() {
    destroyApp(application);
  });

  describe("navigating to a brand new patient", function() {
    it("starts on the predictions screen");
    it("has message that you have no data yet entered, and it prompts to go to the transfusions and measurments screen");
  });

  describe("navigating to a patient transfustions but no measurements", function() {
    it("promputs you to enter measurements");
  });

  describe("navigating to a patient with measurements, but no transfusions", function() {
    it("prompts you to enter transfusions");
  });

  describe("the transfusions screen", function() {
    it("has a delete button next to each transfusion");
    it("shows the transfusion data in reverse chronological order");
    it("a form with fields for date and number of units");
    it("has a disabled save button");
    describe("entering in valid data", function() {
      it("enables the save button");
      describe("clicking save", function() {
        it("inserts the new transfusion datapoint into the list of transfusions");
      });
    });
    describe("clicking on the delet button next to a transfusion", function() {
      it("removes the transfusion from the list");
    });
  });

  describe("the measurements screen", function() {
    it("has a delete button next to each measurement");
    it("shows the measurement data in reverse chronological order");
    it("a form with fields for date and HgB");
    it("has a disabled save button");
    describe("entering in valid data", function() {
      it("enables the save button");
      describe("clicking save", function() {
        it("inserts the new measurement datapoint into the list of measurements");
      });
    });
    describe("clicking on the delet button next to a measurement", function() {
      it("removes the measurement from the list");
    });
  });
});
