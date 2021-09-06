---
title: millimeter
---

While we recommend using percentages where possible, sometimes that doesn't make sense.  

For those cases, you can use a millimeter option which 
should be an object with these properties:

 - `mm` : The default value in millimeter
 - `min` : The minimul that's allowed
 - `max` : The maximum that's allowed

```js
options: {
  elasticWidth: { 
    mm:  35, 
    min:  5, 
    max: 80 
  }
}
```

<Tip>

##### When to use a millimeter option

You should only use millimeter when the option refers to a physical object
that comes in certain sizes. 

</Tip>
