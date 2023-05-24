// Dependencies
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import Head from 'next/head'
// Components
import { PageWrapper, ns as pageNs } from 'shared/components/wrappers/page.mjs'
import { Popout } from 'shared/components/popout.mjs'
import { WebLink } from 'shared/components/web-link.mjs'

const ns = [...pageNs, 'labdocs']

/*
 * Each page MUST be wrapped in the PageWrapper component.
 * You also MUST spread props.page into this wrapper component
 * when path and locale come from static props (as here)
 * or set them manually.
 */
const DocsPage = ({ page }) => {
  const { t, i18n } = useTranslation(ns)

  return (
    <PageWrapper {...page}>
      <div>
        <div className="max-w-prose">
          <p>
            {t('labdocs:noDocs')}
            <br />
            {t('labdocs:see')}:
          </p>
          <h2>
            <WebLink href="https://freesewing.org/" txt="FreeSewing.org" />
          </h2>
          <p>{t('labdocs:orgDocs')}</p>
          <h2>
            <WebLink href="https://freesewing.dev/" txt="FreeSewing.dev" />
          </h2>
          <p>{t('labdocs:devDocs')}</p>
          <Popout note compact>
            {t('labdocs:enOnly')}
          </Popout>
        </div>
      </div>
    </PageWrapper>
  )
}

export default DocsPage

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ns)),
      page: {
        locale,
        path: ['docs'],
      },
    },
  }
}
