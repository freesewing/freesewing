module.exports = `
<g id="point">
  <circle cy="0" cx="0" r="2" class="stroke-hint stroke-sm" />
  <circle cy="0" cx="0" r="0.8" class="fill-hint" />
</g>
<g id="point-hidden">
  <circle cy="0" cx="0" r="1" class="stroke-canvas stroke-xs" />
  <path d="M -0.5,-0.5 L 0.5,0.5 M 0.5,-0.5 L -0.5,0.5" class="stroke-canvas stroke-sm" />
</g>
<g id="path-move-point">
  <circle cx="0" cy="0" r="2"  class="stroke-canvas stroke-lg" />
  <circle cx="0" cy="0" r="0.8" class="fill-canvas" />
</g>
<g id="path-line-point">
  <circle cx="0" cy="0" r="2"  class="stroke-note stroke-lg" />
  <circle cx="0" cy="0" r="0.8" class="fill-note" />
</g>
<g id="path-curve-point"> <use xlink:href = "#path-line-point"/> </g>
<g id="path-handle-point">
  <circle cy="0" cx="0" r="2" class="stroke-mark stroke-lg no-fill" />
  <circle cx="0" cy="0" r="0.8" class="fill-mark" />
</g>
<g id="point-focus">
  <circle cx="0" cy="0" r="2"  class="stroke-mark stroke-lg" />
  <circle cx="0" cy="0" r="0.8" class="fill-fabric" />
</g>
<g id="marked-point">
  <circle cx="0" cy="0" r="3.6"  class="stroke-hint stroke-sm" />
  <circle cx="0" cy="0" r="2.8"  class="stroke-hint stroke-sm" />
  <circle cx="0" cy="0" r="2.0"  class="stroke-hint stroke-sm" />
  <circle cx="0" cy="0" r="1.2"  class="stroke-hint stroke-sm" />
  <circle cx="0" cy="0" r="0.8"  class="stroke-hint stroke-sm" />
  <circle cx="0" cy="0" r="0.4" class="fill-hint" />
</g>
`;