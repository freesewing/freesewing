---
title: API Reference
order: 500
---

Freesewing geeft een enkel object terug met de volgende eigenschappen:

 - `version`: Een string met het FreeSewing versie nummer

En FreeSewing's standaard export geeft toegang tot de volgende methode:

 - `Design()`: A *super-constructor* to create new pattern designs.

## Design()

```js
function freesewing.Design(object config, object|array plugins)
```

Gebruik deze methode om een nieuw patroon ontwerp te maken. Het gebruikt de volgende argumenten:

 - `config` : De patroon configuratie
 - `plugins` : Of een plugin object, of een array van plugin objecten die in jouw patroon geladen moeten worden.

<Tip>

Deze methode geeft constructor methode die moet worden aangeroepen om uw patroon 
te beginnen. 

See [creating a new pattern design](/concepts/new-design) for an example.

</Tip>

