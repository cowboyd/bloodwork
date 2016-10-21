import Ember from 'ember';
import DS from 'ember-data';
import moment from 'moment';

export default DS.Model.extend({
  patient: DS.belongsTo('patient', {async: false}),
  date: DS.attr('date'),
  amount: DS.attr('number'),

  contributingTransfusions: Ember.computed.filter('patient.transfusions', function(transfusion) {
    let distance = moment(this.get('date')).diff(transfusion.get('date'), 'days');
    // console.log(this.get('date'), transfusion.get('date'), "distance = ", distance);
    return distance <= 120 && distance > 0;
  }),

  transfusedAmount: Ember.computed('patient.transfusions.[]', function() {
    let hgbIncrease = this.get('patient.hgbIncrease');

    return this.get('contributingTransfusions').reduce((sum, transfusion)=> {
      let units = transfusion.get('units');
      let distance = moment(this.get('date')).diff(transfusion.get('date'), 'days');
      let contribution = ((120 - distance) / 120) * units * hgbIncrease;
      return sum + contribution;
    }, 0);
  }),

  endogenousAmount: Ember.computed('transfusedAmount', function() {
    return this.get('amount') - this.get('transfusedAmount');
  })
});
