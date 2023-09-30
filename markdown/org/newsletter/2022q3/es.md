---
date: "2022-07-01"
edition: "2022q3"
intro: "2022 Edición de verano"
title: "2022 Edición de verano"
---

Bienvenido a la edición de verano 2022 del boletín FreeSewing. Esto es lo que te espera hoy:

- 🦈 FreeSewing 2.21 añade cinco patrones nuevos (lectura de 4 minutos - por Karen)
- 🔨 Cambios en nuestra estructura monorepo (lectura de 2 minutos - por Natalia)
- 🚸 Cariño, hemos encogido FreeSewing: Adaptar diseños de FreeSewing para niños (lectura de 2 minutos - por Natalia)
- 👨‍💻 FreeSewing *afk* (lectura de 1 minuto - por Lexander)
- 🕵️ Tras las costuras: Starfetcher (lectura de 4 minutos - por Karen & Starfetcher)
- 💰 ¿Deberíamos estar de bajón porque los ingresos de FreeSewing han bajado? (lectura de 2 minutos - por Joost)

¡Vamos allá!

&nbsp;

&nbsp;

## 🦈 FreeSewing 2.21 añade cinco nuevos patrones

FreeSewing 2.21 añade los diseños Bob, Hi, Lucy, Noble y Unice.

### Bob el babero

Los antiguos seguidores de FreeSewing reconocerán a Bob, un peto clásico, y el resultado del tutorial de diseño de patrones de FreeSewing. ¿Quieres coser a Bob sin aprender a elaborar un patrón de FreeSewing? ¡Ahora puedes! Aunque creemos que deberías aprender a desarrollar un patrón de FreeSewing, como la gente de abajo.

[Descubre a Bob en FreeSewing.org](https://freesewing.org/designs/bob)

### <strike>BLÅHAJ</strike>, nay Hi

Cuando (la sucursal británica de) cierto gigante sueco de los muebles de color amarillo/azul anunció que iba a dejar de fabricar su universalmente querido tiburón de peluche, Internet no lo llevó muy bien. A la gente le encantan los tiburones suaves y mimosos y la idea de quedarte alguna vez sin uno que te haga compañía cuando las cosas se ponen feas era francamente inquietante.

Así que se hicieron planes, se discutieron estrategias, pero durante un tiempo pareció que íbamos a tener que aceptar la derrota. Smash cut a Wouter Van Wageningen, uno de los diseñadores de patrones más veteranos de FreeSewings, que se embarcó en una misión singular: Salvar a los tiburones. Basta con decirlo. Lo hizo. Porque claro que lo hizo.

Wouter bautizó el patrón con el nombre de Hi, y los que compartáis sus raíces holandesas entenderéis el juego de palabras 🦈 Así que ya puedes coser tu propio Hi, un simpático y fabuloso tiburón de peluche y, francamente, un icono de Internet.

Éste es el primer patrón de felpa de FreeSewing, y como tal no se adapta a ninguna medida, ¡pero sigue siendo paramétrico! Puedes coser Hi de cualquier tamaño, desde unos 5 centímetros hasta 5 metros, y puedes modificar su boca, la punta de su nariz y hacer que tu Hi sea "agresiva" (es cuando le pones dientes puntiagudos). Otra cosa buena de Hi: ¡se adaptará a cualquier persona de tu vida! ¿Tu hermano, gato, suegro, enamorado, jefe, gerente, camarero o cualquier otra persona de tu vida necesita un Hola? Probablemente. ¿Necesitas un Hi? Casi seguro. ¿Es necesario que mida 5 metros? No, pero quiere hacerlo.

[Descubre Hola en FreeSewing.org](https://freesewing.org/designs/hi)

### Lucy

[Lucy](https://en.wikipedia.org/wiki/Lucy_Locket) es un accesorio perfecto para la costurera de inspiración histórica, un bolsillo histórico que puedes atarte a la cintura, diseñado por SeaZeeZee. Tradicionalmente, podían llevarse bajo otras capas de ropa, creando una forma fácil de llevar cosas que quedaba oculta por las faldas o los delantales, pero no es necesario esconder a tu Lucy bajo un celemín (o un polisón). Lucy queda genial con ese bonito algodón para acolchar al que no pudiste resistirte, con ese retal que te gusta demasiado como para tirarlo o con el tejido que te intimida pero que quieres probar. ¿Una Lucy de lentejuelas, terciopelo o vinilo? Sin duda, genial. 😎

[Descubre a Lucy en FreeSewing.org](https://freesewing.org/designs/lucy)

### Noble

Hola no es el único lanzamiento de patrones de Wouter Van Wageningen este trimestre. Para quienes deseen experimentar con su propio patrón de dibujo, Wouter ha creado el bloque Noble, un bloque de costura príncipe(s) sin mangas basado en el patrón del bloque Bella. Los bloques son la base de otros patrones, por lo que Noble no tiene acabados ni cierres, pero constituye un magnífico punto de partida a medida para patrones de elaboración propia.

[Descubre a Noble en FreeSewing.org](https://freesewing.org/designs/noble)

### Unice

Por último, pero no por ello menos importante, Anna Puk, diseñadora de FreeSewing por primera vez, ha publicado un nuevo patrón de ropa interior, ¡Unice! Unice es una variación de Ursula, un patrón básico de ropa interior muy personalizable. ¿Tratando de decidir si coser a Úrsula o a Unice? Unice se diseñó para acomodar un trasero completo, por lo que podría ser una buena opción si te parece que los calzoncillos de tu talla no proporcionan una cobertura adecuada en la espalda, o si tus vaqueros siempre te aprietan más en el asiento que en los muslos o la cintura. O, mejor aún, ¡haz los dos! Al fin y al cabo, nunca se tienen demasiados calzoncillos. (Y si lo haces, por favor, entra en el Discord [](https://freesewing.org/community/where/discord/) o en nuestros canales sociales, @freesewing_org en Instagram y Twitter, ¡y cuéntanos cómo te han funcionado!)

[Descubre Unice en FreeSewing.org](https://freesewing.org/designs/unice)

&nbsp;

---

&nbsp;

## 🔨 Cambios en nuestra estructura monorepo

Están ocurriendo grandes cosas.

Se han producido algunos cambios en la estructura monorrepo. Con el anterior espacio de trabajo de hilo único en paquetes ahora dividido en:
- diseños para diseños
- plugins para plugins
- paquetes para paquetes NPM que no son ni diseño ni plugin
- sitios para sitios web, código backend, nuestro compilador de svg, etc.

El monorepo ha sido despojado de los entornos de desarrollo individuales para los diseños. En lugar de eso, todo el desarrollo de los diseños debe hacerse ahora en el laboratorio. Hay un nuevo comando `yarn tips` que puedes ejecutar y que te dará un resumen rápido de cómo trabajar dentro de nuestro monorepo. Y puedes ejecutar `yarn lab` para iniciar el laboratorio desde la raíz del repositorio, o desde cualquier carpeta de diseño o plugin.

Si quieres añadir un nuevo diseño, ejecuta `hilar nuevo diseño` y todo se hará por ti.

El antiguo entorno de desarrollo autónomo (`npx create-freesewing-pattern`) está obsoleto (desde la v2.21 al ejecutarlo aparecerá un aviso al respecto), pero sigue disponible. Los que busquen un desarrollo autónomo deberían probar el sustituto que utiliza el mismo entorno de desarrollo mejorado que nuestro monorrepo. Para iniciarlo ejecuta: `npx @freesewing/new-design`

¿Quieres una lista completa de las novedades? Consulta las notas de [de la última convocatoria de contribuyentes](https://github.com/freesewing/freesewing/discussions/2270).

&nbsp;

---

&nbsp;

## 🚸 Cariño, hemos encogido FreeSewing: Adaptar diseños de FreeSewing para niños

Primero las muñecas, ahora los niños? Los colaboradores de FreeSewing parecen empeñados en hacer mini versiones de nuestros diseños.

Queríamos hablar un momento para destacar algunos de los grandes proyectos que la gente está haciendo para sus hijos y algunas de las lecciones que han compartido. No te pierdas las fotos en el escaparate [](https://freesewing.org/showcase/).

Si te interesa adaptar un diseño de FreeSewing para un joven, debes tener en cuenta algunas cosas:

- **¡Haz prendas de prueba!** Hacer una muselina es un buen hábito en general, y especialmente importante cuando se cose para personas cuyas medidas no se han probado aún con un diseño de FreeSewing, ya que sus proporciones no necesariamente funcionarán bien la primera vez. `comixminx` es la campeona indiscutible de los baúles de costura Shin, habiendo cosido varios pares de prueba de camino a hacer pares ponibles para cada uno de [sus](https://freesewing.org/showcase/shin-swim-trunks-for-comixminxs-kid/) [niños](https://freesewing.org/showcase/more-shin-swim-shorts/).
- **Considera la posibilidad de probar con un bloque.** Como se aprecia en `Bob3000`'s adorable [chore coat](https://freesewing.org/showcase/bob3000-chore-coat/) para su hijo, basado en el bloque Brian, la forma básica de un bloque puede ser un buen punto de partida al que puedes añadir elementos de diseño.
- **Utiliza mucha facilidad cuando diseñes para niños pequeños.** `mathstitch` acabaron diseñando su propia camisa con cuello y les quedó de maravilla. Compartieron algunos consejos para cualquiera que intente adaptar un diseño existente en el futuro. Sugieren añadir mucha facilidad porque los niños pequeños son muy activos y descoordinados, tienden a adoptar posturas inusuales todo el tiempo, como agacharse y gatear, y algunos tienen grandes barrigas y mucha grasa de cachorro. 🐶 Una gorra de manga corta es adecuada. Si tu hijo aún lleva pañales, la camisa debe ensancharse a la altura de las caderas para adaptarse a ello, y deberás asegurarte de que los botones terminan lo suficientemente arriba de la parte inferior de la camisa.
- **Añade elementos ajustables para que las prendas duren más.** `Rowan` confeccionó un diminuto delantal [Albert](https://freesewing.org/showcase/a-tiny-albert-apron/) para el cumpleaños de su hijo y añadió ajustadores a los tirantes. Gran idea para maximizar el número de usos que pueden sacarle a este accesorio tan mono.
- **Cose rápido.** `AMJ` dice haber visto a niños cambiar de talla entre la prueba y la costura. 😀

Si estás probando uno de nuestros diseños con tu hijo, esperamos que vengas a charlar sobre él en [Discord](https://discord.freesewing.org/).

&nbsp;

---

&nbsp;

## 👨‍💻 FreeSewing *afk*

¡FreeSewing sale al exterior! FreeSewing formará parte del campamento [May Contain Hackers](https://mch2022.org/) como una breve charla de Lexander. Marca en tu calendario el 24 de julio a las 09:40 PM CEST; se podrá seguir con un livestream.

Lexander describirá qué es FreeSewing, las motivaciones de Joost (y otros voluntarios), un poco sobre la tecnología y por qué es importante para la moda y la ropa en general. Más información en la descripción completa [en el sitio del evento](https://program.mch2022.org/mch2021-2020/talk/M9JWKM/).

&nbsp;

---

&nbsp;

## 🕵️ Tras las costuras: Starfetcher

### ¿Cómo conociste FreeSewing?

No lo recuerdo bien, pero creo que un día estaba buscando patrones de costura y tuve la gloriosa idea de utilizar "patrón de costura de código abierto" como palabra clave. El motor de búsqueda hizo su trabajo.

### ¿Cómo te convertiste en colaborador?

Mientras leía la documentación para desarrolladores encontré algunas erratas y decidí corregirlas, al empezar con las traducciones encontré algunas más, y de repente me convertí en colaborador. Unirme a las convocatorias de colaboradores era el siguiente paso lógico, y desde entonces no he mirado atrás.

### ¿Cuál ha sido tu trabajo como colaborador hasta ahora?

Aparte de arreglar erratas y enlaces rotos, esporádicamente hago algún trabajo de traducción y he codificado tres patrones de inspiración histórica: Lunecio, Tiberio y Walburga.

### ¿Eres costurera? ¿Un programador? ¿Ambos? ¿Ninguno de los dos?

Ambas cosas, y depende de mi estado de ánimo lo que me guste más hacer.

### ¿Cuándo y por qué empezaste a coser?

De niña, mi madre me enseñó lo básico, pero no fue hasta el final de mi adolescencia cuando empecé a tomármelo en serio cuando decidí coser mi propio disfraz para mi fiesta de cumpleaños (mis fiestas de cumpleaños eran y siguen siendo siempre fiestas de disfraces). Cometí muchos errores (como rematar los bordes antes de coser las piezas), pero estaba (y sigo estando) increíblemente orgullosa de ello. Luego me tomé un descanso de la costura, pero la redescubrí en la adolescencia, cuando volví a hacer cosplay.

### ¿Cuál es tu trabajo diario, fuera de FreeSewing?

Ahora mismo estoy haciendo mi doctorado en física experimental, así que tengo una buena mezcla de trabajo práctico en la máquina y de maldecir mucho al ordenador a las 11 de la noche.

### ¿En qué estás trabajando actualmente?

Actualmente estoy trabajando en la confección de una armadura de espuma para complementar las partes de tela de mi traje (compuesto por Lunecio, Tiberio y Walburga, por supuesto). Es una técnica nueva para mí, así que es muy divertido jugar con ella.

### ¿Qué proyecto acabas de terminar?

Acabo de terminar de codificar y coser Pythia la paenula, mi próximo patrón de FreeSewing para otro tipo de capa de inspiración histórica. Ahora estoy procrastinando la caza de los últimos bichos.

### ¿De qué proyecto de costura/codificación estás más orgullosa?

En cuanto a la costura, sigo estando muy orgullosa del primer disfraz que cosí yo sola, pero el más complicado hasta ahora es el de Sailor Fuku que hice hace unos años. Ah, y la camisa victoriana con muchos pliegues en la parte delantera, en la que también tuve que ajustar el tallaje de básicamente todo (una experiencia que finalmente me llevó a FreeSewing). En cuanto a la codificación, probablemente se trate de algo relacionado con el trabajo, en el que realicé algunas bonitas representaciones gráficas con Python y LaTeX.

### ¿De qué aspecto de tu vida estás más orgulloso?

Es una pregunta difícil. Probablemente todas las experiencias combinadas que me enseñaron todo lo que sé hoy.

### ¿Qué es lo que más te gusta de la costura?

La sensación mágica cuando terminas algo y te lo pones y es simplemente perfecto.

### ¿Qué es lo que más odias de la costura?

La sensación de hundimiento cuando terminas algo y te das cuenta de que algo ha salido mal y tu futuro inmediato probablemente pase por el recogedor de hilos o la alfombrilla de corte si tienes mala suerte. Ah, y el dobladillo de las faldas, sobre todo el dobladillo de dos faldas de círculo completo combinadas porque querías volumen a las 2 de la madrugada.

### ¿Qué es para ti lo más difícil de coser?

Colocar las piezas del patrón con la línea de grano correcta y cortarlas sin olvidar el margen de costura.

### ¿Cuál sería tu consejo para los costureros principiantes?

¡Sumérgete de lleno! No tengas miedo de cometer errores y no tengas miedo de pedir ayuda, pero inténtalo.

### ¿Coses sobre todo para ti o para otras personas, como amigos y familiares?

Sobre todo para mí, aunque algunas veces he intentado coser algo para regalar, pero nunca he terminado nada.

### ¿Qué haces cuando no estás haciendo ropa o diseñando patrones? - ¿Quieres compartir formas de seguirte en las redes sociales?

Me gustan los juegos de rol de mesa (DSA, Cthulhu, ...), los videojuegos, la lectura, la fotografía, la esgrima y el tiro con arco (aún soy aficionado, eso sí). También soy responsable de dirigir la parte de interpretación del grupo musical de mi antigua escuela. Nada de redes sociales para mí.

### ¿Tienes animales de compañía? ¿Familia?

Lamentablemente no tengo mascotas, aunque mi SO tiene un perro muy mono. Estoy muy unida a mis padres.

### ¿Te gustan los perros o los gatos?

Ambas cosas. Aunque si tuviera que elegir, elegiría... un pingüino.

### Si hubiera una cosa que pudieras llevarte a una isla deshabitada, ¿qué sería? ¿Por qué?

¿Aparte de cosas como agua, comida y un cuchillo? Probablemente mi lector de libros electrónicos, mejorado con células solares y cargado hasta los topes con libros de entretenimiento y supervivencia.

### Si hubiera una persona que pudieras llevarte a una isla deshabitada, ¿quién sería? ¿Por qué?

Eso es complicado. Si es voluntario, mi SO, pero lo pasarían mal sin electricidad y otras ventajas de la civilización. Si no es voluntario, alguien que aumente mis posibilidades de supervivencia, como un médico muy fuerte.

&nbsp;

---

&nbsp;

## 💰 ¿Deberíamos estar de bajón porque los ingresos de FreeSewing han bajado?

Voy a suponer que conoces el compromiso de ingresos de [FreeSewing](https://freesewing.org/docs/various/pledge/)? Si no, adelante, léelo. Esperaré.

Durante los 6 primeros meses de 2022, los ingresos de FreeSewing fueron un 25% inferiores a los ingresos (medios) de 2021.

Esto no es del todo inesperado. Hubo una afluencia de nuevos clientes durante la pandemia de Covid, y ahora estamos en la pendiente descendente de esa ola. Muchos mecenas que descubrieron FreeSewing gracias a nuestro patrón de máscaras faciales nos abandonan ahora porque no ven sentido a prolongar su apoyo. Otros están sintiendo la crisis del coste de la vida y han reducido sus cotizaciones o las han cancelado por completo.

Agradezco sinceramente todas estas aportaciones, pero ver que los mecenas se marchan me hace preguntarme si tenemos un problema... Personalmente no lo creo. Pero tampoco estoy seguro al 100%. Y en los días malos, ciertamente alimenta mis dudas sobre... bueno, sobre todo en realidad.

Hay muchas métricas diferentes que podrías señalar para demostrar que FreeSewing está prosperando. Ya sea el número de diseños que tenemos disponibles, el tamaño y la actividad de la comunidad, o algo tan fácil de medir como el número de commits.

Aun así...

Después de meditarlo un rato, he pensado que lo mejor es ser transparente sobre lo que está pasando: FreeSewing va bien, pero estamos recibiendo menos apoyo financiero que antes. Los ingresos serán inferiores este año, por lo que parece, al menos en un 25%.
