import Ember from 'ember';

export function ceil([number]) {
  return Math.ceil(number);
}

export default Ember.Helper.helper(ceil);
