import { Pattern } from '../pattern'
import { Svg } from '../svg'
import { Sample } from './sample';

export class Compare extends Sample {

  /** Pre-render method is called just prior to rendering */
  preRender(pattern: Pattern, svg: Svg) {
    super.preRender(pattern, svg);
    svg.style += `
      path.compare { fill: #000000; fill-opacity: 0.05; stroke: #000000; stroke-opacity:0.5; stroke-width: 1; stroke-linecap:round; stroke-linejoin:round; }
      `;
  }
}
