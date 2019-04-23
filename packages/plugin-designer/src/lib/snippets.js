export default `
<g id="point">
  <circle cy="0" cx="0" r="2" class="fabric stroke-sm fill-fabric" style="fill-opacity: 0" />
  <circle cy="0" cx="0" r="0.6" class="fill-fabric" />
</g>
<g id="point-hidden">
  <circle cy="0" cx="0" r="2" class="fill-note" style="fill-opacity: 0" />
  <path d="M -0.7,-0.7 L 0.7,0.7 M 0.7,-0.7 L -0.7,0.7" class="note stroke-sm" />
</g>
<g id="path-move-point">
  <circle cx="0" cy="0" r="2"  class="fill-interfacing" style="fill-opacity: 0.5" />
</g>
<g id="path-line-point">
  <circle cx="0" cy="0" r="2"  class="fill-note" style="fill-opacity: 0.5" />
</g>
<g id="path-curve-point"> <use xlink:href = "#path-line-point"/> </g>
<g id="path-handle-point">
  <circle cx="0" cy="0" r="2" class="fill-various" />
</g>
`;
