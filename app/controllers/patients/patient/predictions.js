import Ember from 'ember';

export default Ember.Controller.extend({
  data: Ember.computed.map('model.measurements', function(m) {
    return {
      date: m.get('date'),
      endogenousAmount: m.get('endogenousAmount')
    };
  })
});
