---
date: "2024-07-01"
edition: "2024q3"
intro: "Bienvenido a la edición de verano 2024 del boletín FreeSewing."
title: "2024 Edición de verano"
---

Bienvenidos a la edición de verano 2024 del boletín FreeSewing.

Esto es lo que hemos preparado para ti en este primer día de julio:

- 💰 Vercel canceló unilateralmente nuestro patrocinio de código abierto, ¿y ahora qué? (2-minute read by joost)
- 🚢 Por qué se retrasa FreeSewing 3.3, y por qué probablemente no te importe (lectura de 1 minuto por joost)
- 🇨🇭But ¿puedes swizzlearlo? (lectura de 3 minutos por joost)
- 🤖 No se usó IA para crear este boletín (sólo para traducirlo) (1minuto leído por joost)

¿Empezamos?

&nbsp;  

&nbsp;

&nbsp;  

&nbsp;

## 💰 Vercel canceló unilateralmente nuestro patrocinio de código abierto, ¿y ahora qué?

El 18 de junio recibimos el siguiente correo electrónico:

> *Hey there,*
>
> Tu equipo FreeSewing está actualmente inscrito en el programa de patrocinio de Vercel.
>
> Su descuento del 100% expira el 14 de junio. Para darte tiempo a gestionar esta transición, inscribiremos automáticamente a tu equipo en un descuento de 300$/mes durante los próximos 6 meses, empezando el 14 de junio y terminando el 14 de diciembre.
>
> Gracias por colaborar con nosotros.

Debo empezar diciendo lo obvio: Vercel ha patrocinado amablemente nuestro
alojamiento y despliegues desde hace un tiempo, y estamos obviamente muy agradecidos
por ello.

Dicho esto, el mensaje es un poco ambiguo hasta el punto de inducir a error.
Para empezar, no somos el único proyecto de código abierto que ha recibido este
correo electrónico.  Buscando un poco en Google aparecen otros que [recibieron un mensaje
[similar](https://x.com/Siddhant_K_code/status/1801447290076545099)
(https://www.reddit.com/r/nextjs/comments/1dfh7ak/vercel_just_ended_my_opensource_sponsorship/?rdt=41666).

Lo que parece engañoso es que Vercel hace parecer que el acuerdo _expiró_.
Pero me parece más que curioso que todos los informes que encuentro al respecto
expiran exactamente en la misma fecha (14 de junio).

Dado que Vercel [ya no ofrece
patrocinio](https://vercel.com/guides/can-vercel-sponsor-my-open-source-project),
parece que han decidido revocar el acuerdo y ofrecer un crédito de 6 meses para facilitar la transición.
para facilitar la transición.

Así que, aunque -una vez más- agradecemos el servicio gratuito que hemos recibido
recibido, el mensaje sobre estos cambios parece confundir las aguas
sobre sus razones para hacerlo, así como crear incertidumbre sobre lo que
sucederá a continuación.

Ahora estamos en el periodo de transición en el que reducirán nuestra factura mensual en 300 dólares durante los próximos seis meses.
300 dólares durante los próximos 6 meses.  Así que no tuvimos ninguna oportunidad de actuar
con antelación, dado que el correo electrónico nos llegó 4 días después de que comenzara el periodo de transición.
de transición.

Así que estaremos atentos, estudiaremos alternativas y nuestras opciones, pero es muy posible que tengamos que cambiar algunas cosas de sitio.
pero es muy posible que tengamos que cambiar algunas cosas antes del 14 de diciembre.
Queda por ver cómo afectará esto a nuestras finanzas.


&nbsp;

---

&nbsp;


## 🚢 Por qué se retrasa FreeSewing 3.3, y por qué probablemente no te importe.

FreeSewing 3.3.0 va a ser el mayor lanzamiento desde la versión 3.0. Es decir, cuando
FreeSewing 3.3.0 va a ser el mayor lanzamiento desde la versión 3.0. Es decir, cuando se libere porque ha estado un poco atascado por un tiempo.

Los usuarios de FreeSewing con ojos de águila se habrán dado cuenta de que si generas un patrón
en [FreeSewing.org](https://freesewing.org/) hoy, lleva el número de versión
número `v3.3.0-rc.1`. Las siglas `rc` significan _release candidate_, lo que indica
que se trata de una versión preliminar que planeamos lanzar en algún momento como 3.3.0, pero aún no lo hemos hecho.
no estamos allí todavía.

Las razones por las que no estamos allí todavía tienen todo que ver con nuestros esfuerzos para
refactorizar nuestro editor de patrones -- más sobre eso más abajo en este boletín -- pero
estos cambios se mantienen cuidadosamente aislados para que mientras tanto podamos
seguir ofreciendo lo último y lo mejor de nuestro trabajo en FreeSewing.org.

Por lo tanto, es posible que continúe viendo la versión `v3.3.0-rc.1` por un tiempo, o es posible que vea una versión `v3.3.0-rc.1`.
podría ver un `v3.3.0-rc.2` o algo así, pero tenga la seguridad de que con el tiempo,
v3.3.0 está en camino.

Pero una vez más, si FreeSewing.org es como usted consume nuestro software, usted tiene
nada de que preocuparse.


&nbsp;

---

&nbsp;

## 🇨🇭 Pero, ¿se puede swizzle?

Como se mencionó unos párrafos más arriba, la razón por la versión 3.3.0 se retrasa es
porque estamos refactorizando nuestro editor de patrones. Nuestra motivación para esto es que
cuando llevamos la versión 3 sobre la línea de meta, había tantos cambios en
el núcleo, diseños, backend, y frontend que era una tarea montañosa para atarlos
todos juntos en un nuevo FreeSewing.org.

También por eso, en aquel momento, trasplantamos nuestro anterior editor de patrones
sin demasiados cambios. Puedo decir honestamente que en ese momento, yo simplemente no lo hice
no tenía suficiente combustible en el tanque para hilvanar eso al final de la larga marcha
hacia v3.

También optamos por compartir código entre nuestros diferentes entornos web.
entornos, por lo que no sólo FreeSewing.org sino también
[FreeSewing.dev](https://freesewing.dev/) y nuestro entorno de desarrollo independiente.
independiente.  Compartir código como que tiene mucho sentido, si usted para manejar oscuro
oscuro y el modo de luz, por ejemplo - o diferentes temas en conjunto - no hay necesidad de
reimplementar esa lógica para cada entorno web.

Nuestro editor de patrones es parte de ese código _compartido_, pero es por supuesto un buen
un poco más complejo que el manejo de temas.  En principio, la idea sigue siendo sólida,
pero los aspectos prácticos de la forma en que se ha aplicado están empezando a ralentizarnos.
a ralentizarnos.

Por un lado, es fácil hacer cambios en el editor que romperán
algo más.  El entorno de desarrollo independiente para las personas que buscan
desarrollar nuevos patrones es la víctima número uno de tales rupturas.

Pero que sea fácil romperlo no significa que sea... fácil.  En todo caso,
es bastante complicado para envolver su cabeza alrededor de lo que crea una enorme
obstáculo a superar por los contribuyentes, por lo que sólo los más intrépidos se atreven a
a ir allí.

Si alguna vez quiero retirarme, tenemos que hacer que sea más fácil de entender, y más fácil
cambiar.  Ese fue el principal motor para crear una rama de características y emprender
en la tarea un poco desalentadora de volver a implementarlo.

Pero también hay otra razón. Porque a veces recibimos preguntas como
¿Puedo integrar esto en mi propio sitio web para vender mis propios patrones?
es _sí, pero... no es fácil_.  Yo quería hacer eso fácil - o al menos
más fácil - que incluye la capacidad para que la gente utilice nuestro editor de patrones, pero
lo hagan suyo.

En otras palabras, tener algo listo para ir que se puede conectar, pero también tienen
la flexibilidad para cambiar aquellas partes que te gustaría ver de manera diferente.
Aquí es donde entra en juego el "swizzling". Swizzle es cambiar una implementación
con algo más, por lo general el cambio de una implementación por defecto con algo
personalizada en tiempo de ejecución.

Supongamos que desea utilizar nuestro editor de patrones, pero no le gusta el icono
icono de margen de costura. Bueno, usted puede simplemente _swizzle_ ese icono pasando
tu propia versión, o por supuesto algo más ambicioso.

El objetivo final será un componente React que publicamos en NPM que usted puede
en su proyecto, para entonces potencialmente anular ciertos (sub-)
componentes del mismo.

Es un trabajo en progreso, pero hoy en día ya soporta swizzling de 143
componentes (hay mucho que va en un editor de patrones).  Pero también será
swizzle varios ganchos, por ejemplo, el que maneja el editor de
del editor. Aunque vale la pena señalar que ya apoyamos 4 estado
backend: almacenamiento local, almacenamiento de sesión, estado de anclaje URL y estado nativo de React.
nativo.

También podrás swizzlear los distintos métodos que usamos, como proporcionar
traducción, redondear números, etc.

Si bien esto es (¿debería ser?) emocionante para las personas que buscan construir con
FreeSewing, el objetivo principal aquí es tener una base que es estable pero
lo suficientemente flexible como para construir cosas interesantes en. Es algo que a mí
estoy muy entusiasmado.

&nbsp;

---

&nbsp;

## 🤖 No se ha utilizado IA para crear este boletín (sólo para traducirlo)

Si eres como yo, no puedes oír nada por encima del sonido de tus ojos
rodando cuando la gente empieza a hablar de _AI_ pero aún así, tengo que aclarar
algo.

FreeSewing tiene un equipo de traductores voluntarios que hacen un gran trabajo para asegurarse de que
que el mayor número posible de personas pueda disfrutar de los frutos de nuestro trabajo.  La forma en que
funciona es que primero escribimos todo en inglés, y luego ellos se ponen a trabajar para
traducirlo poco a poco.  Si algunas partes aún no se han traducido, simplemente
volvemos al contenido en inglés.

Esto funciona muy bien para el sitio web, donde la mayor parte del material ya está traducido.
la mayor parte del material ya está traducido, y cuando se añade algo nuevo, también se traduce.
y, con un poco de retraso, todo va bien.

Esto _no_ funciona bien para este boletín, y eso es, por supuesto, como
todo lo demás mal con FreeSewing totalmente mi culpa.  Usted ve, yo soy perezoso para
y para empeorar las cosas, tiendo a trabajar mejor hacia una fecha límite.
Lo que significa que ahora - mira el reloj - se acercan las 17:00 en el día
en que se debe enviar el boletín, y todavía lo estoy escribiendo.

Basta decir que esto no deja absolutamente ningún tiempo para que la gente traduzca mis
mis divagaciones, por lo que tiendo a recurrir a la traducción automática.  I
Sé que nuestros traductores _odian_ que lo haga, porque les perjudica en su trabajo.
su duro trabajo.
  
So, if you are reading this as a non-English edition and you find the
translation lacking, rest assured it's all my fault and our translators are not
to blame.

Por lo tanto, si está leyendo esto como una edición no inglesa y encuentra la
traducción es deficiente, puede estar seguro de que la culpa es mía y no de nuestros traductores.
la culpa.

joost


