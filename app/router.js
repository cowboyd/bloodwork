import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('patients', function() {
    this.route('new');
    this.route('patient', {path: '/:id'}, function() {
      this.route('details');
      this.route('transfusions');
      this.route('measurements');
      this.route('predictions');
    });
  });
});

export default Router;
