// Dependencies
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { nsMerge } from 'shared/utils.mjs'
// Hooks
import { useTranslation } from 'next-i18next'
//import { useAccount } from 'shared/hooks/use-account.mjs'
//import { useEffect, useState } from 'react'
// Components
import { PageWrapper, ns as pageNs } from 'shared/components/wrappers/page.mjs'
import { Popout } from 'shared/components/popout/index.mjs'

// Translation namespaces used on this page
const namespaces = nsMerge(pageNs, 'patrons')

/*
 * Each page MUST be wrapped in the PageWrapper component.
 * You also MUST spread props.page into this wrapper component
 * when path and locale come from static props (as here)
 * or set them manually.
 */
const PatronsPage = ({ page }) => {
  const { t } = useTranslation(namespaces)

  return (
    <PageWrapper {...page} title={t('freeSewingPatrons')}>
      <Popout fixme>Create new v3 patrons page</Popout>
    </PageWrapper>
  )
}

export default PatronsPage

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, namespaces)),
      page: {
        locale,
        path: ['patrons'],
      },
    },
  }
}
