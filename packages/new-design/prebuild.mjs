import path from 'path'
import fs from 'fs'

// Avoid symlink so Windows users don't complain
const copyThese = [
  {
    from: ['..', '..', 'scripts', 'banner.mjs'],
    to: ['lib', 'banner.mjs'],
  },
]
for (const cp of copyThese) {
  fs.copyFile(path.resolve(...cp.from), path.resolve(...cp.to), () => null)
}
