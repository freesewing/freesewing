// Dependencies
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { nsMerge } from 'shared/utils.mjs'
import { freeSewingConfig as config } from 'shared/config/freesewing.config.mjs'
// Hooks
import { useTranslation } from 'next-i18next'
import { useState } from 'react'
// Components
import { PageWrapper, ns as pageNs } from 'shared/components/wrappers/page.mjs'
import { Joost } from 'shared/components/joost.mjs'
import { BareLayout } from 'site/components/layouts/bare.mjs'
import { Breadcrumbs } from 'shared/components/navigation/sitenav.mjs'
import {
  DiscordIcon,
  FacebookIcon,
  GitHubIcon,
  InstagramIcon,
  RedditIcon,
  TwitterIcon,
  YouTubeIcon,
  CommunityIcon,
  ChatIcon,
  EmailIcon,
} from 'shared/components/icons.mjs'
import { PleaseSubscribe, ns as subNs } from 'shared/components/patrons/please-subscribe.mjs'
import { SupportForm, ns as supportNs } from 'shared/components/support.mjs'

// Translation namespaces used on this page
const ns = nsMerge(pageNs, supportNs, subNs)

const SupportCard = ({ bg, textColor, title, icon, nr }) => (
  <div
    className={`px-4 bg-${bg} pt-2 pb-4 rounded-lg block ${textColor} shadow-lg
    grow w-full bg-gradient-to-tr from-${bg} from-10% to-primary`}
  >
    <h3 className="text-inherit font-heavy flex flex-row w-full items-center justify-between relative">
      <span
        className={`p-2 w-8 h-8 flex flex-col items-center justify-center shrink-0 rounded-full
        text-center p-0 py-2 bg-transparent text-${bg}-content border-2 border-base-100 text-xl mr-4`}
      >
        {nr}
      </span>
      {title}
      {icon}
    </h3>
  </div>
)

const socialIcon = {
  discord: <DiscordIcon />,
  facebook: <FacebookIcon />,
  github: <GitHubIcon />,
  instagram: <InstagramIcon />,
  reddit: <RedditIcon />,
  twitter: <TwitterIcon />,
  youtube: <YouTubeIcon fill stroke={0} />,
}

/*
 * Each page MUST be wrapped in the PageWrapper component.
 * You also MUST spread props.page into this wrapper component
 * when path and locale come from static props (as here)
 * or set them manually.
 */
const SupportPage = ({ page }) => {
  const { t } = useTranslation(ns)

  const [request, setRequest] = useState(false)

  const pageTitle = request ? t('createSupportRequest') : t('sections:support')

  if (request)
    return (
      <PageWrapper {...page} title={pageTitle} layout={BareLayout}>
        <div className="max-w-7xl mx-auto mb-24 px-4 mt-16">
          <Breadcrumbs />
          <h1>{pageTitle}</h1>
          <SupportForm />
        </div>
      </PageWrapper>
    )

  return (
    <PageWrapper {...page} title={pageTitle} layout={BareLayout}>
      <div className="max-w-7xl mx-auto mb-24 px-4 mt-16">
        <Breadcrumbs />
        <h1>{pageTitle}</h1>
        <h2>{t('howCanWeSupportYou')}</h2>
        <div className="flex flex-row flex-wrap gap-4 lg:grid lg:grid-cols-3 lg:gap-8 justify-around -mt-4">
          {/* Community */}
          <div className="w-full md:max-w-md my-8">
            <SupportCard
              nr={1}
              bg="accent"
              textColor="text-accent-content"
              title={t('support:communitySupport')}
              icon={<CommunityIcon className="w-10 h-10 lg:w-14 lg:h-14 shrink-0" />}
            />
            <p className="font-normal text-inherit">{t('support:communitySupport1')}</p>
            <p className="font-normal text-inherit">{t('support:communitySupport2')}</p>
            <div className="grid grid-cols-2 gap-2">
              {Object.keys(config.social)
                .sort()
                .map((key) => (
                  <a
                    className="btn btn-neutral btn-outline w-full flex flex-row items-center justify-between hover:btn-accent"
                    href={config.social[key]}
                    key={key}
                  >
                    {socialIcon[key.toLowerCase()]}
                    {key}
                  </a>
                ))}
            </div>
          </div>

          {/* Contributors */}
          <div className="w-full md:max-w-md my-8">
            <SupportCard
              nr={2}
              bg="secondary"
              textColor="text-secondary-content"
              title={t('support:contributorSupport')}
              icon={<GitHubIcon className="w-10 h-10 lg:w-14 lg:h-14 shrink-0" />}
            />
            <p
              className="font-medium text-inherit text-lg"
              dangerouslySetInnerHTML={{ __html: t('support:contributorSupport1') }}
            />
            <p className="font-normal text-inherit">{t('support:contributorSupport2')}</p>
            <button
              className="btn btn-secondary btn-lg w-full flex flex-row items-center justify-between"
              onClick={() => setRequest(true)}
            >
              <ChatIcon className="w-8 h-8" />
              {t('createSupportRequest')}
            </button>
          </div>

          {/* Maintainer */}
          <div className="w-full md:max-w-md my-8">
            <SupportCard
              nr={3}
              bg="neutral"
              textColor="text-neutral-content"
              title={t('support:maintainerSupport')}
              icon={<Joost className="w-20 lg:w-28 shrink-0" stroke={1} />}
            />
            <p
              className="font-medium text-inherit text-lg"
              dangerouslySetInnerHTML={{ __html: t('support:maintainerSupport1') }}
            />
            <p className="font-normal text-inherit">{t('support:maintainerSupport2')}</p>
            <a
              className="btn btn-neutral w-full flex flex-row items-center justify-between"
              href="mailto:joost@joost.at"
            >
              <EmailIcon className="w-8 h-8" />
              {t('emailAddress', { address: 'joost@joost.at' })}
            </a>
          </div>
        </div>
        <h2 className="pb-8">{t('howCanYouSupportFreeSewing')}</h2>
        <div className="-mx-4 md:mx-auto">
          <PleaseSubscribe dense />
        </div>
      </div>
    </PageWrapper>
  )
}

export default SupportPage

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ns)),
      page: {
        locale,
        path: ['patrons', 'thanks'],
      },
    },
  }
}
