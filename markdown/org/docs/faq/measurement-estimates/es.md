---
title: '¿Cuáles son esos símbolos al lado de mis medidas?'
---

Puede que hayas visto este tipo de iconos junto a tus medidas: <Gauge val={0} theme='light' />

El valor que representan muestra hasta qué punto la medición se desvia de las proporciones con las que probamos nuestros diseños:

<table spaces-before="0">
  <tr>
    <th>
      Icono
    </th>
    
    <th>
      Descripción
    </th>
  </tr>
  
  <tr>
    <td>
      <Gauge val={-6} theme='light' />
    </td>
    
    <td>
      El valor es <strong x-id="1">significativamente menor</strong>
    </td>
  </tr>
  
  <tr>
    <td>
      <Gauge val={-4} theme='light' />
    </td>
    
    <td>
      El valor es <strong x-id="1">un buen poco menor</strong>
    </td>
  </tr>
  
  <tr>
    <td>
      <Gauge val={-2} theme='light' />
    </td>
    
    <td>
      El valor es <strong x-id="1">un poco menor</strong>
    </td>
  </tr>
  
  <tr>
    <td>
      <Gauge val={-1} theme='light' />
    </td>
    
    <td>
      El valor es <strong x-id="1">muy cercano</strong>
    </td>
  </tr>
  
  <tr>
    <td>
      <Gauge val={1} theme='light' />
    </td>
    
    <td>
      El valor es <strong x-id="1">muy cercano</strong>
    </td>
  </tr>
  
  <tr>
    <td>
      <Gauge val={2} theme='light' />
    </td>
    
    <td>
      El valor es <strong x-id="1">un poco más alto</strong>
    </td>
  </tr>
  
  <tr>
    <td>
      <Gauge val={4} theme='light' />
    </td>
    
    <td>
      El valor es <strong x-id="1">un buen poco más alto</strong>
    </td>
  </tr>
  
  <tr>
    <td>
      <Gauge val={6} theme='light' />
    </td>
    
    <td>
      El valor es <strong x-id="1">significativamente mayor</strong>
    </td>
  </tr>
</table>

Estos indicadores tienen un doble propósito:

- Ayúdanos a detectar errores en tus mediciones (sabes mejor dónde están tus externos)
- Ayúdanos a anticipar donde nuestro software podría tener problemas para obtener buenos resultados

<Note>

##### No hay mediciones buenas o malas

Diseñar patrones para una variedad de formas es un trabajo duro.

A diferencia de otras compañías de patrones, no nos limitamos a un rango de tamaño en particular.
Todas las personas y todos los organismos son bienvenidos aquí.

Si resulta que no funciona para ti, por favor [háganoslo saber](https://discord.freesewing.org/) e intentaremos hacerlo mejor.

</Note>
