import Ember from 'ember';
import layout from '../templates/components/my-chart';
import computedStyle from 'ember-computed-style';

const {computed} = Ember;

export default Ember.Component.extend({
  layout: layout,

  classNames: ['my-chart'],

  isActive: false,

  style: computedStyle('typography', 'activeStyles'),

  typography: {
    fontWeight: 'bold'
  },

  activeStyles: computed('isActive', function() {
    const isActive = this.get('isActive');

    if (isActive) {
      return {display: 'block'};
    }else{
      return {};
    }
  }),

  attributeBindings: ['style'],

  click() {
    this.toggleProperty('isActive');
  }
});
