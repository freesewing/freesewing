// Dependencies
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
// Hooks
import { useTranslation } from 'next-i18next'
import { useAccount } from 'shared/hooks/use-account.mjs'
// Components
import Link from 'next/link'
import { PageWrapper, ns as pageNs } from 'shared/components/wrappers/page.mjs'
import { KeyIcon, MeasieIcon, DesignIcon, PageIcon, PluginIcon } from 'shared/components/icons.mjs'

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

  const boxClasses =
    'p-8 -ml-4 -mr-4 md:m-0 bg-gradient-to-tr rounded-none md:rounded-xl md:shadow hover:from-secondary hover:to-secondary'

  return (
    <PageWrapper {...page} title={t('new')}>
      <div className="w-full flex flex-col md:grid md:grid-cols-2 gap-4">
        <Link href="/new/pattern" className={`${boxClasses} from-accent to-primary`}>
          <h4 className="flex flex-row items-start justify-between w-full text-primary-content m-0 p-0">
            <span>{t('patternNew')}</span>
            <PageIcon className="w-12 h-12 text-primary-content -mt-2" />
          </h4>
          <div className={`normal-case text-base font-medium text-primary-content text-left pt-2`}>
            {t('patternNewInfo')}
          </div>
        </Link>

        <Link href="/new/set" className={`${boxClasses} from-secondary to-success`}>
          <h4 className="flex flex-row items-start justify-between w-full text-primary-content m-0 p-0">
            <span>{t('newSet')}</span>
            <MeasieIcon className="w-12 h-12 text-primary-content -mt-2" />
          </h4>
          <div className={`normal-case text-base font-medium text-primary-content text-left pt-2`}>
            {t('setNewInfo')}
          </div>
        </Link>
      </div>

      {control > 3 ? (
        <div className="w-full flex flex-col md:grid md:grid-cols-3 gap-4 mt-4">
          <Link href="/new/apikey" className={`${boxClasses} from-neutral to-info`}>
            <h4 className="flex flex-row items-start justify-between w-full text-primary-content m-0 p-0">
              <span>{t('newApikey')}</span>
              <KeyIcon className="w-12 h-12 text-primary-content -mt-2" />
            </h4>
            <div
              className={`normal-case text-base font-medium text-primary-content text-left pt-2`}
            >
              {t('keyNewInfo')}
            </div>
          </Link>

          <a
            href="https://freesewing.dev/tutorials/pattern-design"
            className={`${boxClasses} from-neutral to-success`}
          >
            <h4 className="flex flex-row items-start justify-between w-full text-primary-content m-0 p-0">
              <span>{t('designNew')}</span>
              <DesignIcon className="w-12 h-12 text-primary-content -mt-2" />
            </h4>
            <div
              className={`normal-case text-base font-medium text-primary-content text-left pt-2`}
            >
              {t('designNewInfo')}
            </div>
          </a>

          <a
            href="https://freesewing.dev/guides/plugins"
            className={`${boxClasses} from-neutral to-accent`}
          >
            <h4 className="flex flex-row items-start justify-between w-full text-primary-content m-0 p-0">
              <span>{t('pluginNew')}</span>
              <PluginIcon className="w-12 h-12 text-primary-content -mt-2" />
            </h4>
            <div
              className={`normal-case text-base font-medium text-primary-content text-left pt-2`}
            >
              {t('pluginNewInfo')}
            </div>
          </a>
        </div>
      ) : null}
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
