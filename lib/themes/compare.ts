import { Sample } from './sample';

export class Compare extends Sample {
  constructor() {
    super();
    this.style += `
      path.compare { fill: #000000; fill-opacity: 0.05; stroke: #000000; stroke-opacity:0.5; stroke-width: 1; stroke-linecap:round; stroke-linejoin:round; }
      `;
  }
}
