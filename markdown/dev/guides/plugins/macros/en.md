---
title: Macros
order: 90
---

Plugin structure for macros is similar, with a few changes:

-   Rather than the hook name, you provide the macro name (that you choose yourself)
-   The context (`this`) of a macro method is **always** a [Part](/reference/api/part) object.

Apart from these, the structure is very similar:

```js
import {name, version} from '../package.json';

export default {
  name,
  version,
  macros: {
    box: function(so) {
      this.points.boxTopLeft = so.anchor;
      this.points.boxTopRight = so.anchor.shift(0, so.size);
      this.points.boxBottomRight = this.points.boxTopRight.shift(-90, so.size);
      this.points.boxBottomLeft = new this.Point(so.anchor.x, this.points.boxBottomRight.y);
     
      this.paths.box = new this.Path()
        .move(this.points.boxTopLeft)
        .line(this.points.boxTopRight)
        .line(this.points.boxBottomRight)
        .line(this.points.boxBottomLeft)
        .close()
        .attr('class', 'box');
		}
	}
}
```

Did you figure out what this plugin does?
It provides a `box` macro that draws a box on our pattern in a given location with a give size.

We can use it like this:

```js
points.boxAnchor = new Point(100, 100);
macro('box', {
  anchor: points.boxAnchor
  size: 25
}); 
```

Obviously, you can expect to learn how to call a macro in its documentation,
rather than have to comb through its code.

<Note>

###### Macros take only 1 argument

When writing a macro, keep in mind that all information that needs to be passed
to a macro needs to be contained in a single argument.

Typically, you use a single plain object to configure the macro.

</Note>
