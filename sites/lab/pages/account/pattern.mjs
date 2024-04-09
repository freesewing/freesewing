// Dependencies
import dynamic from 'next/dynamic'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { nsMerge, getSearchParam } from 'shared/utils.mjs'
// Hooks
import { useTranslation } from 'next-i18next'
import { useState, useEffect } from 'react'
// Components
import { PageWrapper, ns as pageNs } from 'shared/components/wrappers/page.mjs'
import { ns as authNs } from 'shared/components/wrappers/auth/index.mjs'
import { ns as patternsNs } from 'shared/components/account/patterns.mjs'

// Translation namespaces used on this page
const ns = nsMerge(patternsNs, authNs, pageNs, 'status')

/*
 * Some things should never generated as SSR
 * So for these, we run a dynamic import and disable SSR rendering
 */
const DynamicAuthWrapper = dynamic(
  () => import('shared/components/wrappers/auth/index.mjs').then((mod) => mod.AuthWrapper),
  { ssr: false }
)

const DynamicPattern = dynamic(
  () => import('shared/components/account/patterns.mjs').then((mod) => mod.Pattern),
  { ssr: false }
)

/*
 * Each page MUST be wrapped in the PageWrapper component.
 * You also MUST spread props.page into this wrapper component
 * when path and locale come from static props (as here)
 * or set them manually.
 */
const PatternPage = ({ page }) => {
  const { t } = useTranslation(ns)
  const [id, setId] = useState()

  useEffect(() => {
    const newId = getSearchParam('id')
    if (newId !== id) setId(newId)
  }, [id])

  return (
    <PageWrapper {...page} title={`${t('pattern')}: #${id}`}>
      <DynamicAuthWrapper>
        <DynamicPattern id={id} />
      </DynamicAuthWrapper>
    </PageWrapper>
  )
}

export default PatternPage

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ns)),
      page: {
        locale,
        path: ['account', 'pattern'],
      },
    },
  }
}
