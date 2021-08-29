---
title: Using hooks more than once
order: 80
---

What if you want to attach more than one method to a hook?
You could spread them over seperate plugins, but there's a better way.

Rather than assigning a method to your hook, assign an array of methods like this:

```js
import myCoolMethod from './method-a';
import myEvenCoolerMethod from './method-b';
import {name, version} from '../package.json';

export default {
  name,
  version,
  hooks: {
    preRender: [
      myCoolMethod,
      myEvenCoolerMethod
    ]
  }
}
```
