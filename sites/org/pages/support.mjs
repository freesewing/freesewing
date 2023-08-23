// Dependencies
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { nsMerge } from 'shared/utils.mjs'
// Hooks
import { useTranslation } from 'next-i18next'
// Components
import { PageWrapper, ns as pageNs } from 'shared/components/wrappers/page.mjs'
import { WebLink, Link } from 'shared/components/link.mjs'
import { Popout } from 'shared/components/popout/index.mjs'
import { DiscordIcon, GitHubIcon } from 'shared/components/icons.mjs'
import { Joost } from 'shared/components/joost.mjs'

// Translation namespaces used on this page
const namespaces = nsMerge(pageNs, 'support', 'sections')

const CardLink = ({ bg, textColor, href, title, icon, children }) => (
  <a
    href={href}
    className={`px-8 ${bg} py-6 rounded-lg block ${textColor}
    hover:bg-secondary hover:text-secondary-content shadow-lg
    transition-color duration-300 grow`}
  >
    <h2 className="text-inherit flex flex-row gap-4 items-start font-light justify-between">
      <span>{title}</span>
      {icon}
    </h2>
    {children}
  </a>
)

/*
 * Each page MUST be wrapped in the PageWrapper component.
 * You also MUST spread props.page into this wrapper component
 * when path and locale come from static props (as here)
 * or set them manually.
 */
const SupportPage = ({ page }) => {
  const { t } = useTranslation(namespaces)

  return (
    <PageWrapper {...page} title={t('sections:support')}>
      <div className="flex flex-col gap-4 max-w-3xl mb-24 px-4 md:px-0  mt-4">
        <CardLink
          bg="bg-accent"
          textColor="text-primary-content"
          href="https://discord.freesewing.org/"
          title={
            <>
              <b className="font-bold">Discord</b>
              <span className="px-4">|</span>
              <small>{t('support:communitySupport')}</small>
            </>
          }
          icon={<DiscordIcon className="w-14 h-14 shrink-0" />}
        >
          <p
            className="font-medium text-inherit text-lg"
            dangerouslySetInnerHTML={{ __html: t('support:communitySupport1') }}
          />
          <p className="font-normal text-inherit">{t('support:communitySupport2')}</p>
        </CardLink>
        <CardLink
          bg="bg-primary"
          textColor="text-neutral-content"
          href="https://github.com/freesewing/freesewing/issues/new/"
          title={
            <>
              <b className="font-bold">GitHub</b>
              <span className="px-4">|</span>
              <small>{t('support:contributorSupport')}</small>
            </>
          }
          icon={<GitHubIcon className="w-14 h-14 shrink-0" />}
        >
          <p
            className="font-medium text-inherit text-lg"
            dangerouslySetInnerHTML={{ __html: t('support:contributorSupport1') }}
          />
          <p className="font-normal text-inherit">{t('support:contributorSupport2')}</p>
        </CardLink>
        <Link
          href="/patrons/join"
          className={`px-8 bg-neutral py-6 rounded-lg block text-neutral-content
          hover:bg-secondary hover:text-secondary-content shadow-lg
          transition-color duration-300 grow`}
        >
          <h2 className="-mb-4 text-inherit flex flex-row gap-4 items-start font-light justify-between">
            <span>
              <b className="font-bold">Joost</b>
              <span className="px-4">|</span>
              <small>{t('support:maintainerSupport')}</small>
            </span>
            <Joost className="w-36 shrink-0 -mt-4" stroke={3} />
          </h2>
          <p
            className="font-medium text-inherit text-lg"
            dangerouslySetInnerHTML={{ __html: t('support:maintainerSupport1') }}
          />
          <p className="font-normal text-inherit">{t('support:maintainerSupport2')}</p>
        </Link>
        <Popout note>
          <h5>{t('support:whatIsDiscord')}</h5>
          <p>{t('support:whatIsDiscord1')}</p>
          <p>
            <span dangerouslySetInnerHTML={{ __html: t('support:whatIsDiscord2') + ' ' }} />
            <WebLink href="https://discord.freesewing.org" txt="discord.freesewing.org" />.
          </p>
          <p>
            {t('support:whatIsDiscord3')}
            <br />
            {t('support:whatIsDiscord4')}
          </p>
        </Popout>

        <Popout note>
          <h5>{t('support:whatIsGitHub')}</h5>
          <p>{t('support:whatIsGitHub1')}</p>
          <p>
            {t('support:whatIsGitHub2')}{' '}
            <WebLink href="https://github.com/freesewing" txt="github.com/freesewing" />.
          </p>
          <p>{t('support:whatIsGitHub3')}</p>
        </Popout>

        <Popout note>
          <h5>{t('support:whatIsJoost')}</h5>
          <p>{t('support:whatIsJoost1')}</p>
        </Popout>
      </div>
    </PageWrapper>
  )
}

export default SupportPage

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
