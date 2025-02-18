---
author: "joostdecock"
caption: "Hoed-tip naar nappy.co voor de foto"
date: "2021-05-24"
intro: "FreeSewing 2.16 wordt geleverd met React 17 en Webpack 5"
title: "FreeSewing 2.16 wordt geleverd met React 17 en Webpack 5"
---


Vandaag hebben we FreeSewing v2.16 uitgebracht. Voor de toevallige waarnemer zijn er niet zoveel veranderingen. En voor gebruikers van deze website is dat zeker het geval.

Kras echter over de oppervlakte en je zult zien dat er veel werk in deze release is gaan zitten.

Laten we eens kijken wat er is veranderd:

## patroon maken

De grootste verandering heeft te maken met [create-freesewing-pattern](https://www.npmjs.com/package/create-freesewing-pattern) en de ontwikkelomgeving die het voor je opzet.

We gebruiken [create-react-app](https://www.npmjs.com/package/create-react-app) (ook bekend als <abbr title='Create React App'>CRA</abbr>) onder de motorkap, en FreeSewing 2.16 is onze eerste uitgave die wordt geleverd met [React](https://reactjs.org/) 17, CRA 4 en [Webpack](https://webpack.js.org/) 5.

Die migratie naar CRA 4 (en het bijbehorende [react-scripts](https://www.npmjs.com/package/react-scripts) 4) is belangrijk omdat het een geheel nieuwe manier heeft om je applicatie hot-reload te laden, genaamd `FAST_REFRESH`.

Het nadeel is dat het alleen werkt voor *lokale componenten* in je app. En omdat onze ontwikkelomgeving je patrooncode laadt als een (lokale) afhankelijkheid, wordt deze niet opnieuw geladen als je je patroonbestand wijzigt.

Om het nog erger te maken, houdt Webpack 5 een cache bij in het geheugen van de gebouwde afhankelijkheden. Dus zelfs het opnieuw opstarten van de ontwikkelomgeving zal de wijzigingen die je in je patroon hebt aangebracht niet laten zien.

Dat is duidelijk niet cool. En hoewel er zeker manieren zijn om Webpack zo te configureren dat het zich gedraagt zoals wij dat willen, staat CRA dat soort aanpassingen niet toe. Je kunt altijd de CRA configuratie uitwerpen (of react-scripts forken) maar dat zou teveel onderhoudsoverhead veroorzaken.

## De ontwikkelomgeving van FreeSewing: Nu met snelle verversing

We willen dat de ontwikkelomgeving alle wijzigingen weerspiegelt die je in je code aanbrengt. En we willen graag de nieuwe functie voor snel verversen gebruiken, want die is geweldig.

In tegenstelling tot de vorige hot-reload die de pagina gewoon opnieuw zou laden, kan snel verversen een gewijzigd React component dynamisch bijwerken.

Dat is een belangrijk onderscheid omdat een pagina herladen de ontwikkelomgeving terugzet naar de staat die is opgeslagen in de lokale opslag. Dat omvat de belangrijkste dingen zoals metingen, maar niet waar je naar keek in de ontwikkelomgeving, patroonconfiguratie, enzovoort. Dus bij elke herlaadbeurt moest je een paar keer klikken om terug te gaan naar waar je mee bezig was, wat een beetje irritant was.

Snel verversen heeft de potentie om dat op te lossen, en om het in te schakelen hoeven we alleen maar het patroon te importeren als een lokaal component. Helaas gebruikt CRA Webpack's `ModuleScopePlugin` die het importeren van lokale code van buiten de `example/src` map verbiedt.

Om dat probleem te omzeilen, moet je rennen:

```bash
npx creëer-vreeswijderpatroon
```

zal nu `example/src/pattern` symlinken naar de hoofdmap van je patroon. Dat brengt de code in de lokale scope, zodat deze correct kan worden geladen en snel kan worden gerefreshed.

Er is nog een voordeel aan deze aanpak: Waar je voorheen twee terminals moest gebruiken - één om de patrooncode te bouwen/bekijken en één om de ontwikkelomgeving te bouwen/bekijken - hoef je er nu maar één te laden omdat de ontwikkelomgeving ook de patrooncode zal bouwen/bekijken.

Ontwikkelaars opgelet 🎉

## Migratie van react-markdown 5 naar 6

Een andere grote verandering is [react-markdown](https://www.npmjs.com/package/react-markdown). We hebben het al geüpgraded op onze websites (onderdeel van de migratie naar Gatsby v3 die we eerder deze maand hebben afgerond), maar we gebruiken het ook in onze ontwikkelomgeving.

Het is een relatief triviale verandering waarbij de markdown-inhoud niet langer wordt doorgegeven als een expliciete prop:

```jsx
<Markdown source={`Hello, I am **Markdown**`} />
```

Maar eerder via de speciale *children* prop.

```jsx
<Markdown>Hallo, ik ben **Markdown**</Markdown>
```

## Opgewaardeerde rollup-plugins

De volgende rollup-plugins hebben ook enkele grote veranderingen ondergaan:

- rollup-plugin-terser 6 => 7
- @rollup/plugin-commonjs 14 => 19
- @rollup/plugin-node-resolve 8 => 13

Dit zou geen problemen moeten opleveren, tenzij je misschien je eigen freeswing-patronen bundelt. Als je ergens tegenaan loopt, [laat het ons weten](https://discord.freesewing.org/).

## Standaardinstellingen voor browserlijst

We gebruiken nu de aanbevolen `defaults` instelling voor [browserlist](https://github.com/browserslist/browserslist) die de browserondersteuning regelt voor cross-compilers zoals [Babel](https://babeljs.io/).

Vroeger hadden we een set aangepaste instellingen, maar er is voor ons geen echte reden om niet vast te houden aan de standaardinstellingen.

Dit zou mogelijk invloed kunnen hebben op browserondersteuning voor sommige echt oude browsers, maar de kans is groot dat ook dit onder de radar blijft.

## Samenvatting

Er is niet zoveel veranderd in de FreeSewing code zelf, maar er zijn wel een heleboel veranderingen die invloed hebben op de afhankelijkheden en bundlers.

Dit zijn meestal de moeilijkste en meest esoterische dingen van elk JavaScript-project.

Als je problemen ondervindt na het upgraden naar FreeSewing v2.16, ga dan naar [op onze Discord server](https://discord.freesewing.org/) zodat we je kunnen helpen.

Dat gezegd hebbende, zolang je dezelfde versie van verschillende FreeSewing pakketten gebruikt, zou je geen problemen moeten hebben.

