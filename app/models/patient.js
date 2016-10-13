import Ember from 'ember';
import DS from 'ember-data';
import moment from 'moment';

export default DS.Model.extend({
  name: DS.attr(),
  birthday: DS.attr('date'),
  weight: DS.attr('number'),
  targetHgB: DS.attr('number'),
  avatar: DS.attr(),
  age: Ember.computed('birthday', function() {
    return moment().diff(this.get('birthday'), 'years');
  })
});
