import { isEmpty } from '@ember/utils';
import { computed, get } from '@ember/object';
import { htmlSafe, dasherize } from '@ember/string';

const { keys } = Object;

/**
 * Lifted from Ember Metal Computed Macros
 */

function getProperties(self, propertyNames) {
  const ret = {};
  for (let i = 0; i < propertyNames.length; i++) {
    ret[propertyNames[i]] = get(self, propertyNames[i]);
  }
  return ret;
}

function generateComputedWithProperties(macro) {
  return function (...properties) {
    const computedFunc = computed(function () {
      return macro.apply(this, [getProperties(this, properties)]);
    });

    return computedFunc.property.apply(computedFunc, properties);
  };
}

// Lifted from React
const isUnitlessNumber = {
  animationIterationCount: true,
  boxFlex: true,
  boxFlexGroup: true,
  boxOrdinalGroup: true,
  columnCount: true,
  flex: true,
  flexGrow: true,
  flexPositive: true,
  flexShrink: true,
  flexNegative: true,
  flexOrder: true,
  gridRow: true,
  gridColumn: true,
  fontWeight: true,
  lineClamp: true,
  lineHeight: true,
  opacity: true,
  order: true,
  orphans: true,
  tabSize: true,
  widows: true,
  zIndex: true,
  zoom: true,

  // SVG-related properties
  fillOpacity: true,
  stopOpacity: true,
  strokeDashoffset: true,
  strokeOpacity: true,
  strokeWidth: true
};

/**
 * @param {string} prefix vendor-specific prefix, eg: Webkit
 * @param {string} key style name, eg: transitionDuration
 * @return {string} style name prefixed with `prefix`, properly camelCased, eg:
 * WebkitTransitionDuration
 */
function prefixKey(prefix, key) {
  return prefix + key.charAt(0).toUpperCase() + key.substring(1);
}

/**
 * Support style names that may come passed in prefixed by adding permutations
 * of vendor prefixes.
 */
const prefixes = ['Webkit', 'ms', 'Moz', 'O'];

// Using keys here, or else the vanilla for-in loop makes IE8 go into an
// infinite loop, because it iterates over the newly added props too.
keys(isUnitlessNumber).forEach((prop) => {
  prefixes.forEach((prefix) => {
    isUnitlessNumber[prefixKey(prefix, prop)] = isUnitlessNumber[prop];
  });
});

function transformStyleValue(name, value) {
  if (isEmpty(value)) { return ''; }

  const isNonNumeric = isNaN(value);
  let valueTransformed = value;
  if (isNonNumeric || value === 0 ||
      isUnitlessNumber.hasOwnProperty(name) && isUnitlessNumber[name]) {
    return `${value}`; // cast to string
  }

  if (typeof value === 'string') {
    valueTransformed = value.trim();
  }
  return `${valueTransformed}px`;
}

function objectToStyleString(object) {
  return keys(object).map((name) => {
    const value = transformStyleValue(name, object[name]);
    if (isEmpty(value)) { return null; }
    return `${dasherize(name)}:${value}`;
  })
  .filter((rule) => rule !== null)
  .join(';');
}

/**
 * Computes a style string from the value of bound properties.
 */
export const computedStyle = generateComputedWithProperties(
  function computedStyleProperties(properties) {
    const styleStrings = [];

    keys(properties).forEach((dependentKey) => {
      styleStrings.push(objectToStyleString(properties[dependentKey]));
    });

    let styleString = styleStrings.join(';');

    if (styleString.length > 1 && styleString.charAt(styleString.length - 1) !== ';') {
      styleString += ';';
    }

    return htmlSafe(styleString);
  }
);
