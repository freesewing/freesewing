---
title: Part.asProps()
---

This `Part.asProps()` method can be used to return the part as an object that is suitable for inclusion in renderprops. We call this internally, when rendering you only need this when you are building your own render system. 


## Signature

```js

  Part.prototype.asProps = function () 
  return {
    paths: this.paths,
    points: this.points,
    snippets: this.snippets,
    attributes: this.attributes,
    height: this.height,
    width: this.width,
    bottomRight: this.bottomRight,
    topLeft: this.topLeft,
  }

```



