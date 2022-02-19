---
title: Share dimensions between pattern parts
for: developers
about: Shows how to share dimensions between similar pattern parts
---

<Note>

##### See this example in our source code

-   [packages/aaron/src/shared.js](https://github.com/freesewing/freesewing/blob/develop/packages/aaron/src/shared.js)
-   [packages/aaron/src/front.js](https://github.com/freesewing/freesewing/blob/72f34101792bda4d8e553c3479daa63cb461f3c5/packages/aaron/src/front.js#L160)

</Note>

When you have different pattern parts that look similar -- like the front
and back of a garment -- you may find that there's a lot of dimensions
shared between them.

The example below is from Aaron where dimensions are shared between
the back and front part.

Aaron has a file called `shared.js` that looks like this:

```js
export function dimensions(macro, points, sa) {
  macro('hd', {
    from: points.cfHem,
    to: points.hem,
    y: points.hem.y + sa * 2.5 + 15
  })
  // more dimensions here
}
```

In both `front.js` and `back.js` we use this code to add these shared dimensions:

```js
import { dimensions } from './shared'

// ...

  if (paperless) {
    dimensions(macro, points, sa)
    // ... specific dimensions 
  }
```

<Note>

Since our shared dimension method is a so-called *named export* we need to
import it with the syntax you see above.

</Note>
