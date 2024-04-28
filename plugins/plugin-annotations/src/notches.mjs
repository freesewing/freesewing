// Export hooks
export const notchesDefs = [
  {
    name: 'notch',
    symbol: (scale) => `
<symbol id="notch" transform="scale(${scale})" viewBox="-4 -4 8 8" width="8" height="8" x="-4" y="-4">
  <circle cy="0" cx="0" r="1.4" class="fill-note"></circle>
  <circle cy="0" cx="0" r="2.8" class="note"></circle>
</symbol>`,
  },
  {
    name: 'bnotch',
    symbol: (scale) => `
<symbol id="bnotch" transform="scale(${scale})" viewBox="-4 -4 8 8" width="8" height="8" x="-4" y="-4">
  <path d="M -1.1 -1.1 L 1.1 1.1 M 1.1 -1.1 L -1.1 1.1" class="note"></path>
  <circle cy="0" cx="0" r="2.8" class="note"></circle>
</symbol>`,
  },
]
