---
title: What are those symbols next to my measurements?
---

import Gauge from '../../../../../src/components/measurements/gauge.js'

You might have noticed these kind of icons next to your measurements:
<Gauge val={0} theme='light' />

The value they represent shows how far the measurement deviates from the proportions we test our designs with:

<table spaces-before="0">
  <tr>
    <th>
      Icon
    </th>
    
    <th>
      Description
    </th>
  </tr>
  
  <tr>
    <td>
      <Gauge val={-6} theme='light' />
    </td>
    
    <td>
      The value is <strong x-id="1">significantly lower</strong>
    </td>
  </tr>
  
  <tr>
    <td>
      <Gauge val={-4} theme='light' />
    </td>
    
    <td>
      The value is <strong x-id="1">a good bit lower</strong>
    </td>
  </tr>
  
  <tr>
    <td>
      <Gauge val={-2} theme='light' />
    </td>
    
    <td>
      The value is <strong x-id="1">a bit lower</strong>
    </td>
  </tr>
  
  <tr>
    <td>
      <Gauge val={-1} theme='light' />
    </td>
    
    <td>
      The value is <strong x-id="1">very close</strong>
    </td>
  </tr>
  
  <tr>
    <td>
      <Gauge val={1} theme='light' />
    </td>
    
    <td>
      The value is <strong x-id="1">very close</strong>
    </td>
  </tr>
  
  <tr>
    <td>
      <Gauge val={2} theme='light' />
    </td>
    
    <td>
      The value is <strong x-id="1">a bit higher</strong>
    </td>
  </tr>
  
  <tr>
    <td>
      <Gauge val={4} theme='light' />
    </td>
    
    <td>
      The value is <strong x-id="1">a good bit higher</strong>
    </td>
  </tr>
  
  <tr>
    <td>
      <Gauge val={6} theme='light' />
    </td>
    
    <td>
      The value is <strong x-id="1">significantly higher</strong>
    </td>
  </tr>
</table>


These indicators serve a dual purpose:

 - Help you spot mistakes in your measurements (you know best where your outliers are)
 - Help you anticipate where our software might struggle to come up with good results

<Note>

##### There are no good or bad measurements

Designing patterns for a variety of shapes is hard work.

Unlike other pattern companies, we don't limit ourselves to a particular size range.
All people and all bodies are welcome here.

If it turns out it doesn't work for you, please [let us know](https://discord.freesewing.org/) and we'll try to do better.

</Note>
