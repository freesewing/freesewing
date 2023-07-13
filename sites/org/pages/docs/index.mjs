// Dependencies
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import fs from 'fs/promises'
import path from 'path'
// Hooks
import { useState, useEffect } from 'react'
// Components
import { ns } from 'shared/components/wrappers/page.mjs'
import { components } from 'shared/components/mdx/index.mjs'
import DocsPage, { getStaticMdx } from './[...slug].mjs'
import { getMdxConfig } from 'shared/config/mdx.mjs'
import { jargon } from 'shared/jargon/index.mjs'

export default DocsPage

/*
 * getStaticProps() is used to fetch data at build-time.
 * To learn more, see: https://nextjs.org/docs/basic-features/data-fetching
 */
export async function getStaticProps({ locale }) {
  const slug = `docs`
  return {
    props: {
      ...(await serverSideTranslations('en', ['docs', ...ns])),
      code: await getStaticMdx(locale, slug, getMdxConfig({ site: 'org', jargon, slug })),
      slug,
      locale,
      page: {
        locale,
        path: ['docs'],
      },
    },
  }
}
