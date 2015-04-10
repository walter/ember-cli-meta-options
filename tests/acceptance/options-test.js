import Ember from 'ember';
import {module, test} from 'qunit';
import startApp from '../helpers/start-app';

var application;

module('Acceptance: Options', {
  beforeEach: function() {
    application = startApp();
  },
  afterEach: function() {
    Ember.run(application, 'destroy');
  }
});

test('simple property options should be loaded', function(assert) {
  visit('/');

  andThen(function() {
    assert.equal(find('span.person').text(), 'Bob Dobbs');
  });
});

test('nested object options should be loaded', function(assert) {
  visit('/');

  andThen(function() {
    assert.equal(find('span.church-name').text(), 'Church of SubGenius');
    assert.equal(find('span.church-message').text(), 'Slack');
  });
});
