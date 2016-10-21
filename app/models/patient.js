import Ember from 'ember';
import DS from 'ember-data';
import moment from 'moment';

export default DS.Model.extend({
  name: DS.attr(),
  birthday: DS.attr('date'),
  weight: DS.attr('number'),
  weightKg: Ember.computed('weight', function() {
    return 0.4536 * this.get('weight');
  }),

  bloodVolumeDl: Ember.computed('weightKg', function() {
    return 0.75 * this.get('weightKg');
  }),

  hgbIncrease: Ember.computed('bloodVolumeDl', function() {
    return 67.5 / this.get('bloodVolumeDl');
  }),

  targetHgB: DS.attr('number'),
  avatar: DS.attr(),
  age: Ember.computed('birthday', function() {
    return moment().diff(this.get('birthday'), 'years');
  }),
  gender: DS.attr(),

  transfusions: DS.hasMany('transfusion', {async: false}),
  measurements: DS.hasMany('measurement', {async: false})
});
