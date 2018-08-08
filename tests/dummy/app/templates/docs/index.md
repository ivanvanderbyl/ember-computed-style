# Introduction

`ember-computed-style` computes a style string which can be bound to the `style` attribute of your component, or used within a template directly.

All css properties are automatically converted from `camelCase` to `dash-case`, and values converted to correct units.

  {{#docs-snippet name='quickstart-router.js' title='tests/dummy/app/router.js'}}

  {{/docs-snippet}}
