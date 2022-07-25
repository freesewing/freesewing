// FIXME surely this can be extracted from the theme in some way so as to keep things consistent?

const round = value => Math.round(value * 1e2) / 1e2

const colors = {
  fabric: '#212121',
  lining: '#10b981',
  interfacing: '#a3a3a3',
  canvas: '#d97706',
  various: '#ef4444',
  note: '#8b5cf6',
  mark: '#3b82f6',
  contrast: '#ec4899'
}

export default (scale) => `
  /* Reset */
  svg.freesewing path,
  svg.freesewing circle,
  svg.freesewing rect {
    fill: none;
    stroke: none;
  }

  /* Defaults */
  svg.freesewing path,
  svg.freesewing circle {
    stroke: #000;
    stroke-opacity: 1;
    stroke-width: ${round(0.3*scale)};
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  /* Stroke classes */
  svg.freesewing .fabric {
    stroke-width: ${round(0.6*scale)};
    stroke: ${colors.fabric};
  }
  svg.freesewing .lining {
    stroke-width: ${round(0.6*scale)};
    stroke: ${colors.lining};
  }
  svg.freesewing .interfacing {
    stroke-width: ${round(0.6*scale)};
    stroke: ${colors.interfacing};
  }
  svg.freesewing .canvas {
    stroke-width: ${round(0.6*scale)};
    stroke: ${colors.canvas};
  }
  svg.freesewing .various {
    stroke-width: ${round(0.6*scale)};
    stroke: ${colors.various};
  }
  svg.freesewing .note {
    stroke-width: ${round(0.4*scale)};
    stroke: ${colors.note};
  }
  svg.freesewing .mark {
    stroke-width: ${round(0.4*scale)};
    stroke: ${colors.mark};
  }
  svg.freesewing .contrast {
    stroke-width: ${round(0.8*scale)};
    stroke: ${colors.contrast};
  }

  svg.freesewing .stroke-xs {
    stroke-width: ${round(0.1*scale)};
  }
  svg.freesewing .stroke-sm {
    stroke-width: ${round(0.2*scale)};
  }
  svg.freesewing .stroke-lg {
    stroke-width: ${round(0.6*scale)};
  }
  svg.freesewing .stroke-xl {
    stroke-width: ${round(1*scale)};
  }
  svg.freesewing .stroke-xxl,
  svg.freesewing .stroke-2xl {
    stroke-width: ${round(2*scale)};
  }
  svg.freesewing .stroke-3xl {
    stroke-width: ${round(3*scale)};
  }
  svg.freesewing .stroke-4xl {
    stroke-width: ${round(4*scale)};
  }

  svg.freesewing .sa {
    stroke-dasharray: 0.4, 0.8;
  }
  svg.freesewing .help {
    stroke-width: ${round(0.2*scale)};
    stroke-dasharray: 15, 1.5, 1, 1.5;
  }
  svg.freesewing .dotted {
    stroke-dasharray: 0.4, 0.8;
  }
  svg.freesewing .dashed {
    stroke-dasharray: 1, 1.5;
  }
  svg.freesewing .lashed {
    stroke-dasharray: 6, 6;
  }
  svg.freesewing .hidden {
    stroke: none;
    fill: none;
  }
  svg.freesewing .muted {
    opacity: 0.15;
  }

  /* Fill classes */
  svg.freesewing .fill-fabric {
    fill: ${colors.fabric};
  }
  svg.freesewing .fill-lining {
    fill: ${colors.lining};
  }
  svg.freesewing .fill-interfacing {
    fill: ${colors.interfacing};
  }
  svg.freesewing .fill-canvas {
    fill: ${colors.canvas};
  }
  svg.freesewing .fill-various {
    fill: ${colors.various};
  }
  svg.freesewing .fill-note {
    fill: ${colors.note};
  }
  svg.freesewing .fill-mark {
    fill: ${colors.mark};
  }
  svg.freesewing .fill-contrast {
    fill: ${colors.contrast};
  }

  /* Text */
  svg.freesewing text {
    font-size: ${round(5*scale)}px;
    font-family: -apple-system, system-ui, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue',
      Arial, sans-serif;
    fill: #000;
    text-anchor: start;
    font-weight: 200;
    dominant-baseline: ideographic;
  }
  svg.freesewing .text-xs {
    font-size: ${round(3*scale)}px;
  }
  svg.freesewing .text-sm {
    font-size: ${round(4*scale)}px;
  }
  svg.freesewing .text-lg {
    font-size: ${round(7*scale)}px;
  }
  svg.freesewing .text-xl {
    font-size: ${round(9*scale)}px;
  }
  svg.freesewing .text-xxl {
    font-size: ${round(12*scale)}px;
  }
  svg.freesewing .text-4xl {
    font-size: ${round(36*scale)}px;
  }

  svg.freesewing .center {
    text-anchor: middle;
  }
  svg.freesewing .baseline-center {
    alignment-baseline: central;
    dominant-baseline: central;
  }

  svg.freesewing .right {
    text-anchor: end;
  }

  /* Bartack */
  svg.freesewing path.bartack {
    stroke-width: ${round(2*scale)};
    stroke: #fd7e14;
    stroke-linecap: butt;
  }
`;
