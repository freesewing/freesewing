---
title: Attributes
---

Attributes is an object that holds attributes for a variety of other objects.

Attributes are attached to [`Point`](/reference/api/point), [`Path`](/reference/api/path), and [`Snippet`](/reference/api/snippet) objects, as well as the internal [`Svg`](/reference/api/svg) object.

All of these have an instantiated Attributes object in their `attributes` property.

An Attributes object exposes the following methods:

## add()

```js
Attributes attributes.add(string key, string value)
```

Adds `value` to the attribute identified by `key`.

Adding multiple values to the same key will result in them being joined together (with a space) when rendering.

### Attributes.add() example

```js
let { Path, paths } = part.shorthand();

// This will render as: class="classA classB"
paths.demo = new Path();
paths.demo.attributes.add('class', 'classA');
paths.demo.attributes.add('class', 'classB');

// This does the same thing:
paths.demo = new Path()
  .attr('class', 'classA')
  .attr('class', 'classB');

// This also has the same result:
paths.demo = new Path()
  .attr('class', 'classA classB');
```

## clone()

```js
Attributes attributes.clone()
```

Returns a new Attributes object that is a deep copy of this one.

## get()

```js
string attributes.get(string key)
```

Will return the value of attribute stored under `key`, or `false` if it's not set.

If key has multiple values, they will be joined together in a string, seperated by spaces.

### Attributes.get() example

```js
let { Path, paths } = part.shorthand();

paths.demo = new Path()
  .attr('class', 'classA')
  .attr('class', 'classB');

let class = paths.demo.attributes.get('class'); 
// class now holds: "classA classB"
```


## getAsArray()

```js
array attributes.getAsArray(string key)
```

Will return an array with the value of attribute stored under `key`, or `false` if it's not set.

### Attributes.getAsArray() example

```js
let { Path, paths } = part.shorthand();

paths.demo = new Path()
  .attr('class', 'classA')
  .attr('class', 'classB');

let class = paths.demo.attributes.getAsArray('class'); 
// class now holds: ["classA", "classB"]
```

## remove()

```js
Attributes attributes.remove(string key)
```

Removes the attribute values under key and returns the Attributes object.

### Attributes.remove() example

```js
let { Path, paths } = part.shorthand();

paths.demo = new Path()
  .attr('class', 'classA')
  .attr('class', 'classB');

let class = paths.example.attributes
  .remove()
  .get('class'); 
// class now holds: false
```

## set()

```js
Attributes attributes.set(string key, string value)
```

Sets the attribute identified by `key` to value `value`.

<Warning>

This will overwrite any value that's currently set on the attribute identified by `key`.

</Warning>

### Attributes.set() example

```js
let { Path, paths } = part.shorthand();

// This will render as: class="classB"
paths.demo = new Path();
paths.demo.attributes.set('class', 'classA');
paths.demo.attributes.set('class', 'classB');

// This does the same thing:
paths.demo = new Path()
  .attr('class', 'classA', true)
  .attr('class', 'classB', true);
```
