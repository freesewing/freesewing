// Dependencies
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { nsMerge } from 'shared/utils.mjs'
// Hooks
import { useTranslation } from 'next-i18next'
// Components
import { PageWrapper, ns as pageNs } from 'shared/components/wrappers/page.mjs'
import { PleaseSubscribe } from 'shared/components/patrons/please-subscribe.mjs'

// Translation namespaces used on this page
const namespaces = nsMerge(pageNs, 'patrons')

/*
 * Each page MUST be wrapped in the PageWrapper component.
 * You also MUST spread props.page into this wrapper component
 * when path and locale come from static props (as here)
 * or set them manually.
 */
const PatronsJoinPage = ({ page }) => {
  const { t } = useTranslation(namespaces)

  return (
    <PageWrapper {...page} title={t('donate')}>
      <PleaseSubscribe dense color="primary" periodPreset="x" amountPreset="50" />
    </PageWrapper>
  )
}

export default PatronsJoinPage

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, namespaces)),
      page: {
        locale,
        path: ['patrons', 'join'],
      },
    },
  }
}
