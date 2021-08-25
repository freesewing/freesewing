---
title: scalebox
---

Adds a *scale box* to your pattern.

| Propriété | Défaut                     | Type                          | Description                            |
| --------- | -------------------------- | ----------------------------- | -------------------------------------- |
| `at`      |                            | [Point](/reference/api/point) | The point to anchor the *scale box* on |
| `lead`    | FreeSewing                 | Chaîne de caractères          | Le texte au dessus du titre            |
| `title`   | *nom du patron et version* | Chaîne de caractères          | Le texte du titre                      |
| `text`    | (\*)                     | Chaîne de caractères          | Le texte en dessous du titre           |
| `rotate`  | 0                          | Nombre                        | Rotation en degrés                     |

(\*) `freesewingEstCrééParJoostDeCockEtContributeurs \n avecLeSoutienFinancierDeNosMécènes`

<Note>

The `round` macro is provided by the [round plugin](/reference/plugins/round).

</Note>



