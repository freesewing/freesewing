// Dependencies
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
// Hooks
import { useTranslation } from 'next-i18next'
// Components
import { PageWrapper, ns as pageNs } from 'shared/components/wrappers/page.mjs'

const ns = ['sde', ...pageNs]

/*
 * Each page MUST be wrapped in the PageWrapper component.
 * You also MUST spread props.page into this wrapper component
 * when path and locale come from static props (as here)
 * or set them manually.
 */
const HomePage = ({ page }) => {
  const { t } = useTranslation(ns)

  return (
    <PageWrapper {...page} t={false}>
      <div className="max-w-prose text-center">
        <h1>{t('sde:pageLeftBlank')}</h1>
        <p>{t('sde:pageLeftBlankMsg')}</p>
        <div className="h-64"></div>
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
        path: ['sde'],
      },
    },
  }
}
