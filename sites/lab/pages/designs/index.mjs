// Dependencies
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { nsMerge } from 'shared/utils.mjs'
// Hooks
import { useTranslation } from 'next-i18next'
// Components
import { PageWrapper, ns as pageNs } from 'shared/components/wrappers/page.mjs'
import { DesignPicker, ns as designNs } from 'shared/components/designs/design-picker.mjs'
import { BareLayout } from 'site/components/layouts/bare.mjs'

// Translation namespaces used on this page
const ns = nsMerge(designNs, pageNs, 'account')

/*
 * Each page MUST be wrapped in the PageWrapper component.
 * You also MUST spread props.page into this wrapper component
 * when path and locale come from static props (as here)
 * or set them manually.
 */
const DesignsPage = ({ page }) => {
  const { t } = useTranslation(ns)

  return (
    <PageWrapper {...page} layout={BareLayout}>
      <div className="px-4 m-auto">
        <h1 className="text-center">FreeSewing {t('account:designs')}</h1>
        <DesignPicker
          hrefBuilder={(design) => `/designs/${design}`}
          linkTo="docs"
          altLinkTo="new"
        />
      </div>
    </PageWrapper>
  )
}

export default DesignsPage

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ns)),
      page: {
        locale,
        path: ['designs'],
      },
    },
  }
}
