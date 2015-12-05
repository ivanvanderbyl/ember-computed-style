import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('my-chart', 'Integration | Component | my chart', {
  integration: true
});

test('it renders with bound style attribute', function(assert) {
  this.render(hbs`{{my-chart}}`);
  assert.equal(this.$('.my-chart').attr('style'), 'font-weight:bold;');
  this.$('.my-chart').click();
  assert.equal(this.$('.my-chart').attr('style'), 'font-weight:bold;display:block;');
  this.$('.my-chart').click();
  assert.equal(this.$('.my-chart').attr('style'), 'font-weight:bold;');
});
