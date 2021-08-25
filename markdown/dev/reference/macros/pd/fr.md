---
title: pd
---

Adds a *path dimension* to your pattern.

| Propriété       | Défaut             | Type                          | Description                                                        |
| --------------- | ------------------ | ----------------------------- | ------------------------------------------------------------------ |
| `path`          |                    | [Chemin](/reference/api/path) | Le chemin le long duquel dessiner la dimension                     |
| `offset`        | 0                  | Nombre                        | Le décalage avec lequel dessiner la dimension                      |
| `text`          | Longueur du chemin | Nombre                        | Le texte à accoler au chemin si ce n'est pas la longueur du chemin |
| `noStartMarker` | `false`            | Booléen                       | Ne pas dessiner un marqueur de début                               |
| `noEndMarker`   | `false`            | Booléen                       | Ne pas dessiner un marqueur de fin                                 |

<Note>

The `pd` macro is provided by the [dimension plugin](/reference/plugins/dimension).

</Note>



