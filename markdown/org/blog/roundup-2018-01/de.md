---
author: "joostdecock"
caption: "Dein neuer Login-Hintergrund für den Monat Februar"
date: "2018-01-31"
intro: "Dies ist dein monatlicher Überblick über die Freesewing-Nachrichten der letzten vier Wochen und ein Ausblick auf das, was im nächsten Monat ansteht."
title: "Monatliches Roundup - Januar 2018: Inkscape DPI, Versionsbewusstsein, Bail und Carlita"
---

Dies ist dein monatlicher Überblick über die Freesewing-Nachrichten der letzten vier Wochen und ein Ausblick auf das, was im nächsten Monat ansteht.

## Rückblick auf den Januar
![Mehr wie diesen Monat](https://posts.freesewing.org/uploads/coffee_3f501d4076.gif)

Vielleicht liegt es an [dem rekordverdächtig deprimierenden Wetter in meiner Gegend ](https://www.theguardian.com/world/2018/jan/19/aint-no-sunshine-winter-darkest-europe), aber ich habe das Gefühl, dass der Januar mich sehr mitgenommen hat. Mal sehen, ob wir wenigstens etwas vorweisen können.

### Das Inkscape Standardeinheiten-Dilemma

Anfang des Jahres haben wir Core v1.3.0 veröffentlicht, um das Problem [#204](https://github.com/freesewing/core/issues/204) zu lösen, auch bekannt als das Problem mit den Standardeinheiten in Inkscape.

Es war eine etwas ungewöhnliche Korrektur, da wir aufgrund von Upstream-Änderungen, die von den Inkscape-Entwicklern vorgenommen wurden, dazu gezwungen waren. Außerdem mussten wir nicht nur unseren Code anpassen, sondern auch die Änderungen in alle bestehenden Entwürfe zurückportieren.

Falls du von der ganzen Sache noch nichts mitbekommen hast, haben wir einen Blogpost darüber geschrieben: [Freesewing core v1.3.0 ist da; mit so guten Korrekturen, dass wir sie auf alle deine Entwürfe zurückportiert haben](https://joost.freesewing.org/blog/core-v1.3.0-is-out/).

### Versionsbewusstsein

Wir behalten jetzt im Auge, welche Version von Core deinen Entwurf erstellt hat. Wir führen ständig Korrekturen und Verbesserungen durch . Die Entwürfe, die du in deinem Profil gespeichert hast, könnten also veraltet sein.

Du wirst jetzt darüber informiert, sowohl auf der Seite des Entwurfs selbst als auch in deiner Entwurfsliste. Ein einfacher Redraft bringt sie auf die neueste Version.

> ##### Langfristige Vision für die Versionierung
> 
> Diese Lösung ist ein Fortschritt gegenüber der vorherigen Situation, aber sie ermöglicht keine sehr granulare Versionskontrolle. Wenn du 10 verschiedene Simon-Entwürfe in deinem Profil gespeichert hast und wir die Versionsnummer des Kerns erhöhen, weil wir eine Änderung an Carlton vorgenommen haben, werden alle deine Entwürfe unter als veraltet markiert, obwohl die Änderungen sie nicht betreffen.
> 
> Da wir uns nur auf eine einzige Versionsnummer des Kerns verlassen können, gibt es keine offensichtliche Möglichkeit für uns, zu verfolgen, welche Änderungen sich auf welches Muster auswirken.
> 
> Langfristig ist geplant, eine Kernversionsnummer und eine Musterversionsnummer zu haben. Auf diese Weise wirkt sich ein Versionssprung in einem Muster nicht auf andere Muster aus. 
> 
> Ein Versionssprung im Kern wird sich immer noch auf alle Muster auswirken, aber es sollte viel weniger Kernversionen geben, wenn wir alle Muster aus dem Kern herausnehmen.
> 
> Die Idee ist, dass jedes Muster in einem eigenen Repository liegt und wir Composer verwenden, um sie als Abhängigkeiten zu verwalten . 
> 
> Aber das ist eine langfristige Idee, die erst umgesetzt wird, wenn wir den Kern überarbeitet haben. Ja, das ist eine weitere langfristige Idee.

### Kaution für Fehlerbehandlung

In der ersten Monatshälfte haben wir Rollbar für die Fehlerbehandlung und Berichterstattung ausprobiert. Wir mochten zwar die Funktionen, die es bot, aber wir waren nicht allzu glücklich über die möglichen Auswirkungen auf deine Privatsphäre, wenn du diese Art von Daten an eine dritte Partei sendest.

Also haben wir beschlossen, unseren eigenen Rollbar für Arme namens Bail zu schreiben. Bail wird jetzt in unseren Daten und Core-Backends verwendet, damit wir wissen, wenn etwas kaputt geht.

Dieser Aufwand führte auch dazu, dass wir 2 Wochen lang Tests für unser Daten-Backend schreiben mussten. Alle Details: [Einführung der Freesewing-Bürgschaft: Der Überrollbügel des armen Mannes --- weil die Privatsphäre](/blog/introducing-bail/)

### Carlita ist hier

Vor ein paar Tagen haben wir den [Carlita Coat](/patterns/carlita), die Womenswear-Version unseres Carlton Mantels veröffentlicht.

Wenn du dich beeilt hast, Carlita in die Finger zu bekommen, ist es gut zu wissen, dass sie als Teil von Core v1.6.0 veröffentlicht wurde und wir jetzt bei v1.6.3 sind, und das ist hauptsächlich auf Korrekturen und Optimierungen in Carlton/Carlita zurückzuführen.

Wenn du eine frühere Version des Musters hast, überarbeite es bitte. Wenn du bereits ausgedruckt hast, sieh dir vielleicht [das Changelog](https://github.com/freesewing/core/blob/develop/CHANGELOG.md) an, um herauszufinden, was sich geändert hat.

Wenn du dir das Changelog ansiehst, wirst du auch sehen, dass wir den Monat mit Core v1.2.9 begonnen haben und jetzt mit Core v1.6.3 läuft, also glaube ich nicht, dass es nur eine Idee ist, dass es ein arbeitsreicher Monat war.

## Blick auf den Februar

Der Februar ist ein kurzer Monat, also ist es wahrscheinlich am besten, die Erwartungen zu steuern. Aber hier ist , was ich dafür im Sinn habe:

### Carlton/Carlita Dokumentation

Ehrlich gesagt ist das für mich wie Zähne ziehen, also erwarte nicht, dass es bis Ende Februar fertig ist, aber ich sollte zumindest bei der Dokumentation für die Carlton und Carlita Muster Fortschritte gemacht haben.

Die zunehmende Beliebtheit dieser Seite bedeutet, dass ich viel mehr mit beschäftigt bin und mich mit verschiedenen Fragen und kleinen Problemen befassen muss, die meine Aufmerksamkeit erfordern.

All dieses Feedback ist eine gute Sache denn so können wir die Dinge hier verbessern. Aber ich merke, dass es immer schwieriger wird, einen größeren Teil der Zeit einer bestimmten Sache zu widmen. Das ist genau das, was du brauchst, wenn du größere Aufgaben wie das Schreiben der Dokumentation oder das Entwerfen neuer Muster in Angriff nimmst.

Ich habe nicht wirklich eine Lösung dafür, ich mache nur eine Feststellung.

### Vielleicht ein Blake Blazer Release

Ich habe ein Jackenmuster auf meinem Zeichenbrett, das schon seit dem Sommer dort liegt (es heißt Blake Blazer). Ich sollte mir wirklich etwas Zeit nehmen, um es zu verpacken und zu veröffentlichen, aber ich zögere, weil ich nicht die Zeit finde, die Jacke zu machen.

Ich habe das Muster bereits für [verwendet, das meine Refashioners dieses Jahr](/blog/the-refashioners-2017/), machen, aber das ist nicht gerade ein sehr repräsentatives Beispiel.

Ich glaube nicht, dass ich im Februar die Zeit finden werde, eine Jacke zu nähen, aber vielleicht ist ein Muslin genug , um sie in der Beta-Version zu veröffentlichen.

### FOSDEM

![Alle Details auf fosdem.org](https://posts.freesewing.org/uploads/fosdem_bb321397cc.png)

[FOSDEM](http://fosdem.org/) --- das Free and Open Source Developers' European Meeting --- findet am ersten Wochenende im Februar in Brüssel statt.

Ich plane, am Sonntag dort zu sein. Wenn du also auch dabei bist, sag mir Bescheid oder komm vorbei und sag hallo.

