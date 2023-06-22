// Dependencies
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
// Hooks
import { useTranslation } from 'next-i18next'
// Components
import Head from 'next/head'
import { PageWrapper, ns as pageNs } from 'shared/components/wrappers/page.mjs'
import { Popout, ns as popoutNs } from 'shared/components/popout.mjs'
import { WebLink } from 'shared/components/web-link.mjs'

const ns = ['lab', ...pageNs, ...popoutNs]
/*
 * Each page MUST be wrapped in the PageWrapper component.
 * You also MUST spread props.page into this wrapper component
 * when path and locale come from static props (as here)
 * or set them manually.
 */
const HomePage = ({ page }) => {
  const { t } = useTranslation(ns)

  return (
    <PageWrapper {...page} t={t('lab:welcome')}>
      <Head>
        <title>{t('lab:welcome')}</title>
      </Head>
      <div>
        <h1>{t('lab:welcome')}</h1>
        <div className="max-w-prose">
          <p>{t('lab:about')}</p>
          <Popout link compact>
            <WebLink href="https://freesewing.org/" txt={t('lab:goToOrg')} />
          </Popout>
          <Popout note>
            <h5>{t('lab:what')}</h5>
            <p>{t('lab:what1')}</p>
            <p>{t('lab:what2')}</p>
            <p>{t('lab:what3')}</p>
          </Popout>
        </div>
      </div>
    </PageWrapper>
  )
}

export default HomePage

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ns)),
      page: {
        locale,
        path: [],
      },
    },
  }
}
