---
author: "joostdecock"
caption: "Kurze Anerkennung für nappy.co für das Bild"
date: "2021-05-24"
intro: "FreeSewing 2.16 enthält React 17 und Webpack 5"
title: "FreeSewing 2.16 enthält React 17 und Webpack 5"
---


Wir haben heute FreeSewing v2.16 veröffentlicht. Der oberflächliche Beobachter erkennt nicht viele Änderungen. Und für die Nutzer dieser Website ist das sicherlich der Fall.

Gehe aber nur ein wenig in die Tiefe, und du erkennst, dass eine ganze Menge Arbeit in dieser Version steckt.

Schauen wir uns doch einmal an, was sich alles geändert hat:

## create-freesewing-pattern

Die größte Änderung betrifft [create-freesewing-pattern](https://www.npmjs.com/package/create-freesewing-pattern) und die Entwicklungsumgebung, die es für dich einrichtet.

Unter der Haube verwenden wir [create-react-app](https://www.npmjs.com/package/create-react-app) (alias <abbr title='Create React App'>CRA</abbr>), und FreeSewing 2.16 ist die erste Version, die [React](https://reactjs.org/) 17, CRA 4 und [Webpack](https://webpack.js.org/) 5 enthält.

Die Migration zu CRA 4 (und seinem Begleiter, [react-scripts](https://www.npmjs.com/package/react-scripts) 4) ist signifikant, weil es eine ganz neue Art und Weise für den hot-reload deiner Anwendung enthält, genannt `FAST_REFRESH`.

Der Nachteil ist, dass das nur für *lokale Komponenten* deiner Anwendung geht. Und da unsere Entwicklungsumgebung deinen Schnittmustercode als (lokale) Dependency lädt, wird es nicht neugeladen, wenn du die Datei deines Schnittmusters änderst.

Schlimmer noch, Webpack 5 behält die erstellten Dependencies als Cache im Speicher. So werden selbst beim Neustart der Entwicklungsumgebung die Änderungen, die du an deinem Schnittmuster vorgenommen hast, nicht angezeigt.

Das ist selbstverständlich nicht cool. Und während es durchaus Möglichkeiten gibt, Webpack so zu konfigurieren, dass es sich so verhält wie wir wollen, erlaubt CRA so eine Art von Anpassung nicht. Es ist zwar jederzeit möglich, die CRA Konfiguration abzustoßen (oder react-scripts zu forken), das würde aber zu viel Mehraufwand in der Wartung bedeuten.

## Die FreeSewing Entwicklungsumgebung: Jetzt mit fast refresh

Wir wollen, dass die Entwicklungsumgebung alle Änderungen widerspiegelt, die du an deinem Code vornimmst. Und wir würden gerne die neue fast refresh Funktion nutzen, weil sie ziemlich toll ist.

Im Gegensatz zum vorherigen hot-reload, der einfach nur die Seite neugeladen hat, kann fast refresh eine geänderte React-Komponente dynamisch aktualisieren.

Das ist eine wichtige Unterscheidung, weil ein Neuladen der Seite die Entwicklungsumgebung in den Zustand zurücksetzt, der im lokalen Speicher gespeichert ist. Das umfasst zwar die allerwichtigsten Dinge wie Körpermaße, aber es beinhaltet nicht, was genau du dir in der Entwicklungsumgebung angeschaut hast, die Konfiguration des Schnittmusters, und so weiter. Also brauchtest du mit jedem Neuladen ein paar Klicks, um wieder dorthin zu kommen, wo du vorher warst, was ein wenig nervig war.

Fast refresh hat das Potential, das zu beheben, und alles was wir tun müssen, damit es funktionieren kann, ist das Schnittmuster als lokale Komponente zu laden. Leider verwendet CRA das `ModuleScopePlugin` von Webpack, das es uns verbietet, lokalen Code von außerhalb des `example/src`-Ordners zu importieren.

Um dieses Problem zu umgehen, wird das Ausführen von

```bash
npx create-freesewing-pattern
```

nun einen symbolischen Link von `example/src/pattern` im root-Ordner deines Schnittmusters anlegen. Das bringt den Code in den lokalen Bereich, so dass er korrekt geladen und fast-refreshed werden kann.

Dieser Ansatz hat einen weiteren Vorteil: Wo zuvor zwei Terminals laufen mussten — eines zum Erstellen/Beobachten des Schnittmustercodes, und eines zum Erstellen/Beobachten der Entwicklungsumgebung —, brauchst du jetzt nur noch eines, weil die Entwicklungsumgebung nun auch den Schnittmustercode erstellen/beobachten kann.

Entwickler, frohlocket 🎉

## Migration von react-markdown 5 zu 6

Eine weitere wichtige Änderung ist [react-markdown](https://www.npmjs.com/package/react-markdown). Wir haben es bereits auf unseren Webseiten aktualisiert (Teil der Migration nach Gatsby v3, die wir Anfang dieses Monats abgeschlossen haben), aber wir verwenden es auch in unserer Entwicklungsumgebung.

Es handelt sich um eine relativ triviale Änderung, bei der der Markdown-Inhalt nicht mehr als expliziter prop übergeben wird:

```jsx
<Markdown source={`Hello, I am **Markdown**`} />
```

Sondern stattdessen via dem besonderen *children* prop.

```jsx
<Markdown>Hello, I am **Markdown**</Markdown>
```

## Aktualisierte rollup-Plugins

Die folgenden rollup-Plugins haben ebenfalls einige wesentliche Änderungen erfahren:

- rollup-plugin-terser 6 => 7
- @rollup/plugin-commonjs 14 => 19
- @rollup/plugin-node-resolve 8 => 13

Dies sollte keine Probleme verursachen, vielleicht höchstens, wenn du deine freesewing-Schnittmuster selber bündelst. Wenn du auf irgendwelche Probleme stößst, [sag uns Bescheid](https://discord.freesewing.org/).

## Standardwerte für browserlist

Wir verwenden nun die empfohlenen `default`-Einstellungen für [browserlist](https://github.com/browserslist/browserslist), was die Browser-Unterstützung von Cross-Compilern wie [Babel](https://babeljs.io/) steuert.

Früher hatten wir eine Reihe von eigenen Einstellungen, aber es gibt keinen wirklichen Grund für uns, nicht an den Standardeinstellungen festzuhalten.

Dies könnte möglicherweise Auswirkungen auf die Unterstützung von wirklich alten Browsern haben, aber wahrscheinlich wird auch das größtenteils unbemerkt bleiben.

## Zusammenfassung

Im FreeSewing-Code selber hat sich nicht so viel verändert, aber es gibt eine ganze Reihe an Änderungen, die die dependencies und bundler beeinflussen.

Dies sind typischerweise die schwierigsten und esoterischsten Dinge eines jeden JavaScript-Projekts.

Wenn du nach dem Upgrade auf FreeSewing v2.16 auf irgendwelche Probleme stößt, komm in [unseren Discord-Server](https://discord.freesewing.org/), damit wir dir weiterhelfen können.

Nichtsdestotrotz solltest du eigentlich keine Probleme haben, solange du die gleiche Version der verschiedenen FreeSewing-Pakete verwendest.

