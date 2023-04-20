const defs = [
  {
    name: 'notch',
    def: `
<g id="notch">
  <circle cy="0" cx="0" r="1.4" class="fill-note" />
  <circle cy="0" cx="0" r="2.8" class="note" />
</g>`,
  },
  {
    name: 'bnotch',
    def: `
<g id="bnotch">
  <path d="M -1.1 -1.1 L 1.1 1.1 M 1.1 -1.1 L -1.1 1.1" class="note" />
  <circle cy="0" cx="0" r="2.8" class="note" />
</g>`,
  },
]

// Export hooks
export const notchesHooks = {
  preRender: [
    function (svg) {
      for (const def of defs) {
        svg.defs.setIfUnset(def.name, def.def)
      }
    },
  ],
}
