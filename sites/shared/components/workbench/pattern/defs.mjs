const style = ` style="fill: none; stroke: currentColor;" `
const grids = {
  imperial: `
      <pattern id="grid" height="25.4" width="25.4" patternUnits="userSpaceOnUse" key="grid">
        <path class="gridline lg imperial" d="M 0 0 L 0 25.4 L 25.4 25.4" ${style} />
        <path
          class="gridline lg imperial"
          d="M 12.7 0 L 12.7 25.4 M 0 12.7 L 25.4 12.7"
          ${style}
        />
        <path
          class="gridline sm imperial"
          d="M 3.175 0 L 3.175 25.4 M 6.32 0 L 6.35 25.4 M 9.525 0 L 9.525 25.4 M 15.875 0 L 15.875 25.4 M 19.05 0 L 19.05 25.4 M 22.225 0 L 22.225 25.4"
          ${style}
        />
        <path
          class="gridline sm imperial"
          d="M 0 3.175 L 25.4 3.175 M 0 6.32 L 25.4 6.35 M 0 9.525 L 25.4 9.525 M 0 15.875 L 25.4 15.875 M 0 19.05 L 25.4 19.05 M 0 22.225 L 25.4 22.225"
          ${style}
        />
      </pattern>
      `,
  metric: `
      <pattern id="grid" height="100" width="100" patternUnits="userSpaceOnUse" key="grid">
        <path class="gridline lg metric" d="M 0 0 L 0 100 L 100 100" ${style} />
        <path class="gridline metric" d="M 50 0 L 50 100 M 0 50 L 100 50" ${style} />
        <path
          class="gridline sm metric"
          d="M 10 0 L 10 100 M 20 0 L 20 100 M 30 0 L 30 100 M 40 0 L 40 100 M 60 0 L 60 100 M 70 0 L 70 100 M 80 0 L 80 100 M 90 0 L 90 100"
          ${style}
        />
        <path
          class="gridline sm metric"
          d="M 0 10 L 100 10 M 0 20 L 100 20 M 0 30 L 100 30 M 0 40 L 100 40 M 0 60 L 100 60 M 0 70 L 100 70 M 0 80 L 100 80 M 0 90 L 100 90"
          ${style}
        />
        <path
          class="gridline xs metric"
          d="M 5 0 L 5 100 M 15 0 L 15 100 M 25 0 L 25 100 M 35 0 L 35 100 M 45 0 L 45 100 M 55 0 L 55 100 M 65 0 L 65 100 M 75 0 L 75 100 M 85 0 L 85 100 M 95 0 L 95 100"
          ${style}
        />
        <path
          class="gridline xs metric"
          d="M 0 5 L 100 5 M 0 15 L 100 15 M 0 25 L 100 25 M 0 35 L 100 35 M 0 45 L 100 45 M 0 55 L 100 55 M 0 65 L 100 65 M 0 75 L 100 75 M 0 85 L 100 85 M 0 95 L 100 95"
          ${style}
        />
      </pattern>
  `,
}

export const Defs = (props) => {
  let defs = props.svg.defs
  if (props.settings[0].paperless) {
    defs += grids[props.settings[0].units || 'metric']
    for (let p in props.parts[0]) {
      let anchor = { x: 0, y: 0 }
      if (typeof props.parts[0][p].points.gridAnchor !== 'undefined')
        anchor = props.parts[0][p].points.gridAnchor
      else if (typeof props.parts[0][p].points.anchor !== 'undefined')
        anchor = props.parts[0][p].points.anchor

      defs += `<pattern id="grid-${p}" key="grid-${p}" xlink:href="#grid" x="${anchor.x}" y="${anchor.y}" />`
    }
  }

  return <defs dangerouslySetInnerHTML={{ __html: defs }} />
}
