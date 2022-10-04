---
title: Store
order: 60
---

<Example part="docs_overview" options_focus="Store">
The store provides pattern-wide key/value storage
</Example>

The store provides key-value storage that is shared across your pattern.

If you have some information in one part that you want to make available
outside that part (in another part) you can save it to the store.

A **Store** object holds a simple key/value store with methods for storing and retrieving information.  


## Note


A store is typically used to share information between parts. For example
the length of the neck opening in one part can be used to calculate the
length for the collar in another part.
All patterns have access to 

<Example caption="An overview of different stores within a pattern">
```js
(props) => {
 
  const box = ({ 
    getId, 
    points, 
    Point, 
    paths, 
    Path, 
  }, center, text, w=40, h=10, classes="") => {
    paths[getId()] = new Path()
      .move(center.translate(w/-2,h/-2))
      .line(center.translate(w/2,h/-2))
      .line(center.translate(w/2,h/2))
      .line(center.translate(w/-2,h/2))
      .close()
      .setClass(classes)
    points[getId()] = center
      .clone()
      .shift(-90, h/2 - 2)
      .setText(text, "center tex-sm")
  }

  const { points, Point } = props

  // Single set pattern
  box(props, new Point(  0, -80), 'Part A')
  box(props, new Point( 50, -80), 'Part B')
  box(props, new Point(100, -80), 'Part C')
  box(props, new Point(150, -80), 'Part D')
  box(props, new Point(200, -80), 'Part E')

  box(props, new Point(  100,  -77), 'SetStore 0', 260, 25, "lashed note")
  box(props, new Point(  100, -55), 'Store', 260, 10, "lashed note")
  box(props, new Point(  100, -65), 'Pattern with a single sets of settings', 280, 60, "stroke-xl fabric")

  // Multiset pattern
  box(props, new Point(  0, 0), 'Set 0 Part A')
  box(props, new Point( 50, 0), 'Set 0 Part B')
  box(props, new Point(100, 0), 'Set 0 Part C')
  box(props, new Point(150, 0), 'Set 0 Part D')
  box(props, new Point(200, 0), 'Set 0 Part E')

  box(props, new Point(  0, 30), 'Set 1 Part A')
  box(props, new Point(100, 30), 'Set 1 Part C')
  box(props, new Point(150, 30), 'Set 1 Part C')

  box(props, new Point( 50, 60), 'Set 1 Part B')
  box(props, new Point(200, 60), 'Set 1 Part E')

  box(props, new Point( 50, 90), 'Set 1 Part B')
  box(props, new Point(100, 90), 'Set 1 Part C')
  box(props, new Point(200, 90), 'Set 1 Part E')

  box(props, new Point(  0, 53), 'Stack A', 45, 130, "dashed lining")
  box(props, new Point( 50, 53), 'Stack B', 45, 130, "dashed lining")
  box(props, new Point(100, 53), 'Stack C', 45, 130, "dashed lining")
  box(props, new Point(150, 53), 'Stack D', 45, 130, "dashed lining")
  box(props, new Point(200, 53), 'Stack E', 45, 130, "dashed lining")

  box(props, new Point(  100,  3), 'SetStore 0', 260, 25, "lashed note")
  box(props, new Point(  100, 33), 'SetStore 1', 260, 25, "lashed note")
  box(props, new Point(  100, 63), 'SetStore 2', 260, 25, "lashed note")
  box(props, new Point(  100, 93), 'SetStore 3', 260, 25, "lashed note")

  box(props, new Point(  100, 130), 'Store', 260, 10, "lashed note")

  box(props, new Point(  100, 65), 'Pattern with multiple sets of settings', 280, 170, "stroke-xl fabric")

  return props.part
}
```
</Example>



