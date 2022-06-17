import designs from './designs.json'
import packages from './packages.json'
import plugins from './plugins.json'
import sites from './sites.json'

// Helper method to construct summary objects
const unpack = (obj, folder) => Object.fromEntries(
  Object.keys(obj).map(name => [name, { name, folder, description: obj[name], type: folder.slice(0, -1) } ])
)

// Re-Export imported JSON
export { designs, packages, plugins, sites }

// All software
export const software = {
  ...unpack(designs, 'designs'),
  ...unpack(plugins, 'plugins'),
  ...unpack(packages, 'packages'),
  ...unpack(sites, 'sites'),
}

// All software published on NPM
export const publishedSoftware = {
  ...unpack(designs, 'designs'),
  ...unpack(plugins, 'plugins'),
  ...unpack(packages, 'packages'),
}

export const publishedTypes = [ 'designs', 'packages', 'plugins' ]
export const types = [ ...publishedTypes, 'sites' ]

