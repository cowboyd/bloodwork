import Ember from 'ember';

export function round([number]) {
  return Math.round(number * 100) / 100;
}

export default Ember.Helper.helper(round);
