import { Pattern } from '../pattern'
import { Svg } from '../svg'
import { Theme } from './theme';

export class Draft extends Theme {
  /** Pre-render method is called just prior to rendering */
  preRender(pattern: Pattern, svg: Svg): void {
    super.preRender(pattern, svg);
    svg.attributes.add('freesewing:theme', 'draft');
  }
}
