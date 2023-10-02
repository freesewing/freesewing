---
author: "joostdecock"
caption: "Gracias a nappy.co por la foto"
date: "2021-05-24"
intro: "FreeSewing 2.16 viene con React 17 y Webpack 5"
title: "FreeSewing 2.16 viene con React 17 y Webpack 5"
---


Hoy hemos lanzado FreeSewing v2.16. Para el observador casual, no hay tantos cambios. Y para los usuarios de este sitio web, sin duda es así.

Sin embargo, si rascas la superficie, verás que se ha invertido mucho trabajo en esta versión.

Veamos qué se ha cambiado:

## crear patrón de costura libre

El mayor cambio está relacionado con [create-freesewing-pattern](https://www.npmjs.com/package/create-freesewing-pattern) y el entorno de desarrollo que te configura.

Utilizamos [create-react-app](https://www.npmjs.com/package/create-react-app) (también conocido como <abbr title='Create React App'>CRA</abbr>), y FreeSewing 2.16 es nuestra primera versión que incluye [React](https://reactjs.org/) 17, CRA 4 y [Webpack](https://webpack.js.org/) 5.

Esa migración a CRA 4 (y su compañero [react-scripts](https://www.npmjs.com/package/react-scripts) 4) es significativa porque tiene una forma totalmente nueva de recargar en caliente tu aplicación, llamada `FAST_REFRESH`.

El inconveniente es que sólo funcionará para los componentes locales de ** en tu aplicación. Y como nuestro entorno de desarrollo carga tu código de patrón como una dependencia (local), no se recarga cuando cambias tu archivo de patrón.

Para empeorar las cosas, Webpack 5 mantendrá una caché en memoria de las dependencias construidas. Así que ni siquiera reiniciando el entorno de desarrollo se mostrarán los cambios que hayas hecho en tu patrón.

Obviamente, eso no mola. Y aunque ciertamente hay formas de configurar Webpack para que se comporte como nosotros queramos, CRA no permite ese tipo de personalización. Siempre puedes expulsar la configuración CRA (o bifurcar react-scripts), pero eso crearía demasiada sobrecarga de mantenimiento.

## El entorno de desarrollo FreeSewing: Ahora con actualización rápida

Queremos que el entorno de desarrollo refleje cualquier cambio que hagas en tu código. Y nos gustaría utilizar la nueva función de actualización rápida porque es bastante genial.

A diferencia de la anterior recarga en caliente, que se limitaba a recargar la página, la actualización rápida puede actualizar dinámicamente un componente React modificado.

Es una distinción importante, porque al recargar la página se restablecerá en el entorno de desarrollo el estado guardado en el almacenamiento local. Eso incluye las cosas más importantes, como las mediciones, pero no incluye lo que estabas mirando en el entorno de desarrollo, la configuración de patrones, etc. Así que cada vez que recargabas necesitabas unos cuantos clics para volver a lo que estabas haciendo, lo cual era un poco molesto.

La actualización rápida tiene el potencial de arreglar eso, y para activarla todo lo que tenemos que hacer es importar el patrón como un componente local. `Por desgracia, CRA utiliza el plugin ModuleScopePlugin` de Webpack, que prohíbe importar código local desde fuera de la carpeta `example/src` .

Para eludir ese problema, corre:

```bash
npx crear-patrón-reeswing
```

ahora hará un enlace simbólico `ejemplo/src/patrón` a la carpeta raíz de tu patrón. Esto hace que el código entre en el ámbito local, para que pueda cargarse correctamente y actualizarse rápidamente.

Este enfoque tiene otra ventaja: Donde antes tenías que ejecutar dos terminales -una para construir/observar el código patrón y otra para construir/observar el entorno de desarrollo-, ahora sólo necesitas cargar una, porque el entorno de desarrollo también construirá/observará el código patrón.

Los desarrolladores se alegran 🎉

## Migración de react-markdown 5 a 6

Otro cambio importante es [react-markdown](https://www.npmjs.com/package/react-markdown). Ya lo hemos actualizado en nuestros sitios web (parte de la migración a Gatsby v3 que completamos a principios de este mes), pero también lo estamos utilizando en nuestro entorno de desarrollo.

Se trata de un cambio relativamente trivial en el que ya no se pasa el contenido markdown como una prop explícita:

```jsx
<Markdown source={`Hello, I am **Markdown**`} />
```

Sino a través del accesorio especial *niños* .

```jsx
<Markdown>Hola, soy **Markdown**</Markdown>
```

## Plugins de rollup actualizados

Los siguientes plugins de rollup también han sufrido algunos cambios importantes:

- rollup-plugin-terser 6 => 7
- @rollup/plugin-commonjs 14 => 19
- @rollup/plugin-node-resolve 8 => 13

Esto no debería causar ningún problema, a menos que quizás estés empaquetando tus propios patrones de costura libre. Si te encuentras con algún problema, [háznoslo saber](https://discord.freesewing.org/).

## Valores por defecto de la lista de navegadores

Ahora utilizamos la configuración recomendada `defaults` para [browserlist](https://github.com/browserslist/browserslist) que controla la compatibilidad del navegador con compiladores cruzados como [Babel](https://babeljs.io/).

Solíamos tener un conjunto de ajustes personalizados, pero no hay ninguna razón real para que no nos atengamos a los predeterminados.

Esto podría afectar potencialmente a la compatibilidad con algunos navegadores realmente antiguos, pero lo más probable es que esto también pase desapercibido.

## Resumen

No ha cambiado mucho el código de FreeSewing en sí, pero hay un montón de cambios que afectan a las dependencias y a los bundlers.

Éstas suelen ser las cosas más difíciles y esotéricas de cualquier proyecto de JavaScript.

Si tienes algún problema después de actualizar a FreeSewing v2.16, por favor [salta a nuestro servidor Discord](https://discord.freesewing.org/) para que podamos ayudarte.

Dicho esto, mientras utilices la misma versión de los distintos paquetes de FreeSewing, no deberías tener ningún problema.

