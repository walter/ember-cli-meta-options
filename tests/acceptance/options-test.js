import Ember from 'ember';
import startApp from '../helpers/start-app';

Ember.Test.registerHelper( 'pauseTest', function () {
  stop();
  return new Ember.RSVP.Promise(function(){ });
});

var application;

module('Acceptance: Options', {
  setup: function() {
    application = startApp();
  },
  teardown: function() {
    Ember.run(application, 'destroy');
  }
});

test('simple property options should be loaded', function() {
  visit('/');

  andThen(function() {
    equal(find('span.person').text(), 'Bob Dobbs');
  });
});

test('nested object options should be loaded', function() {
  visit('/');

  andThen(function() {
    equal(find('span.church-name').text(), 'Church of SubGenius');
    equal(find('span.church-message').text(), 'Slack');
  });
});
