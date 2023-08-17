---
author: "joostdecock"
caption: "Dein Login-Hintergrund für Februar"
date: "31.01.2019"
intro: "Ist es wirklich schon Ende Januar? Schon?"
title: "Monatliches Roundup - Januar 2019: Das große Beta-Update"
---


Ist es wirklich schon Ende Januar? Schon?

Nachdem ich die Weihnachtspause genutzt habe, um [Simon](/en/patterns/simon) - nicht gerade das trivialste Muster - zu portieren, bin ich ziemlich zuversichtlich, dass alle Muster in Ordnung sein werden. Simon hat 61 Optionen, wenn es also für Simon funktioniert, funktioniert es auch für alle anderen Muster, zumindest sehe ich das so.

Sieben Muster sind jetzt portiert worden. Das mag nicht viel erscheinen, aber es wird jedes Mal ziemlich mühsam, wenn wir eine Änderung vornehmen, die sich auf die Muster auswirkt, da wir dann 7 aktualisieren müssen. Also habe ich beschlossen, die Musterportierung für eine Weile auf Eis zu legen und stattdessen meine Aufmerksamkeit auf [zu richten, unsere neue Beta-Website](/en/).

## Gatsby ist jetzt unser Generator für statische Websites

Die neue Website basiert auf [Gatsby](https://www.gatsbyjs.org/), einem statischen Website-Generator , der in JavaScript geschrieben wurde und von [React](https://reactjs.org/)unterstützt wird. Wir haben uns ziemlich engagiert [die JAMstack-Architektur](/en/blog/freesewing-goes-jamstack) hier auf freesewing.org.

Es ist die dritte Überarbeitung der Seite, seit wir freesewing.org gestartet haben, und ich gebe zu, dass das ein bisschen viel ist. Ich hoffe wirklich, dass die Seite, die wir jetzt aufbauen, noch eine Weile bestehen bleibt.

Andererseits sind schnelle Iterationen eine gute Sache, vor allem, weil wir noch dabei waren, unsere Füße zu finden. Wir tun alles, was nötig ist, um es richtig zu machen, und obwohl die Frage von *, was der Zweck des Ganzen* ist, vielleicht einige von euch beschäftigt, habe ich das Gefühl, dass beta.freesewing.org den Punkt erreicht hat, an dem es diese Frage beantwortet.

## (fast) alles passiert jetzt in deinem Browser

Wir haben unsere Plattform in JavaScript umgeschrieben. Das Ding, das in deinem Browser läuft. Wenn du früher den Stil deiner Manschetten ändern wolltest, musste deine Wünsche an ein Backend senden, das dann einen Entwurf erstellte und ihn zurückschickte.

Wenn du jetzt eine Option änderst, brauchen wir keinen Round-Trip zu einem Backend, um dir auf zu zeigen, wie die Dinge aussehen. Denn alles läuft in deinem Browser. Wenn du also etwas änderst, wird es direkt auf deinem Bildschirm aktualisiert.

Das hatten wir eigentlich die ganze Zeit im Sinn, aber es ist immer noch ein beeindruckender Moment, wenn alle Teile endlich an ihren Platz fallen und die Dinge tatsächlich funktionieren.

Allerdings läuft noch nicht alles im Browser. Die Umwandlung deiner Muster in PDFs ist etwas, das wir im Backend erledigen, da wir immer noch an diesem Teil arbeiten.

## Kein Konto erforderlich

Unsere [neue Demo](https://beta.freesewing.org/en/demo) ermöglicht es dir, die Reifen zu testen, ohne dass du dich auf anmelden musst. Wenn du dich anmeldest, musst du kein Konto mit Passwort erstellen, denn unterstützt jetzt die Anmeldung mit deinem bestehenden Google- oder GitHub-Konto.

Personen, die bereits ein Konto haben, können sich mit ihrem Google- oder GitHub-Konto anmelden, sofern die E-Mail-Adresse ihres Freesewing-Kontos übereinstimmt.

## Du kannst alles ändern

Wir haben viele Änderungen vorgenommen, um Entwicklern den Einstieg in freesewing zu erleichtern. Aber wir haben auch Änderungen für Menschen vorgenommen, die auf andere Weise einen Beitrag leisten.

Alle unsere (Markdown-)Inhalte können jetzt auf der Website bearbeitet werden. Du brauchst keinen GitHub-Account, klick einfach auf das kleine Bleistiftsymbol neben dem Titel, schick deine Änderungen ab und fertig.

Das sind auch gute Nachrichten für Übersetzer. Alle Übersetzungen können auch online bearbeitet werden. Wir haben auch unsere Dokumentation für Übersetzer und Redakteure aktualisiert, um diesen neuen, vereinfachten Arbeitsablauf zu berücksichtigen.

## Benutzerdefinierte Layouts

Die Anmeldung/Signierung mit GitHub/Google-Konten war eine Funktion, die von Nutzern gewünscht wurde, und das ist sie auch: Wir unterstützen jetzt die Erstellung eines benutzerdefinierten Layouts für dein Muster. So funktioniert es:

Wenn ein Muster entworfen wird, werden die verschiedenen Musterteile automatisch auf dem Muster ausgelegt. Oft ist das toll, aber manchmal wünschst du dir, du könntest etwas ändern. Wenn du zum Beispiel dein Muster in einem Copyshop ausdrucken lassen willst, musst du sicherstellen, dass es auf die Breite der Papierrolle passt. Oder du willst etwas Papier sparen, indem du einige Teile zusammendrückst.

Sie befindet sich noch in der frühen Beta-Phase (d.h. sie geht immer noch ab und zu kaputt), aber du kannst jetzt die Breite deines Musters ändern, deine Musterteile verschieben, sie drehen oder sogar vertikal oder horizontal spiegeln, ganz wie es dir gefällt. All das kannst du in deinem Browser auf der Website erledigen.

## Entwicklerdokumentation

Wir haben auch unsere Entwicklerdokumentation auf der neuen Seite integriert. Bis gestern wurde die Dokumentation über die neue Plattform auf einer separaten Website gehostet, . Jetzt haben wir die Dokumentation portiert und alles in unsere (zukünftige) Website integriert.

## Wir werden deine Entwürfe nicht migrieren

Zeit, über die Dinge zu sprechen, die wir nicht tun werden: Wir werden deine bestehenden Entwürfe nicht migrieren. Die neue Plattform ist einfach zu anders. Es gibt keine Möglichkeit für uns, deine bestehenden Entwürfe sinnvoll zu migrieren. Wenn also der Tag kommt, an dem wir auf die neue Website umstellen, werden deine Entwürfe nicht mehr da sein.

Du kannst alle deine Daten von unserer Seite herunterladen, aber wenn du das nicht selbst tust, sind deine v1 Entwürfe weg.

## Keine weiteren Kommentare

Ich habe beschlossen, keine Kommentarfunktion einzurichten, weil ich denke, dass die falschen Erwartungen weckt.

Freesewing ist keine weitere [Schnittmusterbesprechung](https://sewing.patternreview.com/), oder [Thread and Needles](https://www.threadandneedles.org/), oder [The Fold Line](https://thefoldline.com/), oder [Textillia](https://www.textillia.com/), oder [Kollabora](http://www.kollabora.com/), oder was auch immer die *Raverly des Nähens* du jour ist.

Ich will nicht, dass freesewing.org mit diesen Websites konkurriert. Sie machen ihr Ding, wir machen unseres. Ihr Wertversprechen ist die Gemeinschaft, unseres ist es nicht. Das heißt aber nicht, dass unsere Gemeinschaft nicht wertvoll ist. Es bedeutet nur, dass wir nicht brauchen, um unsere Community auf unserer Website zu versammeln. Unsere Gemeinschaft existiert, wo immer sie geht. Sei es Twitter, Instagram, Reddit, Blogs oder irgendein soziales Netzwerk, von dem ich noch nie gehört habe. Das macht nichts, es ist alles gut.

Der Aufbau einer Community auf der Website braucht Zeit, Mühe und Arbeit. Und dafür haben wir einfach nicht die nötige Bandbreite. Mir wäre es also lieber, wenn wir uns auf [unsere Kernaufgabe](/en/docs/faq/#whats-your-end-game)konzentrieren und die Leute über Freesewing reden lassen, wo immer sie auch über Dinge reden.

## Möchte jemand Paris?

Ich habe erwähnt, dass ich dieses Jahr gerne eine Art Treffen veranstalten würde, und obwohl ich noch keine Zeit hatte, zu überlegen, was das bedeuten würde, könnten wir uns am Ende trotzdem treffen.

Konkret organisieren [Charlotte](https://englishgirlathome.com/) (aka English girl at home) und [Carmen](https://www.carmencitab.com/) (aka CarmencitaB) das [Paris Sewcial](https://englishgirlathome.com/2019/01/23/paris-sewcial-paris-coud-2019-registration-open/) Treffen im Mai. Ich werde nach Paris fahren, um dabei zu sein. Wenn ihr auch dabei seid, können wir uns dort treffen.

Die Anmeldung ist [gleich hier](https://www.eventbrite.co.uk/e/paris-sewcial-paris-coud-registration-54520802187). 


