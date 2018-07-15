import { Pattern } from '../pattern'
import { Svg } from '../svg'
import { Theme } from './theme';

export class Sample extends Theme {

  /** Pre-render method is called just prior to rendering */
  preRender(pattern: Pattern, svg: Svg) {
    super.preRender(pattern, svg);
    svg.style += `
      path { fill: none; stroke: #000000; stroke-opacity:1; stroke-width: 0.5; stroke-miterlimit:4; stroke-dashoffset:0; stroke-linecap:round; stroke-linejoin:round; }
      path.hidden { fill: none; stroke: none; }
      `;
  }
}
