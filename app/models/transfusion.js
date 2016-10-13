import DS from 'ember-data';

export default DS.Model.extend({
  patient: DS.belongsTo('patient', {async: false}),
  date: DS.attr('date'),
  units: DS.attr('number')
});
