---
date: "2024-07-01"
edition: "2024q3"
intro: "Willkommen zur Sommerausgabe 2024 des FreeSewing-Newsletters."
title: "2024 Sommerausgabe"
---

Willkommen zur Sommerausgabe 2024 des FreeSewing-Newsletters.

Hier ist, was wir an diesem ersten Tag im Juli für Sie zusammengeschustert haben:

- 💰 Vercel hat unser Open-Source-Sponsoring einseitig gekündigt, was nun? (2-Minuten-Lesung von joost)
- 🚢 Warum sich FreeSewing 3.3 verzögert, und warum es Sie wahrscheinlich nicht interessiert (1 Minute gelesen von joost)
- 🇨🇭But können Sie es swizzeln? (3-Minuten-Lesung von joost)
- 🤖 Bei der Erstellung dieses Newsletters wurde keine KI verwendet (nur bei der Übersetzung) (1 Minute gelesen von joost)

Sollen wir loslegen?

&nbsp;  

&nbsp;

&nbsp;  

&nbsp;

## 💰 Vercel hat unser Open-Source-Sponsoring einseitig gekündigt, was nun?

Am 18. Juni erhielten wir die folgende E-Mail:

> *Hey there,*
>
> *Ihr Team FreeSewing ist derzeit im Vercel-Sponsoringprogramm eingeschrieben.
>
> Ihr 100%iger Rabatt läuft am 14. Juni aus. Um Ihnen Zeit zu geben, diesen Übergang zu bewältigen, werden wir Ihr Team automatisch für die nächsten 6 Monate, beginnend am 14. Juni und endend am 14. Dezember, für einen Rabatt von 300 $/Monat anmelden.
>
> Danke, dass Sie mit uns zusammenarbeiten.

Ich sollte hier zunächst das Offensichtliche feststellen: Vercel hat unser Hosting und unsere
Hosting und den Einsatz unserer Systeme gesponsert, und dafür sind wir natürlich sehr dankbar.
sehr dankbar dafür.

Davon abgesehen ist die Nachricht etwas zweideutig, bis hin zur Irreführung.
Zunächst einmal sind wir nicht das einzige Open-Source-Projekt, das diese E-Mail erhalten hat.
E-Mail erhalten haben.  Wenn man ein wenig googelt, sieht man andere, die [eine
[similar](https://x.com/Siddhant_K_code/status/1801447290076545099)
[Nachricht](https://www.reddit.com/r/nextjs/comments/1dfh7ak/vercel_just_ended_my_opensource_sponsorship/?rdt=41666).

Was irreführend erscheint, ist, dass Vercel es so aussehen lässt, als sei der Vertrag _abgelaufen_.
Aber es scheint mehr als nur ein bisschen seltsam, dass alle Berichte, die ich darüber finde
alle zum gleichen Zeitpunkt auslaufen (14. Juni).

Angesichts der Tatsache, dass Vercel [kein Sponsoring mehr anbietet
Sponsoring](https://vercel.com/guides/can-vercel-sponsor-my-open-source-project),
scheint es, als hätten sie beschlossen, den Vertrag zu widerrufen und einen 6-monatigen Kredit anzubieten, um den
den Übergang zu erleichtern.

Während wir also - wieder einmal - für den kostenlosen Service dankbar sind, den wir erhalten haben
erhalten haben, scheint die Mitteilung über diese Änderungen die Gründe
zu verwirren und Unsicherheit darüber zu schaffen, was als nächstes
was als nächstes passieren wird.

Wir befinden uns jetzt in der Übergangsphase, in der sie unsere monatliche Rechnung um
300 Dollar für die nächsten 6 Monate.  Wir hatten also keine Gelegenheit zu handeln
handeln, denn die E-Mail erreichte uns 4 Tage nach Beginn der Übergangsfrist
begann.

Wir werden also die Dinge im Auge behalten, Alternativen und unsere Möglichkeiten abwägen, aber wir
aber es kann sehr gut sein, dass wir vor dem 14. Dezember einige Dinge umstellen müssen.
Wie sich das auf unsere Finanzen auswirken wird, bleibt abzuwarten.


&nbsp;

---

&nbsp;


## 🚢 Warum FreeSewing 3.3 sich verzögert, und warum es Sie wahrscheinlich nicht interessiert

FreeSewing 3.3.0 wird die größte Veröffentlichung seit 3.0 sein. Das heißt, wenn es
veröffentlicht wird, denn es hat sich schon eine Weile verzögert.

Aufmerksame FreeSewing-Benutzer haben vielleicht bemerkt, dass, wenn Sie ein Muster erzeugen
auf [FreeSewing.org] (https://freesewing.org/) heute ein Muster erstellt, die Versions
Nummer `v3.3.0-rc.1` trägt. Das `rc` steht für _release candidate_, was bedeutet
dass es sich um eine Vorabversion handelt, die wir irgendwann als 3.3.0 veröffentlichen wollen, aber
aber wir sind noch nicht so weit.

Die Gründe, warum wir noch nicht so weit sind, haben mit unseren Bemühungen zu tun
Refactoring unseres Pattern-Editors zu tun -- mehr dazu weiter unten in diesem Newsletter -- aber
aber diese Änderungen werden sorgfältig isoliert, so dass wir in der Zwischenzeit
in der Zwischenzeit einfach weiterhin das Neueste und Beste aus unserer Arbeit auf FreeSewing.org anbieten können.

Es kann also sein, dass Du für eine Weile weiterhin die Version `v3.3.0-rc.1` siehst, oder
vielleicht eine `v3.3.0-rc.2` oder so, aber seien Sie versichert, dass irgendwann
v3.3.0 auf dem Weg ist.

Aber noch einmal: Wenn Sie unsere Software über FreeSewing.org beziehen, haben Sie
nichts zu befürchten.


&nbsp;

---

&nbsp;

## 🇨🇭 Aber können Sie es swizzeln?

Wie ein paar Absätze weiter oben erwähnt, ist der Grund für die Verzögerung von Version 3.3.0
weil wir unseren Muster-Editor überarbeiten. Unsere Motivation dafür ist, dass
als wir die Version 3 über die Ziellinie brachten, gab es so viele Änderungen in
Kern, Designs, Backend und Frontend gab, dass es eine gewaltige Aufgabe war, sie alle in einem
in einem neuen FreeSewing.org zusammenzufassen.

Das ist auch der Grund, warum wir damals unseren bisherigen Schnittmuster-Editor verpflanzt haben
ohne allzu viele Änderungen übernommen. Ich kann ehrlich sagen, dass ich damals einfach nicht
nicht mehr genug Treibstoff im Tank hatte, um das am Ende des langen Marsches
in Richtung v3.

Wir haben uns auch dafür entschieden, den Code zwischen unseren verschiedenen Web
Umgebungen zu teilen, also nicht nur FreeSewing.org, sondern auch
[FreeSewing.dev] (https://freesewing.dev/) und unsere eigenständige Entwicklungs
Umgebung.  Die gemeinsame Nutzung von Code macht durchaus Sinn, wenn man zum Beispiel den dunklen
und hellen Modus zu handhaben - oder verschiedene Themen insgesamt - gibt es keinen Grund
diese Logik für jede Webumgebung neu zu implementieren.

Unser Pattern-Editor ist Teil dieses _gemeinsamen_ Codes, aber er ist natürlich ein gutes
komplexer als der Umgang mit Themes.  Im Prinzip ist die Idee immer noch solide,
aber die praktische Umsetzung beginnt uns zu bremsen.
verlangsamen.

Zum einen ist es leicht, Änderungen am Editor vorzunehmen, die etwas anderes kaputt machen.
etwas anderes.  Die eigenständige Entwicklungsumgebung für Leute, die
neue Muster zu entwickeln, ist das Hauptopfer solcher Fehler.

Aber nur weil es einfach ist, etwas kaputt zu machen, heißt das nicht, dass es... einfach ist.  Wenn überhaupt,
ist es ziemlich kompliziert, sich einen Reim darauf zu machen, was eine enorme
eine enorme Hürde für die Mitwirkenden darstellt, so dass nur die Furchtlosesten es wagen
sich dorthin zu wagen.

Wenn ich jemals in den Ruhestand gehen will, müssen wir es einfacher machen, es zu verstehen, und einfacher
zu ändern.  Das war der Hauptgrund für die Erstellung eines Funktionszweigs und die
die etwas entmutigende Aufgabe der Neuimplementierung in Angriff zu nehmen.

Aber es gibt auch noch einen anderen Grund. Denn wir bekommen manchmal Fragen wie _kann ich
kann ich das in meine eigene Website integrieren, um meine eigenen Muster zu verkaufen?_.
ist _Ja, aber ... es ist nicht einfach_.  Ich wollte das einfach machen - oder zumindest
oder zumindest einfacher machen - und dazu gehört auch die Möglichkeit, unseren Schnittmuster-Editor zu nutzen, aber
ihn zu ihrem eigenen zu machen.

Mit anderen Worten, man hat etwas Fertiges, das man einbauen kann, aber man hat auch
aber auch die Flexibilität haben, die Teile zu ändern, die man anders sehen möchte.
Und hier kommt das _Swizzling_ ins Spiel. Swizzeln bedeutet, eine Implementierung zu ändern
mit etwas anderem, typischerweise das Ändern einer Standardimplementierung mit etwas
während der Laufzeit.

Nehmen wir an, Sie möchten unseren Schnittmuster-Editor verwenden, aber Ihnen gefällt das
Symbol für die Nahtzugabe nicht. Nun, Sie können das Symbol einfach _umwandeln_, indem Sie
Ihre eigene Version einfügen, oder natürlich auch etwas Anspruchsvolleres.

Das Endziel wird eine React-Komponente sein, die wir auf NPM veröffentlichen und die Sie
in Ihr Projekt einbinden können, um dann möglicherweise bestimmte (Unter-)
Komponenten zu überschreiben.

Es ist ein Work-in-Progress, aber heute unterstützt es bereits das Swizzeln von 143
Komponenten (in einem Pattern-Editor gibt es eine Menge zu tun).  Aber Sie werden auch in der Lage sein
verschiedene Hooks swizzeln können, zum Beispiel denjenigen, der den Editor
Zustand. Obwohl es erwähnenswert ist, dass wir bereits 4 Zustände unterstützen
Backend unterstützen: lokaler Speicher, Sitzungsspeicher, URL-Anker-Status und nativer React
Zustand.

Sie werden auch in der Lage sein, die verschiedenen Methoden, die wir verwenden, zu swizzeln, wie zum Beispiel
Übersetzung, Zahlen runden, und so weiter.

Während das für Leute, die mit FreeSewing bauen wollen, spannend ist (sein sollte?)
FreeSewing bauen wollen, ist das Hauptziel hier, eine stabile Grundlage zu haben, die
flexibel genug ist, um darauf coole Sachen zu bauen. Das ist etwas, von dem ich persönlich
bin wirklich begeistert davon.

&nbsp;

---

&nbsp;

## 🤖 Für die Erstellung dieses Newsletters wurde keine KI verwendet (nur für die Übersetzung)

Wenn es Ihnen so geht wie mir, können Sie vor lauter Augenrollen nichts mehr hören
Augen rollen, wenn die Leute anfangen, über _AI_ zu reden, aber trotzdem muss ich etwas klarstellen
etwas klarstellen.

FreeSewing hat ein Team von freiwilligen Übersetzern, die großartige Arbeit leisten, um sicherzustellen, dass
dass so viele Menschen wie möglich die Früchte unserer Arbeit genießen können.  Die Art und Weise
funktioniert so, dass wir alles zuerst auf Englisch schreiben, und dann machen sie sich an die Arbeit und
es Stück für Stück zu übersetzen.  Wenn einige Teile noch nicht übersetzt worden sind, greifen wir einfach
greifen wir einfach auf den englischen Inhalt zurück.

Das funktioniert hervorragend für die Website, bei der der größte Teil des Materials bereits übersetzt ist.
übersetzt ist, und wenn etwas Neues hinzukommt, wird es schließlich auch übersetzt
und mit ein wenig Verzögerung ist alles in Ordnung.

Es funktioniert _nicht_ gut für diesen Newsletter, und das ist natürlich wie
wie alles andere, was mit FreeSewing nicht funktioniert, ganz allein meine Schuld.  Sie sehen, ich bin einfach zu faul
und zu allem Übel neige ich auch noch dazu, besser zu arbeiten, wenn ich eine Deadline habe.
Das bedeutet, dass es jetzt - ich schaue auf die Uhr - auf 17:00 Uhr zugeht an dem Tag
an dem der Newsletter verschickt werden muss, und ich bin immer noch dabei, ihn zu schreiben.

Es genügt zu sagen, dass dadurch absolut keine Zeit für die Übersetzung meines
zu übersetzen, so dass ich dazu übergehe, eine maschinelle Übersetzung zu verwenden.  I
Ich weiß, dass unsere Übersetzer es _hassen_, wenn ich das tue, denn es wirft ein schlechtes Licht auf all ihre
ihre harte Arbeit.

Wenn Sie dies also als nicht-englische Ausgabe lesen und die
Übersetzung mangelhaft finden, können Sie sicher sein, dass es meine Schuld ist und unsere Übersetzer nicht
Schuld.

joost


