// Dependencies
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { nsMerge } from 'shared/utils.mjs'
// Hooks
import { useTranslation } from 'next-i18next'
// Components
import { PageWrapper, ns as pageNs } from 'shared/components/wrappers/page.mjs'
import { Robot } from 'shared/components/robot/index.mjs'
import { HeartIcon } from 'shared/components/icons.mjs'
import { Popout } from 'shared/components/popout/index.mjs'
import { Joost } from 'shared/components/joost.mjs'

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
        <span>{t('patrons:subscriptionThanks')}</span>
      </h3>
      <Robot className="w-full max-w-sm text-base-content mt-8" />
      <div className="max-w-2xl">
        <Popout note>
          <h5>{t('patrons:watchYourInbox')}</h5>
          <p>{t('patrons:thanksMsg1')}</p>
          <p>
            {t('patrons:thanksMsg2')}
            <a
              href="mailto:joost@freesewing.org"
              className="font-bold underline decoration-2 hover:decoration-4"
            >
              joost@freesewing.org
            </a>
            .
          </p>
          <Joost className="ml-12 -mt-2 w-40 text-info" />
        </Popout>
      </div>
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
        path: ['patrons', 'thanks'],
      },
    },
  }
}
