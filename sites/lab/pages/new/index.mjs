// Dependencies
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
// Hooks
import { useTranslation } from 'next-i18next'
import { useAccount } from 'shared/hooks/use-account.mjs'
// Components
import Link from 'next/link'
import { PageWrapper, ns as pageNs } from 'shared/components/wrappers/page.mjs'
import {
  KeyIcon,
  NewMsetIcon,
  DesignIcon,
  NewPatternIcon,
  PluginIcon,
  ShowcaseIcon,
  RssIcon,
  CsetIcon,
  OpackIcon,
} from 'shared/components/icons.mjs'

// Translation namespaces used on this page
// Note that we include the account namespace here for the 'new' keyword
const namespaces = [...pageNs, 'account']

const Box = ({ title, Icon, description, href }) => {
  const linkProps = {
    href,
    className:
      'p-8 -ml-4 -mr-4 md:m-0 rounded-none md:rounded-xl md:shadow hover:bg-secondary bg-base-200 hover:bg-opacity-10 w-full max-w-lg',
  }

  const inner = (
    <>
      <h4 className="flex flex-row items-start justify-between w-full m-0 p-0 text-inherit">
        <span>{title}</span>
        <Icon className="w-12 h-12 -mt-2" stroke={1.5} />
      </h4>
      <div className={`normal-case text-base font-medium text-left pt-2 text-inherit`}>
        {description}
      </div>
    </>
  )

  return href.slice(0, 4) === 'http' ? (
    <a {...linkProps}>{inner}</a>
  ) : (
    <Link {...linkProps}>{inner}</Link>
  )
}

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
    <PageWrapper {...page} title={t('new')}>
      <h2>{t('newPopular')}</h2>
      <div className="w-full max-w-7xl flex flex-row flex-wrap gap-4">
        <Box
          title={t('patternNew')}
          Icon={NewPatternIcon}
          description={t('patternNewInfo')}
          href="/new/pattern"
        />
        <Box title={t('newSet')} Icon={NewMsetIcon} description={t('setNewInfo')} href="/new/set" />
      </div>
      {control > 3 ? (
        <>
          <h2>{t('newShare')}</h2>
          <div className="w-full max-w-7xl flex flex-row flex-wrap gap-4">
            <Box
              title={t('csetNew')}
              Icon={CsetIcon}
              description={t('csetNewInfo')}
              href="/new/cset"
            />
            <Box
              title={t('opackNew')}
              Icon={OpackIcon}
              description={t('opackNewInfo')}
              href="/new/opack"
            />
            <Box
              title={t('showcaseNew')}
              Icon={ShowcaseIcon}
              description={t('showcaseNewInfo')}
              href="/new/showcase"
            />
            <Box
              title={t('blogNew')}
              Icon={RssIcon}
              description={t('blogNewInfo')}
              href="/new/blog"
            />
          </div>
          <h2>{t('newDev')}</h2>
          <div className="w-full max-w-7xl flex flex-row flex-wrap gap-4">
            <Box
              title={t('newApikey')}
              Icon={KeyIcon}
              description={t('keyNewInfo')}
              href="/new/apikey"
            />
            <Box
              title={t('designNew')}
              Icon={DesignIcon}
              description={t('designNewInfo')}
              href="https://freesewing.dev/tutorials/pattern-design"
            />
            <Box
              title={t('pluginNew')}
              Icon={PluginIcon}
              description={t('pluginNewInfo')}
              href="https://freesewing.dev/guides/plugins"
            />
          </div>
        </>
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
