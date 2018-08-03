import { computed } from '@ember/object';
import Component from '@ember/component';
import layout from '../templates/components/my-chart';
import computedStyle from 'ember-computed-style';

export default Component.extend({
  layout: layout,

  classNames: ['my-chart'],

  isActive: false,

  style: computedStyle('typography', 'activeStyles'),

  typography: Object.freeze({
    fontWeight: 'bold'
  }),

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
