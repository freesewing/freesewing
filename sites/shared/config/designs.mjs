import allDesigns from 'config/software/designs.json'

/*
 * Filter out utility patterns by checking whether they have any tags
 * assigned to them
 */
const nonUtilityDesigns = {}
for (const [name, conf] of Object.entries(allDesigns)) {
  if (conf.tags) nonUtilityDesigns[name] = conf
}

export const designs = nonUtilityDesigns
export const designList = Object.keys(designs)

const allTags = new Set()
for (const conf of Object.values(designs)) {
  for (const tag of conf.tags) allTags.add(tag)
}

export const tags = [...allTags]
