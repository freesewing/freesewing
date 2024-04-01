---
author: 1
caption: "Ich trinke nicht, aber das schien für einen Festbeitrag angemessen zu sein ¯\_(ツ)_/¯"
date: "2018-08-25"
intro: "Wir feiern ein Jahr von FreeSewing.org: Ankündigung der FreeSewing-Library"
title: "Wir feiern ein Jahr von FreeSewing.org: Ankündigung der FreeSewing-Library"
---


Vor genau einem Jahr öffneten sich die Türen von FreeSewing.org für unsere Nutzer,während die von makemypattern.com eines dieser *Wir sind umgezogen*-Schilder erhielten.

Rückblickend auf [den Blogbeitrag von vor 12 Monaten](/blog/open-for-business), es ist fast unglaublich, dass die damals angekündigten Dinge erst ein Jahr alt sind. Das Konzept eines Entwurfs, die Vergleichsfunktion oder auch die Möglichkeit Schnittmuster papierlos zu übertragen. Sie alle feiern heute ihren ersten Geburtstag.

Aber nicht diese Website, weil [die bevorstehende DSGVO-Einführung](/blog/gdpr-plan) uns zwang unsere jekyll-basierte Website zugunsten eines neuen Frontends zu beerdigen. Dies geschah irgendwann im Mai.

## Weitere Sprachen mit weniger Sprachen

DSGVO war nur Teil dieser Geschichte. Weitere Gründe für den Rewrite unserer Seite waren unser Wunsch, mehrere Sprachen zu unterstützen und unseren Technologie-Stack zu vereinfachen.

Mit anderen Worten, wir wollten Menschen erreichen, die verschiedene Sprachen sprechen, und wollten die Anzahl der dafür erforderlichen Programmiersprachen überschaubar halten.

### Mehr natürliche Sprachen

In dieser Hinsicht haben wir uns bemerkenswert gut geschlagen. Sie werden zwar nicht alle Inhalte übersetzt vorfinden, aber die wichtigsten Funktionen dieser Website sind sind nun in fünf Sprachen verfügbar:

 - Englisch
 - Deutsch
 - Spanisch
 - Französisch
 - Holländisch

Das ist wirklich zu 100% der großartigen Arbeit von [unseren wunderbaren Übersetzern](/i18n/) zu verdanken.

### Weniger Programmiersprachen

Der Wechsel von [Jekyll]() zu einem [Nuxt](https://nuxtjs.org/)-basierten Frontend hat [Ruby](https://www.ruby-lang.org/) aus unserem Technologystack entfernt. Freesewing.org läuft jetzt auf JavaScript, PHP und ein wenig C (was wir jetzt ignorieren werden).

Aber das Entfernen von Programmiersprachen ist kein *Selbstzweck*. Vielmehr besteht das zugrunde liegende Ziel darin, die Dinge zu vereinfachen, es den Menschen leichter zu machen, sich einzubringen und letztlich mehr Mitwirkende anzuziehen, damit das Projekt wachsen und florieren kann.

Jetzt ist die Gestaltung/Entwicklung von Schnittmustern kein unüberwindliches Hindernis mehr. Wir haben nun [Benjamin](/patterns/benjamin), [Florent](/patterns/florent), und [Sandy](/patterns/sandy), um dies aufzuzeigen. All diese Schnitte wurde von Menschen beigesteuert, für die Freewing zunächst neu war, sie gingen durch das Design-Tutorial und schufen am Ende ein eigenes Schnittmuster.

Wir würden uns wünschen, dass mehr Menschen in ihre Fußstapfen treten. Den Gestaltungsprozess so einfach wie möglich zu gestalten war lohnenswerte Zeitinvestition.

## Wir künden die FreeSewing-Library an

In den letzten zwei Monaten habe ich mir eine Auszeit vom Schnitte entwerfen und dem Nähen genommen, um an der nötigen [Technischen Weiterentwicklung ](Yhttps://en.wikipedia.org/wiki/Technical_debt) zu arbeitet.

Konkret habe ich mich dazu entschlossen, unser Core-Backend von Grund auf in JavaScript neu zu schreiben. Aber es gibt eine Wendung. Es ist nicht länger ein Backend. Es ist eine Library, die Sie benutzen können. sowohl in Ihrem Browser, als auch auf dem Server mit [node.js](https://nodejs.org/).

Sie befindet sich aktuell in der Version 0.10 und ist zusammen mit dem FreeSewing-Core feature complete. Sie ist [auf GitHub](https://github.com/freesewing/freesewing) und [NPM](https://www.npmjs.com/package/freesewing)verfügbar und ist vollständig dokumentiert unter [developer.freesewing.org](https://developer.freesewing.org/).

Obwohl die API mehr kann als der Core ist sie trotzdem schlanker:

![Zeilen des Codevergleichs zwischen der neuen Library und dem (dem relevanten Teil des) FreeSewing-Core](https://posts.freesewing.org/uploads/corevsfreesewing_c9327c9fa3.svg)

Das ist eine gute Nachricht, wenn Sie sich fragen.

## Was passiert als Nächstes?

Es muss noch viel Arbeit geleistet werden, bevor wir sie auf freesewing.org einsetzen können:


 - Alle unsere bestehenden Schnittmuster müssen auf die JS-Version abgestimmt werden. [Brian](https://github.com/freesewing/brian) ist der erste Schnitt, der portiert wurde.
 - Ein Rewrite unseres Datenbackends in JS. Da wir dadurch die PHP-Programmiersprache aus unserem Stack entfernen können.
 - Eine neue Website mit der FreeSewing-Library und unserem neuen Daten-Backend erstellen.

Das ist wirklich eine Menge Arbeit, und obwohl ich hoffe, dass wir bis Ende des Jahres gute Fortschritte gemacht haben, kann ich nicht versprechen, dass dies geschehen wird.

## Aber ich will nur Schnittmuster

Die Chancen stehen gut, dass Sie sich nur für Schnittmuster interessieren. Was du willst, sind mehr Schnittmuster, bessere Schnitte, mehr verschiedene Schnittmuster. Und all dieses Neuschreiben ist nicht unbedingt das, womit wir Ihr Interesse wecken können.

Ich weiss das. Ja wirklich. Ich für meinen Teil habe eine Liste von Mustern, die ich gerne der Seite hinzugefügt sehen möchte. Und meine Arbeit an den anderen Bereichen des Projekts hält mich davon ab, sie hinzuzufügen.

Aber ich glaube, dass die Investition in eine optimierte Entwicklungsarbeit langfristig einen positiven Effekt haben wird.

Wenn wir nur ein paar zusätzliche Muster wollten, wäre dies nicht der richtige Ansatz. Aber wenn wir viele neue Schnittmuster wollen, glaube ich, dass es sich auszahlt.

Und ich möchte viele Schnittmuster haben.

