import { find, visit } from '@ember/test-helpers';
import { run } from '@ember/runloop';
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';

var application;

module('Acceptance: Options', function(hooks) {
  hooks.beforeEach(function() {
    application = startApp();
  });

  hooks.afterEach(function() {
    run(application, 'destroy');
  });

  test('simple property options should be loaded', async function(assert) {
    await visit('/');

    assert.dom('span.person').hasText('Bob Dobbs');
  });

  test('nested object options should be loaded', async function(assert) {
    await visit('/');

    assert.dom('span.church-name').hasText('Church of SubGenius');
    assert.dom('span.church-message').hasText('Slack');
  });
});
