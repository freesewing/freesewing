---
title: 130|Adding measurements
---

FreeSewing is all about *made-to-measure* sewing patterns; We are going to draft our pattern according to the measurements provided to us.

De vraag is dus: welke afmetingen?

Jij, als patroonontwerper, bepaalt welke afmetingen nodig zijn om jouw patroon te ontwerpen. For our bib, the only measurement we need is the baby's *head circumference*.

Dus voegen we die toe als vereiste afmeting.

## Vereiste afmetingen toevoegen

Open het config-bestand in `config/index.js` en update de `measurements`-reeks met de naam van de benodigde afmeting:

```js
measurements: ["head"],
```

<Tip>

Let erop dat je de namen van bestaande afmetingen gebruikt in plaats van er zelf nieuwe te verzinnen.

See our [best practices](/guides/best-practices/names#re-use-measurements) on this topic for details.

</Tip>

Nu weet iedereen dat je patroon de afmeting `head` gebruikt.

Ook de developmentomgeving pikt deze verandering op. Je krijgt dus het volgende scherm te zien:

![Dit scherm laat je weten dat er vereiste afmetingen ontbreken](./required-measurements.png)

Aangezien het maar om één afmeting gaat, kunnen we eenvoudig handmatig een waarde invoegen. Bijvoorbeeld `38`, want 38 centimeter is een realistische hoofdomtrek voor een baby.

Enter `38` in the box, and click on **Draft your pattern** in the top navigation bar to get back to your draft which for now still looks like this:

<Example pattern="tutorial" part="step1" caption="Nothing has changed, yet" />
