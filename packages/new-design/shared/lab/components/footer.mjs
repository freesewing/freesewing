// Hooks
import { useTranslation } from 'next-i18next'
// Components
import Link from 'next/link'
import { FreeSewingLogo } from 'shared/components/logos/freesewing.mjs'
import { OsiLogo } from 'shared/components/logos/osi.mjs'
import { CCLogo } from 'shared/components/logos/cc.mjs'
import { CCByLogo } from 'shared/components/logos/cc-by.mjs'
import { Ribbon } from 'shared/components/ribbon.mjs'
import { WordMark } from 'shared/components/wordmark.mjs'
import {
  DiscordIcon,
  FacebookIcon,
  GithubIcon,
  InstagramIcon,
  RedditIcon,
  TwitterIcon,
} from 'shared/components/icons.mjs'

// Classes
const link = 'text-secondary font-bold hover:pointer hover:underline px-1'
const accent = 'text-accent font-bold text-lg px-1 block sm:inline'
const freesewing = 'px-1 text-lg font-bold block sm:inline'

// Keep these translations in the component because they're only used here
const translations = {
  cc: (
    <span>
      Content on FreeSewing.org is available under{' '}
      <a className={link} href="https://creativecommons.org/licenses/by/4.0/">
        a Creative Commons license
      </a>
    </span>
  ),
  mit: (
    <span>
      The FreeSewing source code is{' '}
      <a href="https://github.com/freesewing/freesewing" className={link}>
        available on Github
      </a>{' '}
      under{' '}
      <a href="https://opensource.org/licenses/MIT" className={link}>
        the MIT license
      </a>
    </span>
  ),
  sponsors: (
    <>
      <span className={freesewing}>FreeSewing</span> is sponsored by these{' '}
      <span className={accent}>awesome companies</span>
    </>
  ),
}

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

export const Footer = ({ app }) => {
  const { t } = useTranslation(['common', 'patrons'])

  return (
    <footer className="bg-neutral">
      <Ribbon loading={app.loading} theme={app.theme} />
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
                {translations.cc}
              </p>
            </div>
            <div className="flex flex-row gap-2 justify-center items-center mt-4">
              <OsiLogo className="w-8 lg:w-12" />
              <p className="text-neutral-content text-right basis-4/5 lg:basis-3/4 leading-5">
                {translations.mit}
              </p>
            </div>
          </div>
        </div>

        {/* Second col - Social & Sponsors */}
        <div className="lg:col-span-2 -order-2 2xl:order-2 px-4 lg:px-0">
          {/* Social icons */}
          <div className="w-full sm:w-auto flex flex-row flex-wrap gap-4 lg:gap-8 items-center justify-center">
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
        </div>

        {/* Col 3 - Logo & Slogan */}
        <div className="w-full 4xl:w-auto xl:max-w-md mb-8 text-center order-3 mt-0 lg:mt-20 2xl:mt-0 2xl:mb-0">
          <div className="max-w-md m-auto">
            <FreeSewingLogo stroke="none" size={164} className="w-40 lg:w-64 m-auto m-auto" />
            <h5 className="lg:text-3xl mt-4">
              <WordMark />
            </h5>
            <p className="bold text-neutral-content text-normal lg:text-xl leading-5">
              {t('sloganCome')}
              <br />
              {t('sloganStay')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
