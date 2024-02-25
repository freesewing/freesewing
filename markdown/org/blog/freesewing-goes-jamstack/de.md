---
author: 1
caption: "Bild von <a href='https://stock.tookapic.com/jenniferforjoy' target='_BLANK' rel='nofollow'>Jennifer</a>"
date: "2017-06-12"
intro: "Als wir Ende März freesewing core veröffentlicht haben, habe ich mich sofort auf die Entwicklung unseres Frontends konzentriert, damit freesewing.org makemypattern.com vollständig ersetzen kann."
title: "Wir sind JAMstack, wir sind JAMstack, wir sind JAMstack, wir sind JAMstack, wir sind JAMstack, wir sind JAMstack, wir sind JAMstack, wir sind JAMstack, und ich hoffe, dass du auch JAMstack magst"
---

Als wir Ende März den FreeSewing Core veröffentlichten, verlagerte sich mein Fokus sofort auf den Aufbau unseres Frontends, sodass [freesewing.org](/) [makemypattern.com](https://makemypattern.com/) vollständig ersetzen konnte.

Ich glaube, dass der Wert von FreeSewing bei dem Core der Plattform und unseren Schnittmustern liegt. Aber ohne eine benutzerfreundliche Möglichkeit, diese Werte zu präsentieren, werden sie weitgehend ignoriert werden.

Deshalb brauchten wir eine Website, die es den Leuten ermöglicht, Schnittmuster zu generieren. Makemypattern.com &mdash; wohl der beste Vergleich von etwas Ähnlichem &mdash; läuft auf Drupal 7, und meine erste Idee war es, die neue Seite auf Drupal 8 zu betreiben. Ich ging diesen Weg weit genug, um sicher zu sein, dass ich ihn zum Laufen bringen und an unser Backend anschließen konnte. An diesem Punkt habe ich das Ruder herumgerissen und mich dem FreeSewing Core zugewendet.

Der Bau des Cores dauerte etwa 7 Monate, und seitdem hat sich viel verändert. Oder vielleicht habe ich mich verändert, ich habe auf jeden Fall viel gelernt. So oder so, ich habe mich entschieden, die Dinge anders zu machen.

## Das Problem mit einem CMS

Ich habe kein Problem mit Drupal, aber die Idee, die FreeSewing-Website über ein Content Management System (CMS) zu verwalten, gefällt mir nicht.

Einer der Hauptgründe ist, dass so viele Informationen unter einer undurchsichtigen Datenbankschicht gespeichert sind, was die Verwaltung erschwert. Das gilt für Inhalte, bei denen Beiträge, Metadaten, Bilder usw. über Tabellen, Speicherorte und Ordner verteilt sind. Aber es gibt auch das Theme, das einen Haufen Zeug enthält, es gibt die benutzerdefinierten Drupal-Module, um sich mit dem Backend zu verbinden, und so weiter und so fort.

> Ich wollte den gleichen Ansatz in einer Website. Außer, dass sie nicht statisch sein kann, weil sie, Sie wissen schon, Dinge tun muss.

Als wir den Kern fertiggestellt haben, habe ich eine Dokumentationsseite dafür erstellt, die auf [Jekyll](https://jekyllrb.com/) basiert. Im Vergleich zu Drupal fühlte es sich wie ein Hauch von frischer Luft an. Nur ein Haufen Markdown-Dateien, mit einigen SASS, Bildern und etwas JavaScript, die in den Mixxer geworfen wurden, und alles wird zu einer ordentlichen statischen Website zusammengefügt.

Es ist einfach zu verwalten und lässt sich gut in einen GitHub-zentrierten Workflow integrieren, der potenziellen Mitwirkenden vertraut sein dürfte.

Ich wollte den gleichen Ansatz in einer Website. Außer, dass sie nicht statisch sein kann, weil sie, Sie wissen schon, Dinge tun muss.


## Ein alternativer Ansatz: JAMstack

Ich habe zum ersten Mal von JAMstack erfahren, als ich anfing, mich mit dem Hosting für diese zentrale Dokumentationsseite zu befassen. Es wurde ursprünglich auf GitHub-Seiten gehostet, die kostenloses Hosting anbieten. Sie haben auch SSL oder einen benutzerdefinierten Domänennamen, aber Sie können nicht beides haben. Was eine Art Deal-Breaker war.

Auf der Suche nach Alternativen stolperte ich über [Netlify](https://www.netlify.com/), die sowohl SSL- als auch kundenspezifische Domains betreiben und ein kostenloses Angebot für Open-Source-Projekte haben (danke Jungs). Außerdem hat mich [dieses Video von Netlify CEO Mathias Biilmann](https://vimeo.com/163522126) sehr begeistert für JAMstack.

Sofern Sie nicht mit JAMstack vertraut sind, schlage ich vor, dass Sie sich das Video ansehen, aber es läuft darauf hinaus:

 - **J** = JavaScript
 - **A** = APIs
 - **J** = Markup

Die Idee ist, dass Sie Ihre statische Website (Markup) erstellen, die Sie dann mit JavaScript interaktiv machen, das an eine oder mehrere APIs angeschlossen ist.

Anstatt also in unserem Fall eine einfache Dokumentationsseite mit einfach zu bearbeitendem Markdown und einem komplexen CMS zur Handhabung des dymanischen Materials zu haben, lassen Sie uns einfach eine einfache Seite erstellen, die statisch generiert wird, aber JavaScript und APIs verwendet, um das interaktive Material bereitzustellen.

## Laufen, bevor Sie gehen können

Ich muss zugeben, dass ich in meiner Begeisterung, diesen neuen Ansatz anzunehmen, ein wenig über mich selbst hinausgewachsen bin. Plötzlich baute ich keine einfache Website mehr, aber ich war bis zum Anschlag in isomorphem Rendering, client-seitigem Routing, React and Redux, Node.js und ES6 Transpiling verwickelt.

> Wenn Sie nicht wissen, was das alles bedeutet, werden Sie vielleicht einen Eindruck von der Frustration bekommen, die ich empfand, als ich versuchte, all diese neuen Bestien zu zähmen.
> 
> Wenn Sie wissen, was das alles bedeutet, wo waren Sie dann im April, als ich durch das Tal des Todes ging?

Der Punkt ist, ich bin kein Entwickler und ich war weit über meinem Level. Während ich jeden Tag neue Dinge lernte, machte ich bei der eigentlichen Aufgabe nicht viel Fortschritte und war frustriert über meine Unfähigkeit, selbst die alltäglichsten Dinge zu tun.

Nach einem Monat der Frustration, vielen Versuchen und scheinbar noch mehr Fehlern warf ich das Handtuch. Ich lass diesen neumodischen Kram namens JavaScript, den alle Kiddies heutzutage nutzen, und bleibe bei dem, was ich kenne.

Was im Wesentlichen die Grundlagen von jQuery ist. Mit anderen Worten, Sachen, die vor 10 Jahren ziemlich cool waren.

## 10 Jahre alte Marmelade ist immer noch Marmelade, oder?

Hier sind wir also, freesewing.org ist eine Seite, die vom JAMstack betrieben wird. Und wissen Sie was, es scheint zu tun, was es tun soll.

Wir lassen Jekyll eine statische Website erstellen, und wenn wir etwas in unserem Masterbranch pushen, wird es automatisch auf Netlify bereitgestellt.

> Effektiv dieses neumodisch glänzende JavaScript, das alle kleinen Kiddies benutzen

Wir haben [eine brandneue Daten-API](https://github.com/freesewing/data), die auf [dem Slim Framework](https://www.slimframework.com/) basiert. Es verwaltet alle Benutzerdaten. Dinge wie Benutzerkonten, Maße, Modelle und Entwürfe, aber auch Kommentare zu dieser Website und so weiter.

Es spricht auch für uns, und jedes Mal, wenn Sie ein Muster entwerfen, geben wir Ihnen nicht nur das Muster, sondern führen auch einen Vergleich Ihres Musters mit einer Reihe von Standardgrößen durch, was irgendwie cool ist.

Und wir haben noch andere coole Dinge, wie die Möglichkeit, einen bestehenden Entwurf zu duplizieren oder neu zu entwerfen.

## Das ist ein Ausgangspunkt

Ich hoffe, dass die Benutzererfahrung/Benutzeroberfläche kein Hindernis für Menschen sein wird. Ich habe große Anstrengungen unternommen, um den Entwurfvorgang so intuitiv wie möglich zu machen und ich denke, dass es im Vergleich zu unserer Demo (oder der Makemypattern-Schnittstelle für diese Angelegenheit) eine enorme Verbesserung ist.

Andererseits bin ich sicher, dass die Dinge nach links oder rechts brechen werden, oder dass einige von euch die Farben nicht mögen oder was auch immer.

Der Punkt ist, dass ich mich daran gemacht habe, etwas zu bauen, das makemypattern.com ersetzen kann, damit ich euch allen sagen kann _Hey, kommt vorbei und spielt mit diesem neuen Ding_.

Ich denke, das kann ich das jetzt tun. Und wenn Sie Verbesserungspotenzial sehen, nehmen Sie bitte [an der Anstrengung teil](/contribute), wir fangen gerade erst an.



<small>PS: Für diejenigen von euch, die sich über den Titel dieses Beitrags Gedanken machen:</small>

<YouTube id='oFRbZJXjWIA' />


