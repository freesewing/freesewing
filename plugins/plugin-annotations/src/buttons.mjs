// Export defs
export const buttonsDefs = [
  {
    name: 'button',
    symbol: (scale) => `
<symbol id="button" transform="scale(${scale})" viewBox="-4 -4 8 8" width="8" height="8" x="-4" y="-4">
  <circle
    cx="0" cy="0" r="3.4"
    class="mark"
  ></circle>
  <circle cx="-1" cy="-1" r="0.5" class="no-stroke fill-mark"></circle>
  <circle cx="1"  cy="-1" r="0.5" class="no-stroke fill-mark"></circle>
  <circle cx="1"  cy="1"  r="0.5" class="no-stroke fill-mark"></circle>
  <circle cx="-1" cy="1"  r="0.5" class="no-stroke fill-mark"></circle>
</symbol>`,
  },
  {
    name: 'buttonhole',
    symbol: (scale) => `
<symbol id="buttonhole" transform="scale(${scale})" viewBox="-6 -6 12 12" width="12" height="12" x="-6" y="-6">
  <path
    class="mark"
    d="M -1,-5 L 1,-5 L 1,5 L -1,5 z"
  ></path>
</symbol>`,
  },
  {
    name: 'buttonhole-start',
    symbol: (scale) => `
<symbol id="buttonhole-start" transform="scale(${scale})" viewBox="-4 -12 24 24" width="24" height="24" x="-4" y="-12">
  <path
    class="mark"
    d="M -1,-10 L 1,-10 L 1,0 L -1,0 z"
  ></path>
</symbol>`,
  },
  {
    name: 'buttonhole-end',
    symbol: (scale) => `
<symbol id="buttonhole-end" transform="scale(${scale})" viewBox="-8 -8 24 24" width="24" height="24" x="-8" y="-8">
  <path
    class="mark"
    d="M -1,0 L 1,0 L 1,10 L -1,10 z"
  ></path>
</symbol>`,
  },
  {
    name: 'snap-stud-grad',
    def: (scale) => `
<radialGradient id="snap-stud-grad" cx="50%" cy="50%" r="50%" fx="50%" fy="50%"
transform="scale(${scale})">
  <stop offset="30%" style="stop-color:rgb(235,235,235); stop-opacity:1"></stop>
  <stop offset="80%" style="stop-color:rgb(100,100,100);stop-opacity:1"></stop>
</radialGradient>`,
  },
  {
    name: 'snap-stud',
    symbol: (scale) => `
<symbol id="snap-stud" transform="scale(${scale})" viewBox="-4 -4 8 8" width="8" height="8" x="-4" y="-4">
  <circle id="snap-stud-circle-edge" cx="0" cy="0" r="3.4"
    style="stroke:#666;fill:#dddddd;stroke-width:0.3;"
  ></circle>
  <circle id="snap-stud-circle-middle" cx="0" cy="0" r="1.8"
    style="stroke:none;fill:url(#snap-stud-grad);"
  ></circle>
  <path
    id="snap-stud-lines" style="fill:none;stroke:#666; stroke-width:0.2;"
    d="M -2,0 L -3,0 M 2,0 L 3,0 M 0,2 L 0,3 M 0,-2 L 0,-3 M 1.5,1.5 L 2.1,2.1 M -1.5,1.5 L -2.1,2.1 M -1.5,-1.5 L -2.1,-2.1 M 1.5,-1.5 L 2.1,-2.1"
  ></path>
</symbol>`,
  },
  {
    name: 'snap-socket',
    symbol: (scale) => `
<symbol id="snap-socket" transform="scale(${scale})" viewBox="-4 -4 8 8" width="8" height="8" x="-4" y="-4">
  <circle id="snap-socket-circle-edge" cx="0" cy="0" r="3.4"
    style="stroke:#666;fill:#bbbbbb;stroke-width:0.3;"
  ></circle>
  <circle id="snap-socket-circle-middle" cx="0" cy="0" r="2"
    style="stroke:#666;fill:#dddddd; stroke-width:0.4;"
  ></circle>
  <path
    style="fill:none;stroke:#666; stroke-width:0.5;"
    d="M -1.7,-1 L -1.7,1 M 1.7,-1 L 1.7,1" id="snap-socket-lines"
  ></path>
</symbol>`,
  },
  {
    name: 'eyelet',
    symbol: (scale) => `
<symbol id="eyelet" transform="scale(${scale})" viewBox="-4 -4 8 8" width="8" height="8" x="-4" y="-4">
  <circle id="eyelet-circle" cx="0" cy="0" r="3.4" class="no-full stroke-mark mark" stroke-width="1" fill="none" stroke="currentColor">
  </circle>
</symbol>`,
  },
]
