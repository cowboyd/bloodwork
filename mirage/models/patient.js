import { Model, hasMany } from 'ember-cli-mirage';

export default Model.extend({
  measurements: hasMany({async: false}),
  transfusions: hasMany({async: false})
});
