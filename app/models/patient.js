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
  targetHgB: DS.attr('number'),
  avatar: DS.attr(),
  age: Ember.computed('birthday', function() {
    return moment().diff(this.get('birthday'), 'years');
  }),
  gender: DS.attr()
});
