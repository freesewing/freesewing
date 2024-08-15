export const settingsValueIsCustom = (Swizzled, val, dflt) =>
  typeof val === 'undefined' || val === '__UNSET__' || val === dflt ? false : true
export const settingsValueCustomOrDefault = (Swizzled, val, dflt) =>
  typeof val === 'undefined' || val === '__UNSET__' || val === dflt ? dflt : val
