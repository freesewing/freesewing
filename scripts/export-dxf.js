const patterns = require('./patterns')

const exportDxfPlugin = require('@freesewing/plugin-export-dxf')
const models = require('@freesewing/models')
const info = require('@freesewing/pattern-info')
const capitalize = require('@freesewing/utils/capitalize')
const fs = require('fs').promises

const exportDxf = async (pattern) => {
  if (process.argv[2] && pattern !== process.argv[2]) return

  let dxf
  try {
    dxf = new patterns[capitalize(pattern)](settings).use(exportDxfPlugin).draft().exportDxf()
  } catch (err) {
    console.log('Could not export ', pattern, err)
  }
  await fs.writeFile(`${__dirname}/../export/dxf/${pattern.toLowerCase()}.dxf`, dxf)
}

const saveFile = (data, filename) => {}
let settings = {
  complete: false,
  measurements: models.withoutBreasts.size42
}

for (let pattern of info.withoutBreasts) exportDxf(pattern)
settings.measurements = models.withBreasts.size36
for (let pattern of info.withBreasts) exportDxf(pattern)
