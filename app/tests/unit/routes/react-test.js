import { module, test } from 'qunit';
import { setupTest } from 'react-example/tests/helpers';

module('Unit | Route | react', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:react');
    assert.ok(route);
  });
});
