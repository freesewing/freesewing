---
author: "joostdecock"
caption: "Dein neuer Login-Hintergrund für den Monat Oktober"
date: "2017-09-30"
intro: "Dies ist dein monatlicher Überblick über die Freesewing-Nachrichten der letzten vier Wochen und ein Ausblick auf das, was im nächsten Monat ansteht."
title: "Monatliche Zusammenfassung - September 2017: Simon-Komplikationen, E-Mail-Probleme und Spenden sind dieses Jahr gestiegen."
---

Dies ist dein monatlicher Überblick über die Freesewing-Nachrichten der letzten vier Wochen und ein Ausblick auf das, was im nächsten Monat ansteht.

## Ein Blick zurück auf den September und ein bisschen auf den August
Für diese erste Ausgabe blicke ich etwas weiter zurück als einen Monat, denn [wurde Ende August](/blog/open-for-business/)ins Leben gerufen, also schließe ich diese Woche in diese monatliche Übersicht mit ein.

### Mein Name ist Simon, und ich bin kompliziert

Seit dem Start gab es [3 neue Pfadversionen des Freesewing-Kerns](https://github.com/freesewing/core/releases) --- du weißt schon, das Ding, das deine Nähmuster generiert --- und alle waren auf Probleme mit [dem Simon Shirt Muster](/patterns/simon)zurückzuführen.

Alle Details findest du unter [im Changelog](https://github.com/freesewing/core/blob/develop/CHANGELOG.md), aber hier ist das Wesentliche:


 -  Die Nahtzugabe am Saum war falsch, wenn der LenthBonus sehr niedrig war.
 -  Der Schnitt im Ärmel für die Knopfleiste war zu kurz
 -  Es gab ein Problem mit der Nahtzugabe an der Knopflochleiste
 -  Der Bonus für die Ärmellänge wurde doppelt gezählt
 -  Der Hüftumfang wurde nicht berücksichtigt; stattdessen wurde der Brustumfang verwendet.
 -  Eine Reihe von Optionsvorgaben wurden optimiert


Danke an [Tatyana](/users/yrhdw) und [Stefan](/users/kczrw) für die Meldung dieser Probleme. Du bekommst das lustige Bug-Abzeichen:

![Ich mag das hier wirklich](https://posts.freesewing.org/uploads/badge_found_bug_d7d0c9055a.svg)

#### Was ist dein Problem, Simon?

Dass diese Themen bei Simon auftauchen, ist kein Zufall. Das Schnittmuster bietet dir 41 Optionen, mit denen du so ziemlich jeden Aspekt deines Hemdes bestimmen kannst.

Die Verwaltung all dieser verschiedenen Kombinationen im Code führt zu einer Menge Komplexität. Und wo die Komplexität des Codes zunimmt, treten Fehler auf.

![Wenn Simon auf Facebook wäre, würde sein Beziehungsstatus sicherlich *Es ist kompliziert* lauten](https://posts.freesewing.org/uploads/complicated_d8c872358d.gif)

#### Ist es Zeit für eine Überholung?
Simon ist eine Portierung des Singular Shirt Musters von MakeMyPattern.com. Damals hätte man für ein anders gestyltes Hemd den Code kopieren, Änderungen vornehmen und dann für alle Ewigkeit zwei leicht unterschiedliche Varianten beibehalten müssen.

Bei freesewing ist es besser, denn hier ist die Vererbung fest im System verankert. Ich könnte (und sollte vielleicht auch) ein grundlegendes Hemdenmuster haben und dieses dann in eine Reihe von unterschiedlich gestalteten Hemdenmustern verzweigen.

 - Grundschnitt Brian
   - Basic Shirt Muster
     - Lässiges Hemd Muster
     - Formelles Hemd Muster
     - Ein anderes Hemdenmuster

Das würde nicht nur die Komplexität des Codes verringern, sondern es wäre wohl auch intuitiver, eine Reihe von unterschiedlich gestalteten Hemdenmustern zu sehen, anstatt nur ein Muster zu haben und dann mit 41 Optionen jonglieren zu müssen.

Eine Generalüberholung von Simon wird ein bisschen Arbeit sein, aber es ist möglich. Ich würde gerne deine Meinung zu diesem Thema hören.


## Probleme bei der E-Mail-Zustellung bewältigen
Ich habe einen Workaround für diejenigen unter euch eingebaut, die Probleme mit den Registrierungs-E-Mails hatten. Grundsätzlich alle, die ein von Microsoft verwaltetes E-Mail-Konto haben.

![Wenn diese Leute deinen Posteingang kontrollieren, wer weiß, welche anderen E-Mails du nicht bekommst](msft.gif)

Du kannst meinen Blogbeitrag [zu diesem Thema](/blog/email-spam-problems/) lesen, um alle Details zu erfahren, aber wenn du eine dieser Adressen hast, solltest du diese E-Mails jetzt erhalten. Der einzige Nachteil ist, dass du sie vielleicht zweimal bekommst.

## Verweise
Wenn jemand auf deine Seite verlinkt und die Besucher auf diesen Link klicken, nennt man das eine Weiterleitung. Die Blogger unter euch wissen vielleicht, wie es ist, wenn ihr eure Google Analytics-Berichte durchforstet, um zu sehen, wer euch verlinkt hat.

Diese Seite nutzt Google Analytics nicht --- dazu gibt es unter [einen Blogbeitrag mit Details zu](/blog/privacy-choices/) --- aber sie erfasst trotzdem die Verweise. Die Übersicht über die letzten Überweisungen ist für alle unter [auf der Statusseite](/status)einsehbar.

Die Verlinkung zu freesewing.org ist natürlich eine nette Sache, also behalte ich die Verweise im Auge und wenn eine Seite auftaucht, die einem Nutzer gehört, bekommst du das Ambassador-Abzeichen.

![Die Verlinkung zu freesewing.org ist eine Möglichkeit, das Botschafter-Abzeichen freizuschalten](https://posts.freesewing.org/uploads/badge_ambassador_3dd1e722cc.svg)

Das ist ein kleines Dankeschön dafür, dass du freesewing weiterverbreitet hast.

## Spenden
Im September haben wir die Spendensumme des letzten Jahres übertroffen. Es ist schön zu sehen, dass ich in diesem Jahr mehr Geld an [schicken kann als 2016.](/about/pledge#donations-history)

Du kannst den Stand der Spenden immer auf der Seite [verfolgen](/about/pledge#donations-history), aber hier ist der aktuelle Stand:

![Juhuu! Besser als letztes Jahr](https://posts.freesewing.org/uploads/donations_68e214d133.svg)

## Weitere Download-Formate

Ich habe auch zusätzliche Formate auf der Download-Seite hinzugefügt. Du hast jetzt die Wahl zwischen SVG, PDF, Letter-PDF, Tabloid-PDF, A4-PDF, A3-PDF, A2-PDF, A1-PDF und A0-PDF.

## Das Abzeichen für die Qualitätskontrolle
Ich habe das Abzeichen für die Qualitätskontrolle hinzugefügt, mit dem du zum Beispiel Tippfehler, defekte Links, Grammatik und andere kleine Verbesserungen melden (oder korrigieren) kannst.

![Siehst du einen Tippfehler? Sag mir Bescheid und du bekommst das](https://posts.freesewing.org/uploads/badge_quality_control_6acb8c10c2.svg)

Diese Beiträge mögen nicht weltbewegend erscheinen, aber sie sind dennoch wichtig.

Auf der Skala zwischen der endlosen Arbeit am perfekten Inhalt vor der Veröffentlichung oder der schnellen Veröffentlichung mit allem Drum und Dran, tendiere ich stark zu Letzterem. Ich verlasse mich also darauf, dass ihr mir sagt, wenn ich Mist gebaut habe.

## Ausblick auf den Oktober

Es gibt 5 Muster, an denen ich gerade arbeite. Und alle sind so weit fertig, dass ich sie machen muss, um zu überprüfen, ob sie wie vorgesehen funktionieren. Erst ein Musselin und dann das echte Ding.

Das ist ein ziemlicher Engpass für mich, weil ich einen langen Arbeitsweg habe und meine Nähzeit normalerweise auf die Wochenenden beschränkt ist.

Die einzige Möglichkeit, die Veröffentlichung von Mustern zu beschleunigen, sehe ich darin, die Leute zum Testen der Muster einzuladen. Ich glaube nicht, dass ich das von den Leuten verlangen kann, denn das ist ein frühes Teststadium. Ganz zu schweigen davon, dass ich nichts habe, was ich ihnen anbieten könnte, um den Deal zu versüßen. Was soll ich dir geben? Ein kostenloses Muster?

Aber für den Fall, dass einige von euch mithelfen wollen, indem sie einen Musselin anfertigen und mich wissen lassen, wie es gelaufen ist, habe ich hier das, was derzeit auf meinem Zeichenbrett liegt:

 - Ein Hosenblock für Männer, der besser sein soll als Theo(dore)
 - Ein Block für selvedge Jeans für Männer
 - Ein Kapuzenpulli mit Reißverschluss für Männer
 - Ein Wintermantel
 - Ein Unisex-Leggins-Muster

Sollte jemand von euch Lust haben, so etwas testweise zu machen, [lasst es mich wissen](/contact), das würde mir wirklich weiterhelfen. 

