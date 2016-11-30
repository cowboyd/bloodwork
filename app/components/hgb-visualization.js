import Ember from 'ember';
import moment from 'moment';
import { scaleTime, scaleLinear } from 'd3-scale';
import { line, curveBasis } from 'd3-shape';

export default Ember.Component.extend({
  classNameBindings: [':hgb-visualization'],

  'height': 500,
  'width': 960,

  sorted: Ember.computed('measurements.@each.date', function() {
    let data = this.get('measurements');
    return data.sort((a, b)=> {
      if (a.date < b.date) {
        return -1;
      } else if (a.date > b.date) {
        return 1;
      } else {
        return 0;
      }
    });
  }),

  minDate: Ember.computed.readOnly('sorted.firstObject.date'),

  maxDate: Ember.computed.readOnly('sorted.lastObject.date'),

  minHgb: Ember.computed('measurements.@each.endogenousAmount', function() {
    return this.get('measurements').reduce(function(min, measurement) {
      let amount = measurement.endogenousAmount;
      if (amount < min) {
        return amount;
      } else {
        return min;
      }
    }, Infinity);
  }),

  maxHgb: Ember.computed('measurements.@each.endogenousAmount', function() {
    return this.get('measurements').reduce(function(max, measurement) {
      let amount = measurement.endogenousAmount;
      if (amount > max) {
        return amount;
      } else {
        return max;
      }
    }, 0);
  }),

  minY: Ember.computed('minHgb', function() {
    return Math.floor(this.get('minHgb')) - 1;
  }),

  maxY: Ember.computed('maxHgb', function() {
    return Math.ceil(this.get('maxHgb')) + 1;
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
        .range([this.get('left'), this.get('right')]);
    let y = scaleLinear()
        .domain([this.get('minY'), this.get('maxY')])
        .range([this.get('bottom'), this.get('top')]);
    return {
      x: x(m.date),
      y: y(m.endogenousAmount)
    };
  }),

  path: Ember.computed('sorted', function() {
    let x = scaleTime()
        .domain([this.get('sorted.firstObject.date'), this.get('sorted.lastObject.date')])
        .range([this.get('left'), this.get('right')]);
    let y = scaleLinear()
        .domain([this.get('minY'), this.get('maxY')])
        .range([this.get('bottom'), this.get('top')]);
    let path = line()
        .curve(curveBasis)
        .x(d => x(d.date))
        .y(d => y(d.endogenousAmount));
    return path(this.get('measurements'));
  }),

  gridlines: Ember.computed('sorted', function() {
    //{{mult 2 (floor (div minHgb 2))}}, {{mult 2 (ceil (div maxHgb 2))}}
    let min = 2 * Math.floor(this.get('minHgb') / 2);
    let max = 2 * Math.ceil(this.get('maxHgb') / 2);

    function calc(lower, upper) {
      if (lower === upper) {
        return [upper];
      } else {
        return [lower].concat(calc(lower + 2, upper));
      }
    }

    let indices = calc(min, max);
    let y = scaleLinear()
        .domain([this.get('minY'), this.get('maxY')])
        .range([this.get('bottom'), this.get('top')]);

    return indices.map(function(amount) {
      let yPosition = y(amount);
      return {
        y: yPosition,
        amount
      };
    });
  }),

  padding: 0,

  left: Ember.computed.readOnly('padding'),

  right: Ember.computed('width', function() {
    return Math.max(this.get('width') - this.get('padding'), 0);
  }),

  top: Ember.computed.readOnly('padding'),

  bottom: Ember.computed('padding', 'height', function() {
    return Math.max(this.get('height') - this.get('padding'), 0);
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
