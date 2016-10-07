import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    save(data) {
      return this.store.createRecord('patient', data).save().then(()=> {
        this.transitionTo('patients.index');
      });
    }
  }
});
