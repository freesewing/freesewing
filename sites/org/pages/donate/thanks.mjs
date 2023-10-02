// Dependencies
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { nsMerge } from 'shared/utils.mjs'
// Hooks
import { useTranslation } from 'next-i18next'
// Components
import { PageWrapper, ns as pageNs } from 'shared/components/wrappers/page.mjs'
import { Robot } from 'shared/components/robot/index.mjs'
import { HeartIcon } from 'shared/components/icons.mjs'

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
    <PageWrapper {...page} title={t('patrons:thankYouVeryMuch')}>
      <h3 className="max-w-2xl flex flex-row gap-4 items-center">
        <HeartIcon className="text-error w-16 h-16 shrink-0" fill />
        <span>{t('patrons:donationThanks')}</span>
      </h3>
      <Robot className="w-full max-w-sm text-base-content mt-8" />
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
        path: ['donate', 'thanks'],
      },
    },
  }
}
