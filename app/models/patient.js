import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr(),
  age: DS.attr('number'),
  weight: DS.attr('number'),
  targetHgB: DS.attr('number'),
  avatar: DS.attr()
});
