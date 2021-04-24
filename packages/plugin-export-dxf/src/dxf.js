import { name, version, description, author, license } from '../package.json'

function Dxf(config) {
  this.config = config
}

// Round to 2 decimals because DXF is stupid
Dxf.prototype.round = function (val) {
  return Math.round(val * 100) / 100
}

/** Returns DXF code for optional banner */
Dxf.prototype.banner = function (pattern) {
  return `999
${name.slice(1)} | v${version}
999
${description}
999
(c) ${new Date().getFullYear()} ${author}
999
License: ${license}
999
Pattern: ${pattern.config.name} | v${pattern.config.version}
999
Export date: ${new Date().toISOString()}`
}

/** Returns DXF code for tables */
Dxf.prototype.tables = function (tables) {
  let dxf = `
  0
SECTION
  2
TABLES`
  for (let lineType of tables.lineTypes)
    dxf += `
  0
TABLE
  2
LTYPE
  0
LTYPE
  2
${lineType.name}
  3
${lineType.description}
 72
65
 73
0
 40
0.00
  0
ENDTAB`
  for (let layer of tables.layers)
    dxf += `
  0
TABLE
  2
LAYER
  0
LAYER
  2
${layer.name}
 62
${layer.color}
  6
${layer.lineType}
  0
ENDTAB`
  dxf += `
  0
ENDSEC`

  return dxf
}

/** Returns DXF code to close/end a DXF file */
Dxf.prototype.footer = function () {
  return `
  0
EOF
`
}

/** Returns DXF code for a line */
Dxf.prototype.line = function (to, layer) {
  return `
  0
VERTEX
  8
${layer}
 10
${this.round(to.x)}
 20
${this.round(to.y)}`
}

/** Returns DXF code for a curve */
Dxf.prototype.curve = function (from, cp1, cp2, to, layer, part) {
  let { Path } = part.shorthand()
  let path = new Path().move(from).curve(cp1, cp2, to)
  let steps = Math.floor(path.length() / this.config.precision)
  let current
  let dxf = ''
  for (let i = 1; i < steps; i++) {
    current = path.shiftAlong(i * this.config.precision)
    dxf += this.line(current, layer)
  }
  if (current.dist(to) > 0.1) dxf += this.line(to, layer)

  return dxf
}

/** Returns DXF code for a Path object */
Dxf.prototype.path = function (path, layer, part) {
  let dxf = `
  0
POLYLINE
  8
${layer}
 70
1`
  let current, start
  for (let op of path.ops) {
    switch (op.type) {
      case 'move':
        start = op.to
        dxf += this.line(op.to, layer)
        break
      case 'line':
        dxf += this.line(op.to, layer)
        break
      case 'curve':
        dxf += this.curve(current, op.cp1, op.cp2, op.to, layer, part)
        break
      case 'close':
        dxf += this.line(start, layer)
        break
      case 'noop':
        break
      default:
        throw new Error(`Unsupported path operation: ${op.type}`)
    }
    current = op.to
  }
  dxf += `
  0
SEQEND`

  return dxf
}

/** Returns blocs portion of the DXF code for a Part object */
Dxf.prototype.partBlocks = function (part, name, layer = 1) {
  let dxf = `
  0
BLOCK
  8
${layer}
  2
${name}
 70
0
 10
0.00
 20
0.00`
  for (let key in part.paths) {
    this.pathName = key
    this.partName = name
    let path = part.paths[key]
    if (path.render) dxf += this.path(path, layer, part)
  }
  dxf += `
  0
ENDBLK`

  return dxf
}

/** Returns entities portion of the DXF code for a Part object */
Dxf.prototype.partEntities = function (part, name, layer = 1) {
  return `
  0
INSERT
  8
${layer}
  2
${name}
 10
0.00
 20
0.00`
}

/** Exports (drafted) pattern as DXF-ASTM */
Dxf.prototype.render = function (pattern) {
  // Ensure pattern layout
  pattern.pack()

  // Tables structure
  let tables = {
    lineTypes: [
      {
        name: 'CONTINUOUS',
        description: 'SOLIDLINE',
      },
    ],
    layers: [
      {
        name: 1,
        color: 7,
        lineType: 'CONTINIOUS',
      },
    ],
  }

  let dxf = ''
  dxf += this.banner(pattern)
  dxf += this.tables(tables)
  dxf += `
  0
SECTION
  2
BLOCKS`
  for (let partId in pattern.parts) {
    if (pattern.parts[partId].render) dxf += this.partBlocks(pattern.parts[partId], partId)
  }
  dxf += `
  0
ENDSEC
  0
SECTION
  2
ENTITIES`
  for (let partId in pattern.parts) {
    if (pattern.parts[partId].render) dxf += this.partEntities(pattern.parts[partId], partId)
  }
  dxf += `
  0
ENDSEC`
  dxf += this.footer()

  return dxf
}

export default Dxf
