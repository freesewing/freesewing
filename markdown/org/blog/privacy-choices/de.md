---
author: "joostdecock"
caption: "Bild von <a href='https://pixabay.com/en/users/herbert2512-2929941/' target='_BLANK' rel='nofollow'>Herbert</a>"
date: "2017-06-16"
intro: "Das World Wide Web untergräbt immer mehr Ihre Privatsphäre. Facebook, Google und eine ganze Armada an Werbenetzwerken haben ihre Browsertabs im Blick. Sie verfolgen dich im Internet und behalten ein Auge auf die von dir besuchten Seiten, damit sie mehr Informationen über dich sammeln und diese an Werbekunden verkaufen können."
title: "Die Entscheidungen, die ich getroffen habe, um Ihre Privatsphäre zu schützen. Oder, warum Sie keine Cookies erhalten werden."
---

Das World Wide Web untergräbt immer mehr Ihre Privatsphäre. Facebook, Google und eine ganze Armada an Werbenetzwerken haben ihre Browsertabs im Blick. Sie verfolgen dich im Internet und behalten ein Auge auf die von dir besuchten Seiten, damit sie mehr Informationen über dich sammeln und diese an Werbekunden verkaufen können.

Entschuldige meine Ausdrucksweise, aber ich hasse diesen Scheiß.

> Facebook, Google und eine ganze Armada an Werbenetzwerken haben ihre Browsertabs im Blick

Diese Website von Grund auf neu aufzubauen, war eine großartige Gelegenheit, darüber nachzudenken, wie man Dinge tun sollte.

Um sicherzugehen, dass ich nicht zu dem Problem beitrage, habe ich die folgenden Entscheidungen getroffen:

## Verschlüsselung überall

Lass uns alles über https laufen. Das ist einfach [gesunder Menschenverstand](https://letsencrypt.org/) im Jahr 2017.

## Keine Werbung

Auch das ist ein klarer Fall. Die Nummer 1 unter den Tracking-Schädlingen im Internet sind Werbenetzwerke, und ich will nicht, dass sie in die Nähe dieser Website kommen.

Zum Glück ist das kein Problem, denn wir spielen nicht nach den _Gib etwas umsonst, dann verkaufe die Daten der Leute_ Regeln des Internets.

## Kein externer Code

Diese Seite lädt keinen externen JavaScript-Code. Keine. Das bedeutet, dass ich ein paar Dinge überdenken musste, die normalerweise externen Code erfordern.

Es gibt keinen Facebook-Like-Button oder eine Twitter-Integration. Wir haben immer noch Social Sharing unter unseren Blogbeiträgen (Hinweis), aber es ist die einfache HTML-Variante, die Tracking verhindert.

In der gleichen Kategorie gibt es keine sozialen Logins. Sicherlich ist ein _Login mit Facebook_ Button praktisch, aber auch ein ziemlicher Alptraum, wenn du bedenkst, was das mit deiner Privatsphäre macht.

Für eine statisch generierte Website wie diese ([siehe diesen Beitrag über JAMstack für Details](/blog/freesewing-goes-jamstack/)) [ist Disqus](https://disqus.com/) so ziemlich der De-facto-Standard für Kommentare. Aber Disqus ist ziemlich schrecklich, wenn es um Tracking geht, also war das ein großes Nein für mich.

Ähnlich verhält es sich mit der Authentifizierung, wo ich [Auth0](https://auth0.com/)in Betracht gezogen habe. Auch hier hatte ich Bedenken wegen der Nachverfolgung, also habe ich mich dagegen entschieden.

Am Ende habe ich einfach in den sauren Apfel gebissen und Authentifizierung und Kommentare selbst implementiert. Die Zeit wird zeigen, ob das ein guter Tausch war.

## Keine Cookies
Wir verwenden keine Cookies. Natürlich keine Cookies von Dritten, aber auch keine eigenen Cookies.

Stattdessen verwenden wir eine lokale Speicherung, die besser ist, weil sie im Gegensatz zu Cookies deine Daten nicht bei jeder Anfrage sendet.

## Keine Analytik
Ich habe [Google Analytics](https://analytics.google.com/) auf [makemypattern](https://makemypattern.com/)ausgeführt. Es ist mächtig, aber natürlich ein Alptraum bei der Verfolgung. Also wollte ich auch das nicht haben.

Dieses Problem wird noch dadurch verkompliziert, dass diese statische Website von [Netlify](https://www.netlify.com/)gehostet wird. Ich habe also keine Server-Logs und kann keine Analysen serverseitig durchführen.

Meistens habe ich beschlossen, einfach auf Analysen zu verzichten. Ich muss nicht wissen, wie viele Leute diese Seite besuchen. Ich weiß immer noch, wie viele Benutzerkonten erstellt werden und wie viele Muster generiert werden, was ein guter Indikator für das allgemeine Wohlergehen der Website sein sollte.

Aber es gibt eine Sache, die wir aus den Analysen heraushalten wollten: die Referral-Logs. Es gehört zu den kleinen Freuden des Lebens, diese Liste durchzugehen und zu entdecken, dass [jemand](https://www.reddit.com/r/freepatterns/comments/4zh5nr/is_there_software_to_generate_sewing_patterns/) [mit](http://www.makery.uk/2016/08/the-refashioners-2016-joost/) [verlinkt hat und du](https://opensource.com/life/16/11/free-open-sewing-patterns).

Auch hier habe ich meine eigene einfache Lösung implementiert. Wenn du über einen externen Link auf dieser Seite landest, melden wir diesen Verweis an unsere eigene API. Das bedeutet, dass wir immer noch die Empfehlungsinformationen erhalten, aber keine Nachverfolgung.

Vielleicht ist es nur Eitelkeit, aber wenn ich einen schlechten Tag habe, helfen mir diese Empfehlungsprotokolle, mich besser zu fühlen (wenn es sich nicht nur um russischen Empfehlungsspam handelt). Vielleicht liege ich da falsch, aber ich würde wetten, dass viele Leute, die einen eigenen Blog haben, das nachvollziehen können.

