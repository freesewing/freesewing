import { loadMdxAsStaticProps } from 'shared/mdx/load.mjs'

export const slugsForDesignDocs = ({ design, Design }) => {
  const Instance = new Design()
  const config = Instance.getConfig()
  const docs = {
    measurements: {},
    options: {},
  }
  for (const m of config.measurements) {
    docs.measurements[m.toLowerCase()] = `docs/measurements/${m.toLowerCase()}`
  }
  for (const [o, cnf] of Object.entries(config.options)) {
    if (cnf.menu)
      docs.options[
        o.toLowerCase()
      ] = `docs/designs/${design.toLowerCase()}/options/${o.toLowerCase()}`
  }

  return docs
}

export const workbenchInlineDocs = async ({ design, Design, locale }) => {
  const slugs = slugsForDesignDocs({ Design, design })
  const docs = {
    measurements: await loadMdxAsStaticProps({
      site: 'org',
      language: locale,
      slugs: slugs.measurements,
    }),
    options: await loadMdxAsStaticProps({
      site: 'org',
      language: locale,
      slugs: slugs.options,
    }),
  }

  return docs
}
