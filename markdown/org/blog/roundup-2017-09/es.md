---
author: "joostdecock"
caption: "Tu nuevo fondo de inicio de sesión para el mes de octubre"
date: "2017-09-30"
intro: "Este es tu resumen mensual de las noticias de libre circulación de las últimas cuatro semanas, y una mirada a lo que nos espera el mes que viene."
title: "Resumen mensual - Septiembre de 2017: Las complicaciones de Simon, los problemas de correo electrónico y las donaciones han aumentado este año."
---

Este es tu resumen mensual de las noticias de libre circulación de las últimas cuatro semanas, y una mirada a lo que nos espera el mes que viene.

## Repasando septiembre, y un poco de agosto
Para esta primera edición, miro un poco más atrás de un mes, porque [este sitio se lanzó a finales de agosto](/blog/open-for-business/), así que incluyo esa semana en este resumen mensual.

### Me llamo Simón y soy complicado

Desde el lanzamiento, ha habido [3 nuevas versiones de la ruta del núcleo de freesewing](https://github.com/freesewing/core/releases) --- ya sabes, lo que realmente genera tus patrones de costura --- y todas ellas se debieron a problemas con [el patrón Simon Shirt](/patterns/simon).

Puedes consultar todos los detalles en [el registro de cambios](https://github.com/freesewing/core/blob/develop/CHANGELOG.md), pero aquí tienes lo esencial:


 -  El margen de costura en el dobladillo era incorrecto cuando el lenthBonus era muy bajo.
 -  El corte de la manga para la tapeta era demasiado corto
 -  Había un problema con el margen de costura en la tapeta del ojal
 -  La bonificación por la longitud de la manga se contó doble
 -  No se ha tenido en cuenta la medida de la cadera / facilidad; en su lugar se ha utilizado la medida del pecho / facilidad
 -  Se han modificado algunas opciones por defecto


Gracias a [Tatyana](/users/yrhdw) y [Stefan](/users/kczrw) por informar de estos problemas. Consigue esa insignia de bicho raro:

![Este me gusta mucho](https://posts.freesewing.org/uploads/badge_found_bug_d7d0c9055a.svg)

#### ¿Cuál es tu problema, Simon?

Que estas cuestiones afloren en Simon no es una coincidencia. El patrón incluye la friolera de 41 opciones que te permiten controlar prácticamente todos los aspectos de tu camiseta.

Gestionar todas esas combinaciones diferentes en el código conlleva una gran complejidad. Y cuando aumenta la complejidad del código, aparecen los errores.

![Si Simon estuviera en facebook, su estado sentimental sería sin duda *Es complicado*.](https://posts.freesewing.org/uploads/complicated_d8c872358d.gif)

#### ¿Es hora de una revisión?
Simon es un port del patrón Camisa Singular de MakeMyPattern.com. En aquel entonces, hacer una camisa con un estilo diferente habría implicado copiar el código, hacer cambios y luego mantener dos variaciones ligeramente diferentes para toda la eternidad.

Las cosas son mejores aquí en freesewing, donde la herencia está integrada en el sistema. Así que podría (y tal vez debería) tener un patrón básico de camisa, y luego ramificarlo en un montón de patrones de camisa de estilos diferentes.

 - Patrón Base Brian
   - Patrón básico de camisa
     - Patrón de camisa informal
     - Patrón de camisa formal
     - Algún otro patrón de camisa

No sólo reduciría la complejidad del código, sino que también podría decirse que sería más intuitivo ver un montón de patrones de camisas con estilos diferentes, en lugar de tener un solo patrón y luego tener 41 opciones con las que hacer malabarismos.

Una revisión completa de Simon va a suponer un poco de trabajo, pero es posible. Me interesaría conocer tu opinión al respecto.


## Tratar los problemas de entrega del correo electrónico
He añadido una solución para los que teníais problemas para recibir los correos electrónicos de registro. Básicamente, personas con una cuenta de correo electrónico gestionada por Microsoft.

![Si estos tipos dirigen tu bandeja de entrada, quién sabe qué otros correos electrónicos no estás recibiendo](msft.gif)

Puedes leer [mi entrada en el blog sobre el asunto](/blog/email-spam-problems/) para conocer todos los detalles, pero básicamente si tienes una de esas direcciones, deberías recibir esos correos electrónicos ahora. El único inconveniente es que puede que los recibas dos veces.

## Remisiones
Cuando la gente enlaza con tu sitio, y los visitantes hacen clic en ese enlace, eso se llama una referencia. Es posible que los blogueros entre vosotros estéis familiarizados con ojear vuestros informes de Google Analytics para ver quién os ha estado enlazando.

Este sitio no utiliza Google Analytics --- hay [una entrada de blog con detalles sobre eso](/blog/privacy-choices/) también --- pero todavía captura referencias. El resumen de las remisiones recientes está disponible para todos en [la página de estado](/status).

Enlazar a freesewing.org es obviamente algo agradable, así que vigilo las referencias, y si aparece un sitio que pertenece a un usuario, obtienes la insignia de Embajador.

![Enlazar a freesewing.org es una forma de desbloquear la insignia de embajador](https://posts.freesewing.org/uploads/badge_ambassador_3dd1e722cc.svg)

Es una pequeña forma de darte las gracias por difundir la palabra sobre freesewing.

## Donaciones
Durante el mes de septiembre, superamos la cantidad de donaciones del año pasado, así que es agradable ver que podré [enviar más dinero a MSF](/about/pledge#donations-history) este año que en 2016.

Siempre puedes hacer un seguimiento de las donaciones en [la página de compromiso de donaciones](/about/pledge#donations-history), pero aquí tienes el estado actual:

![Yay! Yay! Mejor que el año pasado](https://posts.freesewing.org/uploads/donations_68e214d133.svg)

## Más formatos de descarga

También he añadido formatos adicionales a la página de descarga del borrador. Ahora puedes elegir entre SVG, PDF, carta-PDF, tabloide-PDF, A4-PDF, A3-PDF, A2-PDF, A1-PDF y A0-PDF.

## El distintivo de control de calidad
He añadido la insignia de control de calidad para cosas como informar (o arreglar) erratas, enlaces rotos, gramática y otras pequeñas mejoras.

![¿Ves una errata? Avísame y consigue esto](https://posts.freesewing.org/uploads/badge_quality_control_6acb8c10c2.svg)

Puede que estas aportaciones no parezcan trascendentales, pero son importantes.

En el espectro entre esforzarse interminablemente por conseguir el contenido perfecto antes de publicarlo, o publicarlo rápidamente con todas sus verrugas, me inclino mucho por lo segundo. Así que cuento un poco con vosotros para que me aviséis cuando meto la pata.

## De cara a octubre

Actualmente estoy trabajando en 5 patrones. Y todas ellas están listas hasta el punto en que necesito hacerlas para verificar que funcionan como está previsto. Primero una muselina y luego la cosa real.

Eso me supone un pequeño cuello de botella, porque tengo un largo viaje al trabajo, así que mi tiempo de costura suele limitarse a los fines de semana.

La única forma que veo de acelerar el proceso de publicación de patrones es que la gente participe en la prueba de patrones. No creo que sea algo que pueda pedir a la gente que haga, porque se trata de pruebas en fase inicial. Por no hablar de que no tengo nada que ofrecerles para endulzar el trato. ¿Qué te voy a dar, un patrón gratis?

Aun así, por si alguno de vosotros quiere ayudarme haciendo una muselina y contándome cómo le ha ido, esto es lo que tengo actualmente en mi mesa de dibujo:

 - Un bloque de pantalones para hombre que debería ser mejor que Theo(dore)
 - Un bloque para vaqueros de orillo para hombre
 - Una sudadera con cremallera para hombre
 - Un abrigo de invierno
 - Un patrón de leggins unisex

Si alguno de vosotros quiere hacer uno de estos como prueba, [hacédmelo saber](/contact), me sería de gran ayuda. 

