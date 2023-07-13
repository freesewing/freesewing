// Dependencies
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import fs from 'fs/promises'
import path from 'path'
// Hooks
import { useState, useEffect } from 'react'
// Components
import { ns } from 'shared/components/wrappers/page.mjs'
import { components } from 'shared/components/mdx/index.mjs'
import DocsPage from './[...slug].mjs'

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
      docsPath: '',
      slug,
      locale,
      page: {
        locale,
        path: ['docs'],
      },
    },
  }
}
