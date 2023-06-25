// Export hooks
export const notchesDefs = [
  {
    name: 'notch',
    def: `
<g id="notch">
  <circle cy="0" cx="0" r="1.4" class="fill-note"></circle>
  <circle cy="0" cx="0" r="2.8" class="note"></circle>
</g>`,
  },
  {
    name: 'bnotch',
    def: `
<g id="bnotch">
  <path d="M -1.3 -1.3 L 1.3 1.3 M 1.3 -1.3 L -1.3 1.3" class="note"></path>
  <circle cy="0" cx="0" r="2.8" class="note"></circle>
</g>`,
  },
]
