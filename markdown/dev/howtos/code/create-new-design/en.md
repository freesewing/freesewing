---
title: Creating a new pattern design
for: developers
about: Shows you how to create a new design
---

To create a new pattern, call `new freesewing.Design()`.
It takes your pattern configuration,
and any plugins you want to load as parameters.

For example, if we were creating a new pattern called `Sorcha`:

```js
import freesewing from "@freesewing/core"
import plugins from "@freesewing/plugin-bundle"
import config from "../config"

// Create new design
const Sorcha = new freesewing.Design(config, plugins)
```

This method does not return a `Design` object. Instead it returns
a constructor method for your pattern.

When importing your pattern, it is itself a constructor:

```js
import Sorcha from "@freesewing/sorcha"

// Sorcha is a constructor for your pattern. 
let pattern = new Sorcha()
```

<Tip>

##### Design() is a super-constructor

Constructors are functions you can call with `new` to create an object.
As `freesewing.Design()` returns a constructor, you can think of it
as a super-constructor.

</Tip>
