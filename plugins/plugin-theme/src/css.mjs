export const paperless = `
/* Paperless grid */
svg.freesewing path.grid {
  fill: none;
  stroke: #555;
  stroke-width: 0.3;
}
svg.freesewing path.gridline {
  stroke: #555;
  stroke-width: 0.2;
}
svg.freesewing path.gridline-lg {
  stroke: #777;
  stroke-width: 0.2;
  stroke-dasharray: 1.5,1.5;
}
svg.freesewing path.gridline-sm {
  stroke: #999;
  stroke-width: 0.1;
}
svg.freesewing path.gridline-xs {
  stroke: #999;
  stroke-width: 0.1;
  stroke-dasharray: 0.5,0.5;
}
svg.freesewing path.gridbox {
  fill: url(#grid);
}`
export const sample = `
/* Sample classes */
svg.freesewing path.sample {
  stroke-width: 0.75
}
svg.freesewing path.sample-focus {
  stroke-width: 1.5; fill: rgba(0,0,0,0.1)
}`

const round = (value) => Math.round(value * 1e2) / 1e2

const colors = {
  fabric: '#212121',
  lining: '#10b981',
  interfacing: '#a3a3a3',
  canvas: '#d97706',
  various: '#ef4444',
  note: '#8b5cf6',
  mark: '#3b82f6',
  contrast: '#ec4899',
}

/**
 * generate a stylesheet
 * scale: the scale of the markings
 * stripped: should nested declarations be stripped out? Necessary for svgToPdfkit
 * */
export const buildStylesheet = (scale, stripped) => `
  ${!stripped ? '/* Reset */' : ''}
  ${!stripped ? 'svg.freesewing ' : ''}path,
  ${!stripped ? 'svg.freesewing ' : ''}circle,
  ${!stripped ? 'svg.freesewing ' : ''}rect {
    fill: none;
    stroke: none;
  }

  ${!stripped ? '/* Defaults */' : ''}
  ${!stripped ? 'svg.freesewing ' : ''}path,
  ${!stripped ? 'svg.freesewing ' : ''}circle {
    stroke: #000;
    stroke-opacity: 1;
    stroke-width: ${round(0.3 * scale)};
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  ${!stripped ? '/* Stroke classes */' : ''}
  ${!stripped ? 'svg.freesewing ' : ''}.fabric {
    stroke-width: ${round(0.6 * scale)};
    stroke: ${colors.fabric};
  }
  ${!stripped ? 'svg.freesewing ' : ''}.lining {
    stroke-width: ${round(0.6 * scale)};
    stroke: ${colors.lining};
  }
  ${!stripped ? 'svg.freesewing ' : ''}.interfacing {
    stroke-width: ${round(0.6 * scale)};
    stroke: ${colors.interfacing};
  }
  ${!stripped ? 'svg.freesewing ' : ''}.canvas {
    stroke-width: ${round(0.6 * scale)};
    stroke: ${colors.canvas};
  }
  ${!stripped ? 'svg.freesewing ' : ''}.various {
    stroke-width: ${round(0.6 * scale)};
    stroke: ${colors.various};
  }
  ${!stripped ? 'svg.freesewing ' : ''}.note {
    stroke-width: ${round(0.4 * scale)};
    stroke: ${colors.note};
  }
  ${!stripped ? 'svg.freesewing ' : ''}.mark {
    stroke-width: ${round(0.4 * scale)};
    stroke: ${colors.mark};
  }
  ${!stripped ? 'svg.freesewing ' : ''}.contrast {
    stroke-width: ${round(0.8 * scale)};
    stroke: ${colors.contrast};
  }

  ${!stripped ? 'svg.freesewing ' : ''}.stroke-xs {
    stroke-width: ${round(0.1 * scale)};
  }
  ${!stripped ? 'svg.freesewing ' : ''}.stroke-sm {
    stroke-width: ${round(0.2 * scale)};
  }
  ${!stripped ? 'svg.freesewing ' : ''}.stroke-lg {
    stroke-width: ${round(0.6 * scale)};
  }
  ${!stripped ? 'svg.freesewing ' : ''}.stroke-xl {
    stroke-width: ${round(1 * scale)};
  }
  ${!stripped ? 'svg.freesewing ' : ''}.stroke-xxl,
  ${!stripped ? 'svg.freesewing ' : ''}.stroke-2xl {
    stroke-width: ${round(2 * scale)};
  }
  ${!stripped ? 'svg.freesewing ' : ''}.stroke-3xl {
    stroke-width: ${round(3 * scale)};
  }
  ${!stripped ? 'svg.freesewing ' : ''}.stroke-4xl {
    stroke-width: ${round(4 * scale)};
  }

  ${!stripped ? 'svg.freesewing ' : ''}.sa {
    stroke-dasharray: 0.4, 0.8;
  }
  ${!stripped ? 'svg.freesewing ' : ''}.help {
    stroke-width: ${round(0.2 * scale)};
    stroke-dasharray: 15, 1.5, 1, 1.5;
  }
  ${!stripped ? 'svg.freesewing ' : ''}.dotted {
    stroke-dasharray: 0.4, 0.8;
  }
  ${!stripped ? 'svg.freesewing ' : ''}.dashed {
    stroke-dasharray: 1, 1.5;
  }
  ${!stripped ? 'svg.freesewing ' : ''}.lashed {
    stroke-dasharray: 6, 6;
  }
  ${!stripped ? 'svg.freesewing ' : ''}.hidden {
    stroke: none;
    fill: none;
  }
  ${!stripped ? 'svg.freesewing ' : ''}.no-stroke { stroke: none !important; }
  ${!stripped ? 'svg.freesewing ' : ''}.no-fill { fill: none !important; }
  ${!stripped ? 'svg.freesewing ' : ''}.muted {
    stroke-opacity: 0.15;
    fill-opacity: 0.15;
  }

  ${!stripped ? '/* Fill classes */' : ''}
  ${!stripped ? 'svg.freesewing ' : ''}.fill-fabric {
    fill: ${colors.fabric};
  }
  ${!stripped ? 'svg.freesewing ' : ''}.fill-lining {
    fill: ${colors.lining};
  }
  ${!stripped ? 'svg.freesewing ' : ''}.fill-interfacing {
    fill: ${colors.interfacing};
  }
  ${!stripped ? 'svg.freesewing ' : ''}.fill-canvas {
    fill: ${colors.canvas};
  }
  ${!stripped ? 'svg.freesewing ' : ''}.fill-various {
    fill: ${colors.various};
  }
  ${!stripped ? 'svg.freesewing ' : ''}.fill-note {
    fill: ${colors.note};
  }
  ${!stripped ? 'svg.freesewing ' : ''}.fill-mark {
    fill: ${colors.mark};
  }
  ${!stripped ? 'svg.freesewing ' : ''}.fill-contrast {
    fill: ${colors.contrast};
  }

  ${!stripped ? '/* Text */' : ''}
  ${!stripped ? 'svg.freesewing ' : ''}text {
    font-size: ${round(5 * scale)}px;
    font-family: -apple-system, system-ui, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue',
      Arial, sans-serif;
    fill: #000;
    text-anchor: start;
    font-weight: 200;
    dominant-baseline: ideographic;
  }
  ${!stripped ? 'svg.freesewing ' : ''}.text-xs {
    font-size: ${round(3 * scale)}px;
  }
  ${!stripped ? 'svg.freesewing ' : ''}.text-sm {
    font-size: ${round(4 * scale)}px;
  }
  ${!stripped ? 'svg.freesewing ' : ''}.text-lg {
    font-size: ${round(7 * scale)}px;
  }
  ${!stripped ? 'svg.freesewing ' : ''}.text-xl {
    font-size: ${round(9 * scale)}px;
  }
  ${!stripped ? 'svg.freesewing ' : ''}.text-xxl {
    font-size: ${round(12 * scale)}px;
  }
  ${!stripped ? 'svg.freesewing ' : ''}.text-4xl {
    font-size: ${round(36 * scale)}px;
  }

  ${!stripped ? 'svg.freesewing ' : ''}.center {
    text-anchor: middle;
  }
  ${!stripped ? 'svg.freesewing ' : ''}.baseline-center {
    alignment-baseline: central;
    dominant-baseline: central;
  }

  ${!stripped ? 'svg.freesewing ' : ''}.right {
    text-anchor: end;
  }

  ${!stripped ? '/* Bartack */' : ''}
  ${!stripped ? 'svg.freesewing ' : ''}path.bartack {
    stroke-width: ${round(2 * scale)};
    stroke: #fd7e14;
    stroke-linecap: butt;
  }
`
