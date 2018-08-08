import computedStyle from 'ember-computed-style';

export default Ember.Component.extend({
  style: computedStyle('styleProperties'),

  styleProperties: {
    position: 'absolute',
    top: 10,
    left: 50
  }
})