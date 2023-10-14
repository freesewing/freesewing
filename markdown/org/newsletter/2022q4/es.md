---
date: "2022-10-01"
edition: "2022q4"
intro: "2022 Edición de otoño"
title: "2022 Edición de otoño"
---

Bienvenido a la edición de otoño de 2022 del boletín FreeSewing. Esto es lo que te espera hoy:

- 🏁 FreeSewing 2.22 ha salido y será la versión final v2 (lectura de 1 minuto - por Joost)
- 🔱 FreeSewing versión 3; ¿Qué es y cuándo puedes esperarlo? (Lectura de 3 minutos - por Joost)
- 🚀 Hemos superado el hito de los 50.000 commits (lectura de 1 minuto - por Joost)
- ⛵ FreeSewing en el Serendiep de Rotterdam (lectura de 1 minuto - por Lexander)
- 🕵️ Tras las costuras: Enoch (lectura de 4 minutos - por Karen & Enoch)

¡Vamos allá!

&nbsp;

&nbsp;

## 🏁 FreeSewing 2.22 ha salido y será la versión final v2

FreeSewing 2.22 salió a finales de agosto, con un nuevo diseño de peluche de Wouter, que también firmó por Hi el tiburón.  Esta vez se trata de [Octoplushy](https://freesewing.org/designs/octoplushy/) que es, lo has adivinado , un pulpo.

Lo que sin duda es menos adorable, pero quizá no relevante, es que ésta será la última versión menor de la versión 2.  Así es, la versión 3 de FreeSewing está a punto de llegar , y aunque seguimos dando soporte a la versión 2 -por no mencionar que sigue alimentando FreeSewing.org- nuestra atención se centra ahora en la próxima gran versión : FreeSewing v3.

&nbsp;

---

&nbsp;

## 🔱 FreeSewing versión 3; ¿Qué es y cuándo puedes esperarlo?

Desde hace algo más de un mes, hemos puesto la base de código de la versión 2 en almacenamiento a largo plazo y hemos empezado a trabajar para la versión 3. Y aunque pasará un tiempo antes de que se ponga en producción -lo que significa FreeSewing.org para nosotros-, me gustaría hacer un breve recorrido por algunas de las cosas que están ocurriendo ahora mismo con la versión 3 de FreeSewing y que personalmente más me entusiasman.

### Configuración a nivel de pieza, también conocido como soporte de paquetes

En [nuestra hoja de ruta](https://github.com/freesewing/freesewing/discussions/1278) -que si has estado atento tiene cada vez más cosas bajo el epígrafe *ya implementadas* - teníamos el llamado apoyo a *paquetes*. La idea era que nos encantaría hacer posible la creación de diseños combinando libremente distintos componentes. Por ejemplo, podrías obtener las mangas de un paquete de mangas ** y el cuello de un paquete de cuello **, añadir algunos bolsillos de un paquete de cuello ** y así sucesivamente.

Es una de esas cosas que tienen mucho sentido, pero plantea la pregunta: ¿Cómo funcionará todo esto bajo el capó? En la v2 de FreeSewing, poner en práctica estas ideas no habría sido trivial porque, aunque admitimos la ampliación de patrones a otros diseños, el proceso es demasiado engorroso para este nivel de mezcla ad hoc de diferentes diseños.

Así que eso es algo que queríamos abordar en la versión 3, y para ello hemos trasladado esencialmente toda la configuración al nivel de pieza. Por ejemplo, una pieza de manguito tendrá sus propias opciones definidas y una lista de las medidas que necesita, etc. Ahora puedes simplemente sacar esa parte de la manga del diseño (o en el futuro un paquete de mangas) y utilizarla en tu propio diseño sin tener que preocuparte de medidas y opciones, etc.

Es el cambio más fundamental de la V3, pero es algo que abrirá la puerta a un montón de combinaciones creativas de varios diseños en el futuro.

### Soporte para múltiples conjuntos de ajustes, o como nosotros los llamamos Conjuntos múltiples

En última instancia, los patrones se redactan para los usuarios pasándoles un montón de ajustes **. Las medidas a utilizar, cómo te gustaría que fueran las opciones a tu manera, etc.

En la versión 3 de FreeSewing, seguirás pudiendo pasar varios conjuntos de estos ajustes al patrón. Esto tiene un montón de aplicaciones interesantes. Por ejemplo, si trabajas con un cuerpo asimétrico, podrías pasar dos conjuntos diferentes de medidas y decir "*dame esas partes con esas medidas, y las otras partes con esas medidas*".

También utilizamos esta nueva función bajo el capó para gestionar la forma en que *muestra los patrones de* . Que es cuando comparamos varias iteraciones de un patrón entre sí. Esto solía estar un poco atornillado en la parte superior de una forma semiincómoda. Pero en la versión 3, es tan sencillo como compilar una lista de diferentes conjuntos de ajustes (como uno se cansa de teclear/decir *conjuntos de ajustes* con bastante rapidez, nos referimos a ellos como *multisets*) y entonces podemos *simplemente* pasarlos al patrón y éste *simplemente funciona*.

### Soporte de pila

Estrechamente relacionado con el soporte de conjuntos múltiples está el soporte de pilas en la fase de disposición. Las pilas son un poco como las capas de **. Normalmente, al maquetar, cada pieza es algo propio y las maquetamos individualmente. Ahora, puedes decir que las distintas piezas forman parte de la misma pila ** y se apilarían unas sobre otras en la maqueta, como capas.

Una vez más, es algo que utilizamos internamente para parte de nuestro trabajo de muestreo/comparación, pero también abre posibilidades interesantes y tengo curiosidad por ver cómo acabará utilizando la gente estas funciones.

### Y mucho más

Realmente hay mucho más en la versión 3, con mejoras y ajustes grandes y pequeños. Pero estos son algunos de los cambios más fundamentales. También seguimos trabajando en ello, así que si tienes una gran idea, [nuestra hoja de ruta](https://github.com/freesewing/freesewing/discussions/1278) es la manera más formal de proponerlas. Para una charla más informal, pásate por [el Discord de FreeSewing](https://discord.freesewing.org/) donde pasamos el rato y coordinamos nuestro trabajo.

### ¿Para cuándo la versión 3?

La respuesta breve a cuándo puedes esperar la versión 3 es *en algún momento de 2023*. Si te parece largo, es porque realmente estamos rehaciendo las cosas desde cero. Los cambios descritos anteriormente son realmente cambios fundacionales, y tienen que propagarse por toda la maquinaria construida sobre esos cimientos antes de que todo pueda unirse en algo que pueda publicarse en FreeSewing.org.

Y también queremos asegurarnos de que lo hacemos bien. Así que seguiremos adelante y lo publicaremos cuando esté listo.

&nbsp;

---

&nbsp;

## 🚀 Hemos superado el hito de los 50.000 commits

Hace un par de días, cruzamos el umbral de los 50.000 commits [en nuestro monorepo](https://github.com/freesewing/freesewing).

Los números en sí mismos no son realmente tan significativos, por no mencionar que siempre se puede jugar con el sistema. Por tanto, no quiero decir que este hito en sí mismo tenga algún tipo de significado especial. Pero creo que en un momento en que la mayor parte del trabajo (en la v3) se está realizando entre bastidores, sirve como un buen recordatorio de que FreeSewing es un poco como un cisne. Puede parecer que se desliza hacia delante aparentemente sin esfuerzo a un ritmo constante, pero hay un frenético pedaleo bajo la superficie.

&nbsp;

---

&nbsp;

## ⛵ FreeSewing en el Serendiep de Rotterdam (lectura de 1 minuto - por Lexander)

FreeSewing fue invitado a unirse a una exposición organizada por Serendiep, que es una nave que alberga arte y ciencia, con un espacio teatral y máquinas en su interior. La exposición, de una semana de duración, formaba parte de un todo mayor: la ciudad de Rotterdam celebra el 150 aniversario de uno de sus canales.

El taller comenzó conmigo, Lexander, presentando FreeSewing y explicando el concepto, y pasamos la tarde confeccionando una Teagan sin mangas como camisa de dormir. Estuvimos con un grupo de pocas personas e hicimos todo el proceso de FreeSewing: tomar las medidas, montar el patrón de papel, cortar las piezas de tela y coserlas.

El Teagan encajaba muy bien y, en general, ¡fue una experiencia muy divertida! Espero con impaciencia lo que nos deparará el futuro.

&nbsp;

---

&nbsp;

## 🕵️ Tras las costuras: Enoch

Uno de nuestros anfitriones de la Llamada a Colaboradores se sentó (virtualmente) con Enoch para conocer un poco más su trayectoria y su viaje hasta convertirse en colaborador de FreeSewing. La entrevista que figura a continuación ha sido editada por razones de longitud, y cualquier error, omisión, etc. es enteramente culpa del entrevistador.

### ¿Cómo conociste FreeSewing?

Aprendí a coser en la escuela primaria, pero desde entonces no había cosido mucho hasta la pandemia. En marzo de 2020, justo antes del encierro, terminé un proyecto de larga duración, así que, como mucha gente, me encontré con algo de tiempo libre. Justo antes había recibido por fin un diagnóstico que explicaba mi lucha de décadas contra el agotamiento (el síndrome de las piernas inquietas, entre otras cosas), y medicarlo significaba que por primera vez tenía energía suficiente para tener intereses y aficiones.

Así que desempolvé mi vieja máquina de coser y me puse a jugar. En algún momento intenté hacer una pieza para la que no podía encontrar un patrón, así que aprendí lo suficiente de dibujo de patrones como para juntar algo para hacerla realidad. Como soy programador y me interesa el código abierto, una vez que lo hice en papel para mí, quise automatizarlo, y al automatizarlo quise ponerlo a disposición del mayor número posible de personas. Decidí que necesitaba un patrón paramétrico y probé varias cosas antes de encontrar FreeSewing.

### ¿Cómo te convertiste en colaborador?

Una vez que empecé a desarrollar patrones en FreeSewing, me encontré pensando: "Sería genial que existiera esto. Sería genial que existiera eso". Por ejemplo, mientras diseñaba, quería poder generar dibujos lineales para ver cómo afectarían los distintos ajustes y medidas a las prendas acabadas, y luego quería poder colocar mis telas y ver cómo quedarían en los diseños. Añadir los tipos de opciones personalizadas que quería no fue muy sencillo, así que mi primer RP consistió en intentar que fuera más fácil sustituir pequeñas partes del banco de trabajo. Mis primeros PR rompieron algunas cosas, así que me involucré más en intentar limpiar lo que ensuciaba. Y entonces me metí de lleno en ello.

He trabajado antes en software de código abierto en pequeñas cantidades, y he sido el único desarrollador en software que técnicamente era de código abierto, pero ésta es la primera vez que formo parte de la comunidad de un software de código abierto, y estoy encontrando esa parte realmente gratificante. Tener a toda esta gente centrada en todas estas áreas diferentes para hacerlo bien, y todos en comunicación constante entre sí es genial. El elemento humano realmente importa, y FreeSewing tiene mucho que ver con el elemento humano a todos los niveles. Me impulsa a contribuir a un nivel más alto y constante. Y creo que Joost merece mucho crédito por haber escrito esta cosa masiva y aún así conseguir fomentar realmente esta comunidad en torno a su construcción y mejora.

### ¿Cuál ha sido tu trabajo como colaborador hasta ahora?

He hecho algunas cosas más pequeñas, pero hay dos grandes en las que he trabajado, ¡y una que aún está en preparación!

La primera es poner en marcha Gitpod. Gitpod te permite hacer tu desarrollo en el navegador, para que no tengas que gestionar las dependencias localmente. Esto es especialmente útil para los desarrolladores de Windows, porque nuestro entorno no es muy amigable con Windows, y no está soportado oficialmente. También he enviado recientemente algunas actualizaciones al entorno para facilitar las cosas a la gente de Windows que realmente prefiere desarrollar localmente.

La segunda es una actualización de la herramienta Diseño de impresión para el Laboratorio. He rediseñado la función de movimiento y rotación para que funcione con más fluidez y ahora tenemos rotación encajada además de rotación libre. También he revisado nuestro sistema de exportación a PDF para que, cuando lo exportes, tenga el aspecto que esperas en función de cómo lo hayas maquetado. Ahora tenemos mucho más control sobre el embaldosado, y Joost no tiene que mantener ningún código C junto con todo lo demás.

Aún está en progreso la herramienta Disposición de corte, que te permitirá especificar un ancho de tela y disponer todas las piezas (y si tienes que cortar dos, te dará dos de ellas) para que puedas calcular cuánta tela necesita tu patrón.

### ¿Eres costurera? ¿Un programador? ¿Ambos? ¿Ninguno de los dos?

Ambas cosas. Pero definitivamente he codificado más. Ese es mi trabajo, así que lo he hecho casi todos los días durante diez años.

### ¿Cuándo y por qué empezaste a coser?

Empecé a coser muy pronto: recibí clases de costura en la escuela primaria y mi padre me compró una máquina de coser a cambio de prometerle que le haría el dobladillo a todos sus pantalones (cosa que nunca hice). Después, salvo uno o dos semestres de diseño de vestuario en la universidad, apenas volví a coser hasta hace poco. Sin embargo, ¡aprendí a utilizar una máquina industrial!

### ¿En qué estás trabajando actualmente?

Últimamente he ido despacio, pero siempre tengo ideas: tengo un montón de cosas atrasadas que quiero hacer para mi pareja, y también trabajo la madera y estoy restaurando un escritorio de acero de petrolero y unas mesas auxiliares de palisandro de mediados de siglo, y estoy trabajando en un diseño para el patio trasero y delantero de mi casa. Aprendí mucho de modelado 3D durante la pandemia, y ahora está refrescando lo suficiente (en el sur de EE.UU.) como para trabajar en el jardín.

### ¿Qué proyecto acabas de terminar?

Acabo de terminar una túnica para mi pareja, y diseñé el traje que llevé a la boda de mi hermana.. Entregué el diseño a un sastre, pero cuando me entregaron el traje, las mangas estaban sujetas de la manera más desconcertante, y acabé teniendo que sujetarlas yo mismo. Ha quedado precioso, aunque sigo descontenta con las mangas.

### ¿Qué es lo que más te gusta de la costura?

Me gusta que la costura abra el mundo. Puedes realizar o arreglar o personalizar lo que quieras, y coser te permite conseguir un ajuste perfecto (o al menos intentarlo…), sea lo que sea lo que eso signifique para ti.  Soy una persona muy orientada a la estética que fue criada por personas muy orientadas a la estética, y creo en el poder transformador de la ropa, así que es estupendo poder asumir ese control por ti misma. Además, me encanta tener cualquier habilidad, y la costura es realmente toda una categoría de habilidades que te permite imaginar una cosa y decir: "Sí, podemos hacer eso".

### ¿Qué es lo que más odias de la costura?

Rasgar costuras, que tengo que hacer un montón. Y a veces siento que hay demasiados pasos para hacer las cosas que me interesa hacer.

Por un lado, soy muy ambiciosa, pero por otro soy muy reacia al riesgo y muy perfeccionista, así que tengo que hacer como 3 muselinas antes de tener una versión final de algo. Pero luego me distraigo, lo que da lugar a un montón de prototipos que me pongo aunque sean más una prueba de concepto que una prenda real. El ejemplo más extremo es de cuando era adolescente: Estaba experimentando con hacer mis propias carpetas de pecho, y la primera que hice que funcionó, que llevé probablemente durante dos años, estaba sujeta con cintas e imperdibles. Con el tiempo necesité una nueva, que cosí completamente, pero durante esos dos primeros años puedes ver el contorno de los imperdibles a través de mi camisa en cada foto.

### ¿Cuál sería tu consejo para los costureros principiantes?

Empieza con algo que te interese. A mucha gente le enseñan a empezar con muestrarios, bolsas con cremallera, etc., y eso funciona si te interesa desarrollar los fundamentos. Pero si quieres enfrentarte a algo ambicioso, compra tela barata y ¡a por ello! No será tan malo como crees, y siempre hay más tela.

### ¿Coses sobre todo para ti o para otras personas, como amigos y familiares?

Principalmente coso para otras personas, pero a veces hago cosas porque me parece más fácil hacer una prenda que ir a buscarla. Supongo que soy del tipo de costurera "hazlo si no creo que exista en el mundo", pero compraré una camiseta aunque pueda coser una. O una vez cosí un par de pantalones el día antes de un viaje porque no tenía suficientes pantalones e ir de compras sonaba más inconveniente.

### ¿Qué haces cuando no estás haciendo ropa o diseñando patrones?

Siempre estoy haciendo algo: carpintería, diseño, de vez en cuando codifico otras cosas, siempre estoy fregando platos… Me gustan los puzzles, y por fin he terminado uno de 1500 piezas del que me tomaba descansos de meses. Hice una pequeña biblioteca de puzzles gratuitos para los acabados, pero nunca viene nadie y me quita ningún puzzle.

### ¿Tienes animales de compañía? ¿Familia?

Prefiero las personas a los animales, y vivo con una pareja en una bonita casa sin mascotas. Mi pareja y yo compartimos la filosofía de "los seres queridos de mis seres queridos son mis seres queridos", que nos permite pensar en la familia de forma realmente amorosa y expansiva. También tengo la suerte de mantener una gran relación adulta con mi familia de origen, aunque actualmente no vivo cerca de ellos.

### Si hubiera una persona que pudieras llevarte a una isla deshabitada, ¿quién sería? ¿Por qué?
Sinceramente, mi pareja es la persona adecuada: vivimos juntos desde hace casi 5 años, y el hecho de estar cerca el uno del otro constantemente durante la pandemia nos unió mucho (¡y nos enseñó a establecer mejores límites!), así que estoy segura de que estaríamos bien en una isla desierta. Ellos nos cultivarían la comida y yo nos construiría un refugio, y sería genial.

### ¿Quieres compartir formas de seguirte en las redes sociales?
Puedes seguirme en Instagram en @enoch\_trata_de_todo, pero te advierto que se actualiza muy poco.



