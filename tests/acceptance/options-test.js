import { module, test } from 'qunit';
import { visit } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | options', function(hooks) {
  setupApplicationTest(hooks);

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
