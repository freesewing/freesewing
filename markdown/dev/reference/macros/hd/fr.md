---
title: hd
---

Adds a *horizontal dimension* to your pattern.

| Propriété       | Défaut               | Type                          | Description                                                                                       |
| --------------- | -------------------- | ----------------------------- | ------------------------------------------------------------------------------------------------- |
| `from`          |                      | [Point](/reference/api/point) | Le point de départ de la dimension                                                                |
| `to`            |                      | [Point](/reference/api/point) | Le point final de la dimension                                                                    |
| `y`             |                      | Nombre                        | La valeur en Y où dessiner la dimension                                                           |
| `text`          | Distance horizontale | Nombre                        | Le texte à indiquer sur une dimension s'il ne s'agit pas de la de la distance horizontale from-to |
| `noStartMarker` | `false`              | Booléen                       | Ne pas dessiner un marqueur de début                                                              |
| `noEndMarker`   | `false`              | Booléen                       | Ne pas dessiner un marqueur de fin                                                                |

<Note>

The `hd` macro is provided by the [dimension plugin](/reference/plugins/dimension).

</Note>



