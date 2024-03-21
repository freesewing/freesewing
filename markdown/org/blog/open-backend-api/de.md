---
title: Öffnen der FreeSewing Backend API
caption: Eine verschnörkelte Vintage-Tastatur aus Messing auf einer schwarzen Computertastatur, von PixaBay
date: 20231103
intro: Die FreeSewing Backend-API unterstützt jetzt API-Schlüssel, damit du auch mit ihr interagieren kannst
author: 1
---

Es scheint heutzutage in Mode zu sein, Leute von deiner API auszuschließen. Twitter - nein, X - und Reddit haben den API-Zugang entweder gesperrt oder verlangen Gebühren für den Zugang.

Ich habe genau das Gegenteil gemacht und als Teil der Einführung des neuen FreeSewing.org ein neues Backend gebaut, das von jedem genutzt werden kann.

Das Backend unterstützt die Authentifizierung über API-Schlüssel und du kannst diese Schlüssel direkt hier in deinen Kontoeinstellungen erstellen. Du kannst so viele erstellen, wie du willst, und ihre Gültigkeitsdauer festlegen sowie ihre Zugriffsstufe konfigurieren.

## Was ist der Punkt?

Gute Frage. Zunächst einmal finde ich es gut, dass du das tust. Aber was noch wichtiger ist: Wenn du all diese Maße in FreeSewing einträgst, solltest du sie vielleicht woanders verwenden, oder? Deshalb wollte ich das erleichtern.

Ich gehe davon aus, dass dies zumindest anfangs eine Nischenfunktion sein wird. Ich hoffe jedoch, dass andere Menschen, die im Bereich parametrisches Design und maßgeschneiderte Nähmuster arbeiten (oder auch nur Menschen, die nach Maßen suchen), dies zu schätzen wissen und es hoffentlich in ihre eigenen Skripte oder Werkzeuge integrieren werden.

Zumindest weiß ich, dass ich es tun werde.

Die [REST-API-Referenzdokumentation befindet sich hier] (https\://freesewing.dev/reference/backend), wenn du nach der OpenAPI-Spezifikation suchst, dann gehe auf https\://backend3.freesewing.org/docs/

## Benutzen, nicht missbrauchen

Unsere Backend-API läuft in einer Cloud-Umgebung und obwohl ich für den Zugang zur API keine Gebühren verlange, muss ich die Rechnungen des Cloud-Anbieters bezahlen.

Achte also bitte darauf, wie viele Anfragen du stellst. Und wenn du große Pläne hast, melde dich bitte bei mir, um sie zu besprechen.

Ich werde die Nutzung unserer Backend-API überwachen und wir können jederzeit entscheiden, API-Schlüssel zu widerrufen, wenn ich das Gefühl habe, dass die Nutzung über das hinausgeht, was ich unterstützen kann oder will.
Die Nutzung des Backends wird überwacht und ich kann eingreifen
