---
date: 2024-04-01
edition: 2024q2
intro: Willkommen zur Frühlingsausgabe 2024 des FreeSewing-Newsletters.
title: 2024 Frühjahrsausgabe
---

Willkommen zur Frühlingsausgabe 2024 des FreeSewing-Newsletters.

Hier ist das, was wir heute für dich haben, kein Scherz:

- 👕 FreeSewing 3.2 bringt Tristan, Lumina, Lumira und mehr (3-Minuten-Lesung von joost)
- 📨 E-Mail ist wieder schwieriger geworden (1-minute read by joost)
- 🕸️ Aufbau des Vertrauensnetzes von FreeSewing nach dem XZ-Backdoor-Versuch (5-Minuten von joost)
- 🤔 Wie sich die Herausforderungen von FreeSewing im Laufe der Zeit verändert haben (2-Minuten-Lesung von joost)

Sollen wir loslegen?

&nbsp;

&nbsp;

## 👕 FreeSewing 3.2 bringt Tristan, Lumina, Lumira und mehr

Wir haben FreeSewing v3.2 im ersten Quartal 2024 veröffentlicht und es enthält 3 neue
Designs sowie eine Reihe von Fehlerbehebungen und Verbesserungen.

Werfen wir einen Blick auf die Highlights:

### The Tristan Top

Als erstes gibt es [das Tristan Top] (https\://freesewing.org/designs/tristan). Tristan ist ein Oberteil mit Prinzessnähten und (optionaler) Schnürung vorne oder/und hinten. Seine Entstehungsgeschichte ist die Notwendigkeit eines Kostüms für ein Renaissance-Festival, also ist das wahrscheinlich ein guter Indikator dafür, was dich erwartet.

Tristan wurde von Natalia entworfen, die auch [einen Blogbeitrag über das neue Tristan-Design geschrieben hat] (https\://freesewing.org/blog/our-newest-design-is-the-tristan-top), also ist das ein guter Ort, um alle Details über dieses neue Design zu erfahren.

### The Lumina and Lumira Leggings

Ich gebe dir eine Sekunde, um den Titel noch einmal zu überfliegen, aber ja, es gibt zwei verschiedene Leggings-Muster mit ähnlichen Namen: [die Lumira Leggings] (https\://freesewing.org/designs/lumira) und die [Lumina Leggings] (https\://freesewing.org/designs/lumina).

Ich empfehle dir, die Designernotizen für [Lumina] (https\://freesewing.org/designs/lumina#notes) und [Lumira] (https\://freesewing.org/designs/lumira#notes) zu lesen, um den Unterschied zwischen diesen Designs zu verstehen, zu verstehen, warum sie sich unterscheiden und zu wissen, was für dich am besten geeignet ist.

### Bug fixes and improvements

Regelmäßige Leserinnen und Leser des Newsletters wissen, dass wir auf
laufend Verbesserungen vornehmen, die nicht an eine neue Version gebunden sind,
aber es ist eine gute Gelegenheit, sie aufzulisten.

- Sandy hat eine neue Paneele
  Option, die
  von [Paula](https://github.com/freesewing/freesewing/pull/5861) hinzugefügt wurde. Du
  könntest deinen kreisförmigen Rock auch aus mehreren ähnlichen Mustern zusammenstellen, indem du
  selbst anpasst, aber das übernimmt jetzt das Muster für dich.
- Was als [Fehlerbericht für die Bizeps-Erleichterung auf
  Jaeger] (https\://github.com/freesewing/freesewing/issues/5999) begann, endete mit einer
  Änderung der Art und Weise, wie der Armumfang auf Brian berechnet wird, insbesondere die Tiefe
  des Armlochs. Da Brian unser grundlegendster Block ist, wird dies
  Auswirkungen auf viele andere Entwürfe haben.
- In [Carlton](https://freesewing.org/designs/carlton) - und damit auch in
  [Carlita](https://freesewing.org/designs/carlita) - haben wir
  korrigiert, wo die Nahtzugabe am Unterkragen falsch eingezeichnet war.
- In [Charlie](https://freesewing.org/designs/charlie) wurde bei der Gesäßtaschenleiste
  (4) und der Vordertaschenleiste (8) fälschlicherweise angegeben, dass 2 statt 4
  in der Schnittliste geschnitten werden. This too is resolved.
- In [Hugo](https://freesewing.org/designs/hugo) haben wir einen Fehler behoben, der dazu führte, dass
  das Design fehlerhaft war, wenn die vollständige Einstellung ausgeschaltet war, und wir haben ein Problem
  behoben, bei dem die Öffnung der Vordertasche mit zunehmendem Hüftumfang
  immer enger wurde.
- Wir haben eine neue
  [Path.combine()](https://freesewing.dev/reference/api/path/combine) Methode zu
  [unserer Kern-API](https://freesewing.dev/reference/api) hinzugefügt. Dabei ging es darum, wie Path.join() Lücken in den
  verbundenen Pfaden - die entweder durch "Verschiebe"-Operationen oder durch einen Unterschied zwischen
  dem End- und dem Startpunkt der verbundenen Pfade verursacht werden - mit einem Liniensegment
  ausgefüllt werden. Dieses Verhalten wird erwartet/beabsichtigt, aber wir haben
  `Path.combine()` hinzugefügt, um das andere Verhalten zu erleichtern: Das Kombinieren verschiedener Pfade
  zu einem einzigen Pfadobjekt, ohne dass sich die Zeichenoperationen ändern.
- Das [Titelmakro] (https\://freesewing.dev/reference/macros/title) kann jetzt
  mit einer `Noten`- und `Klassen.Noten`-Einstellung in seiner Konfiguration konfiguriert werden, was es
  Designern ermöglicht, Noten zu (dem Titel) eines Musterteils hinzuzufügen.
- Unser [i18n plugin](https://freesewing.dev/reference/plugins/i18n) unterstützt jetzt
  die Übersetzung von verschachtelten Arrays von Strings, was Designern
  mehr Flexibilität bei der Verkettung von übersetzten Teilen von Strings gibt.

Im [FreeSewing 3.2 Ankündigungs-Blogpost] (https\://freesewing.org/blog/v3-2-0) findest du alle Details.

&nbsp;

---

&nbsp;

## 📨 E-Mail ist gerade wieder schwieriger geworden

Wenn du dies in deinem Posteingang liest und nicht in einer archivierten Kopie auf
FreeSewing.org, dann konnten wir dir diese E-Mail zustellen, was eine gute
Nachricht ist.

Was du vielleicht nicht weißt, ist, dass dies nicht gerade trivial ist und schon seit Jahren nicht mehr
ist. Aber in letzter Zeit sind die Dinge noch komplexer geworden.  Gmail
(Google) und Yahoo zum Beispiel haben im ersten
Quartal von
2024 neue Beschränkungen eingeführt, die
zusätzliche Arbeit auf unserer Seite erfordern, um die Chancen zu maximieren, dass diese E-Mail
tatsächlich in deinem Posteingang landet.

Außerdem werden sogenannte _Massen-E-Mail-Versender_ den strengsten
Kontrollen unterzogen. Wenn du 5000 Nachrichten pro Tag versendest, giltst du als Massenversender und
wird besonders genau überprüft. Da dieser Newsletter rund 14.000
Abonnenten hat, müssen wir uns an die höchstmöglichen Standards halten.

Natürlich mag niemand Spam und ich spreche mich nicht gegen diese Regeln aus.
Es ist nur so, dass der Zeit- und Arbeitsaufwand, der erforderlich ist, um etwas so
scheinbar Triviales wie das Versenden einer E-Mail in großem Umfang zu realisieren, immer größer wird, da
das Internet sich zu einem de facto Pay-to-Play-Modell entwickelt.

Im Moment bemühe ich mich noch darum, und ich hoffe, sie haben ausgereicht
, um dies in deinen Posteingang zu bekommen. Aber es ist etwas, das wir vielleicht zu einem späteren Zeitpunkt
wieder aufgreifen müssen, wenn es unsere begrenzte Zeit und unsere Ressourcen zunehmend belastet.

&nbsp;

---

&nbsp;

## 🕸️ Aufbau des Vertrauensnetzes von FreeSewing nach dem XZ-Backdoor-Versuch (5-Minuten von joost)

Je nachdem, woher du deine Nachrichten beziehst, hast du vielleicht schon von
[dem Backdoor-Versuch des Komprimierungsprogramms xz
] (https\://arstechnica.com/security/2024/03/backdoor-found-in-widely-used-linux-utility-breaks-encrypted-ssh-connections/) gehört oder gelesen.

Kurz gesagt, ein böswilliger Akteur versuchte, eine Hintertür in dieses
Dienstprogramm einzuschleusen, was letztendlich ein Versuch war, einen Gated RCE-Exploit in
SSHd zu schmuggeln.

Oder, in [ELI5](https://en.wiktionary.org/wiki/ELI5) Worten: Jemand hat
Code zu einer kleinen Bibliothek beigetragen, die schändliche Absichten hatte. Dies geschah auf hinterhältige Art und Weise
und das eigentliche Ziel war nicht die Bibliothek selbst, sondern ein anderes Software
Projekt, das diese Bibliothek verwendet: Der Secure Shell Deamon. Ein _Daemon_ ist nur ein
cooleres Wort für einen _Dienst_ auf einem Computer, denn warum sollte man Dinge nicht cooler machen.
Dieser spezielle Daemon oder Dienst, der _secure shell_ Daemon, ist für die
Handhabung von Secure Shell (SSH) Verbindungen verantwortlich. Es ist der Goldstandard für die Fernverwaltung von Linux- (und Unix-) Systemen
.

Der Code schmuggelte eine RCE-Backdoor mit Gates ein. RCE steht für _remote code
execution_, was bedeutet, dass du aus der Ferne _etwas_ tun kannst, ohne dich zu authentifizieren
oder so. Oder anders ausgedrückt: Er ermöglicht es,
ein entferntes Computersystem zu kontrollieren, auf das man normalerweise keinen Zugriff haben sollte.
Die Tatsache, dass er _gated_ ist, bedeutet, dass der Autor von
Maßnahmen ergriffen hat, um sicherzustellen, dass nur er den bösartigen
Code verwenden kann. Wie eine Hintertür mit einem Schlüssel.

Es ist kaum zu überschätzen, wie schwerwiegend dieser Versuch ist, praktisch jedes Linux-System auf dem Planeten
zurückzudrängen.  Es ist nicht nur das weltweit am weitesten verbreitete
Betriebssystem, auch bei den Server-Betriebssystemen ist seine Dominanz überwältigend.
Oder wie ich oft sage: _Alles, was wichtig ist, läuft auf Linux_.

Dies ist eine fortlaufende Geschichte, und ich hoffe, dass daraus eine Netflix
Miniserie mit David Cross in der Rolle des [Andres
Freund] (https\://github.com/anarazel) wird, aber ich schweife ab. Dies ist der FreeSewing
Newsletter, also wollte ich etwas aus dieser Geschichte herausgreifen, von dem ich denke, dass
für FreeSewing, oder wirklich für jedes Open-Source-Projekt da draußen, relevant ist.

### Maintainer Burnout und der lange Weg, Vertrauen zu gewinnen

Eines der faszinierenden Elemente dieser Geschichte ist, _wer_ die Änderungen beigesteuert hat,
und warum sie akzeptiert wurden, ohne dass die böswilligen
Absichten des Beitrags aufgedeckt wurden.

Weil der Benutzer, der sie gemacht hat, seit **years** zum Projekt
beigetragen hat und aufgrund dieser Arbeit einen Status erreicht hat, bei dem es eine Menge
implizites Vertrauen aufgrund seiner Arbeit gab, obwohl er so gut wie nichts über
weiß, wer oder was sich hinter dem Benutzernamen `JiaT75` (in diesem Fall) verbirgt. Solch ein _langer Betrug_ ist
eine erhebliche Investition von Zeit und Mühe, daher ist die derzeitige Annahme
, dass es sich um einen nationalstaatlichen Akteur handelte (man denke an die NSA oder das Äquivalent in einem anderen Land
).  Es ist auch wichtig zu erwähnen, dass der xy-Maintainer
mit den vielen Aufgaben, die mit der Wartung der Software
verbunden sind, nicht zurechtkam und aktiv nach Hilfe suchte, um ein Burnout zu vermeiden.  Dieses
Szenario ist bei Open-Source-Projekten erschreckend häufig anzutreffen und schafft eine
Situation, in der böswillige Akteure nur allzu leicht einen Vorteil aus erschöpften
Maintainern ziehen können, die verzweifelt versuchen, einen Teil der Arbeit loszuwerden.

### Ein Netz des Vertrauens aufbauen

Das Problem, wem man vertrauen kann, ist natürlich nicht neu. Eine Möglichkeit, dem entgegenzuwirken
, ist der Aufbau eines _Vertrauensnetzes_.  So wird es in größeren
Open-Source-Softwareprojekten gemacht, an denen viele Freiwillige beteiligt sind, wie z.B.

In der Praxis beruht ein solches Vertrauensnetz auf Beziehungen zwischen
Menschen, die die wahre Identität des anderen kennen und überprüft haben.  Zum Beispiel
gibt es eine Reihe von Leuten in der FreeSewing-Community, die ich im echten
Leben getroffen habe. Wir sind uns nicht nur von Angesicht zu Angesicht begegnet, sondern haben Zeit miteinander verbracht, wir wissen
wo wir wohnen, wir kennen die Partner oder die Familie des anderen oder haben eine andere
greifbare Möglichkeit, die ein hohes Maß an Sicherheit bietet, dass diese Person wirklich
ist, wer sie zu sein behauptet.

Diese Menschen wiederum können ähnliche Verbindungen zu anderen Menschen haben, die sie kennen,
kennengelernt haben und denen sie vertrauen, und zwar auf einer Ebene, die weit über die Online-Welt hinausgeht.  Diese
schafft ein Netz des Vertrauens, in dem du deinen Freunden vertrauen kannst, und die Freunde von
deinen Freunden und so weiter.

In Anbetracht der aktuellen Ereignisse und in Anerkennung der rasanten Beschleunigung von
was mit generativer künstlicher Intelligenz möglich ist, wird FreeSewing
von nun an alle Schreibzugriffe oder erhöhten Privilegien auf Mitglieder der Community
beschränken, die Teil des Vertrauensnetzes von FreeSewing sind.

Natürlich werden wir auch weiterhin Beiträge von
annehmen - oder besser gesagt, überprüfen -. Aber Berechtigungen, die das Potenzial haben, Schaden anzurichten, werden auf
auf Personen beschränkt, zu denen Vertrauen aufgebaut wurde AFK (away from
keyboard).

Um den Aufbau eines solchen Vertrauensnetzes zu erleichtern, werden wir damit beginnen,
diese Verbindungen zwischen Menschen zu dokumentieren.  So können Menschen, die
mehr Verantwortung innerhalb von FreeSewing übernehmen möchten, das Vertrauensnetz einsehen und
sehen, wer in ihrer Nähe wohnt, damit sie sich über
in unser Vertrauensnetz einklinken können.

Mir ist klar, dass es extrem unwahrscheinlich ist, dass FreeSewing das Ziel eines Hintertürchenversuchs
eines nationalen Akteurs sein wird, aber es ist trotzdem eine gute Idee, die besten Praktiken zu übernehmen und
transparent zu machen, wie wir vorgehen.

Ich werde also in den nächsten Wochen damit beginnen, dieses Netz des Vertrauens aufzubauen und zu dokumentieren
und alle Zugriffskontrollen und Berechtigungen zu überprüfen, um sicherzustellen, dass wir
alles tun, was wir können, um zu verhindern, dass selbst die engagiertesten Akteure
den Brunnen vergiften.

&nbsp;

---

&nbsp;

## 🤔 Wie sich die Herausforderungen von FreeSewing im Laufe der Zeit verändert haben

Wusstest du, dass FreeSewing v1 vor 7 Jahren und 7 Tagen
&#x20;veröffentlicht wurde?  Seitdem haben wir
viele große und kleine Änderungen vorgenommen, und unsere Kernbibliothek und unser Plugin-System
sind zu einer zuverlässigen - und sicherlich meinungsstarken - Möglichkeit gereift, parametrische
Nähmuster zu entwerfen.

Die Herausforderungen, die aus technischer Sicht am interessantesten sind, wurden
mehr oder weniger gelöst. Was übrig bleibt, ist die Benutzeroberfläche, oder
das Benutzererlebnis (UX), wie wir es gerne nennen.

FreeSewing kann eine Menge, aber wie kann man all diese Funktionen für die Nutzer von
verfügbar machen, ohne sie zu überfordern? Ist das überhaupt auf dem Handy möglich, das heute die
dominierende Art ist, online zu gehen? Wie schaffst du es, dass es ein intuitives Erlebnis wird,
oder dass jemand, der nach einer Google-Suche nach _freien Nähmustern_
auf FreeSewing.org landet, in den wenigen
Sekunden versteht, was FreeSewing ist und tut, bevor er zum nächsten
Link in seinen Suchergebnissen weitergeht?

Um es klar zu sagen: Ich kenne die Antwort auf diese Fragen nicht. Aber es ist
zunehmend, womit wir unsere Zeit verbringen. Der Prozentsatz der Menschen da draußen, die unsere Software
direkt nutzen, ist unbedeutend im Vergleich zu der Anzahl der Menschen, die
(nur) über unsere Website konsumieren. Für die meisten Besucher ist FreeSewing
**is** eine Website und wenn es etwas anderes ist, ist das für sie wahrscheinlich nicht klar,
oder sogar relevant.

Natürlich gibt es Raum für Verbesserungen, aber oft gibt es keinen eindeutigen Weg
nach vorne. Vielleicht - oder sollte ich sagen fast sicher - ist dies ein Bereich, in dem ich
nicht das Talent oder die Fähigkeit habe, eine große, übergreifende
Strategie zu entwickeln. Aber ich ertappe mich dabei, wie ich viele meiner eigenen Ideen oder Impulse
in diesem Bereich in Frage stelle.

Deshalb habe ich mich gefragt, ob wir ein kleines Experiment machen können. Ein Experiment, bei dem ich
dir - meinem lieben Leser - eine einfache Frage stelle. Bist du bereit dafür? Hier
ist die Frage:

> **Was ist FreeSewing?**

Ich würde gerne deine Antwort hören. Du kannst einfach auf "Antworten" klicken, um mir Bescheid zu geben.

<small>_PS: Ich habe diese Frage am Ende vergraben, weil ich denke, dass ich deine Gedanken hören möchte, wenn du dir alles durchliest, was auf
steht.</small>
