---
author: 1
caption: "¿Cerrarías un carril porque un conductor pone la música demasiado alta?"
date: "2017-09-07"
intro: "Gracias por nada Microsoft; el correo electrónico no debería ser tan difícil"
title: "Gracias por nada Microsoft; el correo electrónico no debería ser tan difícil"
---

Las personas con una dirección de correo electrónico de Microsoft --- piensa en Hotmail, MSN, live.com, outlook.com y sus numerosas variantes --- tienen muchas menos probabilidades de registrarse en este sitio web.

Eso se debe a que más de 4 de cada 10 veces, nunca reciben el correo electrónico de activación de su cuenta.

## ¿Qué ocurre?

Veamos primero lo que ocurre. Aquí tienes un fragmento relevante de los registros:

````
Error: postmaster@mg.freesewing.org -> ********@hotmail.co.uk "Confirma tu cuenta de freesewing" 
Respuesta del servidor: 550 5.7.1 Lamentablemente, los mensajes de [104.130.122.15] no se enviaron. 
Ponte en contacto con tu proveedor de servicios de Internet, ya que parte de su red está en nuestra lista de bloqueados. 
````

Lo que esto significa es que parte de la red MailGun está en su lista de bloqueados. Como resultado, ellos (más adelante hablaremos de quiénes son) no transmiten ningún mensaje.

[MailGun](https://www.mailgun.com/) es un popular servicio de correo electrónico para desarrolladores. Este sitio lo utiliza para enviar correos electrónicos, como los de activación de cuenta.

Otras personas también utilizan este servicio, y quizás alguna de ellas, en algún momento, envió algunos mensajes de spam a través de mailgun. O puede que simplemente haya sido un tipo con un apellido que tiende a activar los filtros de spam.

![Algunos otros clientes de MailGun. No es exactamente un servicio dudoso, ¿verdad?](https://posts.freesewing.org/uploads/mailgun_19f315d4d6.png)

La cuestión es que esta dirección IP o una de sus vecinas tiene mala reputación **. Eso ocurre. Pero negarse en redondo a aceptar cualquier mensaje de este anfitrión (o de toda una red de anfitriones) equivale a cerrar un carril de la autopista (o toda la autopista) porque un coche de ese carril puso la música a un volumen detestable aquella vez.

Lo que me lleva a nuestra siguiente pregunta:

## ¿Quién haría algo así?

Buena pregunta. He aquí algunas cifras:

![Un gráfico de la entrega de correo desde el lanzamiento de este sitio](https://posts.freesewing.org/uploads/emailgraph_d14d476efa.png)

El gráfico anterior representa los correos electrónicos enviados desde el lanzamiento de este sitio. La pequeña parte del gráfico que está en rojo son los correos electrónicos que se eliminan.

Este sitio web envía distintos tipos de correo electrónico:

 - El correo electrónico de confirmación de la cuenta
 - Los correos *He olvidado mi contraseña*
 - Notificaciones de respuesta a comentarios

El gráfico representa todo el correo electrónico, pero me centro sólo en los correos de confirmación de cuenta. Al fin y al cabo, son los más importantes.

> Aparte del 1 atípico, todos los mensajes que se bloquearon, fueron bloqueados por Microsoft

Aquí tienes una lista de todos los dominios que bloquearon correos electrónicos legítimos de activación a sus usuarios:

 - btinternet.com
 - hotmail.com
 - hotmail.es
 - vivir.ca
 - vivir.com
 - live.com.au
 - vivir.nl
 - msn.com
 - outlook.com

Aparte de la primera entrada de la lista (en la que sólo se bloqueó 1 mensaje), todos ellos son dominios de Microsoft.

Permíteme reafirmarlo: Aparte del 1 atípico, todos los mensajes que se bloquearon, fueron bloqueados por Microsoft.

## ¿Cuál es el impacto?

¿Qué impacto tiene eso en la gente?

Pues bien, en el momento en que escribo esto, hay 817 usuarios registrados, y cerca del 80% (661) también han activado su cuenta.

![Una cantidad desproporcionada de activaciones pendientes procede de usuarios con una dirección de correo electrónico gestionada por Microsoft](https://posts.freesewing.org/uploads/activations_06987b6065.svg)

De las personas que pudieron activar su cuenta, menos del 1% (6) tienen una dirección de correo electrónico gestionada por Microsoft. En el grupo de personas que no activaron o no pudieron activar su cuenta, más de la mitad tienen una dirección de este tipo.

Más del 40% de los correos electrónicos de confirmación de cuenta son simplemente bloqueados por Microsoft y, basándonos en el número de activaciones, parece probable que incluso cuando no son bloqueados en el relé SMTP, son filtrados en algún punto posterior.

Tal y como están las cosas, parece casi imposible que el usuario medio de hotmail/outlook/live/MSN/... se registre en este sitio.

## ¿Qué podemos hacer al respecto?

Elegí mailgun por varias razones. No tener que manejar SMTP por sí mismo simplifica el código. No depender de un deamon SMTP local hace que el código sea más portable, y MailGun tiene un montón de funciones geniales que te permiten hacer cosas como responder a comentarios por correo electrónico.

Los burdos métodos de filtrado de spam de Microsoft no invalidan ninguna de esas razones.

Utilizar MailGun significa utilizar sus repetidores SMTP, y estar a merced de la reputación de ese repetidor. La única forma de evitarlo es configurar un relé dedicado en MailGun para que el tráfico de freesewing.org esté protegido de otros, y nos convirtamos en dueños de nuestra propia reputación.

![¿59 $ al mes? Tal vez no](https://posts.freesewing.org/uploads/pricing_52f0e817cb.png)

Por ese privilegio, MailGun cobra 59 dólares al mes, lo que equivale a 708 dólares anuales. Te invito a que eches un vistazo a [el historial de donaciones](/about/pledge#donations-history), y comprenderás que eso tampoco va a ocurrir.

Podría impugnar la lista de bloqueo e intentar desbloquear el relé. Pero eso es mucho decir cuando el anfitrión no está bajo mi control. Por no mencionar que MailGun no sólo tiene ese host.

Parece que se me están acabando las opciones y, francamente, también se me está acabando la paciencia.

## Qué voy a hacer al respecto

Microsoft es un gigante, y yo sólo soy un tipo. No puedo luchar contra ellos en esto. A menos que les dé por el culo.

![Bloquea esto, zorra](https://posts.freesewing.org/uploads/titanfall_cb5a210468.gif)

¿Crees que alguna vez se abusa de Gmail para enviar spam? Sabes que lo es. ¿Crees que llegarían a bloquear todo el correo electrónico procedente de Gmail? Sabes que no lo harán.

Así que anoche introduje algunos cambios para solucionar el problema. Si tienes una dirección de correo electrónico *problemtic* , además del correo electrónico normal, este sitio enviará un segundo correo electrónico a través de Gmail.

Me gustaría que lo bloquearan.

> ##### ¿Problemas para inscribirte? Ayuda disponible
> 
> Si (aún) tienes problemas para inscribirte, no dudes en [ponerte en contacto](/contact).

