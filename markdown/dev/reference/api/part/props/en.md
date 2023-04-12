---
title: Part.asProps()
---

This `Part.asProps()` method can be used to return the part as an object that is suitable for inclusion in renderprops. 


## Example

<Example caption=" Example of the Part.asprops() method">
```js
({ Point, points, Path, paths, part }) => {

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
}
```
</Example>


