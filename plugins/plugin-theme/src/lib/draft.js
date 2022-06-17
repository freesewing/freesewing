const round = value => Math.round(value * 1e2) / 1e2

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
    stroke: #212121;
  }
  svg.freesewing .lining {
    stroke-width: ${round(0.6*scale)};
    stroke: #ff5b77;
  }
  svg.freesewing .interfacing {
    stroke-width: ${round(0.6*scale)};
    stroke: #64b5f6;
  }
  svg.freesewing .canvas {
    stroke-width: ${round(0.6*scale)};
    stroke: #ff9000;
  }
  svg.freesewing .various {
    stroke-width: ${round(0.6*scale)};
    stroke: #4caf50;
  }
  svg.freesewing .note {
    stroke-width: ${round(0.4*scale)};
    stroke: #dd60dd;
  }
  svg.freesewing .mark {
    stroke-width: ${round(0.4*scale)};
    stroke: blue;
  }
  svg.freesewing .contrast {
    stroke-width: ${round(0.8*scale)};
    stroke: red;
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

  /* Fill classes */
  svg.freesewing .fill-fabric {
    fill: #212121;
  }
  svg.freesewing .fill-lining {
    fill: #ff5b77;
  }
  svg.freesewing .fill-interfacing {
    fill: #64b5f6;
  }
  svg.freesewing .fill-canvas {
    fill: #ff9000;
  }
  svg.freesewing .fill-various {
    fill: #4caf50;
  }
  svg.freesewing .fill-note {
    fill: #dd69dd;
  }
  svg.freesewing .fill-mark {
    fill: blue;
  }
  svg.freesewing .fill-contrast {
    fill: red;
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

  svg.freesewing .center {
    text-anchor: middle;
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
