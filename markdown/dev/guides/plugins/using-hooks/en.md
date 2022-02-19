---
title: Using hooks
order: 70
---

For each hook, your plugin should provide a method that takes the relevant data
as its first argument. If data was passed when the hook was loaded, you will receive
that as the second object.

Remember that:

-   The `insertText` hook will receive a locale and string and you should return a string.
-   All other hooks receive an object. You don't need to return anything, but rather modify the object you receive.

Let's look at an example:

```js
import myStyle from './style';
import myDefs from './defs';
import {name, version} from '../package.json';

export default {
  name,
  version,
  hooks: {
    preRender: function(svg) {
      if (svg.attributes.get("freesewing:plugin-"+name) === false) {
        svg.style += myStyle;
        svg.defs += myDefs;
        svg.attributes.add("freesewing:plugin-"+name, version);
      }
    },
    insertText: function(text) {
      return text.toUpperCase();
    }
  }
}
```

This is a complete plugin, ready to be published on NPM. It uses two hooks:

-   `preRender` : We add some style and defs to our SVG
-   `insertText` : We transfer all text to UPPERCASE

<Note>

###### Note that we avoid running our hook twice

As you can see, the last thing we do in the `preRender` hook is set an attribute on
the SVG tag with the name and version of our plugin.

We check for this attribute when the `preRender` hook runs, thereby avoiding that
our styles and defs will be added twice.

It is good practice to wrap you hook methods in a call like this, because you have
no guarantee the user won't render your pattern more than once.

</Note>
