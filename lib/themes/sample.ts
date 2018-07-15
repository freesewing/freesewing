import { Theme } from './theme';

export class Sample extends Theme {
  constructor() {
    super();
    this.style += `
      path { fill: none; stroke: #000000; stroke-opacity:1; stroke-width: 0.5; stroke-miterlimit:4; stroke-dashoffset:0; stroke-linecap:round; stroke-linejoin:round; }
      path.hidden { fill: none; stroke: none; }
      `;
  }
}
