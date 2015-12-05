import { module, test } from 'qunit';
import computedStyle from 'ember-computed-style';
import Ember from 'ember';
const { computed } = Ember;

module('Unit | Computed Style');

const TestTypoComponent = Ember.Object.extend({
  style: computedStyle('typography'),
  typography: {
    fontWeight: 'bold'
  }
});

const TestComponent = Ember.Object.extend({
  style: computedStyle('horizontalPosition', 'verticalPosition', 'positionType'),

  targetRect: {
    top: 120,
  },

  positionType: {
    position: 'absolute'
  },

  verticalPosition: computed('targetRect', function() {
    const targetRect = this.get('targetRect');

    return {top: targetRect.top + 10};
  }),

  horizontalPosition: computed(function() {
    return {left: 50};
  }),

});

test('it computes a valid style string', function(assert) {
  let subject = TestComponent.create();

  assert.equal('' + subject.get('style'), 'left:50px;top:130px;position:absolute;');
});

test('it recomputes when a dependent key changes', function (assert) {
  let subject = TestComponent.create();

  assert.equal(subject.get('style').toString(), 'left:50px;top:130px;position:absolute;');

  subject.set('targetRect', { top: 0 });

  assert.equal(subject.get('style').toString(), 'left:50px;top:10px;position:absolute;');
});

test('unitless number handling', function(assert) {
  let subject = TestComponent.create({
    positionType: {
      flex: 1,
      right: 32,
    }
  });
  assert.equal(subject.get('style'), 'left:50px;top:130px;flex:1;right:32px;');
});

test('property naming', function(assert) {
  let subject = TestTypoComponent.create({
    typography: {
      fontWeight: 'bold'
    }
  });
  assert.equal(subject.get('style'), 'font-weight:bold;');
});
