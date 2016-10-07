import Ember from 'ember';

import {
  validatePresence,
  validateNumber,
  validateLength
} from 'ember-changeset-validations/validators';

export default Ember.Controller.extend({
  validations: {
    name: [
      validatePresence(true),
      validateLength({gt: 3})
    ],
    targetHgB: [
      validatePresence(true),
      validateNumber({gte: 7, lte: 12})
    ],
    age: [
      validatePresence(true),
      validateNumber({gt: 1})
    ],

    weight: [
      validatePresence(true),
      validateNumber({gte: 20, lte: 200})
    ]
  }
});
