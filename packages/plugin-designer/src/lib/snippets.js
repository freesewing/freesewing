export default `
<g id="point">
  <circle cy="0" cx="0" r="2" class="note stroke-sm" />
  <circle cy="0" cx="0" r="0.8" class="fill-note" />
</g>
<g id="point-hidden">
  <circle cy="0" cx="0" r="1" class="canvas stroke-xs" />
  <path d="M -0.5,-0.5 L 0.5,0.5 M 0.5,-0.5 L -0.5,0.5" class="canvas stroke-sm" />
</g>
<g id="path-move-point">
  <circle cx="0" cy="0" r="2"  class="interfacing stroke-lg" />
  <circle cx="0" cy="0" r="0.8" class="fill-interfacing" />
</g>
<g id="path-line-point">
  <circle cx="0" cy="0" r="2"  class="note stroke-lg" />
  <circle cx="0" cy="0" r="0.8" class="fill-note" />
</g>
<g id="path-curve-point"> <use xlink:href = "#path-line-point"/> </g>
<g id="path-handle-point">
  <circle cx="0" cy="0" r="1" class="fill-various" />
</g>
`;
