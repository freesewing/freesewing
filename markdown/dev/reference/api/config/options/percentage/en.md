---
title: percentage
---

Percentage options are the bread and butter of freesewing.

Almost all your options will probably be percentages.
They make sure that your pattern will scale regardless of size.

Your percentage option should be an object with these properties:

 - `pct` : The percentage
 - `min` : The minimul that's allowed
 - `max` : The maximum that's allowed

```js
options: {
  acrossBackFactor: { 
    pct:  97, 
    min:  93, 
    max: 100 
  }
}
```

<Note>

###### Percentage options will be divided by 100 when loaded

You specify percentages in your config file. For example, `50` means 50%.
When your configuration is loaded, those percentages will by divided by 100. 

So a percentage of `50` in your config file will be `0.5` when you read out that option in your pattern.

</Note>

