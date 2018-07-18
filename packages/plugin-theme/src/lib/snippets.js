module.exports = `
<g id="notch">
  <circle cy="0" cx="0" r="1.4" class="fill-mark" />
  <circle cy="0" cx="0" r="2.8" class="stroke-mark stroke-xl" />
</g>
<g id="buttonhole" >
  <path style="fill:none;stroke:#000000;" d="M -1,-5 L 1,-5 L 1,5 L -1,5 z" id="buttonhole-outer" />
  <path style="fill:#000000;stroke:none;" d="M -1,-5 L 1,-5 L 1,-4 L -1,-4 z M -1,5 L 1,5 L 1,4 L -1,4 z" id="buttonhole-bartack" />
</g>
<g id="button" >
  <circle id="button-circle-edge" cx="0" cy="0" r="3.4" style="stroke:#000000;fill:none;stroke-width:1;" />
  <circle id="button-circle-hole1" cx="-1" cy="-1" r="0.5" style="stroke:none;fill:#000000;" />
  <circle id="button-circle-hole2" cx="1" cy="-1" r="0.5" style="stroke:none;fill:#000000;" />
  <circle id="button-circle-hole3" cx="1" cy="1" r="0.5" style="stroke:none;fill:#000000;" />
  <circle id="button-circle-hole4" cx="-1" cy="1" r="0.5" style="stroke:none;fill:#000000;" />
</g>
<g id="button-lg" transform="scale(2)"> <use xlink:href = "#button"/> </g>
<g id="scalebox">
  <rect y="0" x="-50.8" height="50.8" width="101.6" style="fill:#333333;fill-opacity:1;stroke:none" />
  <rect style="fill:#ffffff;fill-opacity:1;stroke:none" width="100" height="50" x="-49.6" y="0.4" />
  <text x="-40" y="10" class="text-sm">
    <tspan x="-40" dy="4" class="text-xs">freesewing core v__VERSION__</tspan>
    <tspan x="-40" dy="8" class="text-xl">__TITLE__ </tspan>
    <tspan x="-40" dy="8" class="fill-brand">freesewing.org/drafts/__DRAFTHANDLE__</tspan>
  </text>
  <text y="0" x="0" class="text-xs text-center">
    <tspan x="0" y="42">__SCALEBOX_METRIC__</tspan>
    <tspan x="0" dy="5">__SCALEBOX_IMPERIAL__</tspan>
  </text>
</g>
`;
