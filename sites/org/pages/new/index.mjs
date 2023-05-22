// Dependencies
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
// Hooks
import { useTranslation } from 'next-i18next'
import { useAccount } from 'shared/hooks/use-account.mjs'
// Components
import { PageWrapper, ns as pageNs } from 'shared/components/wrappers/page.mjs'
import { ChoiceLink } from 'shared/components/choice-link.mjs'
import { KeyIcon, MeasureIcon, DesignIcon, PageIcon, PluginIcon } from 'shared/components/icons.mjs'

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
        <h2>{t('newBasic')}</h2>

        <ChoiceLink
          title={t('patternNew')}
          icon={<PageIcon className="w-10 h-10 text-secondary" />}
          href="/new/pattern"
        >
          {t('patternNewInfo')}
        </ChoiceLink>

        <ChoiceLink
          title={t('newSet')}
          icon={<MeasureIcon className="w-10 h-10 text-secondary" />}
          href="/new/set"
        >
          {t('setNewInfo')}
        </ChoiceLink>

        {control > 3 ? (
          <>
            <h2>{t('newAdvanced')}</h2>

            <ChoiceLink
              title={t('newApikey')}
              icon={<KeyIcon className="w-10 h-10 text-secondary" stroke={1.7} />}
              href="/new/apikey"
            >
              {t('keyNewInfo')}
            </ChoiceLink>

            <ChoiceLink
              title={t('designNew')}
              icon={<DesignIcon className="w-10 h-10 text-secondary" />}
              href="https://freesewing.dev/tutorials/pattern-design"
            >
              {t('designNewInfo')}
            </ChoiceLink>

            <ChoiceLink
              title={t('pluginNew')}
              icon={<PluginIcon className="w-10 h-10 text-secondary" stroke={1.7} />}
              href="https://freesewing.dev/guides/plugins"
            >
              {t('pluginNewInfo')}
            </ChoiceLink>
          </>
        ) : null}
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
