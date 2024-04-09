---
date: 2024-04-01
edition: 2024q2
intro: Bienvenido a la edición de primavera 2024 del boletín FreeSewing.
title: 2024 Edición de primavera
---

Bienvenido a la edición de primavera 2024 del boletín FreeSewing.

Esto es lo que tenemos hoy para ti, no es broma:

- 👕 FreeSewing 3.2 trae Tristan, Lumina, Lumira y más (lectura de 3 minutos por joost)
- 📨 El correo electrónico se ha vuelto más difícil, otra vez (lectura de 1 minuto por joost)
- 🕸️ Construir la red de confianza de FreeSewing tras el intento de backdoor del XZ (5 minutos por joost)
- 🤔 Cómo han cambiado los retos de FreeSewing con el tiempo (lectura de 2 minutos por joost)

¿Empezamos?

&nbsp;

&nbsp;

## 👕 FreeSewing 3.2 trae Tristan, Lumina, Lumira y más

Lanzamos FreeSewing v3.2 a principios del primer trimestre de 2024 e incluye 3 nuevos diseños de
, así como una serie de correcciones de errores y mejoras.

Echemos un vistazo a lo más destacado:

### The Tristan Top

En primer lugar, está [el Tristan Top](https://freesewing.org/designs/tristan). Tristán es un top con costuras princesa y lazada (opcional) delante y/o detrás. Su historia de origen es la necesidad de un disfraz para una fiesta renacentista, así que probablemente sea un buen indicador de lo que cabe esperar.

Tristán fue diseñado por Natalia, que también [escribió una entrada en su blog sobre el nuevo diseño de Tristán](https://freesewing.org/blog/our-newest-design-is-the-tristan-top), así que ese es un buen lugar para obtener todos los detalles sobre este nuevo diseño.

### The Lumina and Lumira Leggings

Te daré un segundo para que vuelvas a escanear ese título, pero sí, hay dos patrones de leggings diferentes con nombres similares: [los Leggings Lumira](https://freesewing.org/designs/lumira) y los [Leggings Lumina](https://freesewing.org/designs/lumina).

Ambos nacieron del deseo de Wouter de tener una buena equipación ciclista, y te sugiero que consultes las notas del diseñador tanto de [Lumina](https://freesewing.org/designs/lumina#notes) como de [Lumira](https://freesewing.org/designs/lumira#notes) para apreciar plenamente la diferencia entre estos diseños, por qué difieren y qué te iría mejor a ti.

### Bug fixes and improvements

Los lectores habituales del boletín sabrán que en FreeSewing.org introducimos continuamente mejoras en
y que éstas no están vinculadas a una nueva versión,
pero es una buena oportunidad para enumerarlas, así que aquí tienes algunos puntos destacados de las correcciones de errores
y mejoras que se han incluido en la versión 3.2:

- Sandy tiene una nueva opción de paneles
  &#x20;que fue
  añadida por [Paula](https://github.com/freesewing/freesewing/pull/5861). Tú
  podrías crear tu falda circular a partir de una serie de patrones similares haciendo tú misma la combinación, pero ahora el patrón se encargará de ello por ti.
- Lo que empezó como un informe de error sobre la facilidad de los bíceps en
  Jaeger acabó con un cambio en
  sobre la forma de calcular el contorno de los brazos en Brian, en concreto sobre la profundidad
  de la sisa. Dado que Brian es nuestro bloque más fundacional, esto
  tendrá efectos dominó en muchos otros diseños, puedes esperar que, fuera de la caja
  , el codo de los brazos llegue un poco más abajo.
- En [Carlton](https://freesewing.org/designs/carlton) - y, por tanto, en
  [Carlita](https://freesewing.org/designs/carlita) - hemos arreglado y emitido
  en el que el margen de costura del cuello interior estaba mal trazado.
- En [Charlie](https://freesewing.org/designs/charlie), el ribete del bolsillo trasero
  (4) y el ribete del bolsillo delantero (8) indicaban incorrectamente cortar 2 en lugar de 4
  en la lista de cortes. This too is resolved.
- En [Hugo](https://freesewing.org/designs/hugo), hemos corregido un error que hacía que
  el diseño diera error cuando el ajuste completo estaba desactivado, y hemos solucionado un problema
  por el que la abertura del bolsillo delantero se hacía cada vez más estrecha a medida que aumentaba la circunferencia de la cadera
  .
- Hemos añadido un nuevo método
  [Path.combine()](https://freesewing.dev/reference/api/path/combine) a
  [nuestra API central](https://freesewing.dev/reference/api). Sus orígenes se encuentran en un debate de
  en issue
  \#5976 que fue
  archivado originalmente como un informe de error sobre cómo Path.join() conecta los huecos en las rutas unidas
  -causados por operaciones de `movimiento`, o por una diferencia entre
  el punto final y el punto inicial de las rutas unidas- para rellenarlos con un segmento de línea
  . Ese comportamiento es el esperado/intencionado, pero hemos añadido
  `Path.combine()` para facilitar el otro comportamiento: Combinar distintas rutas
  en un único objeto Ruta sin alterar ninguna de sus operaciones de dibujo.
- La macro [title](https://freesewing.dev/reference/macros/title) ahora puede configurarse
  con un ajuste `notes` y `classes.notes` en su configuración, lo que permite a los diseñadores
  añadir notas a (el título de) una parte de patrón.
- Nuestro [plugin i18n](https://freesewing.dev/reference/plugins/i18n) ahora admite
  ahora admite la traducción de matrices anidadas de cadenas, lo que da a los diseñadores
  más flexibilidad para concatenar partes traducidas de cadenas.

La [entrada del blog del anuncio de FreeSewing 3.2](https://freesewing.org/blog/v3-2-0) tiene todos los detalles.

&nbsp;

---

&nbsp;

## 📨 El correo electrónico vuelve a ser más difícil

Si estás leyendo esto en tu bandeja de entrada, y no una copia archivada en
FreeSewing.org, entonces hemos podido enviarte este correo electrónico, lo cual es una buena noticia
.

Lo que quizá no sepas es que hacerlo no es precisamente trivial, y no lo ha sido
durante años. Pero recientemente, las cosas se han vuelto aún más complejas.  Gmail
(Google) y Yahoo, por ejemplo, han implementado nuevas restricciones en el primer
trimestre de
2024 lo que
requiere un trabajo adicional por nuestra parte para maximizar las posibilidades de que este correo
llegue realmente a tu bandeja de entrada.

Además, los denominados _remitentes de correo electrónico masivo_ están sujetos a los controles más estrictos de
. Si envías 5000 mensajes al día, se te considera un remitente masivo y
estará sujeto a un escrutinio adicional. Como este boletín tiene unos 14.000 suscriptores en
, se nos exige el máximo nivel de calidad.

Obviamente, a nadie le gusta el spam, y no estoy abogando en contra de estas normas.
Lo que ocurre es que la cantidad de tiempo y esfuerzo necesarios para hacer que algo tan
aparentemente trivial como enviar un correo electrónico funcione a escala es cada vez mayor, ya que
internet tiende hacia un modelo de pago por jugar de facto.

Por ahora, sigo haciendo esos esfuerzos, y espero que hayan sido suficientes
para que esto llegue a tu bandeja de entrada. Pero es algo que tal vez tengamos que volver a examinar más adelante
si se convierte en una carga cada vez mayor para nuestro tiempo y recursos limitados.

&nbsp;

---

&nbsp;

## 🕸️ Construir la red de confianza de FreeSewing tras el intento de backdoor del XZ (5 minutos por joost)

Dependiendo de dónde obtengas tus noticias, puede que hayas oído o leído sobre
el intento de backdoor de la utilidad de compresión xz
.

En pocas palabras, un actor malicioso intentó introducir una puerta trasera en esta utilidad
, que en última instancia era un intento de introducir un exploit RCE en
SSHd.

O, en términos de [ELI5](https://en.wiktionary.org/wiki/ELI5): Alguien aportó código
a una pequeña biblioteca que tenía intenciones nefastas. Se hizo de forma furtiva
y el objetivo final no era la propia biblioteca, sino otro proyecto de software
que utiliza esta biblioteca: El Deamon Secure Shell. Un _daemon_ no es más que una palabra más guay de
para designar un _servicio_ en un ordenador, porque ¿por qué no hacer las cosas más guays?
Este demonio o servicio concreto, el demonio _secure shell_, se encarga de
gestionar las conexiones secure shell (SSH). Es el estándar de oro para la gestión remota
de sistemas Linux (y unix).

El código introdujo de contrabando una puerta trasera RCE cerrada. RCE significa _ejecución remota de código
_, lo que significa que te permite _hacer cosas_ remotamente sin necesidad de autenticarte en
ni nada. O dicho de otro modo, permite controlar
un sistema informático remoto al que normalmente no debería tener acceso.
El hecho de que esté _gated_ significa que el autor de
el código malicioso tomó medidas para asegurarse de que sólo él podía utilizar el código malicioso de
. Como una puerta trasera con llave.

Es difícil exagerar la gravedad de este intento de backdooring esencialmente
todos los sistemas Linux del planeta.  No sólo es el sistema operativo
más utilizado del mundo, sino que su dominio de los sistemas operativos de servidor es abrumador.
O como suelo decir: _Todo lo que importa funciona en Linux_.

Se trata de una historia en curso y, por mi parte, espero que se convierta en una miniserie de Netflix
protagonizada por David Cross en el papel de Andres
Freund, pero estoy divagando. Este es el boletín de FreeSewing
, así que quería sacar algo de esta historia que creo que
es relevante para FreeSewing, o realmente para cualquier proyecto de código abierto que exista.

### El agotamiento del mantenedor y la larga estafa de ganarse la confianza

Uno de los elementos fascinantes de esta historia es _quién_ aportó los cambios,
y por qué se aceptaron sin un escrutinio suficiente para revelar la intención maliciosa
de la aportación.

Porque el usuario que las hizo había estado contribuyendo durante **years** al proyecto
y a la luz de este trabajo había ascendido de estatus hasta un nivel en el que había mucha
confianza implícita basada en su trabajo, a pesar de no saber casi nada sobre
quién o qué hay detrás del nombre de usuario `JiaT75` (en este caso). Una estafa tan _larga_ es
una inversión significativa de tiempo y esfuerzo, por lo que la suposición que se mantiene actualmente
es que se trataba de un actor de un Estado-nación (piensa en la NSA o en el equivalente a
de algún otro país).  También es importante señalar que el mantenedor de xy tenía
dificultades para hacer frente a la larga cola de responsabilidades que supone mantener el software
y buscaba activamente ayuda para evitar el agotamiento.  Se trata de un escenario
que es sorprendentemente común en los proyectos de código abierto y crea una situación
en la que los actores maliciosos pueden aprovecharse con demasiada facilidad de los agotados mantenedores de
, desesperados por descargar parte del trabajo.

### Establecer una red de confianza

Este problema de _en quién puedes confiar_ no es, por supuesto, nuevo. Una forma de contrarrestarlo
es estableciendo una _red de confianza_.  Así es como se hacen las cosas en los grandes proyectos de software de código abierto
en los que participan muchos voluntarios, como el proyecto Debian
.

En términos prácticos, esa red de confianza se construye sobre relaciones entre
personas que conocen y han verificado la verdadera identidad de las demás.  Por ejemplo,
hay varias personas en la comunidad FreeSewing que he conocido en la vida real
. No sólo nos hemos visto cara a cara, sino que hemos pasado tiempo juntos, sabemos
dónde vivimos, conocemos a la pareja o a la familia del otro, o tenemos algún otro
modo tangible que proporciona un alto nivel de seguridad de que esta persona es realmente
quien dice ser.

Esas personas, a su vez, pueden tener conexiones similares con otras a las que conocen,
han conocido y en las que confían a un nivel que va mucho más allá del mundo online.  Este
crea una red de confianza en la que puedes confiar en tus amigos, y los amigos de
en tus amigos, y así sucesivamente.

A la luz de los acontecimientos actuales, y en reconocimiento de la rápida aceleración de
lo que es posible con la inteligencia artificial generativa, FreeSewing
restringirá a partir de ahora todo acceso de escritura o privilegios elevados a los miembros de la comunidad
que formen parte de la red de confianza de FreeSewing.

Por supuesto, seguiremos aceptando -o mejor dicho, revisando- las contribuciones de
de todo el mundo. Pero los permisos que desbloquean la posibilidad de hacer daño estarán
restringidos a las personas para las que se haya establecido la confianza AFK (lejos del teclado
).

Para facilitar la construcción de esa red de confianza, empezaremos a documentar
esas conexiones entre personas.  Esto permitirá a las personas que deseen
asumir más responsabilidades dentro de FreeSewing mirar su red de confianza y
ver quién vive cerca de ellos para que puedan engancharse a nuestra red de confianza a través de
esa persona.

Soy consciente de que es extremadamente improbable que FreeSewing sea el objetivo de un intento de
por la puerta trasera por parte de un actor de un estado nación, pero adoptar las mejores prácticas y ser
transparente sobre cómo hacemos las cosas es una buena idea a pesar de todo.

Así pues, empezaré a construir y documentar esta red de confianza en las próximas dos
semanas, y revisaré todos los controles de acceso y permisos para asegurarme de que estamos
haciendo todo lo posible para evitar que incluso los actores más dedicados envenenen
el pozo.

&nbsp;

---

&nbsp;

## 🤔 Cómo han cambiado los retos de FreeSewing con el tiempo

¿Sabías que FreeSewing v1 se lanzó hace 7 años y 7 días
?  Desde entonces hemos
hecho muchos cambios grandes y pequeños, y nuestra biblioteca central y el sistema de plugins han
madurado hasta convertirse en una forma fiable -y ciertamente opinable- de diseñar patrones de costura paramétricos
.

Los retos más interesantes desde el punto de vista técnico se han resuelto más o menos en
. Lo que queda es la parte de cara al usuario, o
la experiencia del usuario (UX), como nos gusta llamarla.

FreeSewing puede hacer muchas cosas, así que ¿cómo poner toda esa funcionalidad a disposición de los usuarios de
sin abrumarlos? ¿Es eso posible incluso en el móvil, que es la
forma dominante en que la gente se conecta ahora a Internet. ¿Cómo creas una experiencia intuitiva,
o guías a alguien que llega a FreeSewing.org después de una búsqueda en Google de _patrones de costura gratuitos_
hacia la comprensión de lo que es y hace FreeSewing en el puñado de
segundos en que es probable que la gente le dé una oportunidad antes de pasar al siguiente enlace
de sus resultados de búsqueda?

Para que quede claro: no conozco la respuesta a estas preguntas. Pero es
cada vez más a lo que dedicamos nuestro tiempo. El porcentaje de personas que
utilizan nuestro software directamente es insignificante comparado con la cantidad de personas que
(sólo) consumen nuestro software a través de nuestro sitio web. Para la mayoría de los visitantes, FreeSewing
**is** un sitio web y si es otra cosa, probablemente no les quede claro,
o ni siquiera sea relevante.

Obviamente, hay margen de mejora, pero a menudo no hay un camino obvio
hacia adelante. Tal vez -o debería decir casi seguro- éste sea un ámbito en el que
carezca de talento o habilidad para idear algún tipo de gran estrategia global
. Pero me encuentro cuestionando muchas de mis propias ideas o impulsos
en este ámbito.

Así que me preguntaba si podríamos hacer un pequeño experimento. Un experimento en el que
te plantea -a mi querido lector- una pregunta sencilla. ¿Estás preparado? Aquí
está la cuestión:

> \*\*¿Qué es FreeSewing?

Me encantaría escuchar tu respuesta. Puedes simplemente pulsar responder para hacérmelo saber.

<small>_PS: He enterrado esta pregunta al final porque creo que si has leído todo
lo que había antes, probablemente quiera oír lo que piensas.</small>
