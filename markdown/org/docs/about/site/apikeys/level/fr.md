---
title: Niveau de permission
---

Chaque clé API a un **niveau de permission** qui contrôle ce que la clé peut faire.

Le niveau de permission est un nombre allant de `0` à `4` avec la signification suivante :

- `0` : Authentification uniquement
- `1` : Accès en lecture à tes propres patrons et ensembles de mesures
- `2` : Accès en lecture à toutes les données de ton compte
- `3` : Accès en écriture à tes propres modèles et ensembles de mesures
- `4` : Accès en écriture à toutes les données de ton compte

<Tip>

Pour plus de détails, reporte-toi à [la documentation du backend sur FreeSewing.dev] (https://freesewing.dev/reference/backend/rbac#permission-levels)
</Tip>
