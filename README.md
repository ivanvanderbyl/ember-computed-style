![Ember Computed Style](/data/emberComputedStyleLogo.png)

Provides a simple computed property mixin for Ember Components to compute styles 
from objects similar how it can be done in React.

# Usage

Take this example code:

```javascript
import computedStyle from 'ember-computed-style';

export default Ember.Component.extend({
  style: computedStyle('styleProperties'),

  styleProperties: {
    position: 'absolute',
    top: 10,
    left: 50
  },

  attributeBindings: ['style'],

});
```

This will set style to a CSS style string computed from the returned object from
the handler function. The value of this will be correctly encoded as:

```css
  position: absolute; top: 10px; left: 50px;
```

Properties which are not designated to have a unit value will be left as is, 
otherwise `px` unit will be added if they're a Number.

You can also compute it from multiple property bindings, if each of them return
an object keyed on the CSS property name:

```javascript
import computedStyle from 'ember-computed-style';

export default Ember.Component.extend({
  style: computed.style('horizontalPosition', 'verticalPosition', 'positionType'),

  positionType: {
    position: 'absolute'
  },
  
  verticalPosition: computedStyle('targetRect', function() {
    const targetRect = this.get('targetRect');

    return {top: targetRect.top + 10};
  }),

  horizontalPosition: computed(function() {
    return {left: 50};
  }),

  attributeBindings: ['style'],
});
```

# Installing

```
ember install ember-computed-style
```

## Developing

* `git clone` this repository
* `npm install`
* `bower install`

## Running

* `ember server`
* Visit your app at http://localhost:4200.

## Running Tests

* `npm test` (Runs `ember try:testall` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).
