---
date: "01.10.2022"
edition: "2022q4"
intro: "2022 Herbstausgabe"
title: "2022 Herbstausgabe"
---

Willkommen zur Herbstausgabe 2022 des FreeSewing-Newsletters. Hier ist, was heute für dich drin ist:

- 🏁 FreeSewing 2.22 ist da und wird die endgültige Version v2 sein (1 Minute lesen - von Joost)
- 🔱 FreeSewing Version 3; Was ist es und wann kannst du es erwarten? (3-Minuten-Lesung - von Joost)
- 🚀 Wir haben den Meilenstein von 50.000 Commits überschritten (1 Minute lesen - von Joost)
- ⛵ FreeSewing im Serendiep in Rotterdam (1 Minute lesen - von Lexander)
- 🕵️ Hinter den Nähten: Henoch (4-minütige Lesung - von Karen & Enoch)

Lass uns gleich loslegen!

&nbsp;

&nbsp;

## 🏁 FreeSewing 2.22 ist erschienen und wird die endgültige v2-Version sein

FreeSewing 2.22 kam Ende August mit einem neuen Plüschdesign von Wouter heraus, der auch für Hi the shark unterschrieben hat.  Diesmal ist es [Octoplushy](https://freesewing.org/designs/octoplushy/) , der, du hast es erraten , ein Oktopus ist.

Weniger schön, aber vielleicht auch nicht so wichtig ist, dass dies das letzte Minor Release von unter Version 2 sein wird.  Richtig, Version 3 von FreeSewing kommt, und während wir Version 2 weiterhin unterstützen - ganz zu schweigen davon, dass sie immer noch FreeSewing.org antreibt - liegt unser Fokus jetzt ganz auf der nächsten großen Version: FreeSewing v3.

&nbsp;

---

&nbsp;

## 🔱 FreeSewing Version 3; Was ist es und wann kannst du es erwarten?

Seit etwas mehr als einem Monat haben wir die Code-Basis von Version 2 in den Langzeitspeicher gelegt und mit der Arbeit an Version 3 begonnen. Und obwohl es noch eine Weile dauern wird, bis diese Version in Produktion geht - was für uns FreeSewing.org bedeutet - möchte ich dir einen kurzen Überblick über einige der Dinge geben, die mit FreeSewing Version 3 passieren und auf die ich persönlich am meisten gespannt bin.

### Konfiguration auf Teilebene, auch Pack-Unterstützung genannt

Auf [unserer Roadmap](https://github.com/freesewing/freesewing/discussions/1278) - die, wenn du aufgepasst hast, immer mehr Dinge unter der Überschrift *bereits umgesetzt* hat - hatten wir die sogenannte Unterstützung für *Pakete*. Die Idee war, dass wir es gerne möglich machen würden, Designs zu erstellen, indem wir verschiedene Komponenten frei kombinieren. Du könntest z.B. die Ärmel aus einem *Ärmelpaket* und den Kragen aus einem *Kragenpaket*nehmen, ein paar Taschen aus einem *Kragenpaket* hinzufügen und so weiter.

Es ist eines dieser Dinge, die viel Sinn machen, aber die Frage aufwerfen: Wie wird das alles unter der Haube funktionieren? In der Version 2 von FreeSewing wäre die Umsetzung dieser Ideen nicht trivial gewesen, denn obwohl wir die Erweiterung von Mustern in andere Designs unterstützen, ist der Prozess zu umständlich für diese Art von Ad-hoc-Zusammenstellung verschiedener Designs.

Das ist etwas, das wir in Version 3 angehen wollten, und deshalb haben wir die gesamte Konfiguration auf die Teilebene verlagert. Für ein Ärmelteil werden zum Beispiel eigene Optionen definiert und die benötigten Maße aufgelistet usw. Du kannst jetzt einfach das Ärmelteil aus dem Entwurf herausziehen (oder in Zukunft ein Ärmelpaket) und es in deinem eigenen Entwurf verwenden, ohne dich um Maße, Optionen usw. kümmern zu müssen.

Das ist die grundlegendste Änderung in V3, aber sie wird in Zukunft die Tür zu vielen kreativen Kombinationen von verschiedenen Designs öffnen.

### Unterstützung für mehrere Sets von Einstellungen, oder wie wir sie nennen: Multisets

Die Muster werden letztendlich für die Benutzer entworfen, indem ihnen ein Bündel von *Einstellungen*übergeben wird. Die Maße, die du verwenden sollst, wie du die Optionen am liebsten hättest und so weiter.

In FreeSewing Version 3 kannst du weiterhin mehrere Sätze dieser Einstellungen an das Muster übergeben. Es gibt eine Reihe von interessanten Anwendungen. Wenn du zum Beispiel mit einem asymmetrischen Körper arbeitest, kannst du zwei verschiedene Sätze von Maßen eingeben und sagen: "*gib mir diese und jene Teile mit diesen Maßen, und die anderen Teile mit diesen Maßen*".

Wir verwenden diese neue Funktion auch unter der Haube, um zu steuern, wie wir *Muster* . Das heißt, wir vergleichen verschiedene Iterationen eines Musters miteinander. Früher wurde das auf eine etwas unbeholfene Art und Weise oben aufgeschraubt. Aber in Version 3 ist es so einfach wie das Zusammenstellen einer Liste von verschiedenen Einstellungssätzen (da man schnell müde wird, *Einstellungssätze* zu tippen/zu sagen, bezeichnen wir sie als *multisets*) und dann können wir *sie einfach* dem Muster übergeben und es *funktioniert einfach*.

### Stack Unterstützung

Eng verbunden mit der Unterstützung von Multisets ist die Unterstützung von Stapeln in der Layout-Phase. Stapel sind ein bisschen wie *Schichten*. Normalerweise ist beim Layouten jedes Teil ein eigenes Ding und wir legen es einzeln aus. Jetzt kannst du sagen, dass verschiedene Teile Teil desselben *Stapels* sind und sie im Layout wie Ebenen übereinander gestapelt werden würden.

Das ist wieder etwas, das wir intern für einige unserer Sampling-/Vergleichsarbeiten nutzen, aber es eröffnet auch interessante Möglichkeiten und ich bin gespannt, wie die Leute diese Funktionen letztendlich nutzen werden.

### Und so viel mehr

In Version 3 hat sich wirklich viel getan, mit großen und kleinen Verbesserungen und Tweaks. Aber das sind nur einige der grundlegenden Veränderungen. Wir arbeiten auch noch daran. Wenn du also eine tolle Idee hast, ist [unsere Roadmap](https://github.com/freesewing/freesewing/discussions/1278) der formellere Weg, sie vorzuschlagen. Für ein informelles Gespräch besuche [den FreeSewing Discord](https://discord.freesewing.org/) , wo wir uns treffen und unsere Arbeit koordinieren.

### Wann kannst du mit Version 3 rechnen?

Die kurze Antwort auf die Frage, wann du mit Version 3 rechnen kannst, ist *irgendwann im Jahr 2023*. Wenn dir das lang vorkommt, liegt das daran, dass wir die Dinge wirklich von Grund auf überarbeiten. Die oben beschriebenen Änderungen sind wirklich grundlegende Änderungen, die sich durch die gesamte Maschinerie ziehen müssen, die auf diesen Grundlagen aufbaut, bevor alles zu etwas zusammengefügt werden kann, das auf FreeSewing.org veröffentlicht werden kann.

Und wir wollen auch sicherstellen, dass wir es richtig machen. Wir werden also weitermachen und es veröffentlichen, wenn es fertig ist.

&nbsp;

---

&nbsp;

## 🚀 Wir haben den Meilenstein von 50.000 Commits überschritten

Vor ein paar Tagen haben wir die Schwelle von 50.000 Commits [auf unserer Monorepo](https://github.com/freesewing/freesewing)überschritten.

Zahlen an sich sind nicht wirklich aussagekräftig, ganz zu schweigen davon, dass du das System immer austricksen kannst. Ich will damit nicht andeuten, dass dieser Meilenstein an sich eine besondere Bedeutung hat. Aber ich finde, in einer Zeit, in der die meiste Arbeit (an v3) hinter den Kulissen stattfindet, ist es eine gute Erinnerung daran, dass FreeSewing ein bisschen wie ein Schwan ist. Er gleitet scheinbar mühelos und in gleichmäßigem Tempo vorwärts, aber unter der Oberfläche wird hektisch in die Pedale getreten.

&nbsp;

---

&nbsp;

## ⛵ FreeSewing im Serendiep in Rotterdam (1 Minute lesen - von Lexander)

FreeSewing wurde zu einer Ausstellung eingeladen, die von Serendiep veranstaltet wurde, einem Schiff, das Kunst und Wissenschaft beherbergt, mit einem Theaterraum und Maschinen im Inneren. Die einwöchige Ausstellung war Teil eines größeren Ganzen: Die Stadt Rotterdam feiert den 150. Geburtstag eines ihrer Kanäle.

Der Workshop begann damit, dass ich, Lexander, FreeSewing vorstellte und das Konzept erläuterte, und wir verbrachten den Abend damit, ein ärmelloses Teagan als Schlafshirt zu nähen. Wir waren mit einer Gruppe von ein paar Leuten unterwegs und haben den ganzen FreeSewing-Prozess gemacht: die Maße nehmen, das Papiermuster zusammensetzen, die Stoffteile zuschneiden und zusammennähen.

Die Teagan hat gut gepasst und insgesamt war es eine wirklich lustige Erfahrung! Ich freue mich auf das, was die Zukunft bringen wird.

&nbsp;

---

&nbsp;

## 🕵️ Hinter den Nähten: Henoch

Einer unserer Contributor Call Hosts hat sich (virtuell) mit Enoch zusammengesetzt, um mehr über ihren Hintergrund und ihren Weg zum FreeSewing Contributor zu erfahren! Das folgende Interview wurde der Länge nach bearbeitet, und eventuelle Fehler, Versehen usw. sind ausschließlich die Schuld des Interviewers.

### Wie hast du von FreeSewing erfahren?

Ich habe in der Grundschule nähen gelernt, aber seitdem nicht mehr viel genäht, bis die Pandemie kam. Im März 2020, kurz vor der Schließung, beendete ich ein langjähriges Projekt, so dass ich, wie viele andere auch, etwas Freizeit hatte. Kurz zuvor hatte ich endlich eine Diagnose erhalten, die meinen jahrzehntelangen Kampf mit der Erschöpfung erklärte (ausgerechnet das Restless-Legs-Syndrom), und die medikamentöse Behandlung bedeutete, dass ich zum ersten Mal überhaupt genug Energie hatte, um Interessen und Hobbys nachzugehen.

Also habe ich meine alte Nähmaschine entstaubt und angefangen, herumzuspielen. Irgendwann wollte ich ein Stück nähen, für das ich kein Schnittmuster finden konnte, also habe ich genug gelernt, um etwas zu entwerfen, um es zu realisieren. Da ich ein Programmierer bin und mich für Open Source interessiere, wollte ich es automatisieren, nachdem ich es für mich selbst auf Papier gemacht hatte, und es so vielen Menschen wie möglich zugänglich machen. Ich beschloss, dass ich ein parametrisches Muster brauchte, und probierte ein paar verschiedene Dinge aus, bevor ich FreeSewing fand.

### Wie bist du ein Mitarbeiter geworden?

Als ich anfing, Muster in FreeSewing zu entwickeln, dachte ich: "Es wäre cool, wenn es das gäbe. Es wäre cool, wenn es das gäbe." Beim Entwerfen wollte ich zum Beispiel Strichzeichnungen erstellen können, um zu sehen, wie sich verschiedene Einstellungen und Maße auf das fertige Kleidungsstück auswirken würden, und dann wollte ich meine Stoffe einlegen können, um zu sehen, wie sie auf den Entwürfen aussehen würden. Das Hinzufügen der von mir gewünschten benutzerdefinierten Optionstypen war nicht ganz einfach, also habe ich als erstes versucht, den Austausch kleiner Teile der Werkbank zu erleichtern. Bei meinen ersten PRs sind einige Sachen kaputt gegangen, also habe ich mich mehr damit beschäftigt, hinter mir aufzuräumen. Und dann habe ich mich wirklich darauf eingelassen.

Ich habe schon früher in geringem Umfang an Open-Source-Software gearbeitet und war der einzige Entwickler einer Software, die technisch gesehen quelloffen war, aber dies ist das erste Mal, dass ich Teil der Community einer Open-Source-Software bin, und das finde ich wirklich lohnend. All diese Leute, die sich auf all diese verschiedenen Bereiche konzentrieren, um es gut zu machen, und die im Grunde ständig miteinander kommunizieren, sind super cool. Das menschliche Element ist wirklich wichtig, und bei FreeSewing geht es um das menschliche Element auf allen Ebenen. Es treibt mich an, meinen Beitrag auf einem höheren und beständigeren Niveau zu leisten. Und ich denke, Joost verdient eine Menge Anerkennung dafür, dass er dieses riesige Ding geschrieben hat und es trotzdem geschafft hat, diese Gemeinschaft zu fördern, um es aufzubauen und zu verbessern.

### Was war dein bisheriger Beitrag?

Ich habe ein paar kleinere Sachen gemacht, aber es gibt zwei große Sachen, an denen ich gearbeitet habe, und eine ist noch in Arbeit!

Die erste ist die Einrichtung von Gitpod. Mit Gitpod kannst du deine Entwicklung im Browser durchführen, so dass du die Abhängigkeiten nicht lokal verwalten musst. Das ist besonders nützlich für Windows-Entwickler, da unsere Umgebung nicht sehr Windows-freundlich ist und offiziell nicht unterstützt wird. Außerdem habe ich vor kurzem einige Updates für die Umgebung eingereicht, um Windows-Nutzern, die lieber lokal entwickeln, die Arbeit zu erleichtern.

Das zweite ist ein Update für das Drucklayout-Tool für das Labor. Ich habe die Funktion zum Verschieben und Drehen überarbeitet, damit es reibungsloser funktioniert und wir jetzt neben der freien Drehung auch eine gefangene Drehung haben. Außerdem habe ich unser System für den PDF-Export überarbeitet, damit es beim Export so aussieht, wie du es erwartest, je nachdem, wie du es angelegt hast. Wir haben jetzt viel mehr Kontrolle über die Kacheln, und Joost muss keinen C-Code mehr pflegen.

Noch in Arbeit ist das Tool für den Zuschnitt, mit dem du eine Stoffbreite angeben und alle Teile auslegen kannst (und wenn du zwei zuschneiden sollst, gibt es dir zwei davon), damit du herausfinden kannst, wie viel Stoff dein Muster braucht.

### Bist du eine Näherin? Ein Programmierer? Beides? Weder noch?

Beides! Aber ich habe definitiv mehr programmiert. Das ist mein Job, also mache ich ihn seit zehn Jahren fast jeden Tag.

### Wann und warum hast du mit dem Nähen angefangen?

Ich habe schon früh mit dem Nähen angefangen - in der Grundschule habe ich Nähkurse besucht und mein Vater hat mir eine Nähmaschine gekauft, weil ich ihm versprochen habe, alle seine Hosen zu säumen (was ich nie getan habe). Danach habe ich, abgesehen von ein oder zwei Semestern Kostümdesign im College, bis vor kurzem kaum noch genäht. Ich habe aber gelernt, eine Industriemaschine zu bedienen!

### Woran arbeitest du gerade?

In letzter Zeit war ich etwas langsam, aber ich habe immer Ideen - ich habe einen ganzen Stapel von Dingen, die ich für meinen Partner machen will, und ich mache auch Holzarbeiten und restauriere einen Stahltankwagen-Schreibtisch und einige Beistelltische aus Palisanderholz aus der Mitte des Jahrhunderts, und ich arbeite an einem Entwurf für den Hinter- und Vorgarten meines Hauses. Ich habe während der Pandemie viel über 3D-Modellierung gelernt, und jetzt ist es (im Süden der USA) kühl genug, um im Garten zu arbeiten.

### Welches Projekt hast du gerade beendet?

Ich habe gerade eine Tunika für meinen Partner fertiggestellt und den Anzug entworfen, den ich zur Hochzeit meiner Schwester getragen habe. Ich habe den Entwurf an einen Schneider weitergegeben, aber als der Anzug geliefert wurde, waren die Ärmel auf die verwirrendste Art und Weise befestigt und ich musste sie schließlich selbst anbringen. Es ist wunderschön geworden, obwohl ich mit den Ärmeln immer noch unzufrieden bin.

### Was liebst du am meisten am Nähen?

Ich mag es, dass Nähen die Welt öffnet. Du kannst verwirklichen oder reparieren oder anpassen, was immer du willst, und mit Nähen kannst du eine perfekte Passform erreichen (oder es zumindest versuchen…), was auch immer das für dich bedeutet.  Ich bin eine sehr ästhetisch orientierte Person, die von sehr ästhetisch orientierten Menschen erzogen wurde, und ich glaube an die transformative Kraft von Kleidung, deshalb ist es toll, wenn man diese Kontrolle selbst in die Hand nehmen kann. Außerdem liebe ich jede Fähigkeit, und Nähen ist wirklich eine ganze Kategorie von Fähigkeiten, die es dir ermöglicht, dir etwas vorzustellen und zu sagen: "Ja, das können wir machen."

### Was hasst du am meisten am Nähen?

Nähte auftrennen - das muss ich ganz oft machen. Und manchmal habe ich das Gefühl, dass es zu viele Schritte gibt, um die Dinge zu machen, die ich gerne machen würde.

Ich glaube, in Wirklichkeit macht mir das Nähen nicht oft Spaß. Einerseits bin ich sehr ehrgeizig, andererseits bin ich sehr risikoscheu und ein absoluter Perfektionist, so dass ich etwa 3 Musselin-Nähte machen muss, bevor ich eine endgültige Version von etwas habe. Aber dann lasse ich mich ablenken, was zu vielen Prototypen führt, die ich einfach nur trage, obwohl sie eher ein Proof of Concept sind als ein echtes Kleidungsstück. Das extremste Beispiel stammt aus der Zeit, als ich ein Teenager war: Ich habe damit experimentiert, meine eigenen Brustbinden zu machen, und die erste, die ich gemacht habe und die ich wahrscheinlich zwei Jahre lang getragen habe, wurde mit Bändern und Sicherheitsnadeln zusammengehalten. Irgendwann brauchte ich ein neues, das ich dann auch genäht habe, aber in den ersten zwei Jahren sieht man auf jedem Bild die Umrisse von Sicherheitsnadeln durch mein Hemd.

### Was wäre dein Rat für Nähanfänger?

Fang mit etwas an, das dich interessiert. Vielen Leuten wird beigebracht, mit Mustertüchern, Reißverschlussbeuteln usw. anzufangen, und das funktioniert, wenn es dich interessiert, die Grundlagen zu entwickeln. Aber wenn du etwas Ehrgeiziges in Angriff nehmen willst, kaufe dir einen billigen Stoff und leg los! Es wird nicht annähernd so schlimm sein, wie du denkst, und es gibt immer mehr Stoff.

### Nähst du hauptsächlich für dich selbst oder für andere wie Freunde und Familie?

Meistens nähe ich für andere Leute, aber manchmal mache ich auch selbst etwas, weil es einfacher ist, ein Kleidungsstück zu nähen, als es zu suchen. Ich schätze, ich bin ein "Mach es, wenn ich glaube, dass es auf der Welt nicht existiert"-Näher, aber ich kaufe ein T-Shirt, obwohl ich eins nähen könnte. Oder einmal habe ich am Tag vor einer Reise eine Hose genäht, weil ich nicht genug Hosen hatte und einkaufen zu gehen mir unbequemer vorkam.

### Was machst du, wenn du nicht gerade Kleidung nähst oder Schnittmuster entwirfst?

Ich mache immer irgendetwas - Holzbearbeitung, Design, ich programmiere gelegentlich andere Dinge, ich spüle ständig Geschirr… Ich mag Puzzles und habe endlich ein 1500-Teile-Puzzle fertiggestellt, das ich immer wieder monatelang unterbrochen habe. Ich habe eine kleine kostenlose Puzzlesammlung für die fertigen Puzzles angelegt, aber es kommt nie jemand und nimmt sich irgendwelche Puzzles von mir.

### Hast du Haustiere? Familie?

Ich ziehe Menschen den Tieren vor und lebe mit meinem Partner in einem schönen, haustierfreien Haus. Mein Partner und ich teilen die Philosophie "die Lieben meiner Lieben sind meine Lieben", die es uns erlaubt, wirklich liebevoll und weitreichend über Familie nachzudenken. Ich habe auch das Glück, als Erwachsener eine gute Beziehung zu meiner Herkunftsfamilie zu haben, auch wenn ich zurzeit nicht in ihrer Nähe wohne.

### Wenn es eine Person gäbe, die du mit auf eine unbewohnte Insel nehmen könntest, wer wäre das? Und warum?
Ehrlich gesagt ist mein Partner die Person - wir leben seit fast 5 Jahren zusammen und die ständige Nähe während der Pandemie hat uns wirklich näher zusammengebracht (und uns gelehrt, bessere Grenzen zu setzen!), also bin ich zuversichtlich, dass wir auch auf einer einsamen Insel zurechtkommen würden. Sie würden uns Essen anbauen und ich würde uns eine Unterkunft bauen, und es wäre großartig.

### Möchtest du uns mitteilen, wie wir dir auf sozialen Medien folgen können?
Du kannst mir auf Instagram unter @enoch\_tries\_everything folgen, aber sei gewarnt, es wird sehr selten aktualisiert.



