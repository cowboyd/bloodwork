import Ember from 'ember';
import moment from 'moment';
import { scaleTime, scaleLinear } from 'd3-scale';
import { line, curveBundle } from 'd3-shape';

export default Ember.Component.extend({

  'height': 500,
  'width': 960,

  sorted: Ember.computed('measurements.[]', function() {
    let data = this.get('measurements');
    return data.sort((a, b)=> {
      if (a.date > b.date) {
        return -1;
      } else if (b.date > a.date) {
        return 1;
      } else {
        return 0;
      }
    });
  }),

  measurements: Ember.computed.map('data', function(measurement) {
    return measurement.getProperties('date', 'endogenousAmount');
  }),

  firstOfYear: Ember.computed(function () {
    return moment().startOf('year').toDate();
  }),

  endOfYear: Ember.computed(function() {
    return moment().endOf('year').toDate();
  }),

  circles: Ember.computed.map('measurements', function(m) {
    let x = scaleTime()
        .domain([this.get('sorted.firstObject.date'), this.get('sorted.lastObject.date')])
        .range([0, this.get('width')]);
    let y = scaleLinear()
        .domain([-5, 12])
        .range([0, this.get('height')]);
    return {
      x: x(m.date),
      y: y(m.endogenousAmount)
    };
  }),

  path: Ember.computed('sorted', function() {
    let x = scaleTime()
        .domain([this.get('sorted.firstObject.date'), this.get('sorted.lastObject.date')])
        .range([0, this.get('width')]);
    let y = scaleLinear()
        .domain([-5, 12])
        .range([0, this.get('height')]);
    let path = line()
        .curve(curveBundle)
        .x(d => x(d.date))
        .y(d => y(d.endogenousAmount));
    return path(this.get('measurements'));
  }),

  actions: {
    date(measurement) {
      return measurement.get('date');
    },

    hgb(measurement) {
      return measurement.get('endogenousAmount');
    }
  }
});
