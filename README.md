# ember-computed-style [![Build Status](https://travis-ci.org/ivanvanderbyl/ember-computed-style.svg?branch=master)](https://travis-ci.org/ivanvanderbyl/ember-computed-style) [![Ember Observer Score](https://emberobserver.com/badges/ember-computed-style.svg)](https://emberobserver.com/addons/ember-computed-style)

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
  style: computedStyle('horizontalPosition', 'verticalPosition', 'positionType'),

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

  attributeBindings: ['style'],
});
```

### Installation

* `git clone <repository-url>`
* `cd my-addon`
* `npm install`

### Linting

* `npm run lint:js`
* `npm run lint:js -- --fix`

### Running tests

* `ember test` – Runs the test suite on the current Ember version
* `ember test --server` – Runs the test suite in "watch mode"
* `ember try:each` – Runs the test suite against multiple Ember versions

* `npm test` (Runs `ember try:testall` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

### Running the dummy application

* `ember serve`
* Visit the dummy application at [http://localhost:4200](http://localhost:4200).

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).

License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
