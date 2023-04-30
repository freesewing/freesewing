// Dependencies
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
// Hooks
import { useTranslation } from 'next-i18next'
import { useAccount } from 'shared/hooks/use-account.mjs'
// Components
import { PageWrapper, ns as pageNs } from 'shared/components/wrappers/page.mjs'
import { ChoiceLink } from 'shared/components/choice-link.mjs'
import { KeyIcon, MeasureIcon, UnitsIcon } from 'shared/components/icons.mjs'

// Translation namespaces used on this page
// Note that we include the account namespace here for the 'new' keyword
const namespaces = [...pageNs, 'account']

/*
 * Each page MUST be wrapped in the PageWrapper component.
 * You also MUST spread props.page into this wrapper component
 * when path and locale come from static props (as here)
 * or set them manually.
 */
const NewIndexPage = ({ page }) => {
  const { t } = useTranslation(['account'])
  const { account } = useAccount()

  const control = account.control ? account.control : 99

  return (
    <PageWrapper {...page}>
      <div className="max-w-lg">
        {control > 3 ? (
          <ChoiceLink title={t('newApikey')} icon={<KeyIcon className="w-6 h-6 text-secondary" />}>
            {t('keyNewInfo')}
          </ChoiceLink>
        ) : null}
        <ChoiceLink title={t('newSet')} icon={<MeasureIcon className="w-6 h-6 text-secondary" />}>
          {t('setNewInfo')}
        </ChoiceLink>
      </div>
    </PageWrapper>
  )
}

export default NewIndexPage

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, namespaces)),
      page: {
        locale,
        path: ['new'],
      },
    },
  }
}
