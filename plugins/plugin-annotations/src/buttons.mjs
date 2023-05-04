// Export defs
export const buttonsDefs = [
  {
    name: 'button',
    def: (scale) => `
<g id="button"
transform="scale(${scale})">
  <circle
    cx="0" cy="0" r="3.4"
    class="mark"
  />
  <circle cx="-1" cy="-1" r="0.5" class="no-stroke fill-mark"/>
  <circle cx="1"  cy="-1" r="0.5" class="no-stroke fill-mark" />
  <circle cx="1"  cy="1"  r="0.5" class="no-stroke fill-mark" />
  <circle cx="-1" cy="1"  r="0.5" class="no-stroke fill-mark" />
</g>`,
  },
  {
    name: 'buttonhole',
    def: (scale) => `
<g id="buttonhole"
transform="scale(${scale})">
  <path
    class="mark"
    d="M -1,-5 L 1,-5 L 1,5 L -1,5 z"
  />
</g>`,
  },
  {
    name: 'buttonhole-start',
    def: (scale) => `
<g id="buttonhole-start"
transform="scale(${scale})">
  <path
    class="mark"
    d="M -1,-10 L 1,-10 L 1,0 L -1,0 z"
  />
</g>`,
  },
  {
    name: 'buttonhole-end',
    def: (scale) => `
<g id="buttonhole-end"
transform="scale(${scale})">
  <path
    class="mark"
    d="M -1,0 L 1,0 L 1,10 L -1,10 z"
  />
</g>`,
  },
  {
    name: 'snap-stud-grad',
    def: (scale) => `
<radialGradient id="snap-stud-grad" cx="50%" cy="50%" r="50%" fx="50%" fy="50%"
transform="scale(${scale})">
  <stop offset="30%" style="stop-color:rgb(235,235,235); stop-opacity:1"/>
  <stop offset="80%" style="stop-color:rgb(100,100,100);stop-opacity:1" />
</radialGradient>`,
  },
  {
    name: 'snap-stud',
    def: (scale) => `
<g id="snap-stud"
transform="scale(${scale})">
  <circle id="snap-stud-circle-edge" cx="0" cy="0" r="3.4"
    style="stroke:#666;fill:#dddddd;stroke-width:0.3;"
  />
  <circle id="snap-stud-circle-middle" cx="0" cy="0" r="1.8"
    style="stroke:none;fill:url(#snap-stud-grad);"
  />
  <path
    id="snap-stud-lines" style="fill:none;stroke:#666; stroke-width:0.2;"
    d="M -2,0 L -3,0 M 2,0 L 3,0 M 0,2 L 0,3 M 0,-2 L 0,-3 M 1.5,1.5 L 2.1,2.1 M -1.5,1.5 L -2.1,2.1 M -1.5,-1.5 L -2.1,-2.1 M 1.5,-1.5 L 2.1,-2.1"
  />
</g>`,
  },
  {
    name: 'snap-socket',
    def: (scale) => `
<g id="snap-socket"
transform="scale(${scale})">
  <circle id="snap-socket-circle-edge" cx="0" cy="0" r="3.4"
    style="stroke:#666;fill:#bbbbbb;stroke-width:0.3;"
  />
  <circle id="snap-socket-circle-middle" cx="0" cy="0" r="2"
    style="stroke:#666;fill:#dddddd; stroke-width:0.4;"
  />
  <path
    style="fill:none;stroke:#666; stroke-width:0.5;"
    d="M -1.7,-1 L -1.7,1 M 1.7,-1 L 1.7,1" id="snap-socket-lines"
  />
</g>`,
  },
]
