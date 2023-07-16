import path from 'path'
import fse from 'fs-extra'

export const prebuildArtwork = (SITE) => {
  if (!['org', 'lab'].includes(SITE)) return

  console.log('Copying artwork to site')
  fse.copy(
    path.resolve('..', '..', 'artwork', 'linedrawings'),
    path.resolve('..', SITE, 'public', 'img', 'linedrawings'),
    { overwrite: true }
  )
}
