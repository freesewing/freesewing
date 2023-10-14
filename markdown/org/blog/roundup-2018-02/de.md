---
author: "joostdecock"
caption: "Dein neuer Login-Hintergrund für den Monat März"
date: "28.02.2018"
intro: "Dies ist dein monatlicher Überblick über die Freesewing-Nachrichten der letzten vier Wochen und ein Ausblick auf das, was im nächsten Monat ansteht."
title: "Monatliches Roundup - Februar 2018: Core 1.7.0 mit Verbesserungen von Sven, Carlton und Carlita. Plus GDRP, vim und Jaeger"
---

Dies ist dein monatlicher Überblick über die Freesewing-Nachrichten der letzten vier Wochen und ein Ausblick auf das, was im nächsten Monat ansteht.

## Rückblick auf den Februar

Ich hatte den heimlichen Ehrgeiz, dieses Jahr jeden Monat ein neues Muster zu veröffentlichen. Es ist erst Februar und dieser Plan scheint bereits aus dem Ruder gelaufen zu sein.

Schauen wir uns die Dinge an, die im Februar passiert sind, bevor wir darüber sprechen, was nicht passiert ist.

### Core v1.7.0 ist erschienen

Heute Morgen habe ich die Kernversion 1.7.0 veröffentlicht. Wie immer findest du alle Informationen im Änderungsprotokoll [](https://github.com/freesewing/core/blob/develop/CHANGELOG.md#170) . Am wichtigsten für die Benutzer sind jedoch [die neuen Rippenoptionen im Muster Sven](/docs/patterns/sven/options#ribbing)sowie eine Reihe zusätzlicher Verbesserungen an Carlton/Carlita.

Diese Carlton/Carlita-Verbesserungen werden durch die Tatsache vorangetrieben, dass ich und [Anneke](/showcase/maker/annekecaramin) begonnen haben, an [der Dokumentation für diese Muster](/docs/patterns/carlton/)zu arbeiten. Und jedes Mal, wenn wir etwas wie *hier*auftragen, gehen wir auch zum Muster zurück, um genau zu markieren, wo der Vliesstoff hin muss.

Unnötig zu erwähnen, dass das ein Haufen Arbeit ist. Aber es sollte bei der Konstruktion dieser Mantelmuster helfen, besonders für diejenigen, für die es das erste Mal ist, dass sie einen Mantel machen.

### GDPR Schlachtplan

Es soll nicht so klingen, als wäre es heutzutage eine Leistung, einen Blogbeitrag zu schreiben, aber ich denke, [unser *GDRP-Kampfplan* Blogbeitrag](/blog/gdpr-plan) ist es wert, erwähnt zu werden, denn dies sind wichtige Entwicklungen und die Arbeitsbelastung, die dadurch entsteht, ist erheblich.

Auch wenn noch nichts in Stein gemeißelt ist, skizziert der Beitrag unseren Plan, die GDRP-Compliance in Angriff zu nehmen, etwas, auf das wir uns in den nächsten Monaten konzentrieren werden.


### Vim-Snippets für den Freesewing-Kern

In [einem Blogpost, der den Begriff *Nische*](/blog/core-vim-snippets) verkörpert, haben wir die Verfügbarkeit eines Vim-Plugins angekündigt, das freesewing core-spezifische Snippets bereitstellt.

Grundsätzlich gilt: WENN du Muster entwickeln willst und WENN du den vim-Editor verwendest, sind diese für dich.

Das sind wohl eine Menge Wenns.

### Jaeger Sneak Preview

Darf ich vorstellen: Jaeger, das Sportmantelmuster, das ich diesen Monat veröffentlichen wollte.

![Jaeger ist fertig, aber ich habe noch keinen gemacht](jaeger.png")

Diejenigen unter euch, die sich gut erinnern können, erinnern sich vielleicht daran, dass ich letzten Monat erwähnt habe, dass ich vielleicht im Februar veröffentlichen würde. Damals trug sie allerdings noch einen anderen Namen.

Wie ich schon letzten Monat angedeutet habe, habe ich keine Zeit gefunden , um einen zu machen. Mein größtes Problem beim Entwerfen neuer Muster ist es, die Zeit zu finden, um sie tatsächlich zu machen. Das ist bei einem so komplexen Muster wie einer Jacke umso problematischer. Um ehrlich zu sein, weiß ich immer noch nicht, woher ich die Zeit hatte, den Carlton-Mantel zu nähen.

Damit will ich sagen, dass das Muster fertig ist, nur habe ich es noch nie in der neuesten Version genäht. Und ich habe das Gefühl, dass ich es so nicht loslassen kann.

Wenn du also einen Muslin davon machen möchtest --- oder sogar das echte Ding --- lass es mich in den Kommentaren wissen, und ich sorge dafür, dass wir dir einen Entwurf schicken.

Das könnte auch dabei helfen, die Veröffentlichung des Schnittmusters voranzutreiben, denn ich weiß jetzt schon, dass ich nächsten Monat nicht viel Zeit haben werde, um an einer Jacke zu arbeiten.

Da wir gerade davon sprechen...

## Blick in den März

Im März habe ich zwei Wochen Urlaub (Juhu!), von denen ich den größten Teil in Bangkok verbringen werde (noch mehr Juhu!).

Das bedeutet, dass ich im nächsten Monat nicht viel nähen werde, aber ich werde etwas Zeit für mich und meinen Laptop haben, . Deshalb wollte ich einen der größeren Punkte auf meiner mittelfristigen ToDo-Liste in Angriff nehmen.

Mein ursprünglicher Plan war es, den Kern neu zu schreiben. Du kannst einige Details [in diesem Ticket zu diesem Thema finden](https://github.com/freesewing/core/issues/236)

Mit Blick auf die kommenden Monate ist das dringlichste Problem jedoch die bevorstehende GDPR-Frist im Mai, die ebenfalls viel Arbeit abverlangen wird.

Also dachte ich mir, dass es sinnvoller wäre, eine weitere Sache auf der ToDo-Liste der hochgesteckten Ziele in Angriff zu nehmen: das Frontend neu zu schreiben.

Anstatt noch einen weiteren Haufen jQuery-Code hinzuzufügen, um den ganzen GDPR-Kram zu handhaben, ist die Idee, das Frontend zu forken und es auf [vue.js](https://vuejs.org/)zu portieren. Auch hierfür gibt es unter [eine offene Frage, deren Fortschritt du unter](https://github.com/freesewing/site/issues/311)verfolgen kannst.

Da ich null Erfahrung mit vue.js habe, sollte das Spaß machen. Wenn du mithelfen möchtest, hinterlasse bitte einen Kommentar.

