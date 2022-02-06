import pkg from '../package.json'

// 🤔 --> https://freesewing.dev/reference/config/

export default {
  name: 'hortensia',
  version: pkg.version,
  design: ['Stoffsuchti', 'Wouter Van Wageningen'],
  code: 'Wouter Van Wageningen',
  department: 'accessories',
  type: 'pattern',
  difficulty: 3,
  optionGroups: {
    style: ['size', 'zipperSize', 'strapLength', 'handleWidth'],
  },
  measurements: [],
  dependencies: {
    strap: 'sidepanel',
    bottompanel: 'sidepanel',
    frontpanel: 'sidepanel',
    sidepanelreinforcement: 'sidepanel',
    zipperpanel: 'sidepanel',
  },
  options: {
    width: 230,
    height: 330,
    minHandleSpaceWidth: 80,
    maxHandleSpaceWidth: 250,
    pctHandleSpace: 50,
    pctHandleVert: 42,
    strapLength: { pct: 160, min: 75, max: 250 },
    handleWidth: { pct: 8.6, min: 4, max: 25 },
    size: { pct: 50, min: 20, max: 200 },
    zipperSize: { dflt: '#5', list: ['#3', '#4', '#4.5', '#5', '#6', '#8', '#10', 'Invisible'] },
  },
}
