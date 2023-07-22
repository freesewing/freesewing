---
date: "2023-04-01"
edition: "2023q2"
intro: "Bienvenido a la edición de primavera 2023 del boletín FreeSewing."
title: "2023 Edición de primavera"
---

Bienvenido a la edición de primavera 2023 del boletín FreeSewing.

Esto es lo que hemos incluido para ti hoy:

- ☕ Estar al día de todos los cotilleos más calientes de FreeSewing (lectura de 3 minutos - por Karen)
- 🐑 Convocatoria de pastores de patrones (lectura de 2 minutos - por Karen)
- 💵 En busca de 1000 verdaderos fans (lectura de 3 minutos - por Joost)
- 🕵️ Tras las costuras: Benjamin F. (lectura de 4 minutos - por Benjamin & Karen)
- 🦈 ¿Quieres escribir para el boletín? (Lectura de 1 minuto - por Karen)

&nbsp;

&nbsp;

## ☕ Mantente al día de todos los cotilleos más calientes de FreeSewing

Vale, eres un fan de FreeSewing, estás entusiasmado con la V3 y, mientras tanto, te preguntas dónde conseguir los cotilleos más calientes sobre lo que ocurre entre bastidores. ¡No temas! Tenemos soluciones para ti.

En primer lugar, ¿has consultado nuestro Discord [](https://freesewing.org/community/where/discord/)? Aquí es donde puedes ver todos los avances divertidos, como los patrones que se publicarán en la V3, recomendaciones y consejos sobre tipos de tejidos, accesorios difíciles de encontrar, mantenimiento de la máquina de coser, todas las novedades que los desarrolladores están preparando entre bastidores y mucho más. Si quieres estar realmente al corriente, aquí es donde hay que estar. (También es literalmente donde está, si quieres unirte a las llamadas quincenales de colaboradores de FreeSewing, que tienen lugar en el chat de voz).

Sin embargo, si odias Discord, aún hay opciones para ti. Benjamin F. (de "Detrás de las costuras") ha estado recapitulando lo más destacado de la Discordia como un debate de GitHub aquí: [Discord recaps](https://github.com/freesewing/freesewing/discussions/3523). Compruébalo para echar un vistazo rápido a los últimos temas candentes.

Y por último, pero no por ello menos importante, está por supuesto el propio sitio FreeSewing. Aunque algunas actualizaciones están en suspenso a la espera de la V3, todavía puedes echar un vistazo a nuestros Escaparates para ver algunas de las maravillosas e impresionantes cosas que los usuarios de FreeSewing han estado haciendo en los últimos meses. Algunos puntos destacados:

- El Hi más pequeño jamás fabricado: [MicroHi](https://freesewing.org/showcase/microhi)
- Este tutorial detallado sobre cómo hacer un hombro caído [Sven](https://freesewing.org/showcase/drop-shoulder-sven)
- Un juego a juego de [Florents multigeneracionales](https://freesewing.org/showcase/matching-florents)
- Cómo modificar [Aaron en un vestido de tirantes](https://freesewing.org/showcase/aaron-dress-by-ts)
- Un increíble e impecable [Classic Carlton de Boris](https://freesewing.org/showcase/carlton-by-boris) (¡fíjate en el bordado de refuerzo!) -->

...Y un montón más que no cabían aquí pero que son igualmente increíbles, y que tendrás que consultar en el Escaparate [](https://freesewing.org/showcase/) para saber más. 😉

&nbsp;

---

&nbsp;

## 🐑 Convocatoria para pastores de patrones

¿Eres una experta en la confección de un determinado patrón de FreeSewing? Tal vez hayas probado todas las opciones, o sepas por qué se descontrola en ciertos casos extremos, o lo hayas hecho para todos tus amigos y familiares como regalo... Si esto te parece cierto, entonces la tuya es exactamente la clase de experiencia que estamos buscando.

Como habrás notado, ¡FreeSewing está creciendo y añadiendo nuevas capacidades! Y cuando salga la V3, vendrán con ella varios patrones nuevos. Pero a todo patrón le vendría bien alguien que conociera sus debilidades y complejidades. Muchas veces, se trata del diseñador del patrón. En otros casos, es la persona que desarrolló la documentación del patrón. Y luego están los patrones que existen en el sitio de FreeSewing, pero su diseñador ha pasado a nuevos retos, o hace tiempo que nadie hace el patrón. Estos patrones a veces pueden ser presa de problemas de los que nadie se da cuenta. Luego, cuando los nuevos usuarios los prueban, puede ser una experiencia innecesariamente dura.

Un pastor de patrones es alguien que vigila las cosas para que esto no le ocurra a su patrón. No necesitas ser un prodigio de la programación ni un experto en costura para este papel, sólo alguien que esté familiarizado con el patrón, con lo que lleva y con cómo se une. Si algo se rompe, puedes arreglarlo tú mismo, pero también puedes enviar un informe de errores para que el resto de la comunidad lo sepa y reclute ayuda. Si esto te parece algo en lo que estarías interesado, ¡responde a este correo electrónico y dínoslo!

Bonificación: FreeSewing tiene un programa de recompensas por errores que te proporciona (a) nuestro eterno agradecimiento, y (b) a veces un estupendo botín.

&nbsp;

---

&nbsp;

## 💵 Buscando 1000 verdaderos fans

Hace unas semanas me di cuenta de que hace ya más de 6 meses que empezamos a trabajar en la versión 3 de FreeSewing, y eso es a la vez una eternidad y poco tiempo.

Es una eternidad si has estado esperando con ansia su lanzamiento. (Si perteneces a este grupo, por favor, ten paciencia porque hemos estado muy ocupados). Pero no es mucho tiempo si tienes en cuenta todos los cambios que estamos introduciendo en esta nueva versión principal. El otro día hice balance y me di cuenta de que no hay casi nada que no estemos rediseñando por completo o haciendo de forma diferente y mejor. Una breve lista que me viene a la cabeza:

- Base de datos: De MongoDB a Sqlite
- Backend: Completamente reescrito
- Javascript: De CJS/ESM a ESM puro, y de exportaciones por defecto a exportaciones con nombre
- Bundler: De Rollup a Esbuild
- Alojamiento: De Netlify a Vercel
- FreeSewing.dev: De Gatsby a NextJS
- FreeSewing.org: De Gatsby a NextJS, y siendo completamente reescrito
- Entorno de desarrollo: De CRA (Create React App) a NextJS
- Biblioteca de componentes: De MaterialUI/MUI a TailwindCSS/DaisyUI

Aquí me estoy ciñendo a los cambios técnicos, obviamente hay nuevas funciones y otras cosas que serán diferentes/mejores. Pero estas son las bases que están cambiando, así como el tipo de cosas que no te resultarán evidentes de inmediato.

Lo único que no está en la lista anterior es nuestro procesador de pagos (actualmente PayPal, probablemente migraremos a Stripe), lo que me lleva a lo único que no hemos cambiado (todavía): las Suscripciones.

Actualmente, tenemos 3 niveles de suscripción. 2, 4 y 8 euros al mes. Algunos usuarios se han puesto en contacto conmigo porque querían hacer más por FreeSewing y [hemos creado un plan de suscripción de 25 $/mes para esas almas generosas](https://static.freesewing.org/fs-25/).

Eso me hizo pensar en el modelo de suscripción y en cómo se financia el proyecto en general. Quizá recuerdes que el año pasado escribí que los ingresos de FreeSewing tendían ligeramente a la baja, y es algo que tiende a ponerme nerviosa cuando considero la cantidad de cambios que estamos haciendo. A la gente no le suelen gustar los cambios, y existe un cierto riesgo de que nos alejemos de la gente con la v3.

Por otra parte, el atractivo para las masas nunca ha sido nuestro lema. No necesitamos millones, [todo lo que necesitas son 1000 verdaderos fans](https://kk.org/thetechnium/1000-true-fans/). Así que en la v3, también revisaremos las suscripciones. Implantaremos un modelo puro de [paga lo que puedas](https://en.wikipedia.org/wiki/Pay_what_you_can) . Así que hoy puedes no pagar o pagar 2, 4, 8 o 25 euros/dólares al mes. En el futuro, seguirás pudiendo no pagar, o pagar lo que consideres correcto. Las suscripciones actuales no se cancelarán, aunque, por supuesto, puedes migrar al nuevo modelo de suscripción.

El futuro dirá si esto será bueno o malo para FreeSewing. Pero creo que apostar por nuestros verdaderos fans es nuestra estrategia ganadora. Así que eso es lo que haremos 🤞


&nbsp;

---

&nbsp;


## 🕵️ Tras las costuras: Benjamin F.

Benjamin (BenJamesBen en GitHub), colaborador de FreeSewing, nos ha asombrado últimamente con su trabajo de apoyo a FreeSewing. Así que le preguntamos si no le importaría ser el tema del boletín de este trimestre y, por supuesto, no sólo dijo que sí, sino que volvió con algo fantástico, divertido y único. Como siempre, ¡cualquier error, descuido, etc. es enteramente culpa del entrevistador!

### Háblanos de tu participación en FreeSewing.
Gracias por darme la oportunidad de hablar sobre FreeSewing. Creo que es una organización estupenda porque proporciona patrones gratuitos a la gente. Para mí, eso es lo mejor que hace FreeSewing. En Estados Unidos hay una tienda que tiene regularmente rebajas en las que puedes comprar patrones de papel por 2,00 USD, pero he oído que los patrones son mucho más caros en otros países. Y, en algunos lugares, los patrones de papel simplemente no están disponibles en las tiendas. ¡FreeSewing ofrece patrones gratuitos a todo el mundo!

### ¿Veo que haces mucho trabajo de codificación para FreeSewing?
Antes trabajaba haciendo cosas de informática (control de calidad y pruebas de software), y mi formación también es en informática. Gran parte de lo que he hecho en el pasado consiste en mirar el código que han escrito otras personas, averiguar lo que hace y solucionar problemas. Así que he cogido ese bagaje y lo he aplicado a FreeSewing, probando el sitio web y los patrones para asegurarme de que las cosas funcionan correctamente, intentando arreglar los errores que aparecen.

### ¿Eres también costurera?
En realidad es una buena pregunta, en un sentido filosófico. Tengo una máquina de coser y recibí clases de costura. Tengo un alijo de telas y múltiples proyectos inacabados en los que debería estar trabajando. Pero, ¿coser de verdad? Parece que no coso mucho. Paso mucho tiempo viendo vídeos de costura en YouTube. ¿Mirar vídeos de costura cuenta para ser costurera?

### ¿En qué proyectos inacabados evitas trabajar y en su lugar ves YouTube?
He empezado a trabajar en el diseño de una camisa pirata del siglo XVIII para FreeSewing. Todo el código está escrito, y produce patrones perfectamente. Sin embargo, en realidad no lo he probado para ver si los patrones generados tienen sentido desde el punto de vista del ajuste. (Adiviné las medidas del patrón, inventando números que parecían tener sentido). El siguiente paso es hacer una prenda de prueba para comprobar el ajuste, hacer modificaciones en el patrón y cambiar el código en consecuencia.

También le debo a mi hermana un cojín hecho a medida. (Básicamente, sólo necesito coser una bolsa rectangular con cierre de cremallera que ella pueda rellenar con espuma de memoria extra que tenga a mano). Y por último, mi primer proyecto original inacabado es una camisa de campamento de estilo hawaiano/bowling, Kwik Sew 3484. (Compré el patrón cuando Kwik Sew era su propia empresa y aún hacía patrones de prendas de vestir, si eso te da una idea de cuánto tiempo ha estado inacabado el proyecto).

### La camisa pirata suena interesante.
Lo elegí porque 1. En realidad quiero una camiseta pirata, y 2. Parecía un diseño bueno y fácil de hacer (¡todas las piezas son rectángulos!). Sin embargo, aunque me interesa algo la ropa histórica, no me interesan en absoluto los métodos de costura históricos, es decir, la costura a mano. Pienso utilizar una máquina de coser para coser mi camisa pirata.

Dato curioso: los piratas también cosían utilizando máquinas de coser (que cogían de los barcos que saqueaban). Sin embargo, en lugar de quitar los alfileres mientras cosían, dejaban los alfileres puestos y cosían por encima, lo que puede ser realmente peligroso. Por eso muchos piratas tenían que llevar parches en los ojos.

### ¿Dijiste que tenías una máquina de coser?
Es una máquina con la marca Kenmore que fue fabricada por Janome. Creo que era el modelo más básico disponible en aquel momento. Sin ajuste de longitud ni anchura de puntada, ojal de 4 pasos, bobina de carga frontal. La compré nueva en Sears, cuando Sears aún existía y vendía máquinas de coser. (¡Eso debería darte otra pista sobre cuánto tiempo lleva inacabado mi proyecto de camiseta de campamento!)

### ¿En qué proyectos de costura te gustaría trabajar en el futuro, suponiendo que termines tus proyectos inacabados?
Me gustaría hacer mi propio jamón de sastre. (Otro patrón sencillo: sólo dos óvalos). Estoy pensando en hacerme mis propios calzoncillos, ya que necesito unos nuevos. Aunque no estoy segura de si sería más práctico o rentable comprarlos simplemente en la tienda. Además, me intimida un poco coser tejido de punto. También me he interesado por los patrones para coser tu propia forma de vestido/maniquí a medida. Sin embargo, parece que podría ser un proyecto demasiado difícil.

Por último, algún día me gustaría hacer una prenda con tela de tapicería o de cortina. Parece que podría ser un reto interesante utilizar ese tipo de tela. Además, Scarlett O'Hara llevaba un vestido hecho con cortinas, y como resultado consiguió casarse con Rhett Butler. María confeccionaba ropa con cortinas y consiguió casarse con el capitán Von Trapp. (Y, ¡casi fue monja!) Si hiciera ropa con cortinas, ¡imagínate con quién podría casarme!?

### Volviendo a la codificación, ¿es una tarea difícil crear un patrón de FreeSewing? Estoy pensando en personas que podrían ser costureras experimentadas que pueden diseñar patrones pero que no tienen conocimientos de codificación.
No es necesariamente difícil convertir un patrón existente en código. El primer reto es aprender a pensar en cómo se dibuja el patrón y describirlo en términos de medidas y ángulos. Algo así como si tuvieras que describirle a alguien por teléfono o a través de mensajes de texto cómo redactar un patrón. Una vez que seas capaz de escribir instrucciones como "dibuja un Punto A", "dibuja otro punto 10 cm en un ángulo de 45 grados por encima y a la derecha de A y etiquétalo como Punto B", "dibuja una línea entre el Punto A y el Punto B", etc., podrás traducir las instrucciones de dibujo a código.

El siguiente reto podría ser tomar el patrón existente que se hizo para una persona concreta y pensar en cómo podría convertirse en patrones para otras personas con medidas diferentes. Tendrías que pensar: "¿por qué la medida del tejido de esta pieza era de 10 cm? Si es porque era ligeramente mayor que la circunferencia de la muñeca, entonces quizá la medida podría convertirse en "la circunferencia de la muñeca, más un 10%". Creo que el conjunto de habilidades podría ser similar al de la clasificación de patrones.

Para la codificación en sí, quizás la mejor manera de aprender (aparte de hacer un curso formal de codificación, de los que hay muchos gratuitos en Internet) sea mirar el código de un diseño existente de FreeSewing. Sospecho que mucha gente aprende a codificar mirando el código existente, copiándolo y haciéndole cambios para ver qué hacen los cambios. FreeSewing proporciona una herramienta de laboratorio que te permite ver los cambios en los diseños que haces o editas, para que puedas jugar con las cosas y aprender de la experimentación. Si necesitas ayuda o te quedas atascado, ¡hay mucha gente en el Discord que estará encantada de ayudarte!

### Gracias. ¿Algunas palabras finales?
Me parece sorprendente que la comunidad FreeSewing sea tan diversa geográficamente, esté repartida por todo el mundo y aún así sea capaz de comunicarse y ayudarse mutuamente. Me alegro de formar parte de esta comunidad. Aunque, se me ocurre que con el anonimato de Internet, nadie me ha visto realmente ni sabe quién soy. Por lo que todos saben, podría ser un gato en Internet haciéndome pasar por una persona. (Si fuera un gato, esto no se consideraría "catfishing". Los gatos lo llamamos simplemente "pescar")

&nbsp;

---

&nbsp;




## 🦈 ¿Quieres escribir para el boletín?

¡Eh! Soy Karen, tu amiga de las llamadas a colaboradores [](https://freesewing.org/community/calls/), el Discord [](discord.freesewing.org), ¡y un montón de cosas escritas en este boletín! Cada trimestre, publicamos este boletín para mantener a la gente al día de las novedades de FreeSewing, actualizaciones interesantes, logros impresionantes, proyectos extraños, etc. Pero sólo funciona porque hay toda una cohorte increíble de gente creando, diseñando y contribuyendo. (Aquí es donde entras tú).

Si lees este boletín y piensas:
- "¿Pero qué pasa con la pregunta de rellenar el espacio en blanco?" o
- "Ooh, eso me recuerda a un proyecto de FreeSewing en el que he estado trabajando entre bastidores..." o
- "¡Vaya, ojalá alguien hiciera una inmersión profunda en este tema!"

...Nos encantaría saberlo. Y si quieres escribir tú mismo ese artículo, pues yo personalmente estaré encantado y te ayudaré en todo lo que pueda para hacer realidad esa posibilidad.

Tal vez hayas confeccionado una prenda que requirió un poco de ingenio o que cobró vida propia, y estás muy orgulloso de ella. Tal vez tengas una bifurcación del monorepo FreeSewing en la que estés retocando algo emocionante. Tal vez no sepas sobre qué te gustaría escribir, pero te encanta FreeSewing y quieres contribuir, o esperas aumentar tu credibilidad como escritor de renombre. (Vale, en realidad, lo de reputado puede ser una exageración, pero eso forma parte de nuestro encanto).

¡Extiende la mano! Puedes encontrarnos en [Discord](discord.freesewing.org), o en [Github](https://github.com/freesewing/), o simplemente puedes responder a este correo electrónico. Nos encantaría saber de ti. 🧡


