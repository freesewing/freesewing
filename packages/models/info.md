
## Usage

In node.js:

```js
import { manSize38 } from @freesewing/models
```

which will give you an object with `measurement: value` pairs. 

## Units

All measurements are in mm.

## Available models

We have menswear and womenswear models, but all of them have all measurements.
The digits in the model refer to the neck circumference in cm.

- womenswear28
- womenswear30
- womenswear32
- womenswear34
- womenswear36
- womenswear38
- womenswear40
- womenswear42
- womenswear44
- womenswear46
- menswear32
- menswear34
- menswear36
- menswear38
- menswear40
- menswear42
- menswear44
- menswear46
- menswear48
- menswear50

## Other named exports

- measurements: A list/array of measurement names
- sizes: An object with `menswear` and `womenswear` keys that hold a list/array of sizes we provide
- menswear: An object with the menswear models
- womenswear: An object with the womenswear models
