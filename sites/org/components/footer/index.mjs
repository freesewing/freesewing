import Link from 'next/link'
import { FreeSewingLogo } from 'shared/components/logos/freesewing.mjs'
import { OsiLogo } from 'shared/components/logos/osi.mjs'
import { CCLogo } from 'shared/components/logos/cc.mjs'
import { CCByLogo } from 'shared/components/logos/cc-by.mjs'
import { Ribbon } from 'shared/components/ribbon.mjs'
import { WordMark } from 'shared/components/wordmark.mjs'
import { useTranslation } from 'next-i18next'
import { useTheme } from 'shared/hooks/use-theme.mjs'
import { freeSewingConfig } from 'site/freesewing.config.mjs'
import {
  HelpIcon,
  DiscordIcon,
  FacebookIcon,
  GithubIcon,
  InstagramIcon,
  RedditIcon,
  TwitterIcon,
} from 'shared/components/icons.mjs'

const icon = { className: 'w-8 lg:w-12 h-8 lg:h-12' }
const social = {
  Discord: {
    icon: <DiscordIcon {...icon} />,
    href: 'https://discord.freesewing.org/',
  },
  Instagram: {
    icon: <InstagramIcon {...icon} />,
    href: 'https://instagram.com/freesewing_org',
  },
  Facebook: {
    icon: <FacebookIcon {...icon} />,
    href: 'https://www.facebook.com/groups/627769821272714/',
  },
  Github: {
    icon: <GithubIcon {...icon} />,
    href: 'https://github.com/freesewing',
  },
  Reddit: {
    icon: <RedditIcon {...icon} />,
    href: 'https://www.reddit.com/r/freesewing/',
  },
  Twitter: {
    icon: <TwitterIcon {...icon} />,
    href: 'https://twitter.com/freesewing_org',
  },
}

export const ns = ['footer']

/*
 * Named exports are better than default exports
 */
export const Footer = ({ app }) => {
  const { t } = useTranslation(ns)
  const { theme } = useTheme()

  return (
    <footer className="bg-neutral">
      <Ribbon loading={app.state.loading} theme={theme} />
      <div className="grid grid-cols-1 lg:grid-cols-4 py-12 2xl:py-20 text-neutral-content px-4">
        {/* First col - CC & MIT */}
        <div className="mb-20 order-1 mt-20 2xl:mt-0 2xl:mb-0">
          <div className="max-w-md m-auto">
            <div>
              <CCLogo className="w-64 m-auto" />
            </div>
            <div className="flex flex-row gap-2 justify-center items-center mt-8">
              <CCByLogo className="w-8 lg:w-12" />
              <p className="text-neutral-content text-right basis-4/5 lg:basis-3/4 leading-5">
                {t('cc')}
              </p>
            </div>
            <div className="flex flex-row gap-2 justify-center items-center mt-4">
              <OsiLogo className="w-8 lg:w-12" />
              <p className="text-neutral-content text-right basis-4/5 lg:basis-3/4 leading-5">
                <a href={freeSewingConfig.monorepo} className="hover:pointer hover:underline px-1">
                  {t('mit')}
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Second col - Social & Sponsors */}
        <div className="lg:col-span-2 -order-2 2xl:order-2 px-4 lg:px-0">
          {/* Social icons */}
          <div className="w-full sm:w-auto flex flex-row flex-wrap gap-4 lg:gap-8 items-center justify-center">
            <Link
              href="/contact"
              className="hover:text-secondary hover:-mt-2 transition-all"
              title="Contact information"
            >
              <HelpIcon {...icon} />
            </Link>
            {Object.keys(social).map((item) => (
              <Link
                key={item}
                href={social[item].href}
                className="hover:text-secondary hover:-mt-2 transition-all"
                title={item}
              >
                {social[item].icon}
              </Link>
            ))}
          </div>
          {/* Sponsors */}
          <div className="border rounded-xl p-8 border-dashed border-base-100/25 mt-20">
            <p className="text-center text-neutral-content leading-5">
              {t('sponsors')}
              <br />
            </p>
            <div className="py-4 flex flex-row gap-8 flex-wrap 2xl:flex-nowrap justify-around text-neutral-content">
              <a title="Search powered by Algolia" href="https://www.algolia.com/">
                <img
                  src="/brands/algolia.svg"
                  className="h-12 aspect-auto"
                  alt="Search powered by Algolia"
                />
              </a>
              <a title="Error handling by Bugsnag" href="https://www.bugsnag.com/">
                <img src="/brands/bugsnag.svg" className="h-12" alt="Error handling by bugsnag" />
              </a>
              <a title="Translation powered by Crowdin" href="https://www.crowdin.com/">
                <img
                  src="/brands/crowdin.svg"
                  alt="Translation powered by Crowdin"
                  className="h-12"
                />
              </a>
              <a
                title="Builds & hosting by Vercel"
                href="https://www.vercel.com/?utm_source=freesewing&utm_campaign=oss"
              >
                <img src="/brands/vercel.svg" alt="Builds & Hosting by Vercel" className="h-12" />
              </a>
            </div>
          </div>
        </div>

        {/* Col 3 - Logo & Slogan */}
        <div className="w-full 4xl:w-auto xl:max-w-md mb-8 text-center order-3 mt-0 lg:mt-20 2xl:mt-0 2xl:mb-0">
          <div className="max-w-md m-auto">
            <FreeSewingLogo stroke="none" size={164} className="w-40 lg:w-64 m-auto m-auto" />
            <h5 className="lg:text-3xl mt-4">
              <WordMark />
            </h5>
            <p className="bold text-neutral-content text-normal lg:text-xl leading-5">
              Come for the sewing patterns
              <br />
              Stay for the community
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
