export default `
<g id="point">
  <circle cy="0" cx="0" r="0.7" class="contrast stroke-sm" />
  <circle cy="0" cx="0" r="0.4" class="fill-contrast" />
</g>
<g id="point-hidden">
  <circle cy="0" cx="0" r="0.8" style="fill:rgba(0,0,0,0)" />
  <path d="M -0.5,-0.5 L 0.5,0.5 M 0.5,-0.5 L -0.5,0.5" class="contrast stroke-sm" />
</g>
<g id="path-move-point">
  <circle cx="0" cy="0" r="1.2"  class="interfacing" />
  <circle cx="0" cy="0" r="0.4" class="fill-interfacing" />
</g>
<g id="path-line-point">
  <circle cx="0" cy="0" r="1.2"  class="contrast" />
  <circle cx="0" cy="0" r="0.4" class="fill-contrast" />
</g>
<g id="path-curve-point"> <use xlink:href = "#path-line-point"/> </g>
<g id="path-handle-point">
  <circle cx="0" cy="0" r="1" class="fill-various" />
</g>
`;
