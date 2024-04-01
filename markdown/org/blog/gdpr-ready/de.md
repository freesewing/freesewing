---
author: 1
caption: "Die wichtigste Änderung ist natürlich, dass wir von Lila zu Schwarz als unsere Signaturfarbe gewechselt haben."
date: "2018-05-24"
intro: "Willkommen auf unserer neuen Website. Es ist GDPR-konform, spricht 3 Sprachen und riecht nach nasser Farbe"
title: "Willkommen auf unserer neuen Website. Es ist GDPR-konform, spricht 3 Sprachen und riecht nach nasser Farbe"
---


Morgen, am 25. Mai, tritt die Allgemeine Datenschutzverordnung (GDPR) der Europäischen Union (EU) in Kraft. Von diesem Tag an müssen Unternehmen, die die Privatsphäre von EU-Bürgerinnen und -Bürgern nicht respektieren, mit Geldstrafen von bis zu 4 % ihres weltweiten Jahresumsatzes rechnen.

Das Datum markiert einen Wendepunkt für die Online-Privatsphäre, da die strengsten Datenschutzgesetze der Welt plötzlich für eine halbe Milliarde Menschen gelten.

## Deine Zustimmung ist jetzt erforderlich

Für Freesewing stellt die Einführung der DSGVO an sich kein Problem dar. Wir hatten nicht nur einen soliden Plan, sondern das Einzige, was wir unbedingt noch hinzufügen mussten, war *Zustimmung*. Wir dürfen deine Daten nicht mehr ohne deine Zustimmung verarbeiten. Eine Erlaubnis, um die wir ausdrücklich und detailliert bitten sollten.

Wir haben also zwei Arten von Fragen, die wir dir stellen müssen:

 - Gibst du deine Einwilligung zur Verarbeitung deiner Profildaten?
 - Gibst du deine Einwilligung zur Verarbeitung deiner Modelldaten?

Wir machen diese Unterscheidung, weil es sich um unterschiedliche Dinge handelt. Ein Profil/Account ist erforderlich, um sich auf der Website anzumelden, Kommentare zu schreiben usw.  
Die Modelldaten werden benötigt, um maßgeschneiderte Nähmuster zu erstellen.

Du wirst mit diesen Fragen begrüßt, wenn sie relevant sind (d.h. wenn wir auf diese spezifischen Daten zugreifen müssen), und du kannst sie jederzeit wieder aufrufen [in deinen Kontoeinstellungen](/account).

## Es ist unsere Pflicht, dich zu informieren

Nach der DSGVO müssen wir dich darüber informieren, wie wir mit Datenschutzfragen umgehen. Wir haben schon einmal über [unseren Ansatz zum Schutz der Privatsphäre](/blog/privacy-choices) geschrieben, aber das erfordert etwas (ein bisschen) mehr Formalität.

Deshalb haben wir einen [Datenschutzhinweis](/privacy) verfasst, in dem all diese Dinge beschrieben sind.

Zusätzlich zu unseren Datenschutzhinweisen haben wir unter [eine Seite eingerichtet, die alle deine Rechte auflistet](/rights), und erklärt, wie du sie ausüben kannst.

Mit diesen Änderungen haben wir dein Recht, informiert zu werden, abgedeckt.

## Datenschutz durch Design

Eine der vagen, aber wirkungsvollen Anforderungen der DSGVO ist die sogenannte *privacy-by-design*. Wir haben uns den Rat zu Herzen genommen und zwei Änderungen vorgenommen, die sich daran orientieren:

 - Verschlüsselung von Daten im Ruhezustand
 - Beendigung nachrichtenloser Konten

Wir verschlüsseln jetzt deine Profildaten im Ruhezustand. Mit anderen Worten: Unsere Datenbank enthält deine Daten, aber sie sind verschlüsselt. Wir entschlüsseln sie nur, wenn wir sie brauchen.

Wir kündigen auch Konten, die seit 12 Monaten inaktiv sind. Mit anderen Worten: Wenn du dich 1 Jahr lang nicht auf der Website anmeldest, werden dein Konto und alle deine Daten gelöscht.

Für den letzten Punkt wird es jedoch eine kleine Schonfrist geben, da wir noch nicht alle erforderlichen Änderungen umgesetzt haben. Das bringt mich zu meinem nächsten Punkt:

## Auch neu: alles andere

Die Änderungen im Zusammenhang mit der DSGVO waren eine gute Gelegenheit, einige unserer Entscheidungen zu überprüfen und zu sehen, ob es noch Raum für Verbesserungen gibt. Das war jedenfalls die ursprüngliche Idee. Am Ende haben wir die Website von Grund auf neu geschrieben.

Unsere vorherige Website nutzte [Jekyll](https://jekyllrb.com/) als statischen Website-Generator, mit einem Haufen Javascript-Code, um die dynamischen Elemente auf der Website hinzuzufügen. Das hat zwar geklappt, aber es gab auch zwei wichtige Nachteile:

 - Jekyll verwendet die Programmiersprache Ruby. Das ist eine weitere Programmiersprache, ein weiterer Paketmanager und ein weiteres Ökosystem, mit dem sich potenzielle Mitwirkende erst einmal vertraut machen müssen. Das wollten wir vermeiden.
 - Der *Stapel* von JavaScript-Code war ziemlich wörtlich zu nehmen. Die Wartbarkeit wurde zu einem Problem, ganz zu schweigen davon, dass es für neue Entwickler/innen schwierig sein würde, sich einzuarbeiten und zu verstehen, was vor sich geht.

Um also zwei Fliegen mit einer Klappe zu schlagen, haben wir die gesamte Seite mit [Vue.js](https://vuejs.org/) und [Nuxt](https://nuxtjs.org/)neu geschrieben. Unser gesamtes Frontend ist jetzt in JavaScript geschrieben - kein Ruby mehr erforderlich - und dank der modularen Natur und des komponentenbasierten Ansatzes von Vue, sollte es viel einfacher zu warten sein.

## Internationalisierung, auch bekannt als i18n

Bei der Überarbeitung haben wir natürlich auch ein paar neue Funktionen eingebaut. Die offensichtlichste ist, dass wir jetzt i18n (Internationalisierung) vollständig unterstützen.

Die Übersetzung ist ein fortlaufendes Unterfangen, aber wir haben alles vorbereitet, um sie zu unterstützen. Ab heute ist freesewing nicht mehr nur auf Englisch verfügbar, sondern auch auf Niederländisch und Spanisch.

Ich möchte mich bei [@AnnekeCaramin](/users/annekecaramin) und [@AlfaLyr](/users/alfalyr), unseren Sprachkoordinatoren für Niederländisch bzw. Spanisch, aber auch bei allen anderen Leuten bedanken, die beim Übersetzen geholfen haben.

Eine Übersicht über den Status der verschiedenen Sprachen gibt es [hier](/i18n), und ich hoffe, dass wir bald weitere Sprachen aktivieren können.

## Vorsicht vor der nassen Farbe

Diese Veröffentlichung ist wohl ein bisschen verfrüht. Wir haben immer noch [ein paar offene Probleme zu beheben](https://github.com/freesewing/site/issues), und wir vermissen einen Haufen Dokumentation.

Da unsere Frist jedoch von außen auferlegt wird, haben wir nicht wirklich eine Wahl. Das heißt, wenn wir die GDPR vollständig einhalten wollen, und das tun wir.

Bitte habe also Geduld mit uns, während wir diese Website und unsere Plattform weiter ausbauen. Und zögere nicht, uns Bescheid zu sagen, wenn etwas schief läuft.

