---
title: "Store"
components: true
---

## Description

The **Store** object holds a simple key/value store with methods for storing and retrieving information. A single store per pattern is shared by all pattern parts.

Een `store` wordt meestal gebruikt om informatie tussen delen van een patroon beschikbaar te kunnen maken. Bij voorbeeld de lengte van de halsopening in een patroondeel kan worden gebruikt om de lengte van de kraag in een ander deel te kunnen berekenen.

<Tip>

###### The store is available as shorthand

You can access the store instance from the [Part.shorthand](./part#shorthand) method;

```js
let { store } = part.shorthand();
```

</Tip>

## get()

```js
mixed store.get(string sleutel)
```

Geeft de waarde terug die onder `sleutel` opgeslagen is.

## set()

```js
void store.set(string sleutel, mixed waarde)
```

Slaat de waarde `waarde` op in de `store` onder de sleutel `sleutel`.

## setIfUnset()

```js
void store.setIfUnset(string sleutel, mixed waarde)
```

Slaat de waarde `waarde` op in de `store` onder de sleutel `sleutel`, maar alleen als die sleutel nog geen waarde heeft.
