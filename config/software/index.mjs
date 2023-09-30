import designs from './designs.json' assert { type: 'json' }
import packages from './packages.json' assert { type: 'json' }
import plugins from './plugins.json' assert { type: 'json' }
import sites from './sites.json' assert { type: 'json' }

// Helper method to construct summary objects
const unpack = (obj, folder) =>
  Object.fromEntries(
    Object.keys(obj).map((name) => [
      name,
      { name, folder, type: folder.slice(0, -1), description: obj[name] },
    ])
  )

// Helper method to construct summary objects for designs
const unpackDesigns = (obj, folder) =>
  Object.fromEntries(
    Object.keys(obj).map((name) => [
      name,
      { name, folder, type: folder.slice(0, -1), ...obj[name] },
    ])
  )

// Re-Export imported JSON
export { designs, packages, plugins, sites }

// All software
export const software = {
  ...unpackDesigns(designs, 'designs'),
  ...unpack(plugins, 'plugins'),
  ...unpack(packages, 'packages'),
  ...unpack(sites, 'sites'),
}

// All software published on NPM
export const publishedSoftware = {
  ...unpackDesigns(designs, 'designs'),
  ...unpack(plugins, 'plugins'),
  ...unpack(packages, 'packages'),
}

export const publishedTypes = ['designs', 'packages', 'plugins']
export const types = [...publishedTypes, 'sites']
