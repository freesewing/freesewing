---
author: 1
caption: "Foto von Flo Dahm von Pexels"
date: "2021-04-18"
intro: "Wir haben gerade FreeSewing v2.15 veröffentlicht und es kommt mit einem neuen Schnittmuster: Das Hosenmuster Charlie Chinos."
title: "Charlie Chinos: Wer will ein paar neue Hosen?"
---


Wir haben soeben FreeSewing v2.15 veröffentlicht und es kommt mit einem neuen Muster: [Das Charlie Chinohosenmuster](/designs/charlie/).

Ich habe den Überblick darüber verloren, wie lange ein Schnittmuster für Chinos schon auf meiner To-Do Liste stand, aber die verwendete Einheit ist sicher Jahre. Ich bin sehr froh, dass ich endlich dort angekommen bin, wo ich hin wollte.

Hier ist ein Bild davon, aber durch den dunklen Stoff erkennt man leider nicht so viel:

![Einmal Charlie von Joost](https://posts.freesewing.org/uploads/joost_b8dee41025.jpg)


Stattdessen erzähle ich dir lieber, warum ich hierüber so begeistert bin.

##### Basierend auf Titan

Vorweg: Charlie basiert auf Titan, unserem Unisex-Hosengrundschnitt, der auch die Grundlage für [unseren Paco-Schnitt](/designs/paco/) ist. Wenn du also diese Schitte kennst, weißt du schon, wie dir Charlie passen wird.

##### Mehr Körpermaße, mehr Optionen, besserer Sitz

Um zu zeigen, für wie groß ich diese Verbesserung halte, habe ich [Theo](/designs/theo/) als veraltet markiert. Da Theo auf der Aldrich-Entwurfsmethode basiert, werden dort nur sehr wenige Körpermaße verwendet. Das funktioniert zwar gut für einige bestimmte Leute, ist aber dadurch nicht sehr vielseitig.

Charlie passt sich unterschiedlich geformten Körpern besser an, und hat verdammt viele Optionen, die es dir ermöglichen, deine Hose so zu konfigurieren wie du sie haben willst. Falls du dich fragst: Theo hat 5 Optionen, während es bei Charlie 31 sind.

Trotzallem werden wir Theo weiter zur Verfügung stellen. Veraltet bedeutet nur, dass wir eine kleine Warnmeldung hinzugefügt haben, die dir sagt, dass wir stattdessen Charlie empfehlen.

##### Einfacher zu fertigen

Ein weiterer Grund um sich für Charlie statt für Theo zu entscheiden: Charlie ist einfacher zu fertigen. Der Schnitt hat eine unkompliziertere Konstruktionsmethode für den Hosenstall und -bund, und die vorderen Taschen wurden so clever designt, dass sie in den Seitennähten und dadurch viel einfacher zu nähen sind, aber dennoch den klassischen Look von schräg angesetzten Taschen haben.

Theo wird mit 4 Sternen auf unserer Schwierigkeitsskala eingestuft, und ich habe Charlie 3 Sterne gegeben. Wenn du Angst davor hattest, Hosen zu machen, könnte dies das Schnittmuster sein, auf das du gewartet hast.

##### Echte Taschen

Charlie ist ein Unisex-Schnitt und die Taschen sind echt. Das hast hinten Paspeltaschen, und schräge Taschen vorne. In beiden Fällen hast du die Kontrolle darüber, wie groß und tief die Taschen sind.

Die vorderen Taschen verdienen eine gesonderte Erwähnung. Sie sehen zwar aus wie traditionelle, schräg angesetzte Taschen, liegen aber in der Seitennaht. Damit das möglich ist, erstreckt sich ein Teil des hinteren Stoffstückes nach vorne, dem Winkel der Hosentasche folgend.

## Andere Neuigkeiten zu 2.15

Charlie ist der Hauptakt, aber in dieser 2.15 Version steckt eine ganze Menge Arbeit.

Wie immer finden sich [im Changelog](https://github.com/freesewing/freesewing/blob/develop/CHANGELOG.md) alle Details, ich möchte aber ein paar erwähnenswerte Änderungen besonders hervorheben:

 - Wir haben [ein neues Plugin für Riegel](https://freesewing.dev/reference/plugins/bartack/)
 - Das [Knopf-Plugin](https://freesewing.dev/reference/plugins/buttons/) bietet neue [Knopfloch-Beginn](https://freesewing.dev/reference/snippets/buttonhole-start) und [Knopfloch-Ende](https://freesewing.dev/reference/snippets/buttonhole-end) Snippets
 - Das [Dimensions-Plugin](https://freesewing.dev/reference/plugins/dimension/) stellt ein neues [rmad Makro](https://freesewing.dev/reference/macros/rmad/) zur Verfügung
 - Das [Logo-Plugin](https://freesewing.dev/reference/plugins/logo/) unterstützt nun den dunklen Modus
 - Titan und Paco haben eine neue `waistbandHeight`-Option
 - Punktkoordinaten werden nicht mehr vom Core gerundet, um zu vermeiden, dass [path.split](https://freesewing.dev/reference/api/path/split/) nicht trifft
 - [Bella](/designs/bella/) hat einen Bug-Fix an der Schulter bekommen, um Puppenkleidung besser zu unterstützen
 - [Charlie](/designs/charlie/) ist das erste Schnittmuster, das ein paar absolute Dimensionen während der Konfiguration anzeigt. Wir haben vor, das auf weitere Schnittmuster auszudehnen. Designer, die dieses Feature nutzen wollen, finden die neuen [raise-Methoden](https://freesewing.dev/reference/api/part/raise) in der Dokumentation.
 - Wo wir schon bei der Dokumentation sind, die Beispiele in unserer [Dokumentation für Entwickler](https://freesewing.dev/) erlaubt es dir nun, dir die Punkte und Pfade in den Beispielen per Knopfdruck anzeigen zu lassen
 - Die [part.getId()](https://freesewing.dev/reference/api/part/getid/)-Methode verwendet nun ein Präfix-Argument


