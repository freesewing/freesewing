const notch = `
<g id="notch">
  <circle cy="0" cx="0" r="1.4" class="inner" />
  <circle cy="0" cx="0" r="2.8" class="outer" />
</g>
<g id="bnotch">
  <path d="M -1.1 -1.1 L 1.1 1.1 M 1.1 -1.1 L -1.1 1.1" class="cross" />
  <circle cy="0" cx="0" r="2.8" class="outer" />
</g>`
const button = `
<g id="button">
  <circle cx="0" cy="0" r="3.4" class="btn" />
  <circle cx="-1" cy="-1" r="0.5" class="hole" />
  <circle cx="1" cy="-1" r="0.5" class="hole" />
  <circle cx="1" cy="1" r="0.5" class="hole" />
  <circle cx="-1" cy="1" r="0.5" class="hole" />
</g>`
const buttonhole = `
<g id="buttonhole">
  <path class="end" d="M -1,-5 L 1,-5 L 1,5 L -1,5 z" />
  <path class="side" d="M -1,-5 L 1,-5 L 1,-4 L -1,-4 z M -1,5 L 1,5 L 1,4 L -1,4 z" />
</g>`
const snaps = `
<radialGradient id="snap-stud-grad" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
  <stop offset="30%" style="stop-color:rgb(235,235,235); stop-opacity:1"/>
  <stop offset="80%" style="stop-color:rgb(100,100,100);stop-opacity:1" />
</radialGradient>
<g id="snap-stud">
  <circle id="snap-stud-circle-edge" cx="0" cy="0" r="3.4" style="stroke:#666;fill:#dddddd;stroke-width:0.3;" />
  <circle id="snap-stud-circle-middle" cx="0" cy="0" r="1.8" style="stroke:none;fill:url(#snap-stud-grad);"/>
  <path style="fill:none;stroke:#666; stroke-width:0.2;" d="M -2,0 L -3,0 M 2,0 L 3,0 M 0,2 L 0,3 M 0,-2 L 0,-3 M 1.5,1.5 L 2.1,2.1 M -1.5,1.5 L -2.1,2.1 M -1.5,-1.5 L -2.1,-2.1 M 1.5,-1.5 L 2.1,-2.1" id="snap-stud-lines"/>
</g>
<g id="snap-socket">
  <circle id="snap-socket-circle-edge" cx="0" cy="0" r="3.4" style="stroke:#666;fill:#bbbbbb;stroke-width:0.3;"/>
  <circle id="snap-socket-circle-middle" cx="0" cy="0" r="2" style="stroke:#666;fill:#dddddd; stroke-width:0.4;"/>
  <path style="fill:none;stroke:#666; stroke-width:0.5;" d="M -1.7,-1 L -1.7,1 M 1.7,-1 L 1.7,1" id="snap-socket-lines" />
</g>`

const version = '0.0.1'

export default {
  name: 'example-theme',
  version,
  hooks: {
    preRender: function (svg) {
      if (svg.attributes.get('freesewing:example-theme') === false) {
        svg.attributes.set('class', 'freesewing example')
        svg.defs += notch + button + buttonhole + snaps
        svg.attributes.add('freesewing:example-theme', version)
      }
    }
  }
}
