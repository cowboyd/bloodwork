import Ember from 'ember';
import horaceData from './horace';

function Measurements(server) {
  this.add = function(patient, attrs) {
    server.create('measurement', Ember.merge({patientId: patient.id}, attrs));
  };
}

function Transfusions(server) {
  this.add = function(patient, attrs) {
    server.create('transfusion', Ember.merge({patientId: patient.id}, attrs));
  };
}

export default function configure(server) {
  let measurements = new Measurements(server);
  let transfusions = new Transfusions(server);

  let phil = server.create('patient', {
    name: "Phil Lowell",
    birthday: new Date(1931, 7, 9),
    weight: 185,
    targetHgB: 9.5,
    gender: "M"
  });

  new Array(50).fill(0).forEach(function() {
    measurements.add(phil, {date: new Date(), amount: 10});
  });

  new Array(15).fill(0).forEach(function() {
    transfusions.add(phil, {date: new Date(), units: 3});
  });

  let horace = server.create('patient', {
    name: "Horace Moss",
    birthday: new Date(1928, 1,2),
    weight: 192,
    targetHgB: 8,
    gender: "M"
  });

  horaceData.transfusions.forEach(t => transfusions.add(horace, t));
  horaceData.measurements.forEach(t => measurements.add(horace, t));
}
