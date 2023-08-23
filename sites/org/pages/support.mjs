// Dependencies
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { nsMerge } from 'shared/utils.mjs'
import { freeSewingConfig as config } from 'shared/config/freesewing.config.mjs'
// Hooks
import { useTranslation } from 'next-i18next'
import { useState } from 'react'
// Components
import { PageWrapper, ns as pageNs } from 'shared/components/wrappers/page.mjs'
import { WebLink, Link } from 'shared/components/link.mjs'
import { Popout } from 'shared/components/popout/index.mjs'
import { Joost } from 'shared/components/joost.mjs'
import { BareLayout } from 'site/components/layouts/bare.mjs'
import { Breadcrumbs } from 'shared/components/navigation/sitenav.mjs'
import {
  DiscordIcon,
  FacebookIcon,
  GitHubIcon,
  HeartIcon,
  InstagramIcon,
  RedditIcon,
  TwitterIcon,
  YouTubeIcon,
  FreeSewingIcon,
} from 'shared/components/icons.mjs'
import { StringInput, MarkdownInput, DesignDropdown } from 'shared/components/inputs.mjs'

// Translation namespaces used on this page
const namespaces = nsMerge(pageNs, 'support', 'sections')

const SupportCard = ({ bg, textColor, title, icon, subtitle }) => (
  <div className={`px-8 ${bg} pt-2 pb-4 rounded-lg block ${textColor} shadow-lg grow w-full`}>
    <h3 className="text-inherit font-heavy flex flex-row w-full items-center justify-between">
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
  const { t } = useTranslation(namespaces)
  const [issue, setIssue] = useState(false)
  const [mode, setMode] = useState(false)
  const [edit, setEdit] = useState(false)
  const [title, setTitle] = useState('')
  const [design, setDesign] = useState('')
  const [body, setBody] = useState('')

  const pageTitle = mode ? t('createSupportRequest') : t('sections:support')

  if (mode && !edit)
    return (
      <PageWrapper {...page} title={pageTitle} layout={BareLayout}>
        <div className="max-w-7xl mx-auto mb-24 px-4 md:px-0 mt-16">
          <Breadcrumbs />
          <h1>{pageTitle}</h1>
          <h2>{t('chooseYourUx')}</h2>
          <div className="flex flex-col gap-8 max-w-xl">
            <button
              className={`px-8 bg-neutral pt-4 pb-8 rounded-lg block text-neutral-content
            shadow-lg grow hover:bg-secondary hover:text-secondary-content hover:cursor-pointer`}
              title={t('createIssueOnFreeSewing')}
              onClick={() => setEdit(true)}
            >
              <h3 className="text-inherit font-heavy flex flex-row w-full items-center justify-between">
                <div className="text-left">
                  <span className="block text-sm font-medium via">{t('via')}</span>
                  FreeSewing.org
                  <span className="block text-lg font-medium via pt-2">
                    {t('chooseThisForFreeSewing')}
                  </span>
                </div>
                {<FreeSewingIcon className="w-14 h-14 shrink-0" />}
              </h3>
            </button>
            <a
              className={`px-8 bg-neutral pt-4 pb-4 rounded-lg block text-neutral-content opacity-70 hover:opacity-100
            shadow-lg grow hover:bg-secondary hover:text-secondary-content hover:cursor-pointer`}
              title={t('createIssueOnGitHub')}
              href="https://github.com/freesewing/freesewing/issues/new/choose"
            >
              <h5 className="text-inherit font-heavy flex flex-row w-full items-center justify-between">
                <div className="text-left">
                  <span className="block text-sm font-medium via">{t('via')}</span>
                  GitHub.com
                  <span className="block text-sm font-medium via pt-2">
                    {t('chooseThisForGitHub')}
                  </span>
                </div>
                {<GitHubIcon className="w-14 h-14 shrink-0" />}
              </h5>
            </a>
          </div>
        </div>
      </PageWrapper>
    )

  if (mode && edit)
    return (
      <PageWrapper {...page} title={pageTitle} layout={BareLayout}>
        <div className="max-w-7xl mx-auto mb-24 px-4 md:px-0 mt-16">
          <Breadcrumbs />
          <h1>{pageTitle}</h1>
          <div className="max-w-xl">
            <StringInput
              label={t('title')}
              update={setTitle}
              current={title}
              valid={(val) => val.length > 10}
            />
            <DesignDropdown
              firstOption={<option val="">Not related to a design</option>}
              label={t('design')}
              update={setDesign}
              current={design}
              valid={(val) => val.length > 1}
            />
            <MarkdownInput
              label={t('body')}
              update={body}
              current={body}
              valid={(val) => val.length > 10}
            />
          </div>
        </div>
      </PageWrapper>
    )

  return (
    <PageWrapper {...page} title={pageTitle} layout={BareLayout}>
      <div className="max-w-7xl mx-auto mb-24 px-4 mt-16">
        <Breadcrumbs />
        <h1>{pageTitle}</h1>
        <div className="flex flex-row flex-wrap gap-4 lg:grid lg:grid-cols-3 lg:gap-8 justify-around">
          {/* Community */}
          <div className="w-full md:max-w-md my-8">
            <SupportCard
              bg="bg-accent"
              textColor="text-primary-content"
              title={t('support:communitySupport')}
              subtitle="Discord"
              icon={<HeartIcon className="w-14 h-14 shrink-0" />}
            />
            <p className="font-normal text-inherit">{t('support:communitySupport1')}</p>
            <p className="font-normal text-inherit">{t('support:communitySupport2')}</p>
            <div className="grid grid-cols-2 gap-2">
              {Object.keys(config.social)
                .sort()
                .map((key) => (
                  <a
                    className="btn btn-neutral btn-outline w-full flex flex-row items-center justify-between"
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
              bg="bg-primary"
              textColor="text-neutral-content"
              title={t('support:contributorSupport')}
              subtitle="GitHub"
              icon={<GitHubIcon className="w-14 h-14 shrink-0" />}
            />
            <p
              className="font-medium text-inherit text-lg"
              dangerouslySetInnerHTML={{ __html: t('support:contributorSupport1') }}
            />
            <p className="font-normal text-inherit">{t('support:contributorSupport2')}</p>
            <button className="btn btn-primary w-full" onClick={() => setMode('edit')}>
              {t('createSupportRequest')}
            </button>
          </div>

          {/* Maintainer */}
          <div className="w-full md:max-w-md my-8">
            <SupportCard
              bg="bg-neutral"
              textColor="text-primary-content"
              title={t('support:maintainerSupport')}
              icon={<Joost className="w-28 shrink-0" stroke={1} />}
            />
            <p
              className="font-medium text-inherit text-lg"
              dangerouslySetInnerHTML={{ __html: t('support:maintainerSupport1') }}
            />
            <p className="font-normal text-inherit">{t('support:maintainerSupport2')}</p>
            <Popout tip>
              <h5>{t('support:whatIsJoost')}</h5>
              <p>{t('support:whatIsJoost1')}</p>
            </Popout>
          </div>
        </div>
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
